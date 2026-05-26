import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { formatNumber } from '../../lib/api'
import type { Creator } from '../../types'

const platforms = ['All', 'TikTok', 'Instagram', 'YouTube', 'X']
const niches = ['All', 'Beauty', 'Fashion', 'Fitness', 'Tech', 'Gaming', 'Food', 'Travel', 'Finance', 'Wellness']

function engagementColor(rate: number) {
  if (rate >= 4) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  if (rate >= 2) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  return 'bg-red-500/20 text-red-400 border-red-500/30'
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

export default function InfluencerMarketplace() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('All')
  const [niche, setNiche] = useState('All')

  useEffect(() => {
    fetch('http://localhost:5000/api/creators')
      .then((r) => r.json())
      .then(setCreators)
      .catch(() => setCreators([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = creators.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase())
    const matchPlatform = platform === 'All' || c.platform === platform
    const matchNiche = niche === 'All' || c.niche === niche
    return matchSearch && matchPlatform && matchNiche
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Influencer Marketplace</h2>
        <p className="text-gray-400 text-sm mt-1">Discover creators that match your campaign goals</p>
      </div>

      {/* Filters */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 text-sm">Platform:</span>
          <div className="flex gap-1">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  platform === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Niche:</span>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
          >
            {niches.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-4">{filtered.length} creators found</p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-48 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((creator) => (
            <div
              key={creator.id}
              className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 hover:border-purple-500/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Avatar + Platform */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/40 to-indigo-500/40 flex items-center justify-center text-white text-sm font-bold">
                    {creator.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{creator.name}</p>
                    <p className="text-gray-500 text-xs">{creator.handle}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${platformColor(creator.platform)}`}>
                  {creator.platform}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <p className="text-white text-sm font-bold">{formatNumber(creator.followers)}</p>
                  <p className="text-gray-600 text-xs">followers</p>
                </div>
                <div className="w-px h-8 bg-[#1a1a2e]" />
                <div>
                  <p className="text-white text-sm font-bold">{formatNumber(creator.avgViews)}</p>
                  <p className="text-gray-600 text-xs">avg views</p>
                </div>
                <div className="w-px h-8 bg-[#1a1a2e]" />
                <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${engagementColor(creator.engagementRate)}`}>
                  {creator.engagementRate}% eng.
                </span>
              </div>

              {/* Niche + Country */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-[#1a1a2e]">
                  {creator.niche}
                </span>
                <span className="text-xs text-gray-600">{creator.country}</span>
                <span className="text-xs text-gray-600">· {creator.campaigns} campaigns</span>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
