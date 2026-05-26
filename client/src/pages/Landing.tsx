import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Shield, ArrowRight } from 'lucide-react'

const portals = [
  {
    title: 'Seller Portal',
    description: 'Discover & manage influencer collaborations that drive sales. Access the marketplace, video packages, and affiliate program.',
    icon: ShoppingBag,
    border: 'border-[#2a3a5a]/60',
    glow: 'hover:border-[#4a6a9a]/60',
    badgeColor: 'bg-[#2a3a5a]/40 text-[#8898c8] border-[#3a5a8a]/40',
    buttonClass: 'bg-[#1e2a42] hover:bg-[#263352] border border-[#3a5070]/60 text-[#a0b4d8]',
    iconBg: 'bg-[#1e2a42] border border-[#3a5070]/50',
    iconColor: 'text-[#8898c8]',
    to: '/seller',
    badge: 'For Brands',
  },
  {
    title: 'Influencer Portal',
    description: 'Find brand deals, earn affiliate income, and grow your audience. Apply to opportunities and track your earnings.',
    icon: Star,
    border: 'border-[#2a4a3a]/60',
    glow: 'hover:border-[#4a8a6a]/60',
    badgeColor: 'bg-[#2a4a3a]/40 text-[#88c8a8] border-[#3a7a5a]/40',
    buttonClass: 'bg-[#1e3028] hover:bg-[#263d32] border border-[#3a6050]/60 text-[#a0c8b4]',
    iconBg: 'bg-[#1e3028] border border-[#3a6050]/50',
    iconColor: 'text-[#88c8a8]',
    to: '/influencer',
    badge: 'For Creators',
  },
  {
    title: 'Admin Portal',
    description: 'Platform management, creator verification, campaign oversight, and comprehensive analytics across the network.',
    icon: Shield,
    border: 'border-[#2a2a3a]/60',
    glow: 'hover:border-[#5a5a7a]/60',
    badgeColor: 'bg-[#2a2a3a]/40 text-[#9898b8] border-[#4a4a6a]/40',
    buttonClass: 'bg-[#1e1e2e] hover:bg-[#26263a] border border-[#404060]/60 text-[#9898b8]',
    iconBg: 'bg-[#1e1e2e] border border-[#404060]/50',
    iconColor: 'text-[#9898b8]',
    to: '/admin',
    badge: 'Platform Staff',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 py-16">
      {/* Subtle steel vignette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#2a2a3a]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#1a2a3a]/8 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center mb-3 relative">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Xstream" className="w-36 h-36 object-contain" style={{ filter: 'brightness(0.95) contrast(1.05)' }} />
        <p className="text-[#5a5a6a] text-xs tracking-[0.3em] uppercase mt-1">Marketing Agency · Business Solutions</p>
      </div>

      {/* Hero text */}
      <div className="text-center mb-12 relative max-w-2xl">
        <h2 className="text-3xl font-bold text-[#d0d0e0] mt-6 mb-4 leading-tight tracking-wide uppercase">
          Choose Your Portal
        </h2>
        <p className="text-[#6a6a7a] text-base leading-relaxed">
          Connecting brands with top creators through intelligent campaigns,
          affiliate programs, and competition-driven growth.
        </p>
      </div>

      {/* Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl relative">
        {portals.map((portal) => {
          const Icon = portal.icon
          return (
            <div
              key={portal.to}
              className={`bg-[#0d0d14] border ${portal.border} ${portal.glow} rounded-xl p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
            >
              <div className="mb-5">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border tracking-wider uppercase ${portal.badgeColor}`}>
                  {portal.badge}
                </span>
              </div>

              <div className={`w-12 h-12 rounded-lg ${portal.iconBg} flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${portal.iconColor}`} />
              </div>

              <h3 className="text-[#c8c8d8] text-lg font-bold mb-3 tracking-wide">{portal.title}</h3>

              <p className="text-[#5a5a6a] text-sm leading-relaxed flex-1 mb-7">
                {portal.description}
              </p>

              <Link
                to={portal.to}
                className={`${portal.buttonClass} font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200`}
              >
                Enter Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )
        })}
      </div>

      <p className="text-[#3a3a4a] text-xs mt-10 relative tracking-widest uppercase">
        Xstream &copy; 2025 &nbsp;·&nbsp; Creator Commerce Platform
      </p>
    </div>
  )
}
