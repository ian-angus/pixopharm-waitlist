import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" }

function Label({ children, color = 'hsl(168,60%,38%)' }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
      {children}
    </p>
  )
}

const PRINCIPLES = [
  {
    title: 'Practitioner-authored',
    desc: 'Every course, every session, and every consulting service was designed by Caribbean pharmacy professionals — not adapted from content built elsewhere.',
    n: '01',
  },
  {
    title: 'Region-specific, not region-labelled',
    desc: 'There is a difference between content that mentions CDAP and content that was built around CDAP. Ours was built around it.',
    n: '02',
  },
  {
    title: 'The full lifecycle',
    desc: 'We cover education, practical training, and patient care — because Caribbean pharmacy professionals need all three, and until now, nobody was providing any of them.',
    n: '03',
  },
]

const REGIONS = [
  'Trinidad & Tobago',
  'Jamaica',
  'Barbados',
  'St. Lucia',
  'Grenada',
  'Antigua & Barbuda',
  'St. Vincent & the Grenadines',
  'Dominica',
  'St. Kitts & Nevis',
  'Guyana',
  'Belize',
  'The Bahamas',
  'Curaçao',
  'And the wider Caribbean',
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="max-w-3xl space-y-6">
            <Label color="hsl(168,60%,55%)">About PIXOPHARM</Label>
            <h1
              className="text-5xl sm:text-6xl lg:text-[4rem] text-white leading-[1.05]"
              style={serif}
            >
              Built by Caribbean pharmacists.{' '}
              <em className="not-italic" style={{ color: 'hsl(168,60%,55%)' }}>
                For Caribbean pharmacists.
              </em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
              PIXOPHARM was built by a panel of pharmacy professionals from across the Caribbean — practitioners, educators, and clinicians who spent years working with tools that weren't built for where we live.
            </p>
          </div>
        </div>
      </section>

      {/* ── Origin story ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20">

          {/* Left: sticky label + headline */}
          <div className="space-y-4 md:pt-1">
            <Label>How we started</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
              We all saw the same gap. We just came from different islands.
            </h2>
            <div className="w-10 h-0.5 rounded-full bg-[hsl(168,60%,45%)]" />
          </div>

          {/* Right: story paragraphs */}
          <div className="space-y-6 text-[hsl(200,10%,38%)] leading-relaxed text-[1.05rem]">
            <p>
              Every pharmacist on our founding panel had the same experience. We studied from textbooks written for the UK or the US. We practised using references that didn't reflect CDAP, NHF, or the Barbados Drug Service. We trained students using content that described drug programmes that didn't exist in our hospitals, our community pharmacies, or our patients' lives. For years, we each worked around it — using what was available, filling in the gaps ourselves, explaining to students why the textbook says one thing and Caribbean practice says another.
            </p>
            <p>
              Eventually, the same question came up in the same conversation, from Trinidad to Jamaica to Barbados: why hasn't anyone built something for us? The answer, we decided, was that nobody was going to — unless we did it ourselves. PIXOPHARM is that decision made real.
            </p>
          </div>

        </div>
      </section>

      {/* ── Built by pharmacists — dark editorial ─────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          {/* Decorative large text */}
          <div
            className="text-[9rem] sm:text-[12rem] leading-none opacity-10 select-none -mb-8 sm:-mb-12"
            style={{ ...serif, color: 'hsl(168,60%,55%)', lineHeight: 1 }}
            aria-hidden
          >
            Rx
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20 relative">

            <div className="space-y-4 md:pt-1">
              <Label color="hsl(168,60%,55%)">The panel</Label>
              <h2 className="text-2xl sm:text-3xl text-white leading-snug" style={serif}>
                Not built by people who researched pharmacy. Built by pharmacists.
              </h2>
            </div>

            <div className="space-y-6 text-white/55 leading-relaxed text-[1.05rem]">
              <p>
                There is a difference between a platform designed by technologists who consulted Caribbean pharmacists — and a platform designed by Caribbean pharmacists who built the technology around what they know. PIXOPHARM is the second kind. Our founding panel brings together practitioners from community pharmacy, hospital pharmacy, and pharmacy education across the region. Every course topic, every lab session format, every consulting service was shaped by people who have stood at the dispensary counter, supervised pre-registration interns, and sat with patients trying to understand five medications at once.
              </p>
              <p>
                That practitioner-first approach means we build what the profession actually needs — not what looks impressive on a feature list. When we say our content reflects Caribbean practice, we mean it was written by people who practise here.
              </p>
            </div>

          </div>

          {/* Three principles */}
          <div className="mt-14 divide-y divide-white/10">
            {PRINCIPLES.map(p => (
              <div
                key={p.n}
                className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_200px_1fr] gap-x-6 md:gap-x-10 py-7"
              >
                <span className="text-sm font-bold tabular-nums text-white/25 pt-0.5">{p.n}</span>
                <h3 className="font-semibold text-white text-sm leading-snug">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed col-start-2 md:col-start-auto mt-2 md:mt-0">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20">

          <div className="space-y-4 md:pt-1">
            <Label>What we're here to do</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
              Caribbean pharmacy excellence, built from within.
            </h2>
            <div className="w-10 h-0.5 rounded-full bg-[hsl(168,60%,45%)]" />
          </div>

          <div className="space-y-5">
            <p className="text-[hsl(200,10%,38%)] leading-relaxed text-[1.05rem]">
              Our mission is straightforward: raise the standard of pharmacy practice and education across the Caribbean, using tools designed for this region by people who belong to it. That means training students on content that reflects their clinical reality. It means giving practicing pharmacists a way to stay current with the regulatory and formulary landscape they actually work in. And it means making expert pharmaceutical guidance accessible to patients across the region — not just to those who can afford to fly somewhere for an appointment.
            </p>
            <p className="text-[hsl(200,10%,38%)] leading-relaxed text-[1.05rem]">
              PIXOPHARM is how we deliver that mission, one product at a time.
            </p>

            {/* Three products summary */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Pixopharm Academy', desc: 'Foundational training — Caribbean-contextualised courses, certificates, and clinical reasoning.', color: 'hsl(168,60%,32%)' },
                { label: 'Pixopharm Labs', desc: 'Practical skill-building — live sessions with expert pharmacists, capped small groups.', color: 'hsl(220,68%,40%)' },
                { label: 'Pixopharm Consulting', desc: 'Patient care — 1:1 medication management for individuals managing complex regimens.', color: 'hsl(35,78%,40%)' },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[hsl(180,15%,90%)] p-5 space-y-2 hover:shadow-sm transition-shadow"
                  style={{ borderTopWidth: '3px', borderTopColor: item.color }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: item.color }}>
                    {item.label}
                  </p>
                  <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Region — tinted band ──────────────────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-y border-[hsl(180,15%,90%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20 items-start">

            <div className="space-y-3">
              <Label>Our region</Label>
              <h2 className="text-2xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
                From Trinidad to Jamaica to Barbados — and across the wider Caribbean.
              </h2>
            </div>

            <div className="space-y-5">
              <p className="text-[hsl(200,10%,40%)] leading-relaxed">
                We built PIXOPHARM for the Caribbean — and we mean the full Caribbean. Our content is grounded in the regulatory frameworks and drug programmes of Trinidad & Tobago, Jamaica, and Barbados. Our pharmacist panel includes practitioners from across the region, and we are committed to expanding our coverage as we grow. If you practise pharmacy, study pharmacy, or need pharmaceutical guidance anywhere in the Caribbean, PIXOPHARM was built with you in mind.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {REGIONS.map(r => (
                  <span
                    key={r}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[hsl(180,15%,88%)] text-sm text-[hsl(200,15%,30%)] font-medium hover:border-[hsl(168,60%,55%)] hover:shadow-sm transition-all"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'hsl(168,60%,28%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">

            <div className="space-y-5">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl"
                style={serif}
              >
                This platform is yours.<br />Start using it.
              </h2>
              <p className="text-white/60 max-w-lg leading-relaxed">
                The Academy is open now. Labs and Consulting are coming. Everything we build, we build for this region — and we are just getting started.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://academy.pixopharm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-white font-semibold text-sm transition-colors hover:bg-[hsl(168,60%,96%)]"
                  style={{ color: 'hsl(168,60%,25%)' }}
                >
                  Open Pixopharm Academy
                </a>
                <Link
                  to="/academy"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-medium text-sm text-white/80 hover:text-white border border-white/25 hover:border-white/40 hover:bg-white/10 transition-all"
                >
                  See All Three Products →
                </Link>
              </div>
            </div>

            {/* Decorative right */}
            <div className="hidden md:block text-right shrink-0 opacity-10 select-none" style={serif}>
              <p className="text-[6rem] lg:text-[8rem] font-bold text-white leading-none">Rx</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
