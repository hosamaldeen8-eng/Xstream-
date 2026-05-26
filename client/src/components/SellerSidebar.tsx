import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Video,
  Megaphone,
  Link,
  Trophy,
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
    <aside className="w-64 min-h-screen bg-[#090909] border-r border-[#1a1a1e] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#1a1a1e]">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Xstream" className="w-28 h-auto object-contain" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
        <p className="text-[#4a5a6a] text-[10px] tracking-[0.25em] uppercase mt-1">Seller Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[#3a3a4a] text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
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
                  ? 'bg-[#1a2535] text-[#8898b8] border border-[#2a4060]/50'
                  : 'text-[#5a5a6a] hover:text-[#8898a8] hover:bg-white/3'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a2535] text-[#7888a8] border border-[#2a4060]/50 font-bold tracking-wider">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a1a1e]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#1a2535] border border-[#2a4060]/50 flex items-center justify-center text-[#7888a8] text-xs font-bold">
            SA
          </div>
          <div className="min-w-0">
            <p className="text-[#9898a8] text-sm font-medium truncate">Seller Account</p>
            <p className="text-[#4a4a5a] text-xs truncate">Brand Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
