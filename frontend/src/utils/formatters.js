import { format, formatDistanceToNow } from 'date-fns'

/**
 * Get CSS class for multiplier coloring - Cricket terminology
 */
export function getMultiplierClass(multiplier) {
  if (multiplier === 1) return 'text-red-500'       // Out!
  if (multiplier < 2) return 'text-orange-400'      // Single
  if (multiplier < 3) return 'text-yellow-400'      // Double
  if (multiplier < 4) return 'text-lime-400'        // Boundary
  if (multiplier < 6) return 'text-green-400'       // Four
  if (multiplier < 10) return 'text-teal-400'       // Six
  if (multiplier < 50) return 'text-cyan-400'       // Good over
  if (multiplier < 100) return 'text-blue-400'      // Fifty
  if (multiplier < 200) return 'text-purple-400'    // Century
  return 'text-pink-400'                            // Double Century!
}

/**
 * Get cricket terminology for multiplier
 */
export function getCricketTerm(multiplier) {
  if (multiplier === 1) return 'Out!'
  if (multiplier < 1.5) return 'Dot Ball'
  if (multiplier < 2) return 'Single'
  if (multiplier < 3) return 'Double'
  if (multiplier < 4) return 'Boundary'
  if (multiplier < 6) return 'Four!'
  if (multiplier < 10) return 'Six!'
  if (multiplier < 50) return 'Good Over'
  if (multiplier < 100) return 'Fifty!'
  if (multiplier < 200) return 'Century!'
  return 'Double Century!'
}

/**
 * Get background color class for multiplier
 */
export function getMultiplierColor(multiplier) {
  if (multiplier === 1) return 'bg-red-900/50'
  if (multiplier < 2) return 'bg-orange-800/40'
  if (multiplier < 3) return 'bg-yellow-800/40'
  if (multiplier < 4) return 'bg-lime-800/40'
  if (multiplier < 6) return 'bg-green-800/40'
  if (multiplier < 10) return 'bg-teal-800/40'
  if (multiplier < 50) return 'bg-cyan-800/40'
  if (multiplier < 100) return 'bg-blue-800/40'
  if (multiplier < 200) return 'bg-purple-800/40'
  return 'bg-pink-800/40'
}

/**
 * Format relative time
 */
export function formatTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return formatDistanceToNow(d, { addSuffix: true })
}

/**
 * Format date and time
 */
export function formatDateTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return format(d, 'MMM d, HH:mm:ss')
}

/**
 * Format number with locale
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return '---'
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Format percentage
 */
export function formatPercent(num, decimals = 1) {
  if (num === null || num === undefined) return '---'
  return `${num.toFixed(decimals)}%`
}

/**
 * Get cricket score description based on multiplier
 */
export function getScoreDescription(multiplier) {
  if (multiplier < 2) return 'Defensive play - taking singles'
  if (multiplier < 6) return 'Aggressive - looking for boundaries'
  if (multiplier < 50) return 'Big hitting - going for sixes!'
  if (multiplier < 100) return 'On the way to a half-century!'
  return 'Century innings - legendary performance!'
}
