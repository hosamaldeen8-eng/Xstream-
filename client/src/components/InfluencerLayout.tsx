import { Outlet } from 'react-router-dom'
import InfluencerSidebar from './InfluencerSidebar'

export default function InfluencerLayout() {
  return (
    <div className="flex min-h-screen bg-[#080811]">
      <InfluencerSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
