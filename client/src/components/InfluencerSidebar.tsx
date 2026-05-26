import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Sparkles,
  Film,
  TrendingUp,
  BookOpen,
  Trophy,
} from 'lucide-react'

const navItems = [
  { to: '/influencer', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/influencer/opportunities', label: 'Opportunities', icon: Sparkles },
  { to: '/influencer/content', label: 'Content Studio', icon: Film },
  { to: '/influencer/affiliate', label: 'Affiliate Earnings', icon: TrendingUp, badge: 'LIVE' },
  { to: '/influencer/resources', label: 'Resources', icon: BookOpen },
  { to: '/influencer/competitions', label: 'Competitions', icon: Trophy },
]

export default function InfluencerSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#090909] border-r border-[#1a1a1e] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#1a1a1e]">
        <img src="/logo.png" alt="Xstream" className="w-28 h-auto object-contain" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
        <p className="text-[#4a6a5a] text-[10px] tracking-[0.25em] uppercase mt-1">Creator Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[#3a3a4a] text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          Creator Menu
        </p>
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/influencer'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#1a2820] text-[#78b898] border border-[#2a5040]/50'
                  : 'text-[#5a5a6a] hover:text-[#78a888] hover:bg-white/3'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a2820] text-[#68a878] border border-[#2a5040]/50 font-bold tracking-wider">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a1a1e]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#1a2820] border border-[#2a5040]/50 flex items-center justify-center text-[#68a878] text-xs font-bold">
            CA
          </div>
          <div className="min-w-0">
            <p className="text-[#9898a8] text-sm font-medium truncate">Creator Account</p>
            <p className="text-[#4a4a5a] text-xs truncate">Influencer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
