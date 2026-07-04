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

const DIVISIONS = [
  {
    label: 'Pixopharm Academy',
    color: 'hsl(168,60%,32%)',
    copy: 'Our Academy delivers competency-based training designed to prepare Pharmacy Technicians for excellence in modern healthcare environments. Our programs combine evidence-based learning, practical application, regulatory awareness, and patient-centred care to equip learners with the knowledge and confidence needed to thrive in community, hospital, and specialized pharmacy settings.',
  },
  {
    label: 'Pixopharm Labs',
    color: 'hsl(220,68%,40%)',
    copy: 'Through our Labs, we explore innovation in pharmacy practice, healthcare technology, digital transformation, artificial intelligence, pharmacovigilance, patient safety, and workforce development. We create space for the development of practical solutions that improve healthcare delivery across the Caribbean.',
  },
  {
    label: 'Pixopharm Consulting',
    color: 'hsl(35,78%,40%)',
    copy: 'Our Consulting division partners with pharmacies, healthcare organizations, educational institutions, and industry stakeholders to strengthen operational performance, regulatory compliance, workforce capability, quality systems, and organizational development. We provide strategic guidance in curriculum development, competency frameworks, SOP development, healthcare operations, leadership development, and continuous quality improvement.',
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
              className="text-4xl sm:text-6xl lg:text-[4rem] text-white leading-[1.05]"
              style={serif}
            >
              Advancing the pharmacy profession —{' '}
              <em className="not-italic" style={{ color: 'hsl(168,60%,55%)' }}>
                across the Caribbean.
              </em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
              We are a Caribbean-based healthcare education and professional development platform dedicated to advancing the pharmacy profession through high-quality education, practical skills development, and industry collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ecosystem: three divisions ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20">

          <div className="space-y-4 md:pt-1">
            <Label>Our ecosystem</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
              One platform. Three integrated divisions.
            </h2>
            <div className="w-10 h-0.5 rounded-full bg-[hsl(168,60%,45%)]" />
          </div>

          <div className="space-y-6">
            <p className="text-[hsl(200,10%,38%)] leading-relaxed text-[1.05rem]">
              Our ecosystem brings together three integrated divisions—Academy, Labs, and Consulting—to support pharmacy technicians, healthcare professionals, employers, and healthcare organizations in building a competent, future-ready workforce.
            </p>

            <div className="space-y-4 pt-2">
              {DIVISIONS.map(d => (
                <div
                  key={d.label}
                  className="rounded-xl border border-[hsl(180,15%,90%)] p-5 sm:p-6 space-y-2 hover:shadow-sm transition-shadow"
                  style={{ borderLeftWidth: '3px', borderLeftColor: d.color }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: d.color }}>
                    {d.label}
                  </p>
                  <p className="text-sm sm:text-[0.95rem] text-[hsl(200,10%,42%)] leading-relaxed">{d.copy}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Leadership — dark editorial ───────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <div
            className="text-[9rem] sm:text-[12rem] leading-none opacity-10 select-none -mb-8 sm:-mb-12"
            style={{ ...serif, color: 'hsl(168,60%,55%)', lineHeight: 1 }}
            aria-hidden
          >
            Rx
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-20 relative">

            <div className="space-y-4 md:pt-1">
              <Label color="hsl(168,60%,55%)">Leadership</Label>
              <h2 className="text-2xl sm:text-3xl text-white leading-snug" style={serif}>
                Grounded in real-world practice.
              </h2>
            </div>

            <div className="space-y-6 text-white/55 leading-relaxed text-[1.05rem]">
              <p>
                The platform is led by an experienced pharmacy and healthcare executive whose career spans healthcare operations, pharmacy education, workforce development, pharmaceutical industry engagement, compliance, and patient safety. This multidisciplinary experience informs every program, framework, and solution we develop, ensuring they are grounded in real-world practice and aligned with evolving healthcare standards.
              </p>
              <p>
                Our approach is built on the belief that exceptional patient care begins with well-trained, confident, and ethically grounded healthcare professionals. We are committed to fostering lifelong learning, professional excellence, interdisciplinary collaboration, and innovation while preparing the Caribbean pharmacy workforce for the future of healthcare.
              </p>
              <p>
                Whether you are beginning your journey as a Pharmacy Technician, advancing your professional skills, or seeking organizational solutions to strengthen healthcare delivery, our mission is to empower individuals and institutions through education, innovation, and operational excellence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

          <div className="rounded-2xl border border-[hsl(180,15%,90%)] p-7 sm:p-9 space-y-4" style={{ borderTopWidth: '3px', borderTopColor: 'hsl(168,60%,38%)' }}>
            <Label>Our Vision</Label>
            <p className="text-xl sm:text-2xl text-[hsl(200,25%,12%)] leading-snug" style={serif}>
              To become the Caribbean's leading platform for pharmacy education, healthcare innovation, and workforce development, transforming patient care through knowledge, technology, and professional excellence.
            </p>
          </div>

          <div className="rounded-2xl border border-[hsl(180,15%,90%)] p-7 sm:p-9 space-y-4" style={{ borderTopWidth: '3px', borderTopColor: 'hsl(35,78%,45%)' }}>
            <Label color="hsl(35,78%,40%)">Our Mission</Label>
            <p className="text-xl sm:text-2xl text-[hsl(200,25%,12%)] leading-snug" style={serif}>
              To develop competent, confident, and compassionate healthcare professionals through accessible education, practical training, innovative solutions, and strategic partnerships that support Pharmacists and ultimately improve healthcare outcomes across the Caribbean.
            </p>
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
                Built for the full Caribbean.
              </h2>
            </div>

            <div className="space-y-5">
              <p className="text-[hsl(200,10%,40%)] leading-relaxed">
                Our content is grounded in the regulatory frameworks and drug programmes of Trinidad & Tobago, Jamaica, and Barbados, and we are committed to expanding our coverage as we grow. If you practise pharmacy, study pharmacy, or need pharmaceutical guidance anywhere in the Caribbean, PIXOPHARM was built with you in mind.
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
                Empowering individuals and institutions.
              </h2>
              <p className="text-white/60 max-w-lg leading-relaxed">
                The Academy is open now. Labs and Consulting are growing. Everything we build is built for the Caribbean pharmacy workforce — and we are just getting started.
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
