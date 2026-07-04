// ============================================================================
// PIXOPHARM HOMEPAGE — Public Curriculum / Syllabus Page (Phase 4)
// Conversion-focused public version of the Academy "Learning Journey":
// 8 sequential domain stages + Clinical Therapeutics electives, rendered from
// live Supabase data (public-readable domains + published courses), with a
// static fallback so the page still reads well if the DB is unreachable.
// ============================================================================

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" }

const ACADEMY_URL = 'https://academy.pixopharm.com'
const GOLD = '#b8893a'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Domain {
  id: string
  name: string
  icon: string | null
  color: string | null
  order_index: number
}

interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  duration_weeks: number | null
  domain_id: string | null
  order: number
}

// ─── Static content (always rendered — also the offline fallback) ────────────

const FALLBACK_DOMAINS: Domain[] = [
  { id: 'f-1', name: 'Foundations & Learning Skills', icon: '🧭', color: '#0d8b7e', order_index: 1 },
  { id: 'f-2', name: 'Human Body & Pharmacology', icon: '🫀', color: '#c2557a', order_index: 2 },
  { id: 'f-3', name: 'Operations, Systems & Technology', icon: '⚙️', color: '#4d63c9', order_index: 3 },
  { id: 'f-4', name: 'Calculations & Compounding', icon: '🧪', color: '#7a59c2', order_index: 4 },
  { id: 'f-5', name: 'Patient Care & Communication', icon: '💬', color: '#c8743a', order_index: 5 },
  { id: 'f-6', name: 'Safety, Quality & Public Health', icon: '🛡️', color: '#2f9163', order_index: 6 },
  { id: 'f-7', name: 'Caribbean Law, Ethics & Regulation', icon: '⚖️', color: '#5a6b7b', order_index: 7 },
  { id: 'f-8', name: 'Capstone & Certification', icon: '🎓', color: GOLD, order_index: 8 },
  { id: 'f-9', name: 'Clinical Therapeutics (Electives)', icon: '🩺', color: '#a8497e', order_index: 9 },
]

// One-line, SEO-friendly description per stage — shown under each stage header.
const STAGE_BLURBS: Record<string, string> = {
  'Foundations & Learning Skills':
    'Start your pharmacy technician training with study skills, medical terminology, and the fundamentals of Caribbean pharmacy practice.',
  'Human Body & Pharmacology':
    "Anatomy, physiology, and how medicines work — the science behind every prescription you'll handle.",
  'Operations, Systems & Technology':
    'Real pharmacy workflow: prescription processing, dispensing systems, inventory, and the technology behind the counter.',
  'Calculations & Compounding':
    'Master dosage calculations, dilutions, and sterile & non-sterile compounding — the maths of safe practice.',
  'Patient Care & Communication':
    'Professionalism, OTC advice boundaries, counselling skills, and emotional intelligence at the counter.',
  'Safety, Quality & Public Health':
    'Medication safety, error prevention, and the public-health role Caribbean pharmacies play in their communities.',
  'Caribbean Law, Ethics & Regulation':
    'CDAP, NHF, the Barbados Drug Service, pharmacy boards, and the laws that govern practice across the region.',
  'Capstone & Certification':
    'Integrated case simulations and certification exam preparation — finish ready to practise and ready to be assessed.',
  'Clinical Therapeutics (Electives)':
    'Specialist, Caribbean-focused clinical topics you can take alongside your diploma.',
}

// Used when live counts are unavailable (RLS, network) — real totals at build time.
const FALLBACK_STATS = { courses: 28, modules: 206, lessons: 320 }

function isElectiveDomain(d: Domain): boolean {
  return d.name.toLowerCase().includes('elective')
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Curriculum() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [moduleCount, setModuleCount] = useState<number | null>(null)
  const [lessonCount, setLessonCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  // SEO — title + meta description for "pharmacy technician course Caribbean"
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Caribbean Pharmacy Technician Diploma — Full Curriculum | Pixopharm'

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDescription = meta?.content ?? null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content =
      'The full syllabus of the Caribbean Pharmacy Technician Diploma: 8 sequential learning domains, 28+ online courses, and Clinical Therapeutics electives — pharmacy technician training built for Trinidad & Tobago, Jamaica, Barbados, and the wider Caribbean.'

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== null) meta.content = prevDescription
    }
  }, [])

  // Data — domains + published courses (required), module/lesson counts (optional)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [domainsRes, coursesRes, modulesRes, lessonsRes] = await Promise.all([
          supabase.from('domains').select('id,name,icon,color,order_index').order('order_index'),
          supabase
            .from('courses')
            .select('id,title,slug,description,duration_weeks,domain_id,order')
            .eq('status', 'published')
            .order('order'),
          supabase.from('modules').select('id', { count: 'exact', head: true }),
          supabase.from('lessons').select('id', { count: 'exact', head: true }),
        ])
        if (domainsRes.error) throw new Error(domainsRes.error.message)
        if (coursesRes.error) throw new Error(coursesRes.error.message)
        if (cancelled) return

        setDomains((domainsRes.data ?? []) as Domain[])
        setCourses((coursesRes.data ?? []) as Course[])
        // Counts are best-effort: ignore errors, keep fallbacks
        if (!modulesRes.error && modulesRes.count) setModuleCount(modulesRes.count)
        if (!lessonsRes.error && lessonsRes.count) setLessonCount(lessonsRes.count)
        setLoading(false)
      } catch {
        if (cancelled) return
        // Static fallback — the journey still renders with stage descriptions
        setDomains(FALLBACK_DOMAINS)
        setCourses([])
        setOffline(true)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const { coreStages, electives, stats } = useMemo(() => {
    const byDomain = new Map<string, Course[]>()
    courses.forEach(c => {
      if (!c.domain_id) return
      const arr = byDomain.get(c.domain_id) ?? []
      arr.push(c)
      byDomain.set(c.domain_id, arr)
    })
    byDomain.forEach(arr => arr.sort((a, b) => a.order - b.order))

    const ordered = [...domains].sort((a, b) => a.order_index - b.order_index)
    const hasCourses = courses.length > 0
    const coreStages = ordered
      .filter(d => !isElectiveDomain(d))
      .map(d => ({ domain: d, courses: byDomain.get(d.id) ?? [] }))
      .filter(s => !hasCourses || s.courses.length > 0)
    const electives = ordered
      .filter(isElectiveDomain)
      .flatMap(d => (byDomain.get(d.id) ?? []).map(c => ({ course: c, color: d.color ?? '#a8497e' })))

    const courseTotal = hasCourses ? courses.length : FALLBACK_STATS.courses
    const moduleTotal = moduleCount ?? FALLBACK_STATS.modules
    const lessonTotal = lessonCount ?? FALLBACK_STATS.lessons
    const hours = Math.max(1, Math.round((lessonTotal * 15) / 60))

    const stats: { n: string; l: string }[] = [
      { n: String(coreStages.length || 8), l: 'stages' },
      { n: `${courseTotal}${hasCourses ? '' : '+'}`, l: 'courses' },
      { n: String(moduleTotal), l: 'modules' },
      { n: String(lessonTotal), l: 'lessons' },
      { n: `~${hours}h`, l: 'of content' },
    ]
    return { coreStages, electives, stats }
  }, [domains, courses, moduleCount, lessonCount])

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[hsl(200,25%,8%)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'hsl(168,60%,55%)' }}>
              Pixopharm Academy · Full Curriculum
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08]" style={serif}>
              The Caribbean Pharmacy<br className="hidden sm:block" /> Technician Diploma
            </h1>

            <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
              One comprehensive pharmacy technician course built for the Caribbean. Eight sequential
              learning domains take you from your first day of study to certification — plus a
              Clinical Therapeutics electives track. Every lesson is grounded in CDAP, NHF, the
              Barbados Drug Service, and the realities of practising in this region.
            </p>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              {stats.map(s => (
                <div
                  key={s.l}
                  className="min-w-[88px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                >
                  <p className="text-xl font-bold text-white tabular-nums leading-none">{s.n}</p>
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">{s.l}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={ACADEMY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-semibold text-sm text-white transition-colors"
                style={{ backgroundColor: 'hsl(168,60%,32%)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,27%)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,32%)')}
              >
                Start the Diploma — Free to Sign Up
              </a>
              <Link
                to="/academy"
                className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-medium text-sm text-white/75 hover:text-white border border-white/15 hover:border-white/25 hover:bg-white/5 transition-all"
              >
                How the Academy Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey timeline ──────────────────────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-b border-[hsl(180,15%,90%)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]" style={serif}>
              Your learning journey, stage by stage
            </h2>
            <p className="mt-3 text-[hsl(200,10%,45%)] max-w-xl mx-auto">
              The diploma is one structured pathway. Complete the eight stages in order — each one
              builds on the last — then sit your certification with confidence.
            </p>
          </div>

          {offline && (
            <div className="mb-8 rounded-xl border border-[hsl(38,90%,80%)] bg-[hsl(38,90%,96%)] px-5 py-4 text-sm text-[hsl(38,70%,30%)]">
              We couldn't load the live course list right now — here's the diploma structure.
              The full, always-current syllabus is inside the{' '}
              <a href={ACADEMY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                Academy
              </a>.
            </div>
          )}

          {/* Start flag */}
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(168,60%,26%)]"
              style={serif}
            >
              <span className="w-8 h-px bg-[hsl(168,60%,40%)]" aria-hidden />
              Start here
              <span className="w-8 h-px bg-[hsl(168,60%,40%)]" aria-hidden />
            </span>
          </div>

          {loading ? (
            <div className="space-y-6" aria-label="Loading curriculum">
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-2xl border border-[hsl(180,15%,90%)] bg-white p-6 animate-pulse">
                  <div className="h-4 w-1/3 rounded bg-[hsl(180,15%,92%)]" />
                  <div className="mt-4 h-3 w-2/3 rounded bg-[hsl(180,15%,94%)]" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-[hsl(180,15%,94%)]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative pl-12 sm:pl-14">
              {/* Vertical connector line */}
              <div
                className="absolute left-[19px] sm:left-[23px] top-4 bottom-8 w-[3px] rounded-full"
                style={{ background: `linear-gradient(hsl(168,60%,32%), ${GOLD})` }}
                aria-hidden
              />

              {coreStages.map((stage, i) => (
                <div key={stage.domain.id} className="relative mb-7">
                  {/* Stage node */}
                  <div
                    className="absolute -left-12 sm:-left-14 top-1 w-10 h-10 sm:w-12 sm:h-12 rounded-xl grid place-items-center text-lg sm:text-xl text-white shadow-lg border-[3px] border-[hsl(180,20%,97%)]"
                    style={{ backgroundColor: stage.domain.color ?? 'hsl(168,60%,32%)' }}
                    aria-hidden
                  >
                    {stage.domain.icon ?? '📘'}
                    <span className="absolute -right-1.5 -bottom-1.5 w-5 h-5 rounded-full bg-[hsl(200,25%,10%)] text-white text-[11px] font-extrabold grid place-items-center border-2 border-[hsl(180,20%,97%)]">
                      {i + 1}
                    </span>
                  </div>

                  {/* Stage panel */}
                  <div className="rounded-2xl border border-[hsl(180,15%,90%)] bg-white shadow-sm overflow-hidden">
                    <div className="px-5 sm:px-6 py-4 border-b border-[hsl(180,15%,92%)]">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-bold text-[hsl(200,25%,10%)]" style={serif}>
                          {stage.domain.name}
                        </h3>
                        {stage.courses.length > 0 && (
                          <span className="text-xs font-bold text-[hsl(200,10%,50%)] tabular-nums whitespace-nowrap">
                            {stage.courses.length} course{stage.courses.length === 1 ? '' : 's'}
                          </span>
                        )}
                      </div>
                      {STAGE_BLURBS[stage.domain.name] && (
                        <p className="mt-1 text-sm text-[hsl(200,10%,45%)] leading-relaxed">
                          {STAGE_BLURBS[stage.domain.name]}
                        </p>
                      )}
                    </div>

                    {stage.courses.length > 0 ? (
                      <ul>
                        {stage.courses.map((course, ci) => (
                          <li
                            key={course.id}
                            className="flex items-start gap-3.5 px-5 sm:px-6 py-3.5 border-b border-[hsl(180,15%,94%)] last:border-b-0"
                          >
                            <span className="mt-0.5 w-6 h-6 shrink-0 rounded-md bg-[hsl(180,20%,96%)] text-[hsl(200,10%,50%)] text-[11px] font-extrabold grid place-items-center tabular-nums">
                              {ci + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-sm text-[hsl(200,25%,10%)] leading-snug">
                                {course.title}
                              </p>
                              {course.description && (
                                <p className="mt-0.5 text-xs text-[hsl(200,10%,48%)] leading-relaxed line-clamp-1">
                                  {course.description}
                                </p>
                              )}
                            </div>
                            {course.duration_weeks != null && (
                              <span className="mt-0.5 shrink-0 text-[11px] font-bold text-[hsl(200,10%,52%)] tabular-nums whitespace-nowrap">
                                {course.duration_weeks} wks
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-5 sm:px-6 py-4 text-sm text-[hsl(200,10%,48%)]">
                        See the full course list inside the Academy.
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Finish: diploma awarded */}
              <div className="relative">
                <div
                  className="absolute -left-12 sm:-left-14 top-1 w-10 h-10 sm:w-12 sm:h-12 rounded-xl grid place-items-center text-lg sm:text-xl text-white shadow-lg border-[3px] border-[hsl(180,20%,97%)]"
                  style={{ background: `linear-gradient(140deg, ${GOLD}, #9a6f28)` }}
                  aria-hidden
                >
                  🎓
                  <span className="absolute -right-1.5 -bottom-1.5 w-5 h-5 rounded-full bg-[hsl(200,25%,10%)] text-white text-[11px] font-extrabold grid place-items-center border-2 border-[hsl(180,20%,97%)]">
                    ★
                  </span>
                </div>
                <div
                  className="rounded-2xl border shadow-sm overflow-hidden"
                  style={{ borderColor: GOLD, background: 'linear-gradient(180deg, #fff8ea, #ffffff)' }}
                >
                  <div className="px-5 sm:px-6 py-5">
                    <h3 className="text-lg font-bold" style={{ ...serif, color: '#7a5615' }}>
                      Diploma Awarded
                    </h3>
                    <p className="mt-1 text-sm text-[hsl(200,10%,40%)] leading-relaxed">
                      Complete every stage and the capstone to earn your Caribbean Pharmacy
                      Technician Diploma — and sit the certification exam with confidence.
                    </p>
                    <a
                      href={ACADEMY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center h-10 px-5 rounded-lg bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-semibold text-sm transition-colors"
                    >
                      Begin Stage 1 →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Electives track ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#a8497e' }}>
            Optional Electives
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]" style={serif}>
            Clinical Therapeutics track
          </h2>
          <p className="mt-3 text-[hsl(200,10%,45%)] max-w-xl mx-auto">
            Specialist, Caribbean-focused clinical topics you can take alongside your diploma —
            from asthma and respiratory therapy to the conditions most common across the region.
          </p>
        </div>

        {electives.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {electives.map(({ course, color }) => (
              <div
                key={course.id}
                className="rounded-xl border border-[hsl(180,15%,90%)] bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderTop: `4px solid ${color}` }}
              >
                <h3 className="font-semibold text-sm text-[hsl(200,25%,10%)] leading-snug">{course.title}</h3>
                {course.description && (
                  <p className="mt-1.5 text-xs text-[hsl(200,10%,48%)] leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                )}
                {course.duration_weeks != null && (
                  <p className="mt-3 text-[11px] font-bold text-[hsl(200,10%,52%)] tabular-nums">
                    {course.duration_weeks} weeks
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-[hsl(200,10%,48%)]">
            {loading
              ? 'Loading electives…'
              : 'Elective courses are published regularly — browse the current list inside the Academy.'}
          </p>
        )}
      </section>

      {/* ── SEO prose — why this curriculum ───────────────────────────────── */}
      <section className="bg-[hsl(180,20%,97%)] border-t border-[hsl(180,15%,90%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]" style={serif}>
            A pharmacy technician course built for the Caribbean
          </h2>
          <div className="mt-6 space-y-5 text-[hsl(200,10%,40%)] leading-relaxed">
            <p>
              Most online pharmacy technician programmes are written for the United States or the
              United Kingdom. You learn insurance billing systems, drug schedules, and regulations
              that simply don't exist in Trinidad & Tobago, Jamaica, or Barbados. The Caribbean
              Pharmacy Technician Diploma was written from scratch for this region — CDAP, NHF,
              the Barbados Drug Service, regional formularies, and Caribbean pharmacy law are woven
              through every stage.
            </p>
            <p>
              The diploma is fully online and self-paced. Each course combines interactive lessons,
              spaced-repetition flashcards, branching clinical scenarios, and quizzes aligned to
              Bloom's Taxonomy — so you build real dispensary judgement, not just exam recall.
              Complete every stage of the journey and earn the Caribbean Pharmacy Technician
              Diploma — one verifiable credential that prepares you for pharmacy technician
              certification and real Caribbean practice.
            </p>
          </div>
          <ul className="mt-6 space-y-2.5">
            {[
              'Designed for aspiring and practicing pharmacy technicians and career changers across the Caribbean',
              'Study from any device, on your own schedule — no fixed timetables',
              'One verifiable diploma you can share with employers and licensing bodies',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[hsl(200,10%,38%)]">
                <svg
                  className="mt-0.5 shrink-0"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(168,60%,32%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'hsl(168,60%,28%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl text-white leading-tight" style={serif}>
            Stage 1 is waiting.
          </h2>
          <p className="text-white/60 max-w-md mx-auto leading-relaxed">
            Create your free account in the Academy and start Foundations & Learning Skills today —
            the first step toward your Caribbean Pharmacy Technician Diploma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={ACADEMY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-white font-semibold text-sm transition-colors"
              style={{ color: 'hsl(168,60%,25%)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(168,60%,96%)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
            >
              Start Learning Now
            </a>
            <Link
              to="/academy"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-medium text-sm text-white/80 hover:text-white border border-white/25 hover:border-white/40 hover:bg-white/10 transition-all"
            >
              More About the Academy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
