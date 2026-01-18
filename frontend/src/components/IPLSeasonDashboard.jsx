import React, { useState, useMemo } from 'react';

/**
 * IPL Season Dashboard - Cricket X Indian Market Features
 * Themed around Indian Premier League cricket season
 */
export function IPLSeasonDashboard({ rtp = 97 }) {
  const [selectedTeam, setSelectedTeam] = useState('MI');
  const [betAmount, setBetAmount] = useState(500);
  const [currency, setCurrency] = useState('INR');

  const currencies = {
    INR: { symbol: '₹', rate: 83, name: 'Indian Rupee' },
    BDT: { symbol: '৳', rate: 110, name: 'Bangladeshi Taka' },
    PKR: { symbol: 'Rs', rate: 280, name: 'Pakistani Rupee' },
    LKR: { symbol: 'Rs', rate: 320, name: 'Sri Lankan Rupee' },
    USD: { symbol: '$', rate: 1, name: 'US Dollar' }
  };

  const iplTeams = [
    { code: 'MI', name: 'Mumbai Indians', color: '#004BA0', emoji: '💙' },
    { code: 'CSK', name: 'Chennai Super Kings', color: '#FDB913', emoji: '💛' },
    { code: 'RCB', name: 'Royal Challengers Bangalore', color: '#EC1C24', emoji: '❤️' },
    { code: 'KKR', name: 'Kolkata Knight Riders', color: '#3A225D', emoji: '💜' },
    { code: 'DC', name: 'Delhi Capitals', color: '#0078BC', emoji: '💙' },
    { code: 'PBKS', name: 'Punjab Kings', color: '#ED1B24', emoji: '❤️' },
    { code: 'RR', name: 'Rajasthan Royals', color: '#E73895', emoji: '💗' },
    { code: 'SRH', name: 'Sunrisers Hyderabad', color: '#F7A721', emoji: '🧡' },
    { code: 'GT', name: 'Gujarat Titans', color: '#1C1C1C', emoji: '🖤' },
    { code: 'LSG', name: 'Lucknow Super Giants', color: '#A72056', emoji: '💗' }
  ];

  const currentCurrency = currencies[currency];
  const selectedTeamData = iplTeams.find(t => t.code === selectedTeam);

  // Cricket-themed multipliers
  const cricketMultipliers = {
    single: { name: 'Single (1 run)', multiplier: 1.1, probability: 90.9 },
    double: { name: 'Double (2 runs)', multiplier: 1.5, probability: 64.7 },
    triple: { name: 'Triple (3 runs)', multiplier: 2.0, probability: 48.5 },
    boundary: { name: 'Boundary (4 runs)', multiplier: 4.0, probability: 24.3 },
    six: { name: 'SIX! (6 runs)', multiplier: 6.0, probability: 16.2 },
    superOver: { name: 'Super Over (10x)', multiplier: 10.0, probability: 9.7 },
    hatTrick: { name: 'Hat-trick (25x)', multiplier: 25.0, probability: 3.9 },
    century: { name: 'Century (100x)', multiplier: 100.0, probability: 0.97 }
  };

  const calculations = useMemo(() => {
    const usdBet = betAmount / currentCurrency.rate;
    const houseEdge = 100 - rtp;
    const expectedLoss = betAmount * (houseEdge / 100);

    return {
      usdBet,
      houseEdge,
      expectedLoss,
      expectedLossUSD: expectedLoss / currentCurrency.rate
    };
  }, [betAmount, currentCurrency.rate, rtp]);

  // Popular betting limits in India
  const bettingLimits = [
    { label: 'Minimum', inr: 10, category: 'Casual' },
    { label: 'Average', inr: 500, category: 'Regular' },
    { label: 'High', inr: 5000, category: 'Serious' },
    { label: 'VIP', inr: 50000, category: 'High Roller' }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🏏</span>
        IPL Season Dashboard
        <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded ml-2">CRICKET X</span>
      </h3>

      {/* IPL Theme Banner */}
      <div
        className="rounded-lg p-4 mb-6 relative overflow-hidden"
        style={{ backgroundColor: selectedTeamData?.color || '#1a1a2e' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold text-lg">{selectedTeamData?.name}</h4>
            <p className="text-white/80 text-sm">Your team for this session</p>
          </div>
          <div className="text-5xl">{selectedTeamData?.emoji}</div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 text-9xl">🏏</div>
      </div>

      {/* Team Selector */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Select Your IPL Team Theme</h4>
        <div className="grid grid-cols-5 gap-2">
          {iplTeams.map(team => (
            <button
              key={team.code}
              onClick={() => setSelectedTeam(team.code)}
              className={`p-2 rounded-lg text-center transition-all ${
                selectedTeam === team.code
                  ? 'ring-2 ring-white scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: team.color }}
            >
              <div className="text-xl">{team.emoji}</div>
              <div className="text-xs text-white font-bold">{team.code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Currency & Bet Calculator */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">INR Bet Calculator</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            >
              {Object.entries(currencies).map(([code, curr]) => (
                <option key={code} value={code}>{code} - {curr.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Bet Amount</label>
            <div className="relative">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
              <span className="absolute right-3 top-2 text-gray-500">{currentCurrency.symbol}</span>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">USD Equivalent</label>
            <div className="bg-gray-800 rounded px-3 py-2 text-green-400 font-bold">
              ${calculations.usdBet.toFixed(2)}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">House Edge Loss</label>
            <div className="bg-gray-800 rounded px-3 py-2 text-red-400 font-bold">
              {currentCurrency.symbol}{calculations.expectedLoss.toFixed(0)}/bet
            </div>
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[100, 500, 1000, 2500, 5000, 10000].map(amount => (
            <button
              key={amount}
              onClick={() => setBetAmount(amount)}
              className={`px-3 py-1 rounded text-sm ${
                betAmount === amount
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {currentCurrency.symbol}{amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Cricket-Themed Multipliers */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Cricket Shot Multipliers</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(cricketMultipliers).map(([key, shot]) => {
            const potentialWin = betAmount * (shot.multiplier - 1);
            return (
              <div key={key} className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-sm text-gray-400">{shot.name}</div>
                <div className="text-xl font-bold text-yellow-400">{shot.multiplier}x</div>
                <div className="text-xs text-gray-500">{shot.probability}% chance</div>
                <div className="text-sm text-green-400 mt-1">
                  Win: {currentCurrency.symbol}{potentialWin.toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Betting Limits */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Popular Betting Limits (India)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bettingLimits.map((limit, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500">{limit.category}</div>
              <div className="text-lg font-bold text-white">{limit.label}</div>
              <div className="text-orange-400">₹{limit.inr.toLocaleString()}</div>
              <div className="text-xs text-gray-500">${(limit.inr / 83).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* IPL Season Info */}
      <div className="bg-orange-900/30 border border-orange-600/50 rounded-lg p-4 mb-6">
        <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
          <span>🏆</span> IPL 2026 Season
        </h4>
        <p className="text-gray-300 text-sm mb-3">
          Cricket X activity typically peaks during IPL season (March-May).
          Higher player counts mean more multiplier variance.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-gray-800 rounded p-2">
            <div className="text-white font-bold">Peak Hours</div>
            <div className="text-gray-400">7 PM - 11 PM IST</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-white font-bold">Match Days</div>
            <div className="text-gray-400">Higher Activity</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-white font-bold">Playoffs</div>
            <div className="text-gray-400">Maximum Traffic</div>
          </div>
        </div>
      </div>

      {/* India Market Specifics */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <h4 className="text-white font-medium mb-2">Cricket X in India</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Primary Payment</span>
            <span className="text-white">UPI, Paytm, PhonePe</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Popular Times</span>
            <span className="text-white">Evening (7-11 PM IST)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Average Bet</span>
            <span className="text-white">₹500-₹2000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">RTP</span>
            <span className="text-green-400">97%</span>
          </div>
        </div>
      </div>

      {/* Legal Warning */}
      <div className="p-3 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
        <p className="text-yellow-400 text-sm">
          <strong>⚠️ Legal Notice:</strong> Online gambling laws vary by Indian state.
          Sikkim, Goa, and Daman have different regulations. Check your local laws.
          This tool is for educational purposes only.
        </p>
      </div>
    </div>
  );
}

export default IPLSeasonDashboard;
