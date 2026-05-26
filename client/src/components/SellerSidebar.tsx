import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Video,
  Megaphone,
  Link,
  Trophy,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/seller', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/seller/marketplace', label: 'Marketplace', icon: Search },
  { to: '/seller/packages', label: 'Video Packages', icon: Video },
  { to: '/seller/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/seller/affiliate', label: 'Affiliate Program', icon: Link, badge: 'LIVE' },
  { to: '/seller/competitions', label: 'Competitions', icon: Trophy },
]

export default function SellerSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#0a0a14] border-r border-[#1a1a2e] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#1a1a2e]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Xstream</h1>
            <p className="text-purple-400 text-xs mt-0.5">Seller Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Seller Menu
        </p>
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/seller'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a1a2e]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            SA
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Seller Account</p>
            <p className="text-gray-500 text-xs truncate">Brand Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
