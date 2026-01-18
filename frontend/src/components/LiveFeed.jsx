import { getMultiplierClass, getCricketTerm } from '../utils/formatters'

export default function LiveFeed({ rounds = [] }) {
  const displayRounds = rounds.slice(0, 20)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>&#128225;</span> Live Scorecard
        </h2>
        <span className="text-xs text-slate-400">{rounds.length} overs</span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
        {displayRounds.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">Waiting for match data...</p>
        ) : (
          displayRounds.map((round, idx) => (
            <div
              key={round.round_id || idx}
              className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                round.isNew ? 'bg-green-500/20 animate-pulse' : 'bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">
                  #{round.round_id?.slice(-6) || idx}
                </span>
                <span className="text-xs text-slate-400">
                  {getCricketTerm(round.crash_multiplier)}
                </span>
              </div>
              <span className={`font-bold font-mono ${getMultiplierClass(round.crash_multiplier)}`}>
                {round.crash_multiplier?.toFixed(2)}x
              </span>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      {displayRounds.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-xs text-slate-500 block">Outs</span>
            <span className="text-sm font-bold text-red-400">
              {displayRounds.filter(r => r.crash_multiplier === 1).length}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Sixes</span>
            <span className="text-sm font-bold text-teal-400">
              {displayRounds.filter(r => r.crash_multiplier >= 6 && r.crash_multiplier < 10).length}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">50+</span>
            <span className="text-sm font-bold text-purple-400">
              {displayRounds.filter(r => r.crash_multiplier >= 50).length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
