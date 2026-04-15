import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'

// ── Jane App booking URL — replace with your actual Jane clinic URL ────────────
// Get this from: Jane App → Settings → Setup → Online Booking → copy the URL
// It looks like: https://pixopharm.janeapp.com
const JANE_BOOKING_URL = 'https://pixopharm.janeapp.com'

// Set to true once your Jane account is live and the URL above is correct
const BOOKING_LIVE = false

// Accent colour for Consulting throughout this page
const AMBER = 'hsl(35,78%,40%)'
const AMBER_BG = 'hsl(35,78%,94%)'
const AMBER_LIGHT = 'hsl(35,78%,60%)'

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="m9 14 2 2 4-4"/>
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
      <path d="m9 16 2 2 4-4"/>
    </svg>
  )
}

const PROBLEMS = [
  "Prescribed five or more medications without a clear understanding of each one's purpose or indication",
  "Multiple prescribers have contributed to your regimen, and no comprehensive review of the complete list has been conducted",
  "Uncertain about the correct administration timing, dietary requirements, or dosing schedule for one or more of your medications",
  "Concerned about potential interactions between two or more prescribed or over-the-counter products",
  "Recently discharged from hospital with new prescriptions that have not been reconciled against your existing medications",
  "Responsible for managing a family member's medication regimen without a clear, structured framework",
]

const WHAT_HAPPENS = [
  {
    step: '01',
    title: 'Book your appointment',
    desc: 'Choose your pharmacist, select an available time, and confirm your booking. You will receive an email confirmation with everything you need.',
  },
  {
    step: '02',
    title: 'Submit your medication record',
    desc: 'Provide a complete list of your current medications, including all prescriptions, supplements, and over-the-counter products. Photographs, pharmacy printouts, or a written list are all acceptable.',
  },
  {
    step: '03',
    title: 'Structured medication review',
    desc: 'Your pharmacist conducts a thorough assessment of each item — its indication, correct dosing schedule, contraindications, and clinical considerations. All questions are addressed in full.',
  },
  {
    step: '04',
    title: 'Receive your written medication plan',
    desc: 'Following the consultation, you receive a personalised medication summary: a structured daily schedule, documented interaction alerts, and a list of clinical questions to raise at your next prescriber appointment.',
  },
]

const WHO_FOR = [
  {
    title: 'Patients managing chronic conditions',
    desc: 'Chronic conditions such as diabetes, hypertension, cardiac disease, or asthma frequently involve complex, multi-drug regimens. A structured medication review ensures every item is properly understood and appropriately managed.',
    detail: 'Particularly relevant for CDAP-enrolled patients in Trinidad & Tobago and NHF beneficiaries in Jamaica.',
    icon: <HeartIcon />,
  },
  {
    title: 'Patients prescribed multiple medications',
    desc: 'Patients prescribed five or more medications — particularly across multiple prescribers — face a significantly elevated risk of adverse drug interactions. A comprehensive pharmacist review identifies and addresses these risks.',
    detail: 'The risk of adverse drug events increases with each additional medication. Most patients on five or more drugs have never had a formal medication review.',
    icon: <ClipboardIcon />,
  },
  {
    title: 'Recently discharged from hospital',
    desc: 'Hospital discharge frequently introduces new medications alongside existing ones, creating reconciliation complexity. A structured post-discharge review supports a safe, well-managed transition.',
    detail: 'Medication errors are most prevalent in the 30 days following hospital discharge. A consultation during this period materially reduces that risk.',
    icon: <AlertIcon />,
  },
  {
    title: 'Caregivers managing a family member\'s medications',
    desc: 'Caregivers who oversee a family member\'s medication regimen carry significant clinical responsibility. A consultation provides a clear structured overview of all medications and a practical management framework.',
    detail: 'Available for patients who are unable to attend in person — a caregiver or appointed representative may attend on their behalf.',
    icon: <CalendarIcon />,
  },
]

// ── Booking section ───────────────────────────────────────────────────────────

function BookingWidget() {
  if (!BOOKING_LIVE) {
    return (
      <div className="rounded-2xl border border-[hsl(35,78%,80%)] bg-white p-10 text-center space-y-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: AMBER_BG }}>
          <CalendarIcon />
        </div>
        <p className="font-semibold text-[hsl(200,25%,10%)]">Booking opens very soon</p>
        <p className="text-sm text-[hsl(200,10%,48%)] max-w-sm mx-auto leading-relaxed">
          Our pharmacists are being onboarded now. You will be able to choose your pharmacist and book directly from this page within days.
        </p>
        <p className="text-xs text-[hsl(200,10%,60%)]">No account required. Secure online booking powered by Jane.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-[hsl(35,78%,75%)] shadow-sm">
      <iframe
        src={JANE_BOOKING_URL}
        title="Book a Pixopharm Consultation"
        width="100%"
        height="700"
        style={{ border: 'none', display: 'block' }}
        allow="payment"
        loading="lazy"
      />
      <div className="bg-[hsl(35,78%,97%)] border-t border-[hsl(35,78%,88%)] px-5 py-3 text-center">
        <p className="text-xs text-[hsl(200,10%,52%)]">
          Having trouble booking?{' '}
          <a
            href={JANE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[hsl(35,78%,35%)] transition-colors"
            style={{ color: AMBER }}
          >
            Open in a new tab →
          </a>
        </p>
      </div>
    </div>
  )
}

export default function Consulting() {
  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(30,20%,8%)]">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-10 left-[6%] w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse-glow" style={{ backgroundColor: AMBER }} />
          <div className="absolute top-32 right-[12%] w-48 h-48 rounded-full bg-[hsl(168,60%,25%)] blur-3xl opacity-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: AMBER }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(35,78%,65%)' }}>
                Pixopharm Consulting
              </span>
            </div>

            {BOOKING_LIVE ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now Booking
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Opening Soon
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Understand your medications —<br />
              <span style={{ color: 'hsl(35,78%,65%)' }}>and take them with confidence.</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed">
              Private, one-to-one consultations with a qualified Caribbean pharmacist. Present your complete medication record, and your pharmacist will conduct a thorough review — covering the indication, administration, interactions, and clinical considerations for each item, and preparing you with the right questions for your prescriber.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {BOOKING_LIVE ? (
                <>
                  <a
                    href="#booking"
                    onClick={scrollToBooking}
                    className="inline-flex items-center justify-center h-11 px-6 rounded-lg font-medium text-sm text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: AMBER }}
                  >
                    Book a Consultation
                  </a>
                  <a
                    href={JANE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-lg font-medium text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/35 hover:bg-white/5 transition-all"
                  >
                    Open booking in new tab →
                  </a>
                </>
              ) : (
                <a
                  href="#booking"
                  onClick={scrollToBooking}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg font-medium text-sm text-white opacity-70 transition-opacity"
                  style={{ backgroundColor: AMBER }}
                >
                  Booking Opens Soon
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ───────────────────────────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-b border-[hsl(180,15%,90%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              Does any of this apply to you?
            </h2>
            <p className="mt-3 text-[hsl(200,10%,45%)]">
              Medication-related uncertainty is more common than most patients acknowledge — and in the majority of cases, it is entirely preventable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {PROBLEMS.map((problem, i) => (
              <div key={i} className="bg-white rounded-xl border border-[hsl(180,15%,90%)] p-4 flex items-start gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: AMBER }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
                <p className="text-sm text-[hsl(200,10%,38%)] leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[hsl(200,10%,48%)]">
            A single structured consultation with a qualified pharmacist can address each of these directly.
          </p>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">How a consultation works</h2>
          <p className="mt-3 text-[hsl(200,10%,45%)] max-w-md mx-auto">
            Four steps. One session. A structured, actionable plan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_HAPPENS.map((step, i) => (
            <div key={i} className="relative space-y-3">
              {i < WHAT_HAPPENS.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(100%-8px)] w-full h-px z-0" style={{ backgroundColor: 'hsl(35,78%,85%)' }} />
              )}
              <div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: AMBER }}
              >
                {step.step}
              </div>
              <h3 className="font-semibold text-sm text-[hsl(200,25%,10%)]">{step.title}</h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking ───────────────────────────────────────────────────────── */}
      <section id="booking" className="bg-[hsl(35,78%,97%)] border-t border-b border-[hsl(35,78%,88%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">

          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              {BOOKING_LIVE ? 'Book your consultation' : 'Booking opens soon'}
            </h2>
            {BOOKING_LIVE ? (
              <p className="text-[hsl(200,10%,45%)] max-w-sm mx-auto">
                Choose your pharmacist and a time that suits you. Consultations are conducted privately via video call.
              </p>
            ) : (
              <p className="text-[hsl(200,10%,45%)] max-w-sm mx-auto">
                We are onboarding our pharmacists now. Booking will open directly on this page — no external accounts required.
              </p>
            )}
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {[
              'Private video consultation',
              'Registered pharmacists only',
              'Written report included',
              'Secure booking via Jane',
            ].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-[hsl(200,10%,45%)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                {t}
              </span>
            ))}
          </div>

          <BookingWidget />

          <p className="mt-4 text-center text-xs text-[hsl(200,10%,58%)]">
            Booking is managed securely through{' '}
            <a href="https://jane.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsl(35,78%,35%)]" style={{ color: AMBER }}>
              Jane App
            </a>
            . Your information is never shared.
          </p>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="bg-[hsl(30,20%,8%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Who we help
            </h2>
            <p className="mt-3 text-white/50 max-w-md mx-auto">
              Any patient managing medications in the Caribbean — whether your own regimen or that of someone in your care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {WHO_FOR.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3 hover:bg-white/8 transition-colors">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'hsla(35,78%,40%,0.2)', color: AMBER_LIGHT }}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-white/35 leading-relaxed border-t border-white/10 pt-3">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Pixopharm ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              Why a qualified Caribbean pharmacist?
            </h2>
            <p className="text-[hsl(200,10%,40%)] leading-relaxed">
              A pharmacist practising in the US or UK has no working knowledge of the CDAP formulary, the National Health Fund in Jamaica, or the Barbados Drug Service. They cannot advise on local generic substitutions, regional drug availability, or the specific programmes your prescriptions may be drawn from.
            </p>
            <p className="text-[hsl(200,10%,40%)] leading-relaxed">
              Our consulting pharmacists are active practitioners within the Caribbean healthcare system. That clinical context is not supplementary to their expertise — it is the foundation of it.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Caribbean healthcare context', desc: 'CDAP, NHF, Barbados Drug Service, local formularies, regional drug availability — understood from within the system, not from the outside looking in.' },
              { title: 'Registered pharmacists only', desc: 'Every consultation is conducted by a registered pharmacist. You receive expert clinical guidance — not an algorithm.' },
              { title: 'Written report provided', desc: 'Each consultation concludes with a written medication summary: a structured daily schedule, documented interaction flags, and prepared questions for your prescriber.' },
              { title: 'Strictly private and confidential', desc: 'Your medication record is sensitive clinical information. All consultations are conducted one-to-one and are never disclosed or shared.' },
            ].map((item, i) => (
              <Card key={i} className="border-[hsl(180,15%,90%)] bg-white hover:shadow-sm hover:border-[hsl(35,78%,70%)] transition-all">
                <CardContent className="p-4 flex items-start gap-3">
                  <span className="shrink-0 mt-0.5" style={{ color: AMBER }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-[hsl(200,25%,10%)]">{item.title}</p>
                    <p className="text-sm text-[hsl(200,10%,48%)] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[hsl(180,15%,90%)]" style={{ backgroundColor: AMBER_BG }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center space-y-5">
          {BOOKING_LIVE ? (
            <>
              <h2 className="text-2xl font-bold text-[hsl(200,25%,10%)]">
                Ready to get clarity on your medications?
              </h2>
              <p className="text-[hsl(200,10%,45%)] max-w-md mx-auto">
                Choose your pharmacist and book a time that suits you. Your consultation is private, structured, and ends with a written plan you can act on immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#booking"
                  onClick={scrollToBooking}
                  className="inline-flex items-center justify-center h-11 px-7 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: AMBER }}
                >
                  Book a Consultation
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-lg font-medium text-sm border text-[hsl(35,78%,35%)] hover:bg-white transition-colors"
                  style={{ borderColor: 'hsl(35,78%,65%)' }}
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[hsl(200,25%,10%)]">
                Consultations are opening very soon.
              </h2>
              <p className="text-[hsl(200,10%,45%)] max-w-md mx-auto">
                Our pharmacists are being onboarded now. When booking goes live, you will be able to choose your pharmacist and schedule directly from this page.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div
                  className="inline-flex items-center justify-center h-11 px-7 rounded-lg text-white font-medium text-sm cursor-default opacity-75"
                  style={{ backgroundColor: AMBER }}
                >
                  Booking Opens Soon
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-lg font-medium text-sm border text-[hsl(35,78%,35%)] hover:bg-white transition-colors"
                  style={{ borderColor: 'hsl(35,78%,65%)' }}
                >
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
