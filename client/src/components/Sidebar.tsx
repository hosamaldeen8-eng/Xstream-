import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart3,
  Building2,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/creators', label: 'Creators', icon: Users },
  { to: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/brands', label: 'Brands', icon: Building2 },
]

export default function Sidebar() {
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
            <p className="text-gray-500 text-xs mt-0.5">Creator Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'nav-active text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a1a2e]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            XA
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Xstream Admin</p>
            <p className="text-gray-500 text-xs truncate">Platform Manager</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
