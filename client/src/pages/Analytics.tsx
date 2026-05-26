import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUp, Eye, Users, Zap } from 'lucide-react'
import { api, formatNumber, formatPercent } from '../lib/api'
import type { TimeSeriesPoint, PlatformStats, NicheStats, AnalyticsOverview } from '../types'

const PIE_COLORS = ['#7c3aed', '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#12121e] border border-[#1a1a2e] rounded-lg p-3 text-xs shadow-xl">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-semibold mt-1" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([])
  const [platforms, setPlatforms] = useState<PlatformStats[]>([])
  const [niches, setNiches] = useState<NicheStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getAnalyticsOverview(),
      api.getTimeSeries(),
      api.getPlatformStats(),
      api.getNicheStats(),
    ])
      .then(([ov, ts, pl, ni]) => {
        setOverview(ov)
        setTimeSeries(ts)
        setPlatforms(pl)
        setNiches(ni)
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-gray-400 text-sm mt-1">
          Market intelligence across your creator network
        </p>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {overview && [
          {
            label: 'Total Reach',
            value: formatNumber(overview.totalReach),
            icon: Eye,
            trend: '+23%',
            positive: true,
          },
          {
            label: 'Avg Engagement',
            value: formatPercent(overview.avgEngagement),
            icon: TrendingUp,
            trend: '+4%',
            positive: true,
          },
          {
            label: 'Active Creators',
            value: formatNumber(overview.totalCreators),
            icon: Users,
            trend: '+12%',
            positive: true,
          },
          {
            label: 'Content Pieces',
            value: formatNumber(overview.contentPiecesDeployed),
            icon: Zap,
            trend: '+18%',
            positive: true,
          },
        ].map(({ label, value, icon: Icon, trend, positive }) => (
          <div
            key={label}
            className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Icon size={18} className="text-purple-400" />
              </div>
              <span className={`text-xs font-semibold ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Reach + Engagement time series */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Reach & Engagement Over Time</h3>
            <p className="text-gray-500 text-xs mt-0.5">30-day daily performance</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={timeSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="aReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aEng" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
            <Legend
              wrapperStyle={{ color: '#9ca3af', fontSize: 12, paddingTop: 12 }}
            />
            <Area
              type="monotone"
              dataKey="reach"
              name="Reach"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#aReach)"
            />
            <Area
              type="monotone"
              dataKey="engagement"
              name="Engagement"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#aEng)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Platform + Niche charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Platform BarChart */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-1">Platform Distribution</h3>
          <p className="text-gray-500 text-xs mb-6">Creators & reach by platform</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={platforms} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis
                dataKey="platform"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="reach" name="Reach" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="creators" name="Creators" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Niche PieChart */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-1">Niche Breakdown</h3>
          <p className="text-gray-500 text-xs mb-4">Creator distribution by content niche</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie
                  data={niches}
                  dataKey="creators"
                  nameKey="niche"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {niches.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#12121e',
                    border: '1px solid #1a1a2e',
                    borderRadius: 8,
                    fontSize: 12,
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {niches.map((n, i) => (
                <div key={n.niche} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <p className="text-gray-400 text-xs truncate">{n.niche}</p>
                  <p className="text-white text-xs font-semibold ml-auto">{n.creators}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engagement rate trend */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-1">Engagement Rate Trend</h3>
        <p className="text-gray-500 text-xs mb-6">Daily engagement rate across all creators</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={timeSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
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
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="content"
              name="Content pieces"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
