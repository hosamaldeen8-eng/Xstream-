import { Campaign } from '../types'
import { formatNumber, formatCurrency } from '../lib/api'

interface CampaignCardProps {
  campaign: Campaign
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  draft: { bg: 'bg-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-400' },
  completed: { bg: 'bg-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
  paused: { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
}

const platformIcons: Record<string, string> = {
  TikTok: '🎵',
  Instagram: '📸',
  YouTube: '▶️',
  X: '✖️',
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const config = statusConfig[campaign.status]
  const spentPct = Math.min((campaign.spent / campaign.budget) * 100, 100)

  return (
    <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">{campaign.name}</p>
          <p className="text-gray-500 text-sm">{campaign.brand}</p>
        </div>
        <span
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full shrink-0 font-medium ${config.bg} ${config.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {campaign.status}
        </span>
      </div>

      {/* Platforms */}
      <div className="flex gap-1 mb-4">
        {campaign.platforms.map((p) => (
          <span
            key={p}
            className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400"
          >
            {platformIcons[p] || p} {p}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-white font-semibold">{campaign.creatorsCount}</p>
          <p className="text-gray-500 text-xs">Creators</p>
        </div>
        <div>
          <p className="text-white font-semibold">{formatNumber(campaign.reach)}</p>
          <p className="text-gray-500 text-xs">Reach</p>
        </div>
        <div>
          <p className="text-white font-semibold">
            {(campaign.engagement / 1000).toFixed(1)}K
          </p>
          <p className="text-gray-500 text-xs">Engagements</p>
        </div>
      </div>

      {/* Budget progress */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Budget spent</span>
          <span className="text-white">
            {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all"
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <p className="text-gray-600 text-xs mt-1">
          {campaign.startDate} → {campaign.endDate}
        </p>
      </div>
    </div>
  )
}
