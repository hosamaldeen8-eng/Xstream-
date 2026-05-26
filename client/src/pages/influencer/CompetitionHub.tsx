import { useEffect, useState } from 'react'
import { Trophy, Clock, Users, Star } from 'lucide-react'
import { formatNumber, formatCurrency } from '../../lib/api'
import type { Competition } from '../../types'

function metricLabel(m: string) {
  const map: Record<string, string> = { views: 'Views', conversions: 'Conversions', revenue: 'Revenue' }
  return map[m] || m
}

function scoreDisplay(score: number, metric: string) {
  if (metric === 'views') return formatNumber(score)
  if (metric === 'revenue') return formatCurrency(score)
  return String(score)
}

function statusColor(s: string) {
  const map: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    upcoming: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    ended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return map[s] || 'bg-gray-500/20 text-gray-400'
}

const myRankings = [
  { compId: 'comp1', rank: 3, score: 198, total: 84 },
  { compId: 'comp2', rank: 2, score: 8250, total: 61 },
]

const myPastPerformance = {
  won: 1,
  participated: 3,
  totalPrizes: 3500,
  bestRank: 1,
}

export default function CompetitionHub() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/competitions')
      .then(r => r.json())
      .then((data: Competition[]) => {
        setCompetitions(data)
        const first = data.find(c => c.status === 'active')
        if (first) setSelectedComp(first)
      })
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false))
  }, [])

  const active = competitions.filter(c => c.status === 'active')
  const available = competitions.filter(c => c.status === 'active' || c.status === 'upcoming')
  const ended = competitions.filter(c => c.status === 'ended')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Competition Hub</h2>
        <p className="text-gray-400 text-sm mt-1">Compete, rank, and win prizes from top brands</p>
      </div>

      {/* My Past Performance Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Competitions Won', value: myPastPerformance.won, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
          { label: 'Participated', value: myPastPerformance.participated, color: 'text-white', bg: 'bg-[#0f0f1a] border-[#1a1a2e]' },
          { label: 'Total Prizes Won', value: formatCurrency(myPastPerformance.totalPrizes), color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Best Rank', value: `#${myPastPerformance.bestRank}`, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-5 ${s.bg}`}>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-64 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <>
          {/* My Active Competitions */}
          {myRankings.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                My Active Competitions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {myRankings.map((r) => {
                  const comp = competitions.find(c => c.id === r.compId)
                  if (!comp) return null
                  return (
                    <div key={r.compId} className="bg-[#0f0f1a] border border-emerald-500/20 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-white font-bold">{comp.title}</h4>
                          <p className="text-gray-500 text-sm">{comp.brand}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-2 ${
                          r.rank === 1 ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' :
                          r.rank === 2 ? 'bg-gray-400/20 border-gray-300 text-gray-300' :
                          'bg-orange-500/20 border-orange-400 text-orange-400'
                        }`}>
                          #{r.rank}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 p-3 bg-[#080811] rounded-lg mb-4">
                        <div className="text-center">
                          <p className="text-gray-500 text-xs">Rank</p>
                          <p className="text-white font-bold">#{r.rank} / {r.total}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 text-xs">Score</p>
                          <p className="text-emerald-400 font-bold">{scoreDisplay(r.score, comp.metric)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 text-xs">Prize If Win</p>
                          <p className="text-yellow-400 font-bold text-xs">{comp.leaderboard[r.rank - 1]?.prize || '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{comp.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400">{comp.prize}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Available to Join */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Available Competitions</h3>
            <div className="grid grid-cols-3 gap-4">
              {available.map((comp) => (
                <div key={comp.id} className={`bg-[#0f0f1a] border rounded-xl p-5 ${
                  comp.status === 'active' ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-yellow-500/20 hover:border-yellow-500/40'
                } transition-all duration-200`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full border capitalize ${statusColor(comp.status)}`}>
                      {comp.status}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {comp.participants}
                    </span>
                  </div>
                  <h4 className="text-white font-bold mb-1">{comp.title}</h4>
                  <p className="text-gray-500 text-xs mb-3">{comp.brand}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-yellow-400 text-sm font-semibold">{comp.prize}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Metric: {metricLabel(comp.metric)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {comp.daysLeft > 0 ? `${comp.daysLeft}d left` : 'Starts soon'}
                    </span>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-xs font-semibold transition-all duration-200">
                    {comp.status === 'active' ? 'Enter Competition' : 'Get Notified'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard for selected active competition */}
          {selectedComp && selectedComp.leaderboard.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Live Leaderboard</h3>
                <div className="flex gap-2">
                  {active.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedComp(c)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        selectedComp.id === c.id ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#1a1a2e] flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{selectedComp.title}</p>
                    <p className="text-gray-500 text-xs">{selectedComp.brand} · {metricLabel(selectedComp.metric)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-semibold">{selectedComp.prize}</span>
                  </div>
                </div>
                <div className="divide-y divide-[#1a1a2e]">
                  {selectedComp.leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                        entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                        entry.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-white/5 text-gray-500'
                      }`}>
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-400/20 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{entry.name}</p>
                        <p className="text-gray-500 text-xs">{entry.handle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{scoreDisplay(entry.score, selectedComp.metric)}</p>
                        {entry.prize && (
                          <p className="text-yellow-400 text-xs">{entry.prize}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Past Competitions */}
          {ended.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4">Past Competitions</h3>
              <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-[#1a1a2e]">
                  {['Competition', 'Brand', 'Prize', 'Winner', 'My Rank'].map((h) => (
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
                      <p className="text-white text-sm">{comp.leaderboard[0]?.name || '—'}</p>
                      <p className="text-gray-500 text-sm">—</p>
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
