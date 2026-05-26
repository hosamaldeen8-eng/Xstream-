import { useEffect, useState } from 'react'
import { X, Check, Video } from 'lucide-react'
import type { VideoPackage } from '../../types'

function platformColor(p: string) {
  const map: Record<string, string> = {
    TikTok: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    Instagram: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    YouTube: 'bg-red-500/20 text-red-400 border-red-500/30',
    'Multi-Platform': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  }
  return map[p] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

function goalColor(g: string) {
  const map: Record<string, string> = {
    awareness: 'bg-sky-500/20 text-sky-400',
    traffic: 'bg-yellow-500/20 text-yellow-400',
    sales: 'bg-emerald-500/20 text-emerald-400',
  }
  return map[g] || 'bg-gray-500/20 text-gray-400'
}

export default function VideoPackages() {
  const [packages, setPackages] = useState<VideoPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<VideoPackage | null>(null)
  const [bookingGoal, setBookingGoal] = useState('')
  const [script, setScript] = useState('')
  const [deadline, setDeadline] = useState('')
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/packages')
      .then((r) => r.json())
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  function openModal(pkg: VideoPackage) {
    setSelected(pkg)
    setBookingGoal(pkg.goal)
    setScript('')
    setDeadline('')
    setBooked(false)
  }

  async function handleBook() {
    if (!selected) return
    await fetch('http://localhost:5000/api/packages/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId: selected.id, goal: bookingGoal, script }),
    })
    setBooked(true)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Video Packages</h2>
        <p className="text-gray-400 text-sm mt-1">Launch your campaign with curated video bundles</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#0f0f1a] border rounded-xl p-6 flex flex-col relative ${
                pkg.popular
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'border-[#1a1a2e] hover:border-purple-500/30'
              } transition-all duration-200`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${platformColor(pkg.platform)}`}>
                    {pkg.platform}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${goalColor(pkg.goal)}`}>
                  {pkg.goal}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Video className="w-4 h-4 text-purple-400" />
                <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">{pkg.videosCount} videos · {pkg.deliveryDays} day delivery</p>

              {/* Pricing */}
              <div className="bg-[#080811] rounded-lg p-3 mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">${pkg.pricePerVideo}</span>
                  <span className="text-gray-500 text-sm">/video</span>
                </div>
                <p className="text-purple-400 text-sm font-semibold mt-1">Total: ${pkg.totalPrice.toLocaleString()}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal(pkg)}
                className={`w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 shadow-lg shadow-purple-500/20'
                    : 'bg-white/10 hover:bg-white/15 border border-white/10'
                }`}
              >
                Book Package
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
            {booked ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Package Booked!</h3>
                <p className="text-gray-400 text-sm mb-6">Your {selected.name} package has been confirmed. Estimated delivery: {selected.deliveryDays} days.</p>
                <button onClick={() => setSelected(null)} className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">Book: {selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#080811] rounded-lg p-4 mb-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{selected.videosCount} videos</span>
                    <span className="text-white font-semibold">${selected.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery</span>
                    <span className="text-purple-400">{selected.deliveryDays} days</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Campaign Goal</label>
                    <select
                      value={bookingGoal}
                      onChange={(e) => setBookingGoal(e.target.value)}
                      className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                    >
                      <option value="awareness">Brand Awareness</option>
                      <option value="traffic">Drive Traffic</option>
                      <option value="sales">Boost Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Deadline (optional)</label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-2">Script / Brief (optional)</label>
                    <textarea
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      placeholder="Provide key talking points, call-to-action, brand guidelines..."
                      rows={4}
                      className="w-full bg-[#080811] border border-[#1a1a2e] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors border border-[#1a1a2e]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBook}
                    className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold transition-all duration-200"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
