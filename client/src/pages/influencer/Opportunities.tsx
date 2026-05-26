import { useEffect, useState } from 'react'
import { Search, Sparkles, Clock, Users } from 'lucide-react'
import { formatCurrency } from '../../lib/api'
import type { Opportunity } from '../../types'

const platforms = ['All', 'TikTok', 'Instagram', 'YouTube', 'X']
const contentTypes = ['All', 'short-form', 'long-form', 'story', 'mixed']

function statusBadge(status: string) {
  const map: Record<string, string> = {
    open: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    applied: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return map[status] || 'bg-gray-500/20 text-gray-400'
}

function contentTypeColor(t: string) {
  const map: Record<string, string> = {
    'short-form': 'bg-pink-500/20 text-pink-400',
    'long-form': 'bg-blue-500/20 text-blue-400',
    story: 'bg-purple-500/20 text-purple-400',
    mixed: 'bg-indigo-500/20 text-indigo-400',
  }
  return map[t] || 'bg-gray-500/20 text-gray-400'
}

function platformColor(p: string) {
  const map: Record<string, string> = {
    TikTok: 'bg-pink-500/20 text-pink-400',
    Instagram: 'bg-purple-500/20 text-purple-400',
    YouTube: 'bg-red-500/20 text-red-400',
    X: 'bg-sky-500/20 text-sky-400',
  }
  return map[p] || 'bg-gray-500/20 text-gray-400'
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('All')
  const [contentType, setContentType] = useState('All')
  const [sort, setSort] = useState<'payout' | 'newest' | 'commission'>('payout')
  const [tab, setTab] = useState<'browse' | 'applied'>('browse')

  useEffect(() => {
    fetch('http://localhost:5000/api/opportunities')
      .then(r => r.json())
      .then(setOpportunities)
      .catch(() => setOpportunities([]))
      .finally(() => setLoading(false))
  }, [])

  async function applyToOpp(id: string) {
    await fetch(`http://localhost:5000/api/opportunities/${id}/apply`, { method: 'POST' })
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: 'applied' as const } : o))
  }

  const open = opportunities.filter(o => o.status === 'open' || o.status === 'applied' || o.status === 'accepted')
  const applied = opportunities.filter(o => o.status === 'applied' || o.status === 'accepted')

  const browseable = open.filter(o => {
    const matchSearch = !search || o.brand.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase())
    const matchPlatform = platform === 'All' || o.platforms.includes(platform)
    const matchType = contentType === 'All' || o.contentType === contentType
    return matchSearch && matchPlatform && matchType
  }).sort((a, b) => {
    if (sort === 'payout') return b.fixedFee - a.fixedFee
    if (sort === 'commission') return b.commissionRate - a.commissionRate
    return 0 // newest: keep order
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Opportunities</h2>
        <p className="text-gray-400 text-sm mt-1">Browse and apply to brand deals that match your niche</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#0f0f1a] border border-[#1a1a2e] rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab('browse')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'browse' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Browse Deals
        </button>
        <button
          onClick={() => setTab('applied')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'applied' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          My Applications ({applied.length})
        </button>
      </div>

      {tab === 'browse' ? (
        <>
          {/* Filters */}
          <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search brands or products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-1">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    platform === p ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              {contentTypes.map((t) => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'payout' | 'newest' | 'commission')}
              className="bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-emerald-500/50"
            >
              <option value="payout">Sort: Highest Payout</option>
              <option value="commission">Sort: Commission Rate</option>
              <option value="newest">Sort: Newest</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className="h-56 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {browseable.map((opp) => (
                <div key={opp.id} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 hover:border-emerald-500/30 transition-all duration-200">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-400/30 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {opp.brand.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white text-sm font-semibold truncate">{opp.product}</p>
                        {opp.aiRecommended && (
                          <div className="flex items-center gap-1 shrink-0">
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400 text-xs">AI Pick</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs">{opp.brand}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border shrink-0 capitalize ${statusBadge(opp.status)}`}>
                      {opp.status}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {opp.platforms.map((p) => (
                      <span key={p} className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformColor(p)}`}>{p}</span>
                    ))}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${contentTypeColor(opp.contentType)}`}>
                      {opp.contentType}
                    </span>
                  </div>

                  {/* Payout */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-[#080811] rounded-lg">
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Fixed Fee</p>
                      <p className="text-emerald-400 font-bold text-xl">{formatCurrency(opp.fixedFee)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs mb-0.5">Commission</p>
                      <p className="text-purple-400 font-bold text-lg">+{opp.commissionRate}%</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Due {opp.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{opp.applicants} applicants</span>
                    </div>
                  </div>

                  <button
                    onClick={() => applyToOpp(opp.id)}
                    disabled={opp.status !== 'open'}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      opp.status === 'open'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white'
                        : 'bg-white/5 text-gray-500 cursor-default capitalize border border-[#1a1a2e]'
                    }`}
                  >
                    {opp.status === 'open' ? 'Apply Now' : opp.status === 'applied' ? 'Applied' : opp.status}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {applied.map((opp) => (
            <div key={opp.id} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-400/30 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {opp.brand.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{opp.product}</p>
                <p className="text-gray-500 text-sm">{opp.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 font-bold">{formatCurrency(opp.fixedFee)}</p>
                <p className="text-gray-500 text-xs">+{opp.commissionRate}% comm.</p>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full border capitalize font-medium ${statusBadge(opp.status)}`}>
                {opp.status}
              </span>
            </div>
          ))}
          {applied.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <p>No applications yet. Browse opportunities and apply!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
