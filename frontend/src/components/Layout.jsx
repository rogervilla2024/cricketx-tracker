import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../../../../shared-core/components/footer/Footer'
import GAME_CONFIG from '../config/gameConfig'
import { SchemaMarkup } from '../../../../shared-core/components/SchemaMarkup'


// Game configuration for SEO
const GAME_SEO = {
  name: 'Cricket X',
  provider: 'SmartSoft',
  rtp: 97,
  domain: 'cricketxtracker.com',
  maxMultiplier: '10,000x',
  description: 'Real-time Cricket X statistics tracker with live multiplier data, RTP analysis, and historical patterns.'
}

function Layout({ children, connected, connectionStatus, summary }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cricket-darker">
      {/* Schema.org SEO Markup */}
      <SchemaMarkup game={GAME_SEO} />

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-cricket-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="text-3xl">&#127951;</div>
              <div>
                <span className="text-xl font-bold gradient-text block">Cricket X Tracker</span>
                <span className="text-xs text-slate-400">3-bet cricket crash analytics</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/what-is-cricket-x/" className="text-slate-400 hover:text-green-400 transition-colors">What is Cricket X?</Link>
              <Link to="/cricket-x-statistics/" className="text-slate-400 hover:text-green-400 transition-colors">Statistics</Link>
              <Link to="/cricket-x-strategies/" className="text-slate-400 hover:text-green-400 transition-colors">Strategies</Link>
              <Link to="/cricket-x-casinos/" className="text-slate-400 hover:text-green-400 transition-colors">Casinos</Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Demo Button */}
              <a
                href={GAME_CONFIG.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold text-sm transition-all"
              >
                <span>&#127951;</span>
                <span>Play Demo</span>
              </a>

              {/* Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                connected ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                <span className="hidden sm:inline">{connectionStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}

      {/* Responsible Gambling Banner */}
      <div className="bg-amber-900/30 border-y border-amber-600/30 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-amber-200">
            <span className="font-semibold">Play Responsibly:</span> Gambling can be addictive. If you or someone you know has a gambling problem, please call the helpline:
            <span className="font-mono ml-2">India: 1800-599-0019</span> |
            <span className="font-mono ml-2">UK: 0808-8020-133</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer
        gameName="Cricket X"
        gameEmoji="🏏"
        domain="cricketxtracker.com"
        primaryColor="#1e3a5f"
        botUsername="CricketXTrackerBot"
        rtp={97}
        provider="SmartSoft Gaming"
      />
    </div>
  )
}

export default Layout
