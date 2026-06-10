import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function PillIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(168,60%,32%)]">
      <path d="m10.5 1.5 3 3-8 8-3-3a4.24 4.24 0 0 1 0-6 4.24 4.24 0 0 1 6 0Z" transform="translate(4,4) scale(0.9)"/>
      <path d="m13.5 4.5-8 8 3 3a4.24 4.24 0 0 0 6 0 4.24 4.24 0 0 0 0-6Z" transform="translate(4,4) scale(0.9)"/>
      <line x1="11.2" y1="8.8" x2="12.8" y2="10.2" transform="translate(4,4) scale(0.9)"/>
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/academy', label: 'Academy', activeColor: 'hsl(168,60%,32%)' },
  { to: '/curriculum', label: 'Curriculum', activeColor: 'hsl(168,60%,32%)' },
  { to: '/labs', label: 'Labs', activeColor: 'hsl(220,68%,40%)' },
  { to: '/consulting', label: 'Consulting', activeColor: 'hsl(35,78%,40%)' },
  { to: '/about', label: 'About', activeColor: 'hsl(200,25%,10%)' },
]

export default function Nav() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[hsl(180,15%,88%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <PillIcon />
          <span className="text-base font-bold tracking-tight text-[hsl(200,25%,10%)]">PIXOPHARM</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname.startsWith(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-[hsl(200,25%,10%)]"
                style={{ color: isActive ? link.activeColor : 'hsl(200,10%,42%)' }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA — Sign In to Academy */}
        <div className="hidden md:block">
          <a href="https://academy.pixopharm.com" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-medium">
              Sign In
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-[hsl(200,10%,40%)] hover:text-[hsl(200,25%,10%)] hover:bg-[hsl(180,15%,95%)] transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-[hsl(180,15%,88%)] bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2.5 text-sm font-medium text-[hsl(200,10%,35%)] hover:text-[hsl(200,25%,10%)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[hsl(180,15%,92%)]">
            <a href="https://academy.pixopharm.com" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="w-full bg-[hsl(168,60%,32%)] hover:bg-[hsl(168,60%,26%)] text-white font-medium">
                Sign In to Academy
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
