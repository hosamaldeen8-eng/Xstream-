import { Creator } from '../types'
import { formatNumber, formatPercent } from '../lib/api'

interface CreatorCardProps {
  creator: Creator
  onClick?: (creator: Creator) => void
}

const platformColors: Record<string, string> = {
  TikTok: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Instagram: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  YouTube: 'bg-red-500/20 text-red-400 border-red-500/30',
  X: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400',
  inactive: 'bg-gray-500/20 text-gray-400',
  pending: 'bg-amber-500/20 text-amber-400',
}

const avatarGradients = [
  'from-purple-600 to-indigo-500',
  'from-pink-600 to-rose-500',
  'from-blue-600 to-cyan-500',
  'from-emerald-600 to-teal-500',
  'from-orange-600 to-amber-500',
  'from-violet-600 to-purple-500',
]

function getGradient(name: string): string {
  const idx = name.charCodeAt(0) % avatarGradients.length
  return avatarGradients[idx]
}

export default function CreatorCard({ creator, onClick }: CreatorCardProps) {
  const gradient = getGradient(creator.name)

  return (
    <div
      className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 card-hover cursor-pointer"
      onClick={() => onClick?.(creator)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shrink-0`}
        >
          {creator.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold truncate">{creator.name}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusColors[creator.status]}`}
            >
              {creator.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm truncate">{creator.handle}</p>
        </div>
      </div>

      {/* Platform & Niche */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${platformColors[creator.platform]}`}
        >
          {creator.platform}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
          {creator.niche}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-white font-semibold text-sm">
            {formatNumber(creator.followers)}
          </p>
          <p className="text-gray-500 text-xs">Followers</p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {formatPercent(creator.engagementRate)}
          </p>
          <p className="text-gray-500 text-xs">Engagement</p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {creator.campaigns}
          </p>
          <p className="text-gray-500 text-xs">Campaigns</p>
        </div>
      </div>

      {/* Country */}
      <div className="mt-3 pt-3 border-t border-[#1a1a2e]">
        <p className="text-gray-500 text-xs">
          {creator.country} · {formatNumber(creator.avgViews)} avg views
        </p>
      </div>
    </div>
  )
}
