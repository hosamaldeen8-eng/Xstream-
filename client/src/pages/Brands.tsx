import { useEffect, useState } from 'react'
import { Plus, X, Building2, TrendingUp, Eye, Megaphone } from 'lucide-react'
import { api, formatNumber, formatCurrency } from '../lib/api'
import type { Brand } from '../types'

const BRAND_GRADIENTS = [
  'from-purple-600 to-indigo-500',
  'from-pink-600 to-rose-500',
  'from-blue-600 to-cyan-500',
  'from-emerald-600 to-teal-500',
  'from-orange-600 to-amber-500',
  'from-violet-600 to-purple-500',
  'from-red-600 to-orange-500',
  'from-cyan-600 to-blue-500',
]

function getGradient(name: string) {
  return BRAND_GRADIENTS[name.charCodeAt(0) % BRAND_GRADIENTS.length]
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Brand | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', industry: '' })

  useEffect(() => {
    api.getBrands().then(setBrands).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!form.name || !form.industry) return
    await api.createBrand(form)
    setShowModal(false)
    setForm({ name: '', industry: '' })
    const updated = await api.getBrands()
    setBrands(updated)
  }

  const totalReach = brands.reduce((a, b) => a + b.totalReach, 0)
  const totalSpend = brands.reduce((a, b) => a + b.totalSpend, 0)
  const totalCampaigns = brands.reduce((a, b) => a + b.campaigns, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Brand Directory</h2>
          <p className="text-gray-400 text-sm mt-1">
            {brands.length} brands partnered with Xstream
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Brands', value: String(brands.length), icon: Building2 },
          { label: 'Total Campaigns', value: String(totalCampaigns), icon: Megaphone },
          { label: 'Combined Reach', value: formatNumber(totalReach), icon: Eye },
          { label: 'Total Investment', value: formatCurrency(totalSpend), icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {brands.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelected(b)}
              className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 card-hover cursor-pointer"
            >
              {/* Logo + status */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient(b.name)} flex items-center justify-center text-white font-bold text-base`}
                >
                  {b.logo}
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    b.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <p className="text-white font-semibold mb-0.5">{b.name}</p>
              <p className="text-gray-500 text-xs mb-4">{b.industry}</p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1a1a2e]">
                <div>
                  <p className="text-white font-semibold text-sm">{b.campaigns}</p>
                  <p className="text-gray-500 text-xs">Campaigns</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {formatNumber(b.totalReach)}
                  </p>
                  <p className="text-gray-500 text-xs">Reach</p>
                </div>
                <div className="col-span-2">
                  <p className="text-purple-400 font-semibold text-sm">
                    {formatCurrency(b.totalSpend)}
                  </p>
                  <p className="text-gray-500 text-xs">Total Spend</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Brand Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-96 h-full bg-[#0a0a14] border-l border-[#1a1a2e] p-6 overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6 mt-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient(selected.name)} flex items-center justify-center text-white text-2xl font-bold`}
              >
                {selected.logo}
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.industry}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                    selected.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {selected.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Campaigns', value: String(selected.campaigns) },
                { label: 'Total Reach', value: formatNumber(selected.totalReach) },
                { label: 'Total Spend', value: formatCurrency(selected.totalSpend) },
                {
                  label: 'Cost / Reach',
                  value: formatCurrency(
                    selected.totalReach > 0
                      ? Math.round(selected.totalSpend / selected.totalReach * 1000)
                      : 0,
                  ) + '/K',
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4">
                  <p className="text-white text-xl font-bold">{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Create Campaign
              </button>
              <button className="w-full py-2.5 rounded-lg border border-[#1a1a2e] text-gray-300 text-sm font-medium hover:border-purple-500/30 hover:text-white transition-all">
                View All Campaigns
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Brand Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Add Brand</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Brand Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Nike"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
                  Industry *
                </label>
                <input
                  value={form.industry}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  placeholder="e.g. Sports & Fitness"
                  className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
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
                disabled={!form.name || !form.industry}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Add Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
