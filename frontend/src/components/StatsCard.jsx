import clsx from 'clsx'

const colorClasses = {
  default: 'from-slate-600/20 to-slate-700/20 border-slate-600/30',
  green: 'from-green-600/20 to-green-700/20 border-green-500/30',
  purple: 'from-purple-600/20 to-purple-700/20 border-purple-500/30',
  yellow: 'from-yellow-600/20 to-yellow-700/20 border-yellow-500/30',
  orange: 'from-orange-600/20 to-orange-700/20 border-orange-500/30',
  red: 'from-red-600/20 to-red-700/20 border-red-500/30',
  teal: 'from-teal-600/20 to-teal-700/20 border-teal-500/30',
}

export default function StatsCard({ title, value, subtitle, icon, color = 'default', loading }) {
  return (
    <div className={clsx(
      'p-4 rounded-xl bg-gradient-to-br border backdrop-blur-sm',
      colorClasses[color]
    )}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg" dangerouslySetInnerHTML={{ __html: icon }}></span>}
        <span className="text-xs text-slate-400 uppercase tracking-wide">{title}</span>
      </div>

      {loading ? (
        <div className="h-8 bg-slate-700/50 rounded animate-pulse"></div>
      ) : (
        <>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </>
      )}
    </div>
  )
}
