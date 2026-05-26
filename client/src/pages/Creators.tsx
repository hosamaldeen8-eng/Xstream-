import { useEffect, useState } from 'react'
import { Search, Filter, Plus, X } from 'lucide-react'
import CreatorCard from '../components/CreatorCard'
import { api, formatNumber, formatPercent } from '../lib/api'
import type { Creator } from '../types'

const PLATFORMS = ['All', 'TikTok', 'Instagram', 'YouTube', 'X'] as const
const STATUSES = ['All', 'active', 'inactive', 'pending'] as const

export default function Creators() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [selected, setSelected] = useState<Creator | null>(null)

  useEffect(() => {
    const params: Record<string, string> = {}
    if (platform !== 'All') params.platform = platform
    if (status !== 'All') params.status = status
    setLoading(true)
    api
      .getCreators(params)
      .then(setCreators)
      .finally(() => setLoading(false))
  }, [platform, status])

  const filtered = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Creator Network</h2>
          <p className="text-gray-400 text-sm mt-1">
            {creators.length} creators across {PLATFORMS.length - 1} platforms
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Add Creator
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-60">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creators..."
            className="w-full bg-[#0f0f1a] border border-[#1a1a2e] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Platform filter */}
        <div className="flex items-center gap-1 bg-[#0f0f1a] border border-[#1a1a2e] rounded-lg p-1">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                platform === p
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-[#12121e]">
                {s === 'All' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No creators match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map((c) => (
            <CreatorCard key={c.id} creator={c} onClick={setSelected} />
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-96 h-full bg-[#0a0a14] border-l border-[#1a1a2e] p-6 overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                {selected.avatar}
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.handle}</p>
                <p className="text-gray-500 text-xs mt-1">{selected.country}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-6">
              <span className="text-xs px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/20 text-purple-400">
                {selected.platform}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400">
                {selected.niche}
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Followers', value: formatNumber(selected.followers) },
                { label: 'Avg Views', value: formatNumber(selected.avgViews) },
                { label: 'Engagement', value: formatPercent(selected.engagementRate) },
                { label: 'Campaigns', value: String(selected.campaigns) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4">
                  <p className="text-white text-xl font-bold">{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="mb-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Status</p>
              <span
                className={`text-sm px-3 py-1.5 rounded-lg font-medium ${
                  selected.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : selected.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {selected.status}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Add to Campaign
              </button>
              <button className="w-full py-2.5 rounded-lg border border-[#1a1a2e] text-gray-300 text-sm font-medium hover:border-purple-500/30 hover:text-white transition-all">
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
