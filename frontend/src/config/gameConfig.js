/**
 * Cricket X Tracker - Game Configuration
 * Provider: SmartSoft Gaming
 */

export const GAME_CONFIG = {
  id: 'cricketx',
  name: 'Cricket X',
  slug: 'cricket-x',
  provider: 'SmartSoft Gaming',
  providerWebsite: 'https://www.smartsoftgaming.com',

  // Game Math
  rtp: 97.0,
  houseEdge: 3.0,
  maxMultiplier: 10000,
  minBet: 0.10,
  maxBet: 300,
  betSlots: 3, // Unique: 3 simultaneous bets like JetX

  // Branding
  domain: 'cricketxtracker.com',
  trademark: 'Cricket X is a trademark of SmartSoft Gaming.',
  description: 'Cricket-themed crash game with 3 simultaneous bet slots.',

  // Theme - Cricket Green
  theme: {
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#fbbf24',
    gradient: 'from-green-600 to-emerald-500',
    darkBg: '#052e16',
    cardBg: '#0d3320',
  },

  // URLs
  demoUrl: 'https://www.smartsoftgaming.com/games/cricketx',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8006',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  gameId: 'cricketx',

  // Features
  features: [
    'threeBets',      // 3 simultaneous bet slots
    'autoCollect',    // Auto cashout
    'provablyFair',
    'autoPlay',
    'cricketTheme',   // Cricket terminology
  ],

  // Cricket terminology mapping
  terminology: {
    instant: 'Out!',
    low: 'Single',
    medium: 'Double',
    good: 'Boundary',
    great: 'Four',
    excellent: 'Six',
    fifty: 'Fifty',
    century: 'Century!',
    doubleCentury: 'Double Century!',
  },

  // Contact
  emails: {
    contact: 'contact@cricketxtracker.com',
    legal: 'legal@cricketxtracker.com',
    privacy: 'privacy@cricketxtracker.com',
  },

  // SEO
  seo: {
    title: 'Cricket X Tracker - Live Statistics & 3-Bet Strategy Analysis',
    description: 'Real-time Cricket X game statistics, RTP tracking, and crash history. Master the 3-bet system with our cricket-themed analysis tools.',
    keywords: ['cricket x', 'cricket x game', 'cricket x statistics', 'cricket x tracker', 'smartsoft cricket x', 'crash game', 'ipl cricket game'],
  },

  // Target markets
  markets: ['India', 'Pakistan', 'Bangladesh', 'United Kingdom', 'Australia', 'Sri Lanka'],
}

export const THRESHOLDS = {
  out: 1.00,        // Out - instant crash
  single: 1.50,     // Single
  double: 2.00,     // Double
  boundary: 3.00,   // Boundary
  four: 4.00,       // Four
  six: 6.00,        // Six
  ten: 10.00,       // Good over
  fifty: 50.00,     // Half century
  century: 100.00,  // Century
  doubleCentury: 200.00, // Double century
}

export const CHART_COLORS = [
  '#16a34a', '#15803d', '#22c55e', '#4ade80',
  '#fbbf24', '#f59e0b', '#eab308', '#facc15'
]

export default GAME_CONFIG
