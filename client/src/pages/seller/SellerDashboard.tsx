import { useEffect, useState } from 'react'
import { Eye, MousePointerClick, ShoppingCart, DollarSign, TrendingUp, Check, X } from 'lucide-react'
import { formatNumber, formatCurrency } from '../../lib/api'

interface AffiliateLink {
  id: string
  influencerName: string
  productName: string
  conversions: number
  commission: number
  createdAt: string
}

interface LeaderEntry {
  rank: number
  name: string
  handle: string
  score: number
}

const mockMetrics = [
  { label: 'Total Views', value: '8.4M', change: 14, icon: Eye },
  { label: 'Total Clicks', value: '248K', change: 22, icon: MousePointerClick },
  { label: 'Conversions', value: '14.2K', change: 9, icon: ShoppingCart },
  { label: 'Revenue', value: '$182K', change: 31, icon: DollarSign },
]

const mockCampaigns = [
  { id: 'c1', name: 'Summer Glow 2024', brand: 'Luminos Beauty', budget: 180000, spent: 112000, influencers: 18, status: 'active' },
  { id: 'c2', name: 'FitLife Challenge', brand: 'NovaPulse Sports', budget: 95000, spent: 61000, influencers: 12, status: 'active' },
  { id: 'c3', name: 'GameOn Launch', brand: 'Nexus Interactive', budget: 160000, spent: 87000, influencers: 9, status: 'active' },
]

const mockProposals = [
  { id: 'p1', name: 'Zara Kline', handle: '@zarakline', platform: 'TikTok', followers: '3.9M', rate: 6.8, price: 2200 },
  { id: 'p2', name: 'Devon Archer', handle: '@devonarcherstyle', platform: 'TikTok', followers: '2.3M', rate: 6.2, price: 1800 },
  { id: 'p3', name: 'Oliver Grant', handle: '@olivergrant', platform: 'X', followers: '430K', rate: 6.5, price: 900 },
]

const mockLeaderboard: LeaderEntry[] = [
  { rank: 1, name: 'Zara Kline', handle: '@zarakline', score: 302 },
  { rank: 2, name: 'Mia Chen', handle: '@mia.creates', score: 289 },
  { rank: 3, name: 'Caleb Frost', handle: '@calebfrost', score: 198 },
  { rank: 4, name: 'Sophia Blanc', handle: '@sophiablanc', score: 176 },
  { rank: 5, name: 'Fatima Al-Rashid', handle: '@fatimalifestyle', score: 142 },
]

export default function SellerDashboard() {
  const [affiliateActivity, setAffiliateActivity] = useState<AffiliateLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/affiliate/links')
      .then((r) => r.json())
      .then((data) => setAffiliateActivity(data.slice(0, 5)))
      .catch(() => setAffiliateActivity([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Seller Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">Your campaign performance at a glance</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {mockMetrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{m.label}</p>
                  <p className="text-2xl font-bold text-white mt-1.5">{m.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-semibold text-emerald-400">↑ {m.change}%</span>
                    <span className="text-gray-600 text-xs">vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Live Campaigns */}
        <div className="col-span-2 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5">Live Campaigns</h3>
          <div className="space-y-4">
            {mockCampaigns.map((c) => {
              const pct = Math.round((c.spent / c.budget) * 100)
              return (
                <div key={c.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white text-sm font-medium truncate">{c.name}</p>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">{pct}% spent</span>
                    </div>
                    <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-500 text-xs">{c.brand}</p>
                      <p className="text-gray-500 text-xs">{formatCurrency(c.spent)} / {formatCurrency(c.budget)}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {c.influencers} creators
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Competition Leaderboard */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-semibold text-sm">Top Affiliates This Month</h3>
          </div>
          <div className="space-y-3">
            {mockLeaderboard.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                  entry.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-white/5 text-gray-500'
                }`}>
                  {entry.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{entry.name}</p>
                  <p className="text-gray-500 text-xs">{entry.handle}</p>
                </div>
                <span className="text-purple-400 text-xs font-semibold shrink-0">{entry.score} conv.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pending Proposals */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5">Pending Proposals</h3>
          <div className="space-y-4">
            {mockProposals.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-[#1a1a2e]">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600/30 to-indigo-500/30 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{p.name}</p>
                  <p className="text-gray-500 text-xs">{p.handle} · {p.followers} · {p.platform}</p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-white text-sm font-semibold">${p.price.toLocaleString()}</p>
                  <p className="text-emerald-400 text-xs">{p.rate}% eng.</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Affiliate Activity */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5">Recent Affiliate Activity</h3>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-white/3 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {affiliateActivity.map((link) => (
                <div key={link.id} className="py-3 flex items-center justify-between hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{link.influencerName}</p>
                    <p className="text-gray-500 text-xs truncate">{link.productName}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-emerald-400 text-xs font-semibold">{link.conversions} conv.</p>
                    <p className="text-gray-500 text-xs">{formatCurrency(link.commission)} earned</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
