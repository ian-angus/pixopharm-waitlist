import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import './App.css'

const ISLANDS = [
  'Trinidad & Tobago', 'Jamaica', 'Barbados', 'The Bahamas', 'Guyana',
  'Suriname', 'St. Lucia', 'Antigua & Barbuda', 'Dominica', 'Grenada',
  'St. Vincent & the Grenadines', 'St. Kitts & Nevis', 'Belize',
  'Haiti', 'Dominican Republic', 'Curaçao', 'Aruba', 'Other'
]

const ROLES = [
  { value: 'student', label: 'Pharmacy Student' },
  { value: 'pharmacist', label: 'Practicing Pharmacist' },
  { value: 'technician', label: 'Pharmacy Technician' },
  { value: 'instructor', label: 'Instructor / Lecturer' },
  { value: 'institution', label: 'Institution / Organization' },
  { value: 'other', label: 'Other' },
]

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
    ),
    title: '2 Complete Courses',
    desc: 'Foundations of Pharmacy Practice and Pharmaceutical Calculations — 108 quiz questions across 7 question types.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 14v1"/><path d="M9 8v2"/><path d="M15 12v3"/><path d="M15 8v1"/></svg>
    ),
    title: 'Interactive Learning',
    desc: 'Spaced-repetition flashcards, branching scenario simulations, and inline knowledge checks with instant feedback.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>
    ),
    title: 'Caribbean Context',
    desc: 'Built for our region — CDAP (Trinidad), NHF (Jamaica), Barbados Drug Service, Caribbean currencies and regulations.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15l2 2 4-4"/></svg>
    ),
    title: 'Earn Certificates',
    desc: 'Complete courses and earn verifiable certificates to demonstrate your pharmaceutical knowledge.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
    ),
    title: "Bloom's Taxonomy Aligned",
    desc: 'Questions range from remember to evaluate — building real clinical reasoning, not just memorization.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: 'For Institutions Too',
    desc: 'Admin dashboard with student tracking, analytics, and course management for pharmacy schools and employers.',
  },
]

function PillIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(168,60%,32%)]">
      <path d="m10.5 1.5 3 3-8 8-3-3a4.24 4.24 0 0 1 0-6 4.24 4.24 0 0 1 6 0Z" transform="translate(4,4) scale(0.9)"/>
      <path d="m13.5 4.5-8 8 3 3a4.24 4.24 0 0 0 6 0 4.24 4.24 0 0 0 0-6Z" transform="translate(4,4) scale(0.9)"/>
      <line x1="11.2" y1="8.8" x2="12.8" y2="10.2" transform="translate(4,4) scale(0.9)"/>
    </svg>
  )
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    island: '',
    role: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.island || !formData.role) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const { error } = await supabase.from('waitlist').insert([
        {
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          island: formData.island,
          role: formData.role,
        },
      ])

      if (error) {
        if (error.code === '23505') {
          setErrorMsg('This email is already on the waiting list!')
          setStatus('error')
        } else {
          throw error
        }
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[hsl(180,15%,88%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PillIcon />
            <span className="text-lg font-semibold tracking-tight text-[hsl(200,25%,10%)]">
              PIXOPHARM
            </span>
          </div>
          <Badge variant="outline" className="text-xs font-medium border-[hsl(38,90%,55%)] text-[hsl(38,70%,40%)] bg-[hsl(38,90%,95%)]">
            Launching Soon
          </Badge>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[hsl(168,60%,90%)] blur-3xl animate-pulse-glow" />
          <div className="absolute top-40 right-[15%] w-48 h-48 rounded-full bg-[hsl(38,90%,90%)] blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(168,60%,95%)] text-[hsl(168,60%,28%)] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[hsl(168,60%,45%)] animate-pulse" />
                Caribbean Pharmacy Education
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-[hsl(200,25%,10%)]">
                Modern pharmacy
                <br />
                education for the
                <br />
                <span className="text-[hsl(168,60%,32%)]">Caribbean</span>
              </h1>

              <p className="text-lg text-[hsl(200,10%,38%)] max-w-md leading-relaxed">
                Interactive courses, real-world scenarios, and certifications built specifically for Caribbean pharmacy professionals. Learn at your own pace with content that reflects our region.
              </p>

              <div className="flex items-center gap-6 pt-2 text-sm text-[hsl(200,10%,45%)]">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(168,60%,32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  108 quiz questions
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(168,60%,32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  14 modules
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(168,60%,32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  7 question types
                </div>
              </div>
            </div>

            {/* Right: form */}
            <Card className="shadow-lg border-[hsl(180,15%,90%)] bg-white">
              <CardContent className="p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(168,60%,92%)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(168,60%,32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(200,25%,10%)]">You're on the list!</h3>
                    <p className="text-[hsl(200,10%,45%)]">
                      We'll notify you when PIXOPHARM launches. Check your inbox for a confirmation.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-semibold text-[hsl(200,25%,10%)]">Join the waiting list</h2>
                      <p className="text-sm text-[hsl(200,10%,45%)]">Be first to access PIXOPHARM when we launch.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Dr. Jane Smith"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@pharmacy.tt"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Island / Country</Label>
                        <Select value={formData.island} onValueChange={(v) => setFormData(prev => ({ ...prev, island: v }))}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select your location" />
                          </SelectTrigger>
                          <SelectContent>
                            {ISLANDS.map((island) => (
                              <SelectItem key={island} value={island}>{island}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">I am a...</Label>
                        <Select value={formData.role} onValueChange={(v) => setFormData(prev => ({ ...prev, role: v }))}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLES.map((role) => (
                              <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {status === 'error' && (
                        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{errorMsg}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full h-11 bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-medium"
                      >
                        {status === 'submitting' ? 'Joining...' : 'Join the Waiting List'}
                      </Button>

                      <p className="text-xs text-center text-[hsl(200,10%,55%)]">
                        No spam. We'll only email you about the launch.
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[hsl(180,20%,97%)] border-y border-[hsl(180,15%,90%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(200,25%,10%)]">
              Built for Caribbean pharmacy professionals
            </h2>
            <p className="mt-3 text-[hsl(200,10%,45%)] max-w-lg mx-auto">
              Not a generic LMS with Caribbean labels — every feature was designed from the ground up for our region's needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Card key={i} className="bg-white border-[hsl(180,15%,90%)] hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(168,60%,95%)] flex items-center justify-center text-[hsl(168,60%,32%)]">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-[hsl(200,25%,10%)]">{f.title}</h3>
                  <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-[hsl(180,15%,90%)] overflow-hidden">
            <div className="h-2 bg-[hsl(168,60%,32%)]" />
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-[hsl(168,60%,92%)] text-[hsl(168,60%,28%)] hover:bg-[hsl(168,60%,88%)]">Course 1</Badge>
              <h3 className="text-xl font-semibold text-[hsl(200,25%,10%)]">Foundations of Pharmacy Practice</h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">
                8 modules covering pharmacy law, ethics, dispensing, patient counselling, and professional practice in the Caribbean context.
              </p>
              <div className="flex gap-4 text-xs text-[hsl(200,10%,50%)]">
                <span>8 modules</span>
                <span>56 questions</span>
                <span>Certificate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[hsl(180,15%,90%)] overflow-hidden">
            <div className="h-2 bg-[hsl(38,90%,55%)]" />
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-[hsl(38,90%,92%)] text-[hsl(38,70%,35%)] hover:bg-[hsl(38,90%,88%)]">Course 2</Badge>
              <h3 className="text-xl font-semibold text-[hsl(200,25%,10%)]">Pharmaceutical Calculations & Dosage</h3>
              <p className="text-sm text-[hsl(200,10%,45%)] leading-relaxed">
                7 modules with 22 lessons on dosage calculations, compounding, dilutions, and infusion rates — using Caribbean drug formularies.
              </p>
              <div className="flex gap-4 text-xs text-[hsl(200,10%,50%)]">
                <span>7 modules</span>
                <span>52 questions</span>
                <span>Certificate</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA repeat */}
      <section className="bg-[hsl(200,25%,10%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to elevate your pharmacy practice?
          </h2>
          <p className="text-[hsl(200,15%,70%)] max-w-md mx-auto">
            Join the waiting list and be among the first Caribbean pharmacy professionals to access PIXOPHARM.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-11 px-8 bg-[hsl(168,60%,40%)] hover:bg-[hsl(168,60%,35%)] text-white font-medium"
          >
            Join the Waiting List
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(180,15%,90%)] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[hsl(200,10%,50%)]">
          <div className="flex items-center gap-2">
            <PillIcon />
            <span className="font-medium text-[hsl(200,25%,10%)]">PIXOPHARM</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Melyn Management Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
