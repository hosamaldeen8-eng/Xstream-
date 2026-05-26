import { useEffect, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Link2, Copy, DollarSign, Users, TrendingUp, MousePointerClick, Plus } from 'lucide-react'
import { formatCurrency, formatNumber } from '../../lib/api'
import type { AffiliateLink, Payout, CommissionTier } from '../../types'

const tierColors: Record<string, string> = {
  Bronze: '#cd7f32',
  Silver: '#c0c0c0',
  Gold: '#ffd700',
  Platinum: '#e5e4e2',
}

const tierBg: Record<string, string> = {
  Bronze: 'bg-amber-700/20 border-amber-600/30',
  Silver: 'bg-gray-400/20 border-gray-400/30',
  Gold: 'bg-yellow-500/20 border-yellow-500/30',
  Platinum: 'bg-slate-300/20 border-slate-300/30',
}

function TierBadge({ tier }: { tier: string }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${tierBg[tier]}`}
      style={{ color: tierColors[tier] }}
    >
      {tier}
    </span>
  )
}

function statusDot(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-yellow-400',
    processing: 'bg-blue-400',
    paid: 'bg-emerald-400',
  }
  return map[status] || 'bg-gray-400'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#12121e] border border-[#1a1a2e] rounded-lg p-3 text-xs shadow-xl">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function RevenueSharing() {
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [tiers, setTiers] = useState<CommissionTier[]>([])
  const [timeseries, setTimeseries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'revenue' | 'clicks' | 'conversions'>('revenue')

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/affiliate/links').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/payouts').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/tiers').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/timeseries').then(r => r.json()),
    ])
      .then(([l, p, t, ts]) => {
        setLinks(l)
        setPayouts(p)
        setTiers(t)
        setTimeseries(ts)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = links.reduce((s, l) => s + l.revenue, 0)
  const totalCommissions = links.reduce((s, l) => s + l.commission, 0)
  const activeAffiliates = new Set(links.map(l => l.influencerId)).size
  const totalClicks = links.reduce((s, l) => s + l.clicks, 0)
  const totalConversions = links.reduce((s, l) => s + l.conversions, 0)
  const avgConvRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0.00'
  const avgCommRate = links.length > 0 ? (links.reduce((s, l) => s + l.commissionRate, 0) / links.length).toFixed(1) : '0'

  const sortedLinks = [...links].sort((a, b) => b[sortBy] - a[sortBy])

  async function processPayout(id: string) {
    await fetch(`http://localhost:5000/api/affiliate/payouts/${id}/request`, { method: 'PATCH' })
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'processing' } : p))
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(`https://${url}`)
  }

  const tierDefs = [
    { tier: 'Bronze', range: '$0 – $1K', base: '8%', bonus: 'Base rate', desc: 'Getting started' },
    { tier: 'Silver', range: '$1K – $5K', base: '10%', bonus: '+1% bonus', desc: 'Growing affiliate' },
    { tier: 'Gold', range: '$5K – $20K', base: '12%', bonus: '+2% bonus', desc: 'Top performer' },
    { tier: 'Platinum', range: '$20K+', base: '15%', bonus: '+3% bonus', desc: 'Elite affiliate' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Affiliate Program</h2>
          <p className="text-gray-400 text-sm mt-1">Revenue sharing dashboard — track, manage, and grow your affiliate network</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200">
          <Plus className="w-4 h-4" />
          Generate Link
        </button>
      </div>

      {/* Section 1: Overview Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Affiliate Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-purple-400' },
          { label: 'Total Commissions Paid', value: formatCurrency(totalCommissions), icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Active Affiliates', value: String(activeAffiliates), icon: Users, color: 'text-blue-400' },
          { label: 'Avg Commission Rate', value: `${avgCommRate}%`, icon: TrendingUp, color: 'text-yellow-400' },
          { label: 'Total Clicks', value: formatNumber(totalClicks), icon: MousePointerClick, color: 'text-pink-400' },
          { label: 'Conversion Rate', value: `${avgConvRate}%`, icon: TrendingUp, color: 'text-indigo-400' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-500/20 flex items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{s.label}</p>
                <p className="text-white text-xl font-bold mt-0.5">{s.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Section 2: Commission Tier System */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Commission Tier System</h3>
        <div className="grid grid-cols-4 gap-4">
          {tierDefs.map((t) => (
            <div key={t.tier} className={`bg-[#0f0f1a] border rounded-xl p-5 ${tierBg[t.tier]}`}>
              <div className="flex items-center justify-between mb-3">
                <TierBadge tier={t.tier} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tierColors[t.tier] }} />
              </div>
              <p className="text-white text-lg font-bold mb-1">{t.base}</p>
              <p className="text-xs font-semibold mb-3" style={{ color: tierColors[t.tier] }}>{t.bonus}</p>
              <p className="text-gray-400 text-xs">{t.range}</p>
              <p className="text-gray-600 text-xs mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Affiliate Links Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Affiliate Links</h3>
          <div className="flex gap-2">
            {(['revenue', 'clicks', 'conversions'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
                  sortBy === s ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                Sort by {s}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] px-5 py-3 border-b border-[#1a1a2e]">
            {['Influencer', 'Product', 'Link', 'Clicks', 'Conv.', 'Conv. Rate', 'Revenue', 'Commission', 'Tier', 'Created'].map((h) => (
              <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-white/3 rounded animate-pulse" />)}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {sortedLinks.map((link) => (
                <div key={link.id} className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] px-5 py-3.5 hover:bg-white/5 transition-colors items-center">
                  <div>
                    <p className="text-white text-xs font-medium">{link.influencerName}</p>
                    <p className="text-gray-500 text-xs">{link.brand}</p>
                  </div>
                  <p className="text-gray-300 text-xs truncate pr-2">{link.productName}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-400 text-xs font-mono truncate max-w-[80px]">{link.url}</span>
                    <button onClick={() => copyLink(link.url)} className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors">
                      <Copy className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                  <span className="text-gray-300 text-xs">{formatNumber(link.clicks)}</span>
                  <span className="text-gray-300 text-xs">{link.conversions}</span>
                  <span className="text-gray-300 text-xs">{link.conversionRate.toFixed(1)}%</span>
                  <span className="text-emerald-400 text-xs font-semibold">{formatCurrency(link.revenue)}</span>
                  <span className="text-purple-400 text-xs font-semibold">{formatCurrency(link.commission)}</span>
                  <TierBadge tier={link.tier} />
                  <span className="text-gray-600 text-xs">{link.createdAt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Payout Management */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Payout Management</h3>
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-[#1a1a2e]">
            {['Influencer', 'Amount', 'Method', 'Period', 'Status', 'Action'].map((h) => (
              <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-white/3 rounded animate-pulse" />)}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {payouts.map((p) => (
                <div key={p.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] px-5 py-3.5 hover:bg-white/5 transition-colors items-center">
                  <p className="text-white text-xs font-medium">{p.influencerName}</p>
                  <p className="text-emerald-400 text-xs font-semibold">{formatCurrency(p.amount)}</p>
                  <p className="text-gray-300 text-xs">{p.method}</p>
                  <p className="text-gray-400 text-xs">{p.period}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusDot(p.status)}`} />
                    <span className="text-gray-300 text-xs capitalize">{p.status}</span>
                  </div>
                  <div>
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => processPayout(p.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors font-medium"
                      >
                        Process Payout
                      </button>
                    ) : p.status === 'paid' ? (
                      <span className="text-gray-500 text-xs">{p.processedAt}</span>
                    ) : (
                      <span className="text-blue-400 text-xs">In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 5: Performance Chart */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">30-Day Affiliate Performance</h3>
            <p className="text-gray-500 text-xs mt-0.5">Revenue and commissions trend</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-500 inline-block" />Revenue</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block" />Commissions</div>
          </div>
        </div>
        {loading ? (
          <div className="h-48 bg-white/3 rounded-lg animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeseries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" name="Revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="commissions" name="Commissions" stroke="#10b981" strokeWidth={2} fill="url(#commGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
