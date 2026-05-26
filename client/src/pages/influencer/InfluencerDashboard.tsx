import { useEffect, useState } from 'react'
import { DollarSign, MousePointerClick, ShoppingCart, Clock, Sparkles, Trophy } from 'lucide-react'
import { formatCurrency, formatNumber } from '../../lib/api'
import type { Opportunity, InfluencerEarnings } from '../../types'

const mockAffiliateToday = { clicks: 284, conversions: 17 }
const mockCompetitionRank = { title: 'Summer Beauty Blitz', rank: 3, total: 84, score: 198 }
const mockActiveCampaigns = [
  { id: 'c1', name: 'Summer Glow 2024', brand: 'Luminos Beauty', due: '2024-07-12', payment: 500 },
  { id: 'c2', name: 'FitLife Challenge', brand: 'NovaPulse Sports', due: '2024-06-30', payment: 600 },
]

export default function InfluencerDashboard() {
  const [earnings, setEarnings] = useState<InfluencerEarnings | null>(null)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/affiliate/earnings').then(r => r.json()),
      fetch('http://localhost:5000/api/opportunities?status=open').then(r => r.json()),
    ])
      .then(([e, opps]) => {
        setEarnings(e)
        setOpportunities(opps.filter((o: Opportunity) => o.aiRecommended).slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const earningCards = earnings ? [
    { label: 'Today', value: formatCurrency(Math.round(earnings.thisMonth / 30)), color: 'text-white' },
    { label: 'This Week', value: formatCurrency(Math.round(earnings.thisMonth / 4)), color: 'text-white' },
    { label: 'This Month', value: formatCurrency(earnings.thisMonth), color: 'text-emerald-400' },
    { label: 'Pending Payout', value: formatCurrency(earnings.pendingPayout), color: 'text-yellow-400' },
  ] : []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Creator Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">Your performance and opportunities at a glance</p>
      </div>

      {/* Earnings Summary */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Earnings Summary</h3>
        </div>
        {loading ? (
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-white/3 rounded-lg animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {earningCards.map((c) => (
              <div key={c.label} className="bg-[#080811] rounded-lg p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{c.label}</p>
                <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Active Campaigns */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 text-sm">Active Campaigns</h3>
          <div className="space-y-3">
            {mockActiveCampaigns.map((c) => (
              <div key={c.id} className="p-3 bg-[#080811] rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white text-xs font-medium">{c.name}</p>
                  <span className="text-emerald-400 text-xs font-semibold">{formatCurrency(c.payment)}</span>
                </div>
                <p className="text-gray-500 text-xs">{c.brand}</p>
                <p className="text-gray-600 text-xs mt-1">Due: {c.due}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Quick Stats */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MousePointerClick className="w-4 h-4 text-emerald-400" />
            <h3 className="text-white font-semibold text-sm">Affiliate Today</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#080811] rounded-lg">
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Clicks</span>
              </div>
              <span className="text-white font-bold text-lg">{formatNumber(mockAffiliateToday.clicks)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#080811] rounded-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400 text-sm">Conversions</span>
              </div>
              <span className="text-white font-bold text-lg">{mockAffiliateToday.conversions}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#080811] rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400 text-sm">Earned</span>
              </div>
              <span className="text-white font-bold text-lg text-emerald-400">
                {formatCurrency(Math.round(mockAffiliateToday.conversions * 12.5))}
              </span>
            </div>
          </div>
        </div>

        {/* Competition Ranking */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <h3 className="text-white font-semibold text-sm">Competition Rank</h3>
          </div>
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/30 border-2 border-orange-500/50 flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-black">#{mockCompetitionRank.rank}</span>
            </div>
            <p className="text-white font-semibold text-sm mb-1">{mockCompetitionRank.title}</p>
            <p className="text-gray-500 text-xs mb-3">out of {mockCompetitionRank.total} participants</p>
            <div className="bg-[#080811] rounded-lg p-3">
              <p className="text-gray-500 text-xs">Current Score</p>
              <p className="text-purple-400 font-bold text-xl">{mockCompetitionRank.score}</p>
              <p className="text-gray-600 text-xs">conversions</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommended Opportunities */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">AI Recommended Opportunities</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Matched for you
          </span>
        </div>
        {loading ? (
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-white/3 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-[#080811] rounded-xl p-4 border border-[#1a1a2e] hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-400/30 flex items-center justify-center text-xs font-bold text-white">
                    {opp.brand.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs">AI Pick</span>
                  </div>
                </div>
                <p className="text-white text-sm font-semibold mb-1 truncate">{opp.product}</p>
                <p className="text-gray-500 text-xs mb-3">{opp.brand}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-emerald-400 font-bold text-lg">{formatCurrency(opp.fixedFee)}</span>
                  <span className="text-purple-400 text-xs">+{opp.commissionRate}% comm.</span>
                </div>
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-xs font-semibold transition-all duration-200">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
