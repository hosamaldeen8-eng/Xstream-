import { Outlet } from 'react-router-dom'
import SellerSidebar from './SellerSidebar'

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-[#080811]">
      <SellerSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
