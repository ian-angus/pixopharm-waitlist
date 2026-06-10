import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'

// Accent colour for Labs throughout this page
const BLUE = 'hsl(220,68%,40%)'
const BLUE_BG = 'hsl(220,68%,94%)'

function ZoomIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z"/>
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function PlaybackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
  )
}

function BadgeCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}

const FORMAT_ITEMS = [
  {
    icon: <ZoomIcon />,
    title: 'Live via Zoom',
    desc: 'Every session is instructor-led in real time. You ask questions, work through problems, and get feedback — not a pre-recorded lecture you can ignore.',
  },
  {
    icon: <UsersIcon />,
    title: 'Maximum 12 students',
    desc: 'Small groups on purpose. You get noticed. You get called on. You get the kind of attention that turns knowledge into muscle memory.',
  },
  {
    icon: <PlaybackIcon />,
    title: 'Recorded for 30 days',
    desc: 'Can\'t make it live, or want to review a section? Every session is recorded and available to enrolled students for 30 days after it runs.',
  },
  {
    icon: <BadgeCheckIcon />,
    title: 'Skills sign-off',
    desc: 'Assessment sessions are available for pre-registration interns and technicians who need documented evidence of their practical competency.',
  },
]

const SESSIONS = [
  {
    category: 'Dispensary Skills',
    colour: BLUE,
    items: [
      'Prescription verification — catching errors before they reach the patient',
      'Dispensing workflows — label accuracy, quantity checks, record-keeping',
      'OTC product selection — guiding patients to the right choice',
    ],
  },
  {
    category: 'Patient Counselling',
    colour: 'hsl(168,60%,32%)',
    items: [
      'Live role-plays counselling patients on chronic disease medications',
      'Handling difficult conversations — adherence, side effects, cost concerns',
      'Counselling on CDAP and NHF programme drugs specifically',
    ],
  },
  {
    category: 'Regulatory Workshops',
    colour: 'hsl(35,78%,40%)',
    items: [
      'CDAP processing — step-by-step claim submission for T&T pharmacists',
      'NHF claims — Jamaican formulary, authorisation codes, claim workflows',
      'Barbados Drug Service — dispensing procedures and documentation',
    ],
  },
  {
    category: 'Clinical Calculations',
    colour: BLUE,
    items: [
      'Dosage calculations using Caribbean formulary drugs and local units',
      'IV fluid rates, compounding, paediatric and renal dose adjustments',
      'Timed practice sessions — building speed and accuracy under pressure',
    ],
  },
]

const WHO_FOR = [
  {
    audience: 'Pharmacy Students',
    desc: "Your practical training on campus only goes so far. Labs gives you supervised practice hours with real scenarios — so you arrive at your pre-registration internship ahead of the curve.",
    highlights: ['Dispensing practice', 'Patient counselling role-plays', 'Clinical calculation drills'],
  },
  {
    audience: 'Pre-Registration Interns',
    desc: "You're in your internship year and there are competencies you haven't covered yet. Labs fills those gaps with targeted sessions — and provides documented sign-off for your portfolio.",
    highlights: ['Skills assessment sessions', 'Portfolio-ready sign-off', 'Targeted gap-filling'],
  },
  {
    audience: 'Practicing Pharmacists',
    desc: "Regulations change. CDAP was updated. New drugs entered the NHF formulary. Labs keeps you current with hands-on workshops that don't require a full day away from work.",
    highlights: ['CDAP & NHF update sessions', 'New drug counselling practice', 'Flexible scheduling'],
  },
]

export default function Labs() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(220,30%,8%)]">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-12 left-[8%] w-64 h-64 rounded-full bg-[hsl(220,68%,30%)] opacity-25 blur-3xl animate-pulse-glow" />
          <div className="absolute top-24 right-[10%] w-48 h-48 rounded-full bg-[hsl(168,60%,25%)] opacity-15 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.8s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: BLUE }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(220,68%,70%)' }}>
                Pixopharm Labs
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Coming Soon
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Where pharmacy knowledge<br />
              becomes{' '}
              <span style={{ color: 'hsl(220,68%,70%)' }}>pharmacy skill.</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed">
              Live, instructor-led Zoom sessions with expert Caribbean pharmacists. Dispensing practice, patient counselling role-plays, and CDAP and NHF workshops — capped at 12 students so every person gets real feedback.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div
                className="inline-flex items-center h-11 px-6 rounded-lg font-medium text-sm cursor-default"
                style={{ backgroundColor: BLUE, color: 'white', opacity: 0.7 }}
              >
                Sessions Opening Soon
              </div>
              <Link
                to="/academy"
                className="inline-flex items-center h-11 px-6 rounded-lg font-medium text-sm border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Start with Academy in the meantime →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Format breakdown ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
            Small groups. Real instructors. Practical skills.
          </h2>
          <p className="mt-3 text-[hsl(200,10%,45%)] max-w-lg mx-auto">
            Most pharmacy training stops at the textbook. Labs doesn't.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FORMAT_ITEMS.map((item, i) => (
            <Card key={i} className="bg-white border-[hsl(180,15%,90%)] hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: BLUE_BG, color: BLUE }}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[hsl(200,25%,10%)] text-sm">{item.title}</h3>
                <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Sessions coverage ─────────────────────────────────────────────── */}
      <section className="bg-[hsl(220,30%,8%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The practical skills that come from doing, not reading.
            </h2>
            <p className="mt-3 text-white/50 max-w-lg mx-auto">
              Sessions are designed around the moments that matter in Caribbean pharmacy practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SESSIONS.map((session, i) => (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: session.colour }} />
                  <h3 className="font-semibold text-white text-sm">{session.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {session.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-white/60">
                      <span className="mt-0.5 shrink-0" style={{ color: session.colour }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            New session categories added regularly based on what Caribbean practitioners tell us they need most.
          </p>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
            Built for every stage of your Caribbean pharmacy career.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {WHO_FOR.map((item, i) => (
            <div key={i} className="rounded-xl border border-[hsl(180,15%,90%)] p-6 space-y-4 hover:shadow-md hover:border-[hsl(220,68%,75%)] transition-all">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: BLUE }}
              >
                {i + 1}
              </div>
              <h3 className="font-semibold text-[hsl(200,25%,10%)]">{item.audience}</h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-xs text-[hsl(200,10%,50%)]">
                    <span style={{ color: BLUE }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[hsl(180,15%,90%)]" style={{ backgroundColor: BLUE_BG }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center space-y-5">
          <h2 className="text-2xl font-bold text-[hsl(200,25%,10%)]">
            Labs is coming. Academy is open now.
          </h2>
          <p className="text-[hsl(200,10%,45%)] max-w-md mx-auto">
            While Labs is being built, the Academy has everything you need to learn Caribbean pharmacy at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://academy.pixopharm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-7 rounded-lg text-white font-medium text-sm transition-colors"
              style={{ backgroundColor: BLUE }}
            >
              Open Pixopharm Academy
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center h-11 px-7 rounded-lg font-medium text-sm border border-[hsl(220,68%,70%)] text-[hsl(220,68%,35%)] hover:bg-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
