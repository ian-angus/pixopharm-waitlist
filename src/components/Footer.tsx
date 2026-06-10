import { Link } from 'react-router-dom'

function PillIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(168,60%,40%)]">
      <path d="m10.5 1.5 3 3-8 8-3-3a4.24 4.24 0 0 1 0-6 4.24 4.24 0 0 1 6 0Z" transform="translate(4,4) scale(0.9)"/>
      <path d="m13.5 4.5-8 8 3 3a4.24 4.24 0 0 0 6 0 4.24 4.24 0 0 0 0-6Z" transform="translate(4,4) scale(0.9)"/>
      <line x1="11.2" y1="8.8" x2="12.8" y2="10.2" transform="translate(4,4) scale(0.9)"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[hsl(180,15%,90%)] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PillIcon />
              <span className="font-bold text-sm tracking-tight text-[hsl(200,25%,10%)]">PIXOPHARM</span>
            </div>
            <p className="text-xs text-[hsl(200,10%,50%)] leading-relaxed max-w-[180px]">
              The Caribbean's pharmacy platform — built for our region, by people who know it.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(200,10%,55%)]">Products</p>
            <ul className="space-y-2">
              <li>
                <Link to="/academy" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(168,60%,32%)] transition-colors">
                  Pixopharm Academy
                </Link>
              </li>
              <li>
                <Link to="/labs" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(220,68%,40%)] transition-colors">
                  Pixopharm Labs
                </Link>
              </li>
              <li>
                <Link to="/consulting" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(35,78%,40%)] transition-colors">
                  Pixopharm Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(200,10%,55%)]">Academy</p>
            <ul className="space-y-2">
              <li>
                <a href="https://academy.pixopharm.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(168,60%,32%)] transition-colors">
                  Sign In
                </a>
              </li>
              <li>
                <Link to="/curriculum" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(168,60%,32%)] transition-colors">
                  Full Curriculum
                </Link>
              </li>
              <li>
                <Link to="/academy" className="text-sm text-[hsl(200,10%,40%)] hover:text-[hsl(168,60%,32%)] transition-colors">
                  About the Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Region */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(200,10%,55%)]">Region</p>
            <ul className="space-y-2 text-sm text-[hsl(200,10%,40%)]">
              <li>Trinidad & Tobago</li>
              <li>Jamaica</li>
              <li>Barbados</li>
              <li>Caribbean-wide</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[hsl(180,15%,92%)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[hsl(200,10%,52%)]">
          <p>&copy; {new Date().getFullYear()} Melyn Management Inc. All rights reserved.</p>
          <p>Built for the Caribbean.</p>
        </div>
      </div>
    </footer>
  )
}
