import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Users, Megaphone, Eye, TrendingUp, FileText, Building2 } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import { api, formatNumber, formatPercent, formatCurrency } from '../lib/api'
import type { AnalyticsOverview, TimeSeriesPoint, Campaign, Creator } from '../types'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#12121e] border border-[#1a1a2e] rounded-lg p-3 text-xs shadow-xl">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([])
  const [topCampaigns, setTopCampaigns] = useState<Campaign[]>([])
  const [topCreators, setTopCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getAnalyticsOverview(),
      api.getTimeSeries(),
      api.getCampaigns({ status: 'active' }),
      api.getCreators({ status: 'active' }),
    ])
      .then(([ov, ts, camps, creators]) => {
        setOverview(ov)
        setTimeSeries(ts)
        setTopCampaigns(camps.slice(0, 5))
        setTopCreators(creators.slice(0, 5))
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const metrics = overview
    ? [
        {
          label: 'Total Creators',
          value: formatNumber(overview.totalCreators),
          subValue: 'Across all platforms',
          icon: Users,
          trend: 12,
          gradient: true,
        },
        {
          label: 'Active Campaigns',
          value: String(overview.activeCampaigns),
          subValue: 'Currently running',
          icon: Megaphone,
          trend: 8,
        },
        {
          label: 'Total Reach',
          value: formatNumber(overview.totalReach),
          subValue: 'Cumulative audience',
          icon: Eye,
          trend: 23,
        },
        {
          label: 'Avg Engagement',
          value: formatPercent(overview.avgEngagement),
          subValue: 'Platform average',
          icon: TrendingUp,
          trend: 4,
        },
        {
          label: 'Content Deployed',
          value: formatNumber(overview.contentPiecesDeployed),
          subValue: 'Pieces published',
          icon: FileText,
          trend: 18,
        },
        {
          label: 'Brands Served',
          value: String(overview.brandsServed),
          subValue: 'Active partnerships',
          icon: Building2,
          trend: 6,
        },
      ]
    : []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
        <p className="text-gray-400 text-sm mt-1">
          Real-time intelligence across your creator network
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Charts + Lists row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Reach trend chart — 2 cols */}
        <div className="col-span-2 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Reach Trend</h3>
              <p className="text-gray-500 text-xs mt-0.5">Daily reach over last 30 days</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Last 30 days
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="reach"
                name="Reach"
                stroke="#7c3aed"
                strokeWidth={2}
                fill="url(#reachGrad)"
              />
              <Area
                type="monotone"
                dataKey="engagement"
                name="Engagement"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#engGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Campaigns + Creators — 1 col */}
        <div className="flex flex-col gap-4">
          {/* Top Campaigns */}
          <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex-1">
            <h3 className="text-white font-semibold mb-4 text-sm">Top Campaigns</h3>
            <div className="space-y-3">
              {topCampaigns.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs">{c.brand}</p>
                  </div>
                  <span className="text-purple-400 text-xs font-semibold shrink-0">
                    {formatNumber(c.reach)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Creators */}
          <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex-1">
            <h3 className="text-white font-semibold mb-4 text-sm">Top Creators</h3>
            <div className="space-y-3">
              {topCreators.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs">{formatNumber(c.followers)} followers</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold shrink-0">
                    {formatPercent(c.engagementRate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
