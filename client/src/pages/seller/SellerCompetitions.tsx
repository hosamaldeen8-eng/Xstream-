import { useEffect, useState } from 'react'
import { Trophy, Clock, Users, Plus } from 'lucide-react'
import { formatNumber, formatCurrency } from '../../lib/api'
import type { Competition } from '../../types'

function metricLabel(metric: string) {
  const map: Record<string, string> = { views: 'Views', conversions: 'Conversions', revenue: 'Revenue' }
  return map[metric] || metric
}

function statusColor(s: string) {
  const map: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    upcoming: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    ended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return map[s] || 'bg-gray-500/20 text-gray-400'
}

function scoreDisplay(score: number, metric: string) {
  if (metric === 'views' || metric === 'revenue') return formatNumber(score)
  return String(score)
}

export default function SellerCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/competitions')
      .then(r => r.json())
      .then(setCompetitions)
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false))
  }, [])

  const active = competitions.filter(c => c.status === 'active')
  const upcoming = competitions.filter(c => c.status === 'upcoming')
  const ended = competitions.filter(c => c.status === 'ended')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Competitions</h2>
          <p className="text-gray-400 text-sm mt-1">Drive creator performance with prize competitions</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200">
          <Plus className="w-4 h-4" />
          Create Competition
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Active Competitions */}
          {active.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Competitions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {active.map((comp) => (
                  <div key={comp.id} className="bg-[#0f0f1a] border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0 mr-3">
                        <h4 className="text-white font-bold text-base truncate">{comp.title}</h4>
                        <p className="text-gray-500 text-sm mt-0.5">{comp.brand}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium shrink-0 ${statusColor(comp.status)}`}>
                        {comp.status}
                      </span>
                    </div>

                    {/* Prize + Stats */}
                    <div className="flex items-center gap-4 mb-4 p-3 bg-[#080811] rounded-lg">
                      <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-yellow-400 font-bold text-sm truncate">{comp.prize}</p>
                        <p className="text-gray-500 text-xs">Metric: {metricLabel(comp.metric)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-5 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span>{comp.daysLeft} days left</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{comp.participants} participants</span>
                      </div>
                    </div>

                    {/* Mini Leaderboard */}
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Top 3</p>
                      <div className="space-y-2">
                        {comp.leaderboard.slice(0, 3).map((entry) => (
                          <div key={entry.rank} className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                              entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {entry.rank}
                            </span>
                            <span className="text-white text-xs font-medium flex-1 truncate">{entry.name}</span>
                            <span className="text-purple-400 text-xs font-semibold shrink-0">
                              {scoreDisplay(entry.score, comp.metric)}
                            </span>
                            {entry.prize && (
                              <span className="text-yellow-400 text-xs shrink-0">{entry.prize}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">Upcoming Competitions</h3>
              <div className="grid grid-cols-3 gap-4">
                {upcoming.map((comp) => (
                  <div key={comp.id} className="bg-[#0f0f1a] border border-yellow-500/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full border ${statusColor(comp.status)}`}>upcoming</span>
                      <span className="text-gray-500 text-xs">{comp.daysLeft}d</span>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{comp.title}</h4>
                    <p className="text-gray-500 text-xs mb-3">{comp.brand}</p>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">{formatCurrency(comp.prizeAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Competitions */}
          {ended.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4">Past Competitions</h3>
              <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-[#1a1a2e]">
                  {['Competition', 'Brand', 'Prize', 'Participants', 'Winner'].map((h) => (
                    <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
                  ))}
                </div>
                <div className="divide-y divide-[#1a1a2e]">
                  {ended.map((comp) => (
                    <div key={comp.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-4 hover:bg-white/5 transition-colors items-center">
                      <div>
                        <p className="text-white text-sm font-medium">{comp.title}</p>
                        <p className="text-gray-500 text-xs">{comp.deadline}</p>
                      </div>
                      <p className="text-gray-300 text-sm">{comp.brand}</p>
                      <p className="text-yellow-400 text-sm font-semibold">{formatCurrency(comp.prizeAmount)}</p>
                      <p className="text-gray-300 text-sm">{comp.participants}</p>
                      <p className="text-white text-sm">{comp.leaderboard[0]?.name || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
