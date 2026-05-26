export interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'X';
  niche: string;
  followers: number;
  engagementRate: number;
  avgViews: number;
  status: 'active' | 'inactive' | 'pending';
  avatar: string; // initials placeholder
  campaigns: number;
  country: string;
}

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  creatorsCount: number;
  reach: number;
  engagement: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  contentType: 'short-form' | 'long-form' | 'story' | 'mixed';
}

export interface Brand {
  id: string;
  name: string;
  industry: string;
  campaigns: number;
  totalSpend: number;
  totalReach: number;
  status: 'active' | 'inactive';
  logo: string;
}

export interface AnalyticsOverview {
  totalCreators: number;
  activeCampaigns: number;
  totalReach: number;
  avgEngagement: number;
  contentPiecesDeployed: number;
  brandsServed: number;
}

export interface TimeSeriesPoint {
  date: string;
  reach: number;
  engagement: number;
  content: number;
}

export interface PlatformStats {
  platform: string;
  creators: number;
  reach: number;
  engagement: number;
}

export interface NicheStats {
  niche: string;
  creators: number;
  avgEngagement: number;
  totalReach: number;
}
