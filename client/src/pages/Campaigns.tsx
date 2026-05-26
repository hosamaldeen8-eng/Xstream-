import { useEffect, useState } from 'react'
import { Plus, X, Megaphone, Play, CheckCircle, PauseCircle, FileEdit } from 'lucide-react'
import CampaignCard from '../components/CampaignCard'
import { api, formatNumber, formatCurrency } from '../lib/api'
import type { Campaign } from '../types'

const STATUS_FILTERS = ['All', 'active', 'completed', 'draft', 'paused'] as const

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '',
    brand: '',
    budget: '',
    contentType: 'short-form',
    platforms: [] as string[],
  })

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string> = {}
    if (statusFilter !== 'All') params.status = statusFilter
    api
      .getCampaigns(params)
      .then(setCampaigns)
      .finally(() => setLoading(false))
  }, [statusFilter])

  const counts = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === 'active').length,
    completed: campaigns.filter((c) => c.status === 'completed').length,
    draft: campaigns.filter((c) => c.status === 'draft').length,
    paused: campaigns.filter((c) => c.status === 'paused').length,
  }

  const togglePlatform = (p: string) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter((x) => x !== p) : [...f.platforms, p],
    }))
  }

  const handleCreate = async () => {
    if (!form.name || !form.brand) return
    await api.createCampaign({
      ...form,
      budget: Number(form.budget) || 10000,
    })
    setShowModal(false)
    setForm({ name: '', brand: '', budget: '', contentType: 'short-form', platforms: [] })
    const updated = await api.getCampaigns()
    setCampaigns(updated)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Campaigns</h2>
          <p className="text-gray-400 text-sm mt-1">Deploy and manage creator campaigns at scale</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Campaign
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total', value: counts.total, icon: Megaphone, color: 'text-gray-400' },
          { label: 'Active', value: counts.active, icon: Play, color: 'text-emerald-400' },
          { label: 'Completed', value: counts.completed, icon: CheckCircle, color: 'text-blue-400' },
          { label: 'Draft', value: counts.draft, icon: FileEdit, color: 'text-gray-400' },
          { label: 'Paused', value: counts.paused, icon: PauseCircle, color: 'text-amber-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4 flex items-center gap-3"
          >
            <Icon size={20} className={color} />
            <div>
              <p className="text-white font-bold text-lg leading-none">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 bg-[#0f0f1a] border border-[#1a1a2e] rounded-lg p-1 w-fit mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
              statusFilter === s
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaign grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No campaigns found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}

      {/* Summary bar */}
      {campaigns.length > 0 && (
        <div className="mt-6 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-semibold">{campaigns.length}</span> campaigns
          </p>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-500">Total Reach: </span>
              <span className="text-white font-semibold">
                {formatNumber(campaigns.reduce((a, c) => a + c.reach, 0))}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Total Budget: </span>
              <span className="text-white font-semibold">
                {formatCurrency(campaigns.reduce((a, c) => a + c.budget, 0))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">New Campaign</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Campaign Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Summer Product Launch"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Brand *
                </label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                  placeholder="e.g. Nike"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Budget (USD)
                </label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                  placeholder="50000"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Content Type
                </label>
                <select
                  value={form.contentType}
                  onChange={(e) => setForm((f) => ({ ...f, contentType: e.target.value }))}
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 cursor-pointer"
                >
                  {['short-form', 'long-form', 'story', 'mixed'].map((t) => (
                    <option key={t} value={t} className="bg-[#12121e]">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Platforms
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['TikTok', 'Instagram', 'YouTube', 'X'].map((p) => (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        form.platforms.includes(p)
                          ? 'bg-purple-600/30 border-purple-500/50 text-purple-300'
                          : 'bg-transparent border-[#1a1a2e] text-gray-400 hover:border-purple-500/30'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#1a1a2e] text-gray-300 text-sm font-medium hover:border-purple-500/30 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.name || !form.brand}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
