import { useEffect, useState } from 'react'
import { Plus, Eye, PauseCircle, X, Check } from 'lucide-react'
import { formatCurrency } from '../../lib/api'
import type { Campaign } from '../../types'

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return map[status] || 'bg-gray-500/20 text-gray-400'
}

function platformBadge(p: string) {
  const map: Record<string, string> = {
    TikTok: 'bg-pink-500/20 text-pink-400',
    Instagram: 'bg-purple-500/20 text-purple-400',
    YouTube: 'bg-red-500/20 text-red-400',
    X: 'bg-sky-500/20 text-sky-400',
  }
  return map[p] || 'bg-gray-500/20 text-gray-400'
}

export default function SellerCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', brand: '', budget: '', platforms: 'TikTok', contentType: 'short-form' })

  useEffect(() => {
    fetch('http://localhost:5000/api/campaigns')
      .then((r) => r.json())
      .then(setCampaigns)
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false))
  }, [])

  const counts = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    draft: campaigns.filter(c => c.status === 'draft').length,
  }

  async function handleCreate() {
    await fetch('http://localhost:5000/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, budget: Number(form.budget), platforms: [form.platforms] }),
    })
    const updated = await fetch('http://localhost:5000/api/campaigns').then(r => r.json())
    setCampaigns(updated)
    setShowModal(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Campaigns</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your influencer campaigns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: counts.total, color: 'text-white' },
          { label: 'Active', value: counts.active, color: 'text-emerald-400' },
          { label: 'Completed', value: counts.completed, color: 'text-blue-400' },
          { label: 'Pending Review', value: counts.draft, color: 'text-yellow-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr] px-5 py-3 border-b border-[#1a1a2e]">
          {['Campaign', 'Creators', 'Platforms', 'Budget', 'Status', 'CTR', 'Actions'].map((h) => (
            <span key={h} className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-white/3 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a2e]">
            {campaigns.map((c) => {
              const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0
              const ctr = c.reach > 0 ? ((c.engagement / c.reach) * 100).toFixed(2) : '0.00'
              return (
                <div key={c.id} className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1fr] px-5 py-4 hover:bg-white/5 transition-colors items-center">
                  <div>
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    <p className="text-gray-500 text-xs">{c.brand}</p>
                  </div>
                  <span className="text-gray-300 text-sm">{c.creatorsCount}</span>
                  <div className="flex flex-wrap gap-1">
                    {c.platforms.map((p) => (
                      <span key={p} className={`text-xs px-1.5 py-0.5 rounded font-medium ${platformBadge(p)}`}>{p}</span>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{pct}%</span>
                      <span className="text-xs text-gray-500">{formatCurrency(c.spent)}/{formatCurrency(c.budget)}</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border w-fit capitalize ${statusBadge(c.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {c.status}
                  </span>
                  <span className="text-gray-300 text-sm">{ctr}%</span>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    {c.status === 'active' && (
                      <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <PauseCircle className="w-3.5 h-3.5 text-yellow-400" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* New Campaign Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">New Campaign</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Campaign Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Summer Blitz 2024"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Brand</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  placeholder="e.g. Nike"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Budget ($)</label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="50000"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-1.5">Platform</label>
                <select
                  value={form.platforms}
                  onChange={(e) => setForm({ ...form, platforms: e.target.value })}
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                >
                  {['TikTok', 'Instagram', 'YouTube', 'X'].map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-white/5 text-gray-400 text-sm font-medium border border-[#1a1a2e] hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-semibold hover:from-purple-500 hover:to-indigo-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
