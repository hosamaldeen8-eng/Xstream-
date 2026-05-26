export interface AffiliateLink {
  id: string;
  influencerId: string;
  influencerName: string;
  campaignId: string;
  productName: string;
  brand: string;
  url: string;
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  commission: number;
  commissionRate: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  createdAt: string;
}

export interface Payout {
  id: string;
  influencerId: string;
  influencerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid';
  method: 'Bank Transfer' | 'PayPal' | 'Crypto';
  period: string;
  processedAt?: string;
}

export interface CommissionTier {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  minRevenue: number;
  commissionBonus: number;
  color: string;
}

export interface Competition {
  id: string;
  title: string;
  brand: string;
  prize: string;
  prizeAmount: number;
  deadline: string;
  daysLeft: number;
  participants: number;
  status: 'active' | 'upcoming' | 'ended';
  metric: 'views' | 'conversions' | 'revenue';
  leaderboard: { rank: number; name: string; handle: string; score: number; prize?: string }[];
}

export interface VideoPackage {
  id: string;
  name: string;
  videosCount: number;
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Multi-Platform';
  pricePerVideo: number;
  totalPrice: number;
  deliveryDays: number;
  goal: 'awareness' | 'traffic' | 'sales';
  features: string[];
  popular?: boolean;
}

export interface Opportunity {
  id: string;
  brand: string;
  product: string;
  category: string;
  platforms: string[];
  contentType: 'short-form' | 'long-form' | 'story' | 'mixed';
  fixedFee: number;
  commissionRate: number;
  deadline: string;
  applicants: number;
  status: 'open' | 'applied' | 'accepted' | 'closed';
  description: string;
  aiRecommended?: boolean;
}

export interface ContentSubmission {
  id: string;
  campaignName: string;
  brand: string;
  platform: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'revision_requested';
  submittedAt?: string;
  feedback?: string;
  dueDate: string;
  payment: number;
}

export interface InfluencerEarnings {
  totalEarned: number;
  pendingPayout: number;
  thisMonth: number;
  lastMonth: number;
  totalClicks: number;
  totalConversions: number;
  avgCommissionRate: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTierRevenue: number;
}
