import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ============================================================================
// Pixopharm Consulting — conversion-first product page.
//
// The page IS the booking: live services (real prices from the consulting
// app's database), live pharmacists (real photos and specialties), and each
// pharmacist's next real opening. Every "Book" click lands one step into
// the booking flow at consulting.pixopharm.com with the service preselected.
// Nothing a visitor can act on is hard-coded — change a price in the
// consulting admin and this page follows on the next load.
// ============================================================================

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" }

const CONSULTING_APP_URL = 'https://consulting.pixopharm.com'

// The consulting app's public Supabase endpoints (same anon key the booking
// page itself ships to every visitor — safe to embed, RLS enforces access).
const SB_URL = 'https://hqyewiroiswmhfghkzhz.supabase.co'
const SB_KEY = 'sb_publishable_d1GwG2ax6SrW8jW71nIamg_LV1OWpoB'
const SB_HEADERS = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }

const AMBER = 'hsl(35,78%,40%)'
const AMBER_DEEP = 'hsl(35,78%,32%)'
const AMBER_TEXT = 'hsl(35,70%,62%)'

interface Service {
  id: string
  slug: string
  name: string
  description: string | null
  price_cents: number
  duration_min: number
}

interface PharmacistRow {
  id: string
  name: string
  credentials: string | null
  avatar_url: string | null
  specialties: string[] | null
}

interface PharmacistCard extends PharmacistRow {
  nextSlot: string | null
  licensed: string[] // country flags, e.g. ["🇹🇹"]
}

// Per-service presentation (CTA voice + footnote). Unknown slugs — services
// added later in the admin — get the neutral default automatically.
const SERVICE_VOICE: Record<string, { cta: string; note: string; flag?: string }> = {
  'quick-question': { cta: 'Ask your question →', note: 'Most people start here' },
  'standard-review': { cta: 'Book my review →', note: "Bring your pill bottles — that's all you need", flag: 'Most popular' },
  'comprehensive-review': { cta: 'Book the full hour →', note: 'Ideal after a hospital stay' },
}
const DEFAULT_VOICE = { cta: 'Book now →', note: 'Private video session' }

function money(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`
}

function nextSlotLabel(iso: string | null): string {
  if (!iso) return 'By appointment'
  const d = new Date(iso)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString()
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (same(d, today)) return `Today ${time}`
  if (same(d, tomorrow)) return `Tomorrow ${time}`
  return `${d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} ${time}`
}

async function sbGet<T>(path: string): Promise<T> {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, { headers: SB_HEADERS })
  if (!r.ok) throw new Error(`supabase ${r.status}`)
  return (await r.json()) as T
}

async function sbRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const r = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  if (!r.ok) throw new Error(`supabase rpc ${r.status}`)
  return (await r.json()) as T
}

function useLiveBookingData() {
  const [services, setServices] = useState<Service[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [pharmacists, setPharmacists] = useState<PharmacistCard[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const svcs = await sbGet<Service[]>(
          'consulting_services?active=eq.true&select=id,slug,name,description,price_cents,duration_min&order=position'
        )
        if (cancelled) return
        setServices(svcs)

        const [phs, serving, allCountries] = await Promise.all([
          sbGet<PharmacistRow[]>('consulting_pharmacists?active=eq.true&select=id,name,credentials,avatar_url,specialties&order=name'),
          sbGet<{ pharmacist_id: string; country: string }[]>('consulting_pharmacist_serving?select=pharmacist_id,country').catch(() => []),
          sbGet<{ code: string; flag: string }[]>('consulting_countries?select=code,flag').catch(() => []),
        ])
        if (cancelled) return
        const flagOf = Object.fromEntries(allCountries.map((c) => [c.code, c.flag]))
        const servedBy = (id: string) => serving.filter((r) => r.pharmacist_id === id).map((r) => flagOf[r.country] ?? r.country)
        // Show the people immediately; availability chips fill in as they load.
        setPharmacists(phs.map((p) => ({ ...p, nextSlot: null, licensed: servedBy(p.id) })))

        // Next real opening per pharmacist (shortest service = finest slots).
        const slotSvc = [...svcs].sort((a, b) => a.duration_min - b.duration_min)[0]
        if (!slotSvc) return
        const from = new Date().toISOString().slice(0, 10)
        const horizon = new Date()
        horizon.setDate(horizon.getDate() + 14)
        const to = horizon.toISOString().slice(0, 10)
        const cards = phs.map((p) => ({ ...p, nextSlot: null as string | null, licensed: servedBy(p.id) }))
        const withNext = await Promise.all(
          cards.map(async (p: PharmacistCard): Promise<PharmacistCard> => {
            try {
              const slots = await sbRpc<{ starts_at: string }[]>('consulting_get_open_slots', {
                p_pharmacist_id: p.id,
                p_service_id: slotSvc.id,
                p_from: from,
                p_to: to,
              })
              return { ...p, nextSlot: slots[0]?.starts_at ?? null }
            } catch {
              return { ...p, nextSlot: null }
            }
          })
        )
        if (!cancelled) setPharmacists(withNext)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [])

  return { services, pharmacists, failed }
}

function Tick({ color = AMBER_TEXT }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ── Booking module (lives in the hero) ───────────────────────────────────────

function BookingModule({ services, pharmacists, failed }: ReturnType<typeof useLiveBookingData>) {
  return (
    <div id="book" className="mt-10 rounded-2xl bg-white shadow-2xl overflow-hidden text-[hsl(200,25%,10%)] scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[hsl(40,20%,90%)]">
        <h2 className="text-xl" style={serif}>Book your session now</h2>
        <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(168,40%,80%)] bg-[hsl(168,45%,95%)] px-3 py-1 text-xs font-semibold text-[hsl(168,60%,26%)]">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Booking open
        </span>
      </div>

      {failed ? (
        <div className="p-8 text-center space-y-3">
          <p className="font-semibold">Live pricing is loading slowly right now.</p>
          <p className="text-sm text-[hsl(200,10%,45%)]">Everything is still bookable — current prices and times are on the booking page.</p>
          <a
            href={`${CONSULTING_APP_URL}/book`}
            className="inline-flex h-11 items-center justify-center rounded-lg px-7 text-sm font-bold text-white"
            style={{ backgroundColor: AMBER }}
          >
            Book a consultation →
          </a>
        </div>
      ) : services === null ? (
        <div className="grid sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 space-y-3 border-b sm:border-b-0 sm:border-r last:border-0 border-[hsl(40,20%,92%)]">
              <div className="h-4 w-32 rounded bg-[hsl(40,20%,93%)] animate-pulse" />
              <div className="h-9 w-20 rounded bg-[hsl(40,20%,93%)] animate-pulse" />
              <div className="h-12 rounded bg-[hsl(40,20%,95%)] animate-pulse" />
              <div className="h-11 rounded-lg bg-[hsl(40,20%,93%)] animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3">
          {services.map((s) => {
            const voice = SERVICE_VOICE[s.slug] ?? DEFAULT_VOICE
            return (
              <div
                key={s.id}
                className={`relative flex flex-col gap-2.5 p-6 border-b sm:border-b-0 sm:border-r last:border-0 border-[hsl(40,20%,92%)] ${voice.flag ? 'bg-[hsl(35,78%,96%)]' : ''}`}
              >
                {voice.flag && (
                  <span
                    className="absolute top-3.5 right-3.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: AMBER }}
                  >
                    {voice.flag}
                  </span>
                )}
                <p className="font-bold">{s.name}</p>
                <p className="text-4xl" style={serif}>
                  {money(s.price_cents)}
                  <span className="ml-1.5 text-xs font-normal text-[hsl(200,10%,55%)]" style={{ fontFamily: 'inherit' }}>
                    <span className="font-sans">USD · {s.duration_min} min</span>
                  </span>
                </p>
                <p className="flex-1 text-sm text-[hsl(200,10%,45%)] leading-relaxed">{s.description}</p>
                <a
                  href={`${CONSULTING_APP_URL}/book?service=${s.slug}`}
                  className="flex h-11 items-center justify-center rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: AMBER }}
                >
                  {voice.cta}
                </a>
                <p className="text-center text-[11px] text-[hsl(200,10%,58%)]">{voice.note}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Pharmacists strip — real people, real next openings */}
      {pharmacists && pharmacists.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 border-t border-[hsl(40,20%,92%)] bg-[hsl(40,25%,97%)] px-6 py-4">
          <span className="text-[13px] text-[hsl(200,10%,45%)]">Your pharmacists:</span>
          {pharmacists.map((p) => (
            <a
              key={p.id}
              href={`${CONSULTING_APP_URL}/pharmacists/${p.id}`}
              className="flex items-center gap-2.5 rounded-full border border-[hsl(40,20%,88%)] bg-white py-1.5 pl-1.5 pr-4 transition-all hover:border-[hsl(35,78%,60%)] hover:shadow-sm"
            >
              {p.avatar_url ? (
                <img src={p.avatar_url} alt={p.name} className="h-9 w-9 rounded-full object-cover object-[50%_20%]" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(168,60%,32%)] text-xs font-bold text-white">
                  {p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
              )}
              <span className="leading-tight">
                <span className="block text-[13px] font-bold">
                  {p.name}
                  {p.licensed.length > 0 && <span className="ml-1" title="Licensed jurisdictions">{p.licensed.join(" ")}</span>}
                </span>
                <span className="block text-[11px] text-[hsl(168,60%,30%)]">
                  {(p.specialties ?? []).slice(0, 2).join(' · ') || p.credentials || 'Licensed pharmacist'}
                </span>
              </span>
              <span className="ml-1 border-l border-[hsl(40,20%,88%)] pl-2.5 text-[10.5px] leading-tight text-[hsl(200,10%,55%)]">
                Next<br />
                <b className="text-[11.5px] text-[hsl(168,60%,28%)]">{nextSlotLabel(p.nextSlot)}</b>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    q: 'Can I take my pressure tablets with bush tea?',
    a: 'Some herbal teas genuinely interact with blood-pressure medicines. A pharmacist can tell you which ones — for your exact tablets.',
    ask: 'quick-question',
  },
  {
    q: 'Mummy came home from hospital with six new pills. Which ones does she still take?',
    a: 'The month after discharge is when mix-ups happen most. One session sorts the new list against the old one.',
    ask: 'standard-review',
  },
  {
    q: 'Why do I feel dizzy since they changed my tablets?',
    a: 'It might be the dose, the timing, or how two medicines meet. A pharmacist can spot it — and give you the exact question to bring to your doctor.',
    ask: 'quick-question',
  },
]

const STEPS = [
  {
    title: 'Pick a time that suits you',
    desc: 'Choose your session above and take any open slot — evenings and weekends included.',
  },
  {
    title: 'Tell us about your medicines',
    desc: 'A short form before your call — your pill bottles or pharmacy printout is all you need. Only your pharmacist ever sees it.',
  },
  {
    title: 'Talk it through, keep it in writing',
    desc: 'A private video call with your pharmacist, then a written summary in your inbox — schedule, flags, and questions for your doctor.',
  },
]

export default function Consulting() {
  const live = useLiveBookingData()

  const askPrice = (slug: string): string => {
    const s = live.services?.find((x) => x.slug === slug)
    return s ? `${money(s.price_cents)}` : ''
  }
  const minPrice = live.services?.length
    ? money(Math.min(...live.services.map((s) => s.price_cents)))
    : null

  return (
    <div className="min-h-screen bg-[hsl(40,30%,98%)] pb-16 sm:pb-0">
      <Nav />

      {/* ── Hero: the page IS the booking ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(30,20%,8%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[4%] h-96 w-96 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: AMBER }} />
          <div className="absolute -bottom-32 right-[3%] h-96 w-96 rounded-full bg-[hsl(168,60%,25%)] opacity-15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-7 w-1 rounded-full" style={{ backgroundColor: AMBER }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: AMBER_TEXT }}>
              Pixopharm Consulting
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl" style={serif}>
            Like having a pharmacist <em className="not-italic" style={{ color: AMBER_TEXT }}>in the family.</em>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            Sit down over private video with a registered Caribbean pharmacist who knows your medicines, your
            programmes — CDAP, NHF — and your questions. Ask anything. Leave with answers in writing.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/55">
            {['Registered Caribbean pharmacists', 'Private video call — nothing to install', 'Written summary after every session'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Tick /> {t}</li>
            ))}
          </ul>

          <BookingModule {...live} />
        </div>
      </section>

      {/* ── Every question is a good question ─────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-3xl text-[hsl(200,25%,10%)] sm:text-4xl" style={serif}>
          Every question is a good question.
        </h2>
        <p className="mt-3 text-[hsl(200,10%,45%)]">
          The ones below get asked every day — and every one of them deserved a real answer.
        </p>
        <div className="mt-9 grid gap-4 text-left sm:grid-cols-3">
          {QUESTIONS.map((item) => (
            <a
              key={item.q}
              href={`${CONSULTING_APP_URL}/book?service=${item.ask}`}
              className="group flex flex-col gap-3 rounded-2xl border border-[hsl(40,20%,90%)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <p className="text-lg leading-snug text-[hsl(200,25%,12%)]" style={serif}>
                <span style={{ color: AMBER }}>“</span>{item.q}<span style={{ color: AMBER }}>”</span>
              </p>
              <p className="flex-1 text-sm leading-relaxed text-[hsl(200,10%,45%)]">{item.a}</p>
              <span className="text-sm font-bold group-hover:underline" style={{ color: AMBER_DEEP }}>
                {item.ask === 'quick-question' ? `Ask${askPrice('quick-question') ? ` for ${askPrice('quick-question')}` : ''} →` : `Book a review${askPrice('standard-review') ? ` — ${askPrice('standard-review')}` : ''} →`}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="border-y border-[hsl(40,20%,90%)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl text-[hsl(200,25%,10%)]" style={serif}>
            Booked to answered in three steps
          </h2>
          <p className="mt-2 text-center text-[hsl(200,10%,45%)]">
            No account to create. No app to install. Just you and your pharmacist.
          </p>
          <div className="mt-10 grid gap-7 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: AMBER }}>
                  {i + 1}
                </div>
                <h3 className="mb-1.5 font-semibold text-[hsl(200,25%,10%)]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[hsl(200,10%,45%)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ─────────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(30,20%,8%)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl leading-tight text-white" style={serif}>
              A pharmacist who knows <em className="not-italic" style={{ color: AMBER_TEXT }}>this</em> region.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              A pharmacist abroad has never worked with CDAP in Trinidad, the NHF in Jamaica, or the Barbados Drug
              Service. Ours practise inside the Caribbean healthcare system every day — that context isn't extra,
              it's the whole point.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold" style={{ color: AMBER_TEXT }}>Our privacy promise:</p>
              <p className="mt-1 text-sm leading-relaxed text-white/65">
                Exactly one person sees your health information — the pharmacist you booked. Not our admin team, not
                anyone else. The database itself enforces it.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            {[
              { t: 'Registered pharmacists only', d: 'Every session is with a licensed, registered pharmacist — credentials on file, never an algorithm.' },
              { t: 'Complementary care, not a replacement', d: 'We work alongside your doctor and your pharmacy — and send you to them with better questions.' },
              { t: 'A written plan you keep', d: 'Every consultation ends with a personal medication summary emailed to you.' },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-[14.5px] font-bold text-white">{x.t}</p>
                <p className="mt-0.5 text-[13.5px] text-white/55">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[hsl(35,60%,85%)] bg-[hsl(35,78%,95%)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl text-[hsl(200,25%,10%)] sm:text-4xl" style={serif}>
            {minPrice ? <>{minPrice} and fifteen minutes.<br />One less thing to worry about.</> : <>Fifteen minutes.<br />One less thing to worry about.</>}
          </h2>
          <p className="mt-3 text-[hsl(200,10%,45%)]">
            Your first question is the hardest one to ask. After that, it's just a conversation.
          </p>
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="mt-7 inline-flex h-[52px] items-center justify-center rounded-xl px-9 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: AMBER }}
          >
            Book my session{minPrice ? ` — from ${minPrice}` : ''}
          </a>
          <p className="mt-3 text-xs text-[hsl(200,10%,58%)]">
            Private video call · registered Caribbean pharmacists · written summary included
          </p>
        </div>
      </section>

      <Footer />

      {/* Sticky mobile book bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-[hsl(40,20%,88%)] bg-white px-4 py-2.5 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] sm:hidden" style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}>
        <span className="text-[13px] text-[hsl(200,10%,45%)]">
          Sessions{minPrice ? <> from <b className="text-[15px] text-[hsl(200,25%,10%)]">{minPrice}</b></> : ''}
        </span>
        <a
          href="#book"
          onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="rounded-lg px-6 py-2.5 text-sm font-bold text-white"
          style={{ backgroundColor: AMBER }}
        >
          Book now
        </a>
      </div>
    </div>
  )
}
