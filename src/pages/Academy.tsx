import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'

function CheckIcon({ size = 15 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        <path d="m9 9.5 2 2 4-4"/>
      </svg>
    ),
    title: 'Caribbean-first content',
    desc: 'Every course is built around CDAP (T&T), NHF (Jamaica), Barbados Drug Service, local pharmacy law, and regional formularies. Not adapted from US textbooks — built from scratch.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 14v1"/><path d="M9 8v2"/><path d="M15 12v3"/><path d="M15 8v1"/>
      </svg>
    ),
    title: 'Interactive, not passive',
    desc: 'Spaced-repetition flashcards, branching scenario simulations, and inline knowledge checks. You apply knowledge, not just read it.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    ),
    title: "Bloom's Taxonomy aligned",
    desc: "Questions range from remember to evaluate — building real clinical reasoning, not memorisation. You'll be ready for real dispensary decisions, not just exams.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15l2 2 4-4"/>
      </svg>
    ),
    title: 'One verifiable diploma',
    desc: 'Complete the programme and earn the Caribbean Pharmacy Technician Diploma — a credential you can share with employers, licensing bodies, or add to your professional portfolio.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Built for institutions too',
    desc: 'Admin dashboard with student tracking, progress analytics, and course management — for pharmacy schools, employers, and training providers.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Learn on your schedule',
    desc: 'No fixed timetables. Access your courses any time, from any device. Pick up exactly where you left off.',
  },
]

const DOMAINS = [
  { icon: '🧭', name: 'Foundations & Learning Skills', color: '#0d8b7e' },
  { icon: '🫀', name: 'Human Body & Pharmacology', color: '#c2557a' },
  { icon: '⚙️', name: 'Operations, Systems & Technology', color: '#4d63c9' },
  { icon: '🧪', name: 'Calculations & Compounding', color: '#7a59c2' },
  { icon: '💬', name: 'Patient Care & Communication', color: '#c8743a' },
  { icon: '🛡️', name: 'Safety, Quality & Public Health', color: '#2f9163' },
  { icon: '⚖️', name: 'Caribbean Law, Ethics & Regulation', color: '#5a6b7b' },
  { icon: '🎓', name: 'Capstone & Certification', color: '#b8893a' },
]

const WHO_FOR = [
  {
    title: 'Aspiring Pharmacy Technicians',
    desc: 'Starting from zero? The diploma takes you from your first day of study to certification — no prior pharmacy experience required.',
  },
  {
    title: 'Pharmacy Assistants & Dispensary Staff',
    desc: 'Already working behind the counter? Turn your on-the-job experience into a structured, verifiable credential employers recognise.',
  },
  {
    title: 'Practicing Pharmacy Technicians',
    desc: 'Build the foundational knowledge your role demands. Understand the why behind every step in the dispensing process.',
  },
  {
    title: 'Career Changers',
    desc: 'Moving into healthcare? Pharmacy technician roles are in demand across the Caribbean — and this diploma is the structured pathway in.',
  },
]

export default function Academy() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-[hsl(168,60%,90%)] blur-3xl opacity-60 animate-pulse-glow" />
          <div className="absolute top-20 right-[10%] w-48 h-48 rounded-full bg-[hsl(38,90%,90%)] blur-3xl opacity-40 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 rounded-full bg-[hsl(168,60%,32%)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[hsl(168,60%,32%)]">Pixopharm Academy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-[hsl(200,25%,10%)]">
              One comprehensive diploma — built for Caribbean pharmacy.
            </h1>

            <p className="text-lg text-[hsl(200,10%,38%)] leading-relaxed">
              The Caribbean Pharmacy Technician Diploma: eight sequential learning domains plus a Clinical Therapeutics electives track, taking you from your first day of study to certification. Not adapted from US or UK curricula — written from scratch for our region.
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-sm text-[hsl(200,10%,45%)]">
              {['8 learning domains', '28+ courses', '206 modules', '320+ lessons'].map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className="text-[hsl(168,60%,32%)]"><CheckIcon /></span>
                  {s}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://academy.pixopharm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-11 px-6 rounded-lg bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-medium text-sm transition-colors"
              >
                Open Academy →
              </a>
              <Link
                to="/curriculum"
                className="inline-flex items-center h-11 px-6 rounded-lg border border-[hsl(168,60%,32%)] text-[hsl(168,60%,28%)] hover:bg-[hsl(168,60%,96%)] font-medium text-sm transition-colors"
              >
                View the Full Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-y border-[hsl(180,15%,90%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              Built for Caribbean pharmacy professionals
            </h2>
            <p className="mt-3 text-[hsl(200,10%,45%)] max-w-lg mx-auto">
              Not a generic LMS with Caribbean labels — every feature was designed from the ground up for this region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Card key={i} className="bg-white border-[hsl(180,15%,90%)] hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-11 h-11 rounded-lg bg-[hsl(168,60%,94%)] flex items-center justify-center text-[hsl(168,60%,32%)]">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-[hsl(200,25%,10%)] text-sm">{f.title}</h3>
                  <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Diploma journey ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">The Caribbean Pharmacy Technician Diploma</h2>
          <p className="mt-2 text-[hsl(200,10%,45%)] leading-relaxed">
            Everything in the Academy is one structured journey. Eight learning domains, completed in
            sequence, take you from foundations to certification — with optional Clinical Therapeutics
            electives along the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOMAINS.map((d, i) => (
            <Card key={d.name} className="border-[hsl(180,15%,90%)] overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1.5" style={{ backgroundColor: d.color }} />
              <CardContent className="p-5">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 rounded-lg grid place-items-center text-base text-white shrink-0"
                    style={{ backgroundColor: d.color }}
                    aria-hidden
                  >
                    {d.icon}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-[hsl(200,10%,52%)]">
                    Stage {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[hsl(200,25%,10%)] leading-snug">{d.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[hsl(180,15%,90%)] bg-[hsl(180,20%,98%)] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="w-9 h-9 rounded-lg grid place-items-center text-base text-white shrink-0" style={{ backgroundColor: '#a8497e' }} aria-hidden>🩺</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[hsl(200,25%,10%)]">Plus: Clinical Therapeutics electives</p>
            <p className="text-xs text-[hsl(200,10%,48%)] mt-0.5">
              Specialist Caribbean clinical topics — asthma, chronic disease, and more — you can take alongside the diploma.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/curriculum"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-medium text-sm transition-colors"
          >
            View the Full Curriculum →
          </Link>
          <a
            href="https://academy.pixopharm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-[hsl(168,60%,32%)] text-[hsl(168,60%,28%)] hover:bg-[hsl(168,60%,96%)] font-medium text-sm transition-colors"
          >
            Start Learning
          </a>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-t border-[hsl(180,15%,90%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              Built for Pharmacy Technicians — at every stage
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHO_FOR.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-[hsl(180,15%,90%)] p-5 space-y-2 hover:shadow-sm hover:border-[hsl(168,60%,70%)] transition-all">
                <div className="w-8 h-8 rounded-full bg-[hsl(168,60%,94%)] flex items-center justify-center text-[hsl(168,60%,32%)]">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-sm text-[hsl(200,25%,10%)]">{item.title}</h3>
                <p className="text-sm text-[hsl(200,10%,48%)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,10%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to start your diploma?</h2>
          <p className="text-white/60 max-w-md mx-auto">
            Create your account and begin Stage 1 today. The Caribbean Pharmacy Technician Diploma — on your terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://academy.pixopharm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-[hsl(168,60%,40%)] hover:bg-[hsl(168,60%,35%)] text-white font-medium text-sm transition-colors"
            >
              Open Pixopharm Academy →
            </a>
            <Link
              to="/curriculum"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-white/25 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 font-medium text-sm transition-all"
            >
              See the Full Curriculum
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
