import { useEffect, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Copy, DollarSign, MousePointerClick, ShoppingCart, TrendingUp } from 'lucide-react'
import { formatCurrency, formatNumber } from '../../lib/api'
import type { AffiliateLink, Payout, InfluencerEarnings } from '../../types'

const tierColors: Record<string, string> = {
  Bronze: '#cd7f32',
  Silver: '#c0c0c0',
  Gold: '#ffd700',
  Platinum: '#e5e4e2',
}
const tierBg: Record<string, string> = {
  Bronze: 'bg-amber-700/10 border-amber-600/20',
  Silver: 'bg-gray-400/10 border-gray-400/20',
  Gold: 'bg-yellow-500/10 border-yellow-500/20',
  Platinum: 'bg-slate-300/10 border-slate-300/20',
}

const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum']
const tierRevenue = [0, 1000, 5000, 20000]
const tierRates = [8, 10, 12, 15]

function TierBadge({ tier }: { tier: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${tierBg[tier]}`} style={{ color: tierColors[tier] }}>
      {tier}
    </span>
  )
}

function statusDot(s: string) {
  const m: Record<string, string> = { pending: 'bg-yellow-400', processing: 'bg-blue-400', paid: 'bg-emerald-400' }
  return m[s] || 'bg-gray-400'
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

export default function AffiliatePerformance() {
  const [earnings, setEarnings] = useState<InfluencerEarnings | null>(null)
  const [links, setLinks] = useState<AffiliateLink[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [timeseries, setTimeseries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/affiliate/earnings').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/links').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/payouts').then(r => r.json()),
      fetch('http://localhost:5000/api/affiliate/timeseries').then(r => r.json()),
    ])
      .then(([e, l, p, ts]) => {
        setEarnings(e)
        setLinks(l)
        setPayouts(p)
        setTimeseries(ts)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const currentTierIdx = earnings ? tierOrder.indexOf(earnings.currentTier) : 0
  const nextTier = tierOrder[currentTierIdx + 1]
  const nextRevenue = nextTier ? tierRevenue[currentTierIdx + 1] : tierRevenue[currentTierIdx]
  const tierProgress = earnings && nextTier
    ? Math.min(((earnings.thisMonth - tierRevenue[currentTierIdx]) / (nextRevenue - tierRevenue[currentTierIdx])) * 100, 100)
    : 100

  const topProducts = [...links].sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  async function requestPayout(id: string) {
    await fetch(`http://localhost:5000/api/affiliate/payouts/${id}/request`, { method: 'PATCH' })
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'processing' as const } : p))
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(`https://${url}`)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Affiliate Earnings</h2>
        <p className="text-gray-400 text-sm mt-1">Your complete affiliate performance and earnings overview</p>
      </div>

      {/* Section 1: Earnings Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {loading ? (
          [...Array(6)].map((_, i) => <div key={i} className="h-24 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />)
        ) : earnings && [
          { label: 'Total Earned', value: formatCurrency(earnings.totalEarned), icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Pending Payout', value: formatCurrency(earnings.pendingPayout), icon: TrendingUp, color: 'text-yellow-400' },
          { label: 'This Month', value: formatCurrency(earnings.thisMonth), icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Avg Conv. Rate', value: `${earnings.avgCommissionRate}%`, icon: TrendingUp, color: 'text-purple-400' },
          { label: 'Total Clicks', value: formatNumber(earnings.totalClicks), icon: MousePointerClick, color: 'text-blue-400' },
          { label: 'Total Conversions', value: formatNumber(earnings.totalConversions), icon: ShoppingCart, color: 'text-pink-400' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
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

      {/* Section 2: Tier Progress */}
      {earnings && (
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Affiliate Tier & Progress</h3>
          <div className={`bg-[#0f0f1a] border ${tierBg[earnings.currentTier]} rounded-xl p-6 mb-4`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <TierBadge tier={earnings.currentTier} />
                  <span className="text-gray-500 text-sm">Current Tier</span>
                </div>
                <p className="text-white text-2xl font-bold">{tierRates[currentTierIdx]}% Commission Rate</p>
                {nextTier && (
                  <p className="text-gray-400 text-sm mt-1">
                    {formatCurrency(nextRevenue - earnings.thisMonth)} more to reach <span style={{ color: tierColors[nextTier] }}>{nextTier}</span>
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-0.5">This Month Revenue</p>
                <p className="text-white text-3xl font-black">{formatCurrency(earnings.thisMonth)}</p>
              </div>
            </div>
            {nextTier && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{earnings.currentTier} ({formatCurrency(tierRevenue[currentTierIdx])})</span>
                  <span>{nextTier} ({formatCurrency(nextRevenue)})</span>
                </div>
                <div className="h-3 bg-[#080811] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${tierProgress}%`,
                      background: `linear-gradient(to right, ${tierColors[earnings.currentTier]}, ${tierColors[nextTier]})`,
                    }}
                  />
                </div>
                <p className="text-right text-xs mt-1" style={{ color: tierColors[earnings.currentTier] }}>
                  {Math.round(tierProgress)}% to {nextTier}
                </p>
              </div>
            )}
          </div>

          {/* Tier progression bar */}
          <div className="grid grid-cols-4 gap-2">
            {tierOrder.map((tier, i) => (
              <div key={tier} className={`rounded-lg p-3 border text-center ${
                tier === earnings.currentTier ? tierBg[tier] : 'bg-[#0f0f1a] border-[#1a1a2e]'
              }`}>
                <p className="font-bold text-sm" style={{ color: tierColors[tier] }}>{tier}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tierRates[i]}% + {i === 0 ? 'base' : `${i}% bonus`}</p>
                <p className="text-xs text-gray-600 mt-0.5">{i === 0 ? 'Start' : `$${tierRevenue[i].toLocaleString()}+`}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Affiliate Links */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Your Affiliate Links</h3>
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.6fr_0.8fr] px-5 py-3 border-b border-[#1a1a2e]">
            {['Product', 'Link + QR', 'Clicks', 'Conv.', 'Conv. %', 'Earned', 'Tier', 'Share'].map((h) => (
              <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-white/3 rounded animate-pulse" />)}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {links.slice(0, 8).map((link) => (
                <div key={link.id} className="grid grid-cols-[1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.6fr_0.8fr] px-5 py-3.5 hover:bg-white/5 transition-colors items-center">
                  <div>
                    <p className="text-white text-xs font-medium truncate">{link.productName}</p>
                    <p className="text-gray-500 text-xs">{link.brand}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-xs font-mono truncate max-w-[90px]">{link.url}</span>
                    <button onClick={() => copyLink(link.url)} className="p-1 rounded hover:bg-white/10 transition-colors shrink-0">
                      <Copy className="w-3 h-3 text-gray-500" />
                    </button>
                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-xs text-gray-500 shrink-0 font-mono">
                      QR
                    </div>
                  </div>
                  <span className="text-gray-300 text-xs">{formatNumber(link.clicks)}</span>
                  <span className="text-gray-300 text-xs">{link.conversions}</span>
                  <span className="text-gray-300 text-xs">{link.conversionRate.toFixed(1)}%</span>
                  <span className="text-emerald-400 text-xs font-semibold">{formatCurrency(link.commission)}</span>
                  <TierBadge tier={link.tier} />
                  <button className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium">
                    Share
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Earnings Timeline */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">30-Day Earnings Timeline</h3>
            <p className="text-gray-500 text-xs mt-0.5">Daily commissions + fixed fees stacked</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block" />Commissions</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-400 inline-block" />Fixed Fees</div>
          </div>
        </div>
        {loading ? (
          <div className="h-48 bg-white/3 rounded-lg animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeseries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="commGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="commissions" name="Commissions" stroke="#10b981" strokeWidth={2} fill="url(#commGrad2)" stackId="1" />
              <Area type="monotone" dataKey="fixedFees" name="Fixed Fees" stroke="#2dd4bf" strokeWidth={2} fill="url(#feesGrad)" stackId="1" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Section 5: Payout History */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Payout History</h3>
          {earnings && earnings.pendingPayout > 0 && (
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200">
              <DollarSign className="w-4 h-4" />
              Request Payout ({formatCurrency(earnings?.pendingPayout ?? 0)})
            </button>
          )}
        </div>
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-[#1a1a2e]">
            {['Period', 'Amount', 'Method', 'Status', 'Date Paid'].map((h) => (
              <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-white/3 rounded animate-pulse" />)}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {payouts.slice(0, 6).map((p) => (
                <div key={p.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] px-5 py-3.5 hover:bg-white/5 transition-colors items-center">
                  <span className="text-gray-300 text-sm">{p.period}</span>
                  <span className="text-emerald-400 font-semibold text-sm">{formatCurrency(p.amount)}</span>
                  <span className="text-gray-400 text-sm">{p.method}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusDot(p.status)}`} />
                    <span className="text-gray-300 text-sm capitalize">{p.status}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{p.processedAt || (p.status === 'pending' ? (
                    <button onClick={() => requestPayout(p.id)} className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                      Request
                    </button>
                  ) : '—')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 6: Top Converting Products */}
      <div>
        <h3 className="text-white font-semibold mb-4">Top Converting Products</h3>
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5">
          <div className="space-y-3">
            {loading ? (
              [...Array(5)].map((_, i) => <div key={i} className="h-12 bg-white/3 rounded-lg animate-pulse" />)
            ) : (
              topProducts.map((link, i) => (
                <div key={link.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#080811]">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    i === 1 ? 'bg-gray-400/20 text-gray-300' :
                    i === 2 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-white/5 text-gray-500'
                  }`}>
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{link.productName}</p>
                    <p className="text-gray-500 text-xs">{link.brand}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-300 text-xs">{formatNumber(link.clicks)}</p>
                    <p className="text-gray-600 text-xs">clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-300 text-xs">{link.conversionRate.toFixed(1)}%</p>
                    <p className="text-gray-600 text-xs">conv.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold text-sm">{formatCurrency(link.commission)}</p>
                    <p className="text-gray-600 text-xs">earned</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
