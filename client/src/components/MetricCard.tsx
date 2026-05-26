import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  subValue?: string
  icon: LucideIcon
  trend?: number
  gradient?: boolean
}

export default function MetricCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  gradient = false,
}: MetricCardProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div
      className={`relative rounded-xl p-5 card-hover overflow-hidden ${
        gradient
          ? 'bg-gradient-to-br from-purple-600/20 to-indigo-500/10 border border-purple-500/20'
          : 'bg-[#0f0f1a] border border-[#1a1a2e]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider truncate">
            {label}
          </p>
          <p
            className={`text-2xl font-bold mt-1.5 ${
              gradient ? 'text-white' : 'text-white'
            }`}
          >
            {value}
          </p>
          {subValue && (
            <p className="text-gray-500 text-xs mt-1 truncate">{subValue}</p>
          )}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-semibold ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-gray-600 text-xs">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ml-3 ${
            gradient
              ? 'bg-purple-500/30'
              : 'bg-gradient-to-br from-purple-600/20 to-indigo-500/20'
          }`}
        >
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
      </div>
    </div>
  )
}
