import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SellerLayout from './components/SellerLayout'
import InfluencerLayout from './components/InfluencerLayout'
import Landing from './pages/Landing'
// admin pages
import Dashboard from './pages/Dashboard'
import Creators from './pages/Creators'
import Campaigns from './pages/Campaigns'
import Analytics from './pages/Analytics'
import Brands from './pages/Brands'
// seller pages
import SellerDashboard from './pages/seller/SellerDashboard'
import InfluencerMarketplace from './pages/seller/InfluencerMarketplace'
import VideoPackages from './pages/seller/VideoPackages'
import SellerCampaigns from './pages/seller/SellerCampaigns'
import RevenueSharing from './pages/seller/RevenueSharing'
import SellerCompetitions from './pages/seller/SellerCompetitions'
// influencer pages
import InfluencerDashboard from './pages/influencer/InfluencerDashboard'
import Opportunities from './pages/influencer/Opportunities'
import ContentSubmission from './pages/influencer/ContentSubmission'
import AffiliatePerformance from './pages/influencer/AffiliatePerformance'
import ContentResources from './pages/influencer/ContentResources'
import CompetitionHub from './pages/influencer/CompetitionHub'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="marketplace" element={<InfluencerMarketplace />} />
          <Route path="packages" element={<VideoPackages />} />
          <Route path="campaigns" element={<SellerCampaigns />} />
          <Route path="affiliate" element={<RevenueSharing />} />
          <Route path="competitions" element={<SellerCompetitions />} />
        </Route>
        <Route path="/influencer" element={<InfluencerLayout />}>
          <Route index element={<InfluencerDashboard />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="content" element={<ContentSubmission />} />
          <Route path="affiliate" element={<AffiliatePerformance />} />
          <Route path="resources" element={<ContentResources />} />
          <Route path="competitions" element={<CompetitionHub />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
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
