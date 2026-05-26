import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Creators from './pages/Creators'
import Campaigns from './pages/Campaigns'
import Analytics from './pages/Analytics'
import Brands from './pages/Brands'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="creators" element={<Creators />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="brands" element={<Brands />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
