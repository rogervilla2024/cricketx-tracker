import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import GAME_CONFIG from '../config/gameConfig'
import LiveFeed from '../components/LiveFeed'
import StatsCard from '../components/StatsCard'

const LoadingFallback = () => (
  <div className="card animate-pulse">
    <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
  </div>
)

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '&#127951;' },
  { id: 'analytics', label: 'Analytics', icon: '&#128200;' },
  { id: 'compare', label: 'Compare', icon: '&#9878;' },
]

function HomePage({ rounds, summary, distribution, recentRounds, loading, refetch }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <>
      {/* IPL Season Banner */}
      <div className="bg-gradient-to-r from-green-900/50 via-yellow-900/30 to-green-900/50 border-b border-green-600/30 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-green-200">
            <span className="text-yellow-400 font-bold">&#127942; IPL Season 2026!</span>
            <span className="ml-2">Track Cricket X stats while enjoying the matches. Play responsibly!</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700/30 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: tab.icon }}></span>
                {tab.label}
              </button>
            ))}

            <div className="w-px h-6 bg-slate-700/50 mx-2"></div>

            <Link
              to="/cricket-x-vs-aviator/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all whitespace-nowrap"
            >
              <span>&#9992;</span>
              <span className="hidden md:inline">vs Aviator</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="sr-only">Cricket X Statistics - Real-time Cricket Crash Game Analytics with 3-Bet System</h1>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <span>&#127951;</span> Live Scorecard
                </h2>
                <button onClick={refetch} disabled={loading} className="text-xs text-slate-400 hover:text-white">
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <StatsCard title="Total Overs" value={summary?.total_rounds?.toLocaleString() || '---'} icon="&#127951;" />
                <StatsCard title="Avg Score" value={summary?.avg_multiplier ? `${summary.avg_multiplier.toFixed(2)}x` : '---'} icon="&#128200;" color="green" />
                <StatsCard title="Median" value={summary?.median_multiplier ? `${summary.median_multiplier.toFixed(2)}x` : '---'} icon="&#9878;" color="purple" />
                <StatsCard title="Best Century" value={summary?.max_multiplier ? `${summary.max_multiplier.toFixed(2)}x` : '---'} icon="&#127942;" color="yellow" />
                <StatsCard title="Under 2x" value={summary?.under_2x_count?.toLocaleString() || '---'} subtitle="Singles only" icon="&#128683;" color="orange" />
                <StatsCard title="Over 10x" value={summary?.over_10x_count?.toLocaleString() || '---'} subtitle="Sixes!" icon="&#127919;" color="green" />
              </div>
            </section>

            {/* Game + Live Feed */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span>&#127951;</span> Play Cricket X
                    </h2>
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Free Demo</span>
                  </div>

                  <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900 pitch-pattern">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="text-8xl mb-4">&#127951;</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Cricket X by SmartSoft</h3>
                        <p className="text-green-200 mb-6 max-w-md">
                          Hit boundaries and score centuries! Cash out before you're out. Use all 3 bet slots for maximum strategy.
                        </p>

                        <a
                          href={GAME_CONFIG.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-xl shadow-2xl transition-all hover:scale-105"
                        >
                          <span className="text-2xl">&#127951;</span>
                          <span>Play Free Demo</span>
                        </a>

                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-green-200">
                            {GAME_CONFIG.rtp}% RTP
                          </span>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-green-200">
                            Up to {GAME_CONFIG.maxMultiplier.toLocaleString()}x
                          </span>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-yellow-300">
                            3 Bet Slots
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 text-center">
                    Opens official SmartSoft demo in new tab &bull; House edge: {GAME_CONFIG.houseEdge}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <LiveFeed rounds={rounds} />
              </div>
            </section>

            {/* 3-Bet Feature Highlight */}
            <section className="mb-6">
              <div className="card bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#127942;</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Unique 3-Bet System</h3>
                    <p className="text-sm text-slate-400">Cricket X allows up to 3 simultaneous bets per over</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-400 mb-2">Bet Slot 1 - Singles</h4>
                    <p className="text-sm text-slate-400">Conservative - Target 1.5x-2x for consistent singles</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-400 mb-2">Bet Slot 2 - Boundaries</h4>
                    <p className="text-sm text-slate-400">Balanced - Target 4x-6x for fours and sixes</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-400 mb-2">Bet Slot 3 - Centuries</h4>
                    <p className="text-sm text-slate-400">Aggressive - Target 100x+ for the big scores!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cricket Terminology Guide */}
            <section className="mb-6">
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>&#128218;</span> Cricket X Terminology
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-slate-400">Out! (1.00x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    <span className="text-slate-400">Single (1.01-1.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="text-slate-400">Double (2.00-2.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-lime-400"></span>
                    <span className="text-slate-400">Boundary (3.00-3.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    <span className="text-slate-400">Four (4.00-5.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                    <span className="text-slate-400">Six (6.00-9.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                    <span className="text-slate-400">Fifty (50.00-99.99x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                    <span className="text-slate-400">Century! (100x+)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsible Gambling Notice */}
            <section className="mb-6">
              <div className="card bg-amber-900/20 border-amber-600/30">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">&#9888;</span>
                  <div>
                    <h3 className="font-semibold text-amber-400 mb-2">Play Responsibly</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Crash games like Cricket X are games of chance. Past results do not predict future outcomes.
                      The house always has an edge ({GAME_CONFIG.houseEdge}%). Never gamble more than you can afford to lose.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-amber-600/20 text-amber-300 rounded hover:bg-amber-600/30">
                        BeGambleAware
                      </a>
                      <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-amber-600/20 text-amber-300 rounded hover:bg-amber-600/30">
                        GamCare
                      </a>
                      <Link to="/responsible-gambling/" className="text-xs px-3 py-1 bg-amber-600/20 text-amber-300 rounded hover:bg-amber-600/30">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Analytics Coming Soon</h2>
              <p className="text-slate-400">Detailed RTP tracking and distribution charts will be available here.</p>
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Cricket X vs Other Crash Games</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4">Game</th>
                    <th className="text-left py-3 px-4">Provider</th>
                    <th className="text-left py-3 px-4">RTP</th>
                    <th className="text-left py-3 px-4">Max Multi</th>
                    <th className="text-left py-3 px-4">Features</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700/50 bg-green-500/10">
                    <td className="py-3 px-4 font-semibold">&#127951; Cricket X</td>
                    <td className="py-3 px-4">SmartSoft</td>
                    <td className="py-3 px-4 text-green-400">97.0%</td>
                    <td className="py-3 px-4">10,000x</td>
                    <td className="py-3 px-4">3 Bet Slots, Cricket Theme</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">&#9992; JetX</td>
                    <td className="py-3 px-4">SmartSoft</td>
                    <td className="py-3 px-4 text-green-400">97.0%</td>
                    <td className="py-3 px-4">25,000x</td>
                    <td className="py-3 px-4">3 Bet Slots, Jet Theme</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">&#9992; Aviator</td>
                    <td className="py-3 px-4">Spribe</td>
                    <td className="py-3 px-4 text-green-400">97.0%</td>
                    <td className="py-3 px-4">10,000x</td>
                    <td className="py-3 px-4">Chat, Rain, 2 Bets</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">&#128640; Spaceman</td>
                    <td className="py-3 px-4">Pragmatic Play</td>
                    <td className="py-3 px-4">96.5%</td>
                    <td className="py-3 px-4">5,000x</td>
                    <td className="py-3 px-4">Half Cashout</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Cricket X is perfect for cricket fans in India, Pakistan, Bangladesh, UK, and Australia!
            </p>
          </div>
        )}
      </main>
    </>
  )
}

export default HomePage
