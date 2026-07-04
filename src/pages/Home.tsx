import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" }

// ─── Small reusable pieces ────────────────────────────────────────────────────

function Label({ children, color = 'hsl(168,60%,55%)' }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
      {children}
    </p>
  )
}

function Check({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ─── Hero right-side: stacked product tiles ───────────────────────────────────

function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] lg:h-[480px] select-none pointer-events-none">

      {/* Labs tile — top right, behind */}
      <div
        className="absolute top-6 right-4 w-48 h-56 rounded-2xl border p-5 flex flex-col justify-between shadow-xl"
        style={{
          transform: 'rotate(7deg)',
          backgroundColor: 'hsl(220,40%,12%)',
          borderColor: 'hsl(220,68%,28%)',
          zIndex: 1,
        }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(220,68%,60%)' }}>Pixopharm Labs</p>
          <p className="text-white/80 font-semibold text-sm leading-snug" style={serif}>Live sessions with Caribbean pharmacists</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-white/35 flex items-center gap-1.5"><span style={{ color: 'hsl(220,68%,50%)' }}>◆</span> Max 12 students</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Coming Soon</p>
        </div>
      </div>

      {/* Consulting tile — bottom left, behind */}
      <div
        className="absolute bottom-10 left-2 w-44 h-52 rounded-2xl border p-5 flex flex-col justify-between shadow-xl"
        style={{
          transform: 'rotate(-5deg)',
          backgroundColor: 'hsl(35,40%,10%)',
          borderColor: 'hsl(35,78%,28%)',
          zIndex: 2,
        }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(35,78%,60%)' }}>Pixopharm Consulting</p>
          <p className="text-white/80 font-semibold text-sm leading-snug" style={serif}>1:1 medication management sessions</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-white/35 flex items-center gap-1.5"><span style={{ color: 'hsl(35,78%,50%)' }}>◆</span> Any medication</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Coming Soon</p>
        </div>
      </div>

      {/* Academy tile — front, largest, centred */}
      <div
        className="absolute top-1/2 left-1/2 w-56 h-64 rounded-2xl border p-6 flex flex-col justify-between shadow-2xl"
        style={{
          transform: 'translate(-50%, -50%) rotate(-2deg)',
          backgroundColor: 'hsl(168,40%,11%)',
          borderColor: 'hsl(168,60%,30%)',
          zIndex: 3,
        }}
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(168,60%,55%)' }}>Pixopharm Academy</p>
            <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ backgroundColor: 'hsl(168,60%,18%)', color: 'hsl(168,60%,60%)' }}>Live</span>
          </div>
          <p className="text-white font-semibold text-base leading-snug" style={serif}>Learn. Practice. Certify.</p>
          <p className="text-white/45 text-xs mt-2 leading-relaxed">Caribbean-contextualised pharmacy education</p>
        </div>
        <div className="space-y-2">
          {['8-domain diploma', '28+ courses', '320+ lessons'].map(s => (
            <p key={s} className="text-xs text-white/40 flex items-center gap-1.5">
              <Check color="hsl(168,60%,45%)" />
              {s}
            </p>
          ))}
        </div>
      </div>

      {/* Decorative glow behind tiles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'hsl(168,60%,32%)', zIndex: 0 }} />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-8 items-center">

            {/* Left: copy */}
            <div className="space-y-7">
              <Label>Caribbean Pharmacy Platform</Label>

              <h1
                className="text-5xl sm:text-6xl lg:text-[4.2rem] text-white leading-[1.05]"
                style={serif}
              >
                The Caribbean<br />
                finally has a<br />
                pharmacy platform<br />
                <em className="not-italic" style={{ color: 'hsl(168,60%,55%)' }}>of its own.</em>
              </h1>

              <p className="text-white/55 text-lg leading-relaxed max-w-md">
                Online courses, live expert training, and personal medication consulting — all built around this region, its regulations, and the people who live and work here.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="https://academy.pixopharm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-semibold text-sm text-white transition-colors"
                  style={{ backgroundColor: 'hsl(168,60%,32%)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,27%)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,32%)')}
                >
                  Start Learning in the Academy
                </a>
                <Link
                  to="/academy"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-medium text-sm text-white/75 hover:text-white border border-white/15 hover:border-white/25 hover:bg-white/5 transition-all"
                >
                  See All Three Products
                </Link>
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-2 border-t border-white/10">
                {[
                  { n: '8', l: 'learning domains' },
                  { n: '28+', l: 'courses' },
                  { n: '206', l: 'modules' },
                  { n: '320+', l: 'lessons' },
                ].map(s => (
                  <div key={s.l} className="flex items-baseline gap-1.5">
                    <span className="text-white font-bold text-lg">{s.n}</span>
                    <span className="text-white/35 text-xs">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual */}
            <div className="hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Academy — hero panel */}
        <div className="rounded-2xl overflow-hidden mb-5">
          <div className="grid md:grid-cols-[2fr_3fr]">
            {/* Left: dark teal */}
            <div className="bg-[hsl(168,55%,18%)] p-8 sm:p-10 flex flex-col justify-between min-h-[260px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Label color="hsl(168,60%,65%)">Pixopharm Academy</Label>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'hsl(168,60%,28%)', color: 'hsl(168,60%,70%)' }}>Live Now</span>
                </div>
                <h2 className="text-3xl sm:text-4xl text-white leading-tight" style={serif}>
                  Learn. Practice.<br />Certify.
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                  Home of the Caribbean Pharmacy Technician Diploma — an 8-domain journey from foundations to certification, plus clinical electives. All grounded in the region.
                </p>
              </div>
              <div className="mt-8 flex flex-col items-start gap-3">
                <a
                  href="https://academy.pixopharm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[hsl(168,60%,25%)] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[hsl(168,60%,96%)] transition-colors"
                >
                  Open Academy →
                </a>
                <Link
                  to="/curriculum"
                  className="text-sm font-medium text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
                >
                  View the full curriculum
                </Link>
              </div>
            </div>

            {/* Right: white feature grid */}
            <div className="bg-white border border-[hsl(180,15%,90%)] p-8 sm:p-10 grid sm:grid-cols-2 gap-x-8 gap-y-5 content-start">
              {[
                { title: 'Caribbean-first content', desc: 'CDAP, NHF, Barbados Drug Service in every lesson' },
                { title: 'Spaced-repetition flashcards', desc: 'SM-2 algorithm — study smarter, not longer' },
                { title: 'Branching scenarios', desc: 'Real clinical decisions, not multiple choice only' },
                { title: "Bloom's Taxonomy aligned", desc: 'From recall to evaluation — real clinical reasoning' },
                { title: 'One verifiable diploma', desc: 'The Caribbean Pharmacy Technician Diploma — share with employers and licensing bodies' },
                { title: 'Institution dashboard', desc: 'Student tracking, analytics, course management' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0" style={{ color: 'hsl(168,60%,32%)' }}>
                    <Check color="hsl(168,60%,32%)" />
                  </span>
                  <div>
                    <p className="font-semibold text-[hsl(200,25%,10%)] text-sm">{item.title}</p>
                    <p className="text-[hsl(200,10%,48%)] text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Labs + Consulting — secondary row */}
        <div className="grid md:grid-cols-2 gap-5">

          <Link to="/labs" className="group rounded-2xl border border-[hsl(180,15%,90%)] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 block">
            <div className="h-1" style={{ backgroundColor: 'hsl(220,68%,40%)' }} />
            <div className="p-7 space-y-4">
              <div className="flex items-start justify-between">
                <Label color="hsl(220,68%,45%)">Pixopharm Labs</Label>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(200,10%,52%)] bg-[hsl(180,15%,94%)] px-2.5 py-1 rounded-full">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
                Where knowledge becomes skill.
              </h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">
                Live Zoom sessions with expert Caribbean pharmacists. Dispensing, patient counselling, CDAP and NHF workshops. Capped at 12 students because your learning matters.
              </p>
              <p className="text-sm font-medium group-hover:underline" style={{ color: 'hsl(220,68%,40%)' }}>
                Learn more →
              </p>
            </div>
          </Link>

          <Link to="/consulting" className="group rounded-2xl border border-[hsl(180,15%,90%)] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 block">
            <div className="h-1" style={{ backgroundColor: 'hsl(35,78%,45%)' }} />
            <div className="p-7 space-y-4">
              <div className="flex items-start justify-between">
                <Label color="hsl(35,78%,42%)">Pixopharm Consulting</Label>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(200,10%,52%)] bg-[hsl(180,15%,94%)] px-2.5 py-1 rounded-full">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-[hsl(200,25%,10%)] leading-snug" style={serif}>
                Understand your medications, finally.
              </h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">
                Confused about what you're taking or when? One-to-one with a Caribbean pharmacist who reviews your full medication list and gives you a clear written plan.
              </p>
              <p className="text-sm font-medium group-hover:underline" style={{ color: 'hsl(35,78%,42%)' }}>
                Learn more →
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* ── About — editorial pull quote ──────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          {/* Decorative quote mark */}
          <div
            className="text-[10rem] sm:text-[14rem] leading-none mb-0 -mb-8 sm:-mb-14 opacity-20 select-none"
            style={{ ...serif, color: 'hsl(168,60%,45%)', lineHeight: 1 }}
            aria-hidden
          >
            &#8220;
          </div>

          {/* Pull quote */}
          <blockquote
            className="text-2xl sm:text-3xl lg:text-4xl text-white/90 leading-snug max-w-4xl"
            style={{ ...serif, fontStyle: 'italic' }}
          >
            Caribbean pharmacy professionals have been ignored by global platforms for too long.
          </blockquote>

          <div className="mt-10 max-w-2xl space-y-5 border-l-2 border-[hsl(168,60%,35%)] pl-6">
            <p className="text-white/55 leading-relaxed">
              When you study pharmacy in the Caribbean, you're handed textbooks written for the UK or the US. You learn about systems that bear no resemblance to CDAP, NHF, or the Barbados Drug Service. Then you graduate and try to do the job — and realise you've spent years preparing for a system that doesn't exist in your country.
            </p>
            <p className="text-white/55 leading-relaxed">
              PIXOPHARM was built to close that gap. Not adapted from somewhere else. Written here, for here. Three products. One platform. All Caribbean.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who it's for — editorial numbered list ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10">
          <Label color="hsl(168,60%,38%)">Who it's for</Label>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]" style={serif}>
            Built for every stage of a Caribbean pharmacy career.
          </h2>
        </div>

        <div className="divide-y divide-[hsl(180,15%,90%)]">
          {[
            {
              n: '01',
              audience: 'Pharmacy Students',
              headline: "Your lectures don't cover enough. We do.",
              desc: "Interactive content aligned to what Caribbean pharmacy boards and employers actually look for — not textbooks written for other countries.",
              color: 'hsl(168,60%,32%)',
            },
            {
              n: '02',
              audience: 'Pre-Registration Interns',
              headline: 'Fill the gaps before your assessment.',
              desc: "Labs fills the competencies your placement doesn't cover, with documented sign-off you can add to your internship portfolio.",
              color: 'hsl(220,68%,40%)',
            },
            {
              n: '03',
              audience: 'Practicing Pharmacists',
              headline: 'The regulations changed. Keep up.',
              desc: 'CDAP was updated. New drugs entered the NHF formulary. Academy and Labs keep you current in hours, not a full day off work.',
              color: 'hsl(168,60%,32%)',
            },
            {
              n: '04',
              audience: 'Patients Managing Medications',
              headline: "You shouldn't have to figure this out alone.",
              desc: "A qualified Caribbean pharmacist reviews your full medication list, explains what you're taking, and leaves you with a clear written plan.",
              color: 'hsl(35,78%,40%)',
            },
          ].map(item => (
            <div
              key={item.n}
              className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_220px_1fr] gap-x-6 md:gap-x-10 py-7 items-start hover:bg-[hsl(180,20%,99%)] transition-colors -mx-4 px-4"
            >
              <span className="text-sm font-bold tabular-nums pt-0.5" style={{ color: 'hsl(200,10%,62%)' }}>
                {item.n}
              </span>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: item.color }}>
                  {item.audience}
                </p>
                <p className="font-semibold text-[hsl(200,25%,10%)] text-sm leading-snug">{item.headline}</p>
              </div>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed col-start-2 md:col-start-auto mt-2 md:mt-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Caribbean specifics ───────────────────────────────────────────── */}
      <section className="border-t border-b border-[hsl(180,15%,90%)] bg-[hsl(180,20%,97%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-[hsl(200,10%,52%)]">Built around</p>
              <p className="text-lg font-bold text-[hsl(200,25%,10%)] mt-0.5" style={serif}>Caribbean healthcare systems</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'CDAP', sub: 'T&T' },
                { label: 'NHF', sub: 'Jamaica' },
                { label: 'Barbados Drug Service', sub: 'Barbados' },
                { label: 'Pharmacy Board of T&T', sub: 'Regulation' },
                { label: 'Pharmacy Council of Jamaica', sub: 'Licensing' },
                { label: 'CARICOM', sub: 'Regional' },
              ].map(item => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[hsl(180,15%,88%)] hover:border-[hsl(168,60%,60%)] hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-semibold text-[hsl(200,25%,10%)]">{item.label}</span>
                  <span className="text-xs text-[hsl(200,10%,52%)]">· {item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA — left-aligned on teal ───────────────────────────── */}
      <section style={{ backgroundColor: 'hsl(168,60%,28%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">

            <div className="space-y-5">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl"
                style={serif}
              >
                Caribbean pharmacy has waited long enough.
              </h2>
              <p className="text-white/60 max-w-lg leading-relaxed">
                The Academy is open now. Labs and Consulting are on the way. Every product was built by people who understand what it means to practise pharmacy in this region.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://academy.pixopharm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-white font-semibold text-sm transition-colors"
                  style={{ color: 'hsl(168,60%,25%)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,96%)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  Start with the Academy
                </a>
                <Link
                  to="/academy"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-medium text-sm text-white/80 hover:text-white border border-white/25 hover:border-white/40 hover:bg-white/10 transition-all"
                >
                  See Everything →
                </Link>
              </div>
            </div>

            {/* Right: decorative stat */}
            <div className="hidden md:block text-right shrink-0">
              <p className="text-[5rem] lg:text-[7rem] font-bold text-white/10 leading-none tabular-nums" style={serif}>320</p>
              <p className="text-white/30 text-xs uppercase tracking-widest mt-1">lessons</p>
              <p className="text-white/15 text-xs uppercase tracking-widest">Caribbean-built</p>
            </div>

          </div>

          <p className="mt-10 text-white/20 text-xs">
            No US textbooks. No UK drug references. No content that forgets where you live.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
