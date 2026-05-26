const BASE_URL = 'http://localhost:5000/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Creators
  getCreators: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<any[]>(`/creators${qs}`)
  },
  getCreator: (id: string) => request<any>(`/creators/${id}`),
  createCreator: (data: any) =>
    request<any>('/creators', { method: 'POST', body: JSON.stringify(data) }),
  updateCreatorStatus: (id: string, status: string) =>
    request<any>(`/creators/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Campaigns
  getCampaigns: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<any[]>(`/campaigns${qs}`)
  },
  getCampaign: (id: string) => request<any>(`/campaigns/${id}`),
  createCampaign: (data: any) =>
    request<any>('/campaigns', { method: 'POST', body: JSON.stringify(data) }),

  // Analytics
  getAnalyticsOverview: () => request<any>('/analytics/overview'),
  getTimeSeries: () => request<any[]>('/analytics/timeseries'),
  getPlatformStats: () => request<any[]>('/analytics/platforms'),
  getNicheStats: () => request<any[]>('/analytics/niches'),

  // Brands
  getBrands: () => request<any[]>('/brands'),
  getBrand: (id: string) => request<any>(`/brands/${id}`),
  createBrand: (data: any) =>
    request<any>('/brands', { method: 'POST', body: JSON.stringify(data) }),
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
