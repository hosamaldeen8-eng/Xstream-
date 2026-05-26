import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart3,
  Building2,
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/creators', label: 'Creators', icon: Users },
  { to: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/brands', label: 'Brands', icon: Building2 },
]

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#090909] border-r border-[#1a1a1e] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#1a1a1e]">
        <img src="/logo.png" alt="Xstream" className="w-28 h-auto object-contain" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
        <p className="text-[#4a4a5a] text-[10px] tracking-[0.25em] uppercase mt-1">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[#3a3a4a] text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          Management
        </p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#1e1e2e] text-[#9898b8] border border-[#3a3a5a]/50'
                  : 'text-[#5a5a6a] hover:text-[#9898a8] hover:bg-white/3'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a1a1e]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#1e1e2e] border border-[#3a3a5a]/50 flex items-center justify-center text-[#7a7a9a] text-xs font-bold">
            XA
          </div>
          <div className="min-w-0">
            <p className="text-[#9898a8] text-sm font-medium truncate">Xstream Admin</p>
            <p className="text-[#4a4a5a] text-xs truncate">Platform Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
