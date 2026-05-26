import * as mock from './mockData'

// Simulate async API — returns data with no network required
const delay = <T>(data: T): Promise<T> => Promise.resolve(data)

export const api = {
  getCreators: (params?: Record<string, string>) => {
    let data = [...mock.creators]
    if (params?.platform) data = data.filter(c => c.platform === params.platform)
    if (params?.niche) data = data.filter(c => c.niche === params.niche)
    if (params?.status) data = data.filter(c => c.status === params.status)
    return delay(data)
  },
  getCreator: (id: string) => delay(mock.creators.find(c => c.id === id)),

  getCampaigns: (params?: Record<string, string>) => {
    let data = [...mock.campaigns]
    if (params?.status) data = data.filter(c => c.status === params.status)
    if (params?.brand) data = data.filter(c => c.brand === params.brand)
    return delay(data)
  },
  getCampaign: (id: string) => delay(mock.campaigns.find(c => c.id === id)),
  createCampaign: (data: unknown) => delay({ id: `camp${Date.now()}`, ...data as object }),

  getAnalyticsOverview: () => delay(mock.analyticsOverview),
  getTimeSeries: () => delay(mock.timeseries),
  getPlatformStats: () => delay(mock.platformStats),
  getNicheStats: () => delay(mock.nicheStats),

  getBrands: () => delay(mock.brands),
  getBrand: (id: string) => delay(mock.brands.find(b => b.id === id)),
  createBrand: (data: unknown) => delay({ id: `b${Date.now()}`, ...data as object }),

  getAffiliateLinks: () => delay(mock.affiliateLinks),
  getPayouts: () => delay(mock.payouts),
  getAffiliateEarnings: () => delay(mock.influencerEarnings),
  getCommissionTiers: () => delay(mock.commissionTiers),
  getAffiliateTimeseries: () => delay(mock.timeseries),

  getCompetitions: (params?: Record<string, string>) => {
    let data = [...mock.competitions]
    if (params?.status) data = data.filter(c => c.status === params.status)
    return delay(data)
  },

  getPackages: () => delay(mock.videoPackages),

  getOpportunities: (params?: Record<string, string>) => {
    let data = [...mock.opportunities]
    if (params?.status) data = data.filter(o => o.status === params.status)
    if (params?.platform) data = data.filter(o => o.platforms.includes(params.platform))
    return delay(data)
  },

  getSubmissions: () => delay(mock.contentSubmissions),
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`
}
