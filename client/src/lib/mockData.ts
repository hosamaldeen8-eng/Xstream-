// All mock data embedded client-side — no backend required

export const creators = [
  { id:'c1', name:'Mia Chen', handle:'@mia.creates', platform:'TikTok' as const, niche:'Beauty', followers:4200000, engagementRate:6.8, avgViews:3100000, status:'active' as const, avatar:'MC', campaigns:12, country:'US' },
  { id:'c2', name:'Jordan Rivers', handle:'@jordanriversfit', platform:'Instagram' as const, niche:'Fitness', followers:2800000, engagementRate:5.2, avgViews:980000, status:'active' as const, avatar:'JR', campaigns:8, country:'UK' },
  { id:'c3', name:'Tyler Knox', handle:'@techknox', platform:'YouTube' as const, niche:'Tech', followers:1750000, engagementRate:4.1, avgViews:890000, status:'active' as const, avatar:'TK', campaigns:6, country:'CA' },
  { id:'c4', name:'Sophia Blanc', handle:'@sophiablanc', platform:'Instagram' as const, niche:'Fashion', followers:3600000, engagementRate:3.9, avgViews:720000, status:'active' as const, avatar:'SB', campaigns:15, country:'FR' },
  { id:'c5', name:'Marcus Webb', handle:'@marcuswebb_x', platform:'X' as const, niche:'Finance', followers:890000, engagementRate:7.3, avgViews:620000, status:'active' as const, avatar:'MW', campaigns:4, country:'US' },
  { id:'c6', name:'Ava Torres', handle:'@avatravels', platform:'TikTok' as const, niche:'Travel', followers:5100000, engagementRate:5.8, avgViews:4200000, status:'active' as const, avatar:'AT', campaigns:9, country:'AU' },
  { id:'c7', name:'Elijah Park', handle:'@elijahparkgames', platform:'YouTube' as const, niche:'Gaming', followers:3200000, engagementRate:4.6, avgViews:2100000, status:'active' as const, avatar:'EP', campaigns:7, country:'KR' },
  { id:'c8', name:'Nadia Shah', handle:'@nadiafoods', platform:'Instagram' as const, niche:'Food', followers:1900000, engagementRate:6.1, avgViews:850000, status:'active' as const, avatar:'NS', campaigns:11, country:'IN' },
  { id:'c9', name:'Caleb Frost', handle:'@calebfrost', platform:'TikTok' as const, niche:'Comedy', followers:7800000, engagementRate:7.9, avgViews:6500000, status:'active' as const, avatar:'CF', campaigns:5, country:'US' },
  { id:'c10', name:'Lena Müller', handle:'@lena.wellness', platform:'Instagram' as const, niche:'Wellness', followers:1200000, engagementRate:5.4, avgViews:480000, status:'active' as const, avatar:'LM', campaigns:6, country:'DE' },
  { id:'c11', name:'Devon Archer', handle:'@devonarcherstyle', platform:'TikTok' as const, niche:'Fashion', followers:2300000, engagementRate:6.2, avgViews:1900000, status:'pending' as const, avatar:'DA', campaigns:2, country:'US' },
  { id:'c12', name:'Priya Nair', handle:'@priyatech', platform:'YouTube' as const, niche:'Tech', followers:980000, engagementRate:3.7, avgViews:540000, status:'active' as const, avatar:'PN', campaigns:3, country:'IN' },
  { id:'c13', name:'Sam Okafor', handle:'@samokafor', platform:'X' as const, niche:'Politics', followers:620000, engagementRate:8.1, avgViews:410000, status:'inactive' as const, avatar:'SO', campaigns:1, country:'NG' },
  { id:'c14', name:'Isabelle Cheng', handle:'@isabelledraws', platform:'Instagram' as const, niche:'Art', followers:870000, engagementRate:5.9, avgViews:310000, status:'active' as const, avatar:'IC', campaigns:4, country:'TW' },
  { id:'c15', name:'Ryan Holloway', handle:'@ryanholloway', platform:'YouTube' as const, niche:'Fitness', followers:2100000, engagementRate:4.3, avgViews:1400000, status:'active' as const, avatar:'RH', campaigns:8, country:'US' },
  { id:'c16', name:'Zara Kline', handle:'@zarakline', platform:'TikTok' as const, niche:'Beauty', followers:3900000, engagementRate:7.1, avgViews:3400000, status:'active' as const, avatar:'ZK', campaigns:14, country:'BR' },
  { id:'c17', name:'Oliver Grant', handle:'@olivergrant', platform:'X' as const, niche:'Finance', followers:430000, engagementRate:6.5, avgViews:280000, status:'pending' as const, avatar:'OG', campaigns:0, country:'US' },
  { id:'c18', name:'Fatima Al-Rashid', handle:'@fatimalifestyle', platform:'Instagram' as const, niche:'Lifestyle', followers:1650000, engagementRate:4.8, avgViews:590000, status:'active' as const, avatar:'FA', campaigns:7, country:'AE' },
  { id:'c19', name:'Ben Nakamura', handle:'@ben.games', platform:'YouTube' as const, niche:'Gaming', followers:4600000, engagementRate:3.5, avgViews:2800000, status:'active' as const, avatar:'BN', campaigns:6, country:'JP' },
  { id:'c20', name:'Chloe Dupont', handle:'@chloefoods', platform:'TikTok' as const, niche:'Food', followers:2700000, engagementRate:6.6, avgViews:2300000, status:'active' as const, avatar:'CD', campaigns:5, country:'FR' },
  { id:'c21', name:'Liam Santos', handle:'@liamsantosvlogs', platform:'YouTube' as const, niche:'Travel', followers:1380000, engagementRate:4.9, avgViews:920000, status:'active' as const, avatar:'LS', campaigns:3, country:'PT' },
  { id:'c22', name:'Harper Kim', handle:'@harperkim', platform:'Instagram' as const, niche:'Wellness', followers:760000, engagementRate:5.7, avgViews:290000, status:'inactive' as const, avatar:'HK', campaigns:2, country:'US' },
]

export const campaigns = [
  { id:'camp1', name:'Summer Glow 2024', brand:'Luminos Beauty', status:'active' as const, creatorsCount:18, reach:42000000, engagement:2800000, budget:180000, spent:112000, startDate:'2024-06-01', endDate:'2024-08-31', platforms:['TikTok','Instagram'], contentType:'short-form' as const },
  { id:'camp2', name:'FitLife Challenge', brand:'NovaPulse Sports', status:'active' as const, creatorsCount:12, reach:28000000, engagement:1900000, budget:95000, spent:61000, startDate:'2024-05-15', endDate:'2024-07-15', platforms:['Instagram','YouTube'], contentType:'mixed' as const },
  { id:'camp3', name:'TechDrop Q2', brand:'Orbital Devices', status:'completed' as const, creatorsCount:8, reach:15000000, engagement:890000, budget:75000, spent:75000, startDate:'2024-04-01', endDate:'2024-05-31', platforms:['YouTube','X'], contentType:'long-form' as const },
  { id:'camp4', name:'Street Style SS24', brand:'Vaultline Apparel', status:'active' as const, creatorsCount:22, reach:61000000, engagement:4100000, budget:250000, spent:138000, startDate:'2024-03-20', endDate:'2024-09-20', platforms:['TikTok','Instagram'], contentType:'mixed' as const },
  { id:'camp5', name:'Midnight Snack Drop', brand:'CrunchCo Foods', status:'completed' as const, creatorsCount:15, reach:38000000, engagement:3200000, budget:120000, spent:120000, startDate:'2024-02-01', endDate:'2024-03-31', platforms:['TikTok'], contentType:'short-form' as const },
  { id:'camp6', name:'Wanderlust 2024', brand:'Skyward Travel', status:'paused' as const, creatorsCount:10, reach:22000000, engagement:1500000, budget:140000, spent:58000, startDate:'2024-04-10', endDate:'2024-10-10', platforms:['Instagram','YouTube'], contentType:'long-form' as const },
  { id:'camp7', name:'Finance 101 Series', brand:'Meridian Capital', status:'active' as const, creatorsCount:6, reach:8500000, engagement:720000, budget:55000, spent:29000, startDate:'2024-05-01', endDate:'2024-07-31', platforms:['X','YouTube'], contentType:'long-form' as const },
  { id:'camp8', name:'Seasonal Wellness Reset', brand:'Bloom Health', status:'draft' as const, creatorsCount:0, reach:0, engagement:0, budget:80000, spent:0, startDate:'2024-07-01', endDate:'2024-09-30', platforms:['Instagram'], contentType:'story' as const },
  { id:'camp9', name:'GameOn Launch', brand:'Nexus Interactive', status:'active' as const, creatorsCount:9, reach:31000000, engagement:2400000, budget:160000, spent:87000, startDate:'2024-05-20', endDate:'2024-08-20', platforms:['YouTube','TikTok'], contentType:'mixed' as const },
  { id:'camp10', name:'Clean Beauty Pledge', brand:'Luminos Beauty', status:'draft' as const, creatorsCount:0, reach:0, engagement:0, budget:100000, spent:0, startDate:'2024-08-01', endDate:'2024-10-31', platforms:['TikTok','Instagram'], contentType:'short-form' as const },
  { id:'camp11', name:'Art & Culture Festival', brand:'Canvas Collective', status:'completed' as const, creatorsCount:14, reach:18000000, engagement:1600000, budget:70000, spent:70000, startDate:'2024-01-15', endDate:'2024-03-15', platforms:['Instagram'], contentType:'story' as const },
]

export const brands = [
  { id:'b1', name:'Luminos Beauty', industry:'Beauty & Cosmetics', campaigns:3, totalSpend:280000, totalReach:91000000, status:'active' as const, logo:'LB' },
  { id:'b2', name:'NovaPulse Sports', industry:'Sports & Fitness', campaigns:2, totalSpend:155000, totalReach:48000000, status:'active' as const, logo:'NP' },
  { id:'b3', name:'Orbital Devices', industry:'Consumer Technology', campaigns:2, totalSpend:110000, totalReach:27000000, status:'active' as const, logo:'OD' },
  { id:'b4', name:'Vaultline Apparel', industry:'Fashion & Streetwear', campaigns:1, totalSpend:250000, totalReach:61000000, status:'active' as const, logo:'VA' },
  { id:'b5', name:'CrunchCo Foods', industry:'Food & Beverage', campaigns:1, totalSpend:120000, totalReach:38000000, status:'inactive' as const, logo:'CC' },
  { id:'b6', name:'Skyward Travel', industry:'Travel & Hospitality', campaigns:1, totalSpend:140000, totalReach:22000000, status:'active' as const, logo:'ST' },
  { id:'b7', name:'Meridian Capital', industry:'Finance & Fintech', campaigns:1, totalSpend:55000, totalReach:8500000, status:'active' as const, logo:'MC' },
  { id:'b8', name:'Bloom Health', industry:'Health & Wellness', campaigns:1, totalSpend:80000, totalReach:0, status:'active' as const, logo:'BH' },
  { id:'b9', name:'Nexus Interactive', industry:'Gaming & Entertainment', campaigns:1, totalSpend:160000, totalReach:31000000, status:'active' as const, logo:'NI' },
  { id:'b10', name:'Canvas Collective', industry:'Arts & Culture', campaigns:1, totalSpend:70000, totalReach:18000000, status:'inactive' as const, logo:'CAN' },
]

function makeSeries() {
  const days = []
  const now = new Date('2024-06-25')
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i)
    const date = d.toISOString().split('T')[0]
    const reach = Math.floor(4200000 + Math.sin(i * 0.4) * 1200000 + i * 80000)
    const engagement = Math.floor(reach * 0.055)
    const content = Math.floor(120 + Math.cos(i * 0.3) * 30 + i * 2)
    const commissions = Math.floor(120 + Math.sin(i * 0.5) * 80 + i * 4)
    const fixedFees = Math.floor(80 + Math.cos(i * 0.3) * 60 + i * 3)
    days.push({ date, reach, engagement, content, commissions, fixedFees, total: commissions + fixedFees })
  }
  return days
}
export const timeseries = makeSeries()

export const platformStats = [
  { platform:'TikTok', creators:6, reach:195000000, engagement:14800000 },
  { platform:'Instagram', creators:7, reach:142000000, engagement:8200000 },
  { platform:'YouTube', creators:6, reach:98000000, engagement:5100000 },
  { platform:'X', creators:3, reach:22000000, engagement:1800000 },
]

export const nicheStats = [
  { niche:'Beauty', creators:3, avgEngagement:6.9, totalReach:112000000 },
  { niche:'Fashion', creators:3, avgEngagement:5.1, totalReach:76000000 },
  { niche:'Gaming', creators:2, avgEngagement:4.1, totalReach:78000000 },
  { niche:'Fitness', creators:2, avgEngagement:4.8, totalReach:49000000 },
  { niche:'Travel', creators:2, avgEngagement:5.4, totalReach:64000000 },
  { niche:'Food', creators:2, avgEngagement:6.4, totalReach:46000000 },
  { niche:'Finance', creators:2, avgEngagement:6.9, totalReach:13000000 },
  { niche:'Tech', creators:2, avgEngagement:3.9, totalReach:28000000 },
  { niche:'Wellness', creators:2, avgEngagement:5.6, totalReach:20000000 },
  { niche:'Other', creators:4, avgEngagement:5.5, totalReach:32000000 },
]

export const analyticsOverview = {
  totalCreators: 22, activeCampaigns: 5, totalReach: 457000000,
  avgEngagement: 5.6, contentPiecesDeployed: 4820, brandsServed: 10,
}

export const affiliateLinks = [
  { id:'afl1', influencerId:'c1', influencerName:'Mia Chen', campaignId:'camp1', productName:'Luminos Glow Serum', brand:'Luminos Beauty', url:'xstream.io/aff/mc-glow-001', clicks:4820, conversions:289, conversionRate:5.99, revenue:14450, commission:1734, commissionRate:12, tier:'Gold' as const, createdAt:'2024-05-01' },
  { id:'afl2', influencerId:'c2', influencerName:'Jordan Rivers', campaignId:'camp2', productName:'NovaPulse Protein Powder', brand:'NovaPulse Sports', url:'xstream.io/aff/jr-nova-002', clicks:3210, conversions:198, conversionRate:6.17, revenue:9900, commission:990, commissionRate:10, tier:'Silver' as const, createdAt:'2024-05-15' },
  { id:'afl3', influencerId:'c4', influencerName:'Sophia Blanc', campaignId:'camp4', productName:'Vaultline Limited Drop Hoodie', brand:'Vaultline Apparel', url:'xstream.io/aff/sb-vault-003', clicks:4100, conversions:246, conversionRate:6.0, revenue:18450, commission:2214, commissionRate:12, tier:'Gold' as const, createdAt:'2024-03-25' },
  { id:'afl4', influencerId:'c6', influencerName:'Ava Torres', campaignId:'camp6', productName:'Skyward Premium Luggage', brand:'Skyward Travel', url:'xstream.io/aff/at-sky-004', clicks:2890, conversions:115, conversionRate:3.98, revenue:8625, commission:690, commissionRate:8, tier:'Bronze' as const, createdAt:'2024-04-12' },
  { id:'afl5', influencerId:'c9', influencerName:'Caleb Frost', campaignId:'camp5', productName:'CrunchCo Snack Variety Pack', brand:'CrunchCo Foods', url:'xstream.io/aff/cf-crunch-005', clicks:5000, conversions:400, conversionRate:8.0, revenue:8000, commission:800, commissionRate:10, tier:'Silver' as const, createdAt:'2024-02-05' },
  { id:'afl6', influencerId:'c16', influencerName:'Zara Kline', campaignId:'camp1', productName:'Luminos Matte Foundation', brand:'Luminos Beauty', url:'xstream.io/aff/zk-lum-006', clicks:4650, conversions:302, conversionRate:6.49, revenue:22650, commission:3397, commissionRate:15, tier:'Platinum' as const, createdAt:'2024-05-03' },
  { id:'afl7', influencerId:'c8', influencerName:'Nadia Shah', campaignId:'camp5', productName:'HelloFresh Meal Kit', brand:'HelloFresh', url:'xstream.io/aff/ns-hf-007', clicks:1980, conversions:89, conversionRate:4.49, revenue:5340, commission:427, commissionRate:8, tier:'Bronze' as const, createdAt:'2024-02-10' },
  { id:'afl8', influencerId:'c7', influencerName:'Elijah Park', campaignId:'camp9', productName:'Nexus Gaming Headset Pro', brand:'Nexus Interactive', url:'xstream.io/aff/ep-nexus-008', clicks:3750, conversions:187, conversionRate:4.99, revenue:18700, commission:2244, commissionRate:12, tier:'Gold' as const, createdAt:'2024-05-22' },
  { id:'afl9', influencerId:'c3', influencerName:'Tyler Knox', campaignId:'camp3', productName:'Orbital Pro Smartwatch', brand:'Orbital Devices', url:'xstream.io/aff/tk-orb-009', clicks:2640, conversions:105, conversionRate:3.98, revenue:15750, commission:1260, commissionRate:8, tier:'Bronze' as const, createdAt:'2024-04-05' },
  { id:'afl10', influencerId:'c10', influencerName:'Lena Müller', campaignId:'camp8', productName:'Bloom Daily Wellness Bundle', brand:'Bloom Health', url:'xstream.io/aff/lm-bloom-010', clicks:1450, conversions:87, conversionRate:6.0, revenue:3045, commission:243, commissionRate:8, tier:'Bronze' as const, createdAt:'2024-06-01' },
  { id:'afl11', influencerId:'c14', influencerName:'Isabelle Cheng', campaignId:'camp11', productName:'Canvas Art Supply Kit', brand:'Canvas Collective', url:'xstream.io/aff/ic-canvas-011', clicks:980, conversions:49, conversionRate:5.0, revenue:2450, commission:196, commissionRate:8, tier:'Bronze' as const, createdAt:'2024-01-20' },
  { id:'afl12', influencerId:'c5', influencerName:'Marcus Webb', campaignId:'camp7', productName:'Meridian Invest Starter Pack', brand:'Meridian Capital', url:'xstream.io/aff/mw-mer-012', clicks:2100, conversions:168, conversionRate:8.0, revenue:12600, commission:1512, commissionRate:12, tier:'Gold' as const, createdAt:'2024-05-05' },
  { id:'afl13', influencerId:'c18', influencerName:'Fatima Al-Rashid', campaignId:'camp4', productName:'Gymshark Seamless Leggings', brand:'Gymshark', url:'xstream.io/aff/fa-gym-013', clicks:3300, conversions:198, conversionRate:6.0, revenue:9900, commission:990, commissionRate:10, tier:'Silver' as const, createdAt:'2024-03-28' },
  { id:'afl14', influencerId:'c20', influencerName:'Chloe Dupont', campaignId:'camp5', productName:'Nike Air Zoom Running Shoes', brand:'Nike', url:'xstream.io/aff/cd-nike-014', clicks:4200, conversions:210, conversionRate:5.0, revenue:21000, commission:3150, commissionRate:15, tier:'Platinum' as const, createdAt:'2024-02-15' },
  { id:'afl15', influencerId:'c15', influencerName:'Ryan Holloway', campaignId:'camp2', productName:'NovaPulse Pre-Workout', brand:'NovaPulse Sports', url:'xstream.io/aff/rh-nova-015', clicks:2750, conversions:165, conversionRate:6.0, revenue:8250, commission:825, commissionRate:10, tier:'Silver' as const, createdAt:'2024-05-18' },
]

export const payouts = [
  { id:'pay1', influencerId:'c1', influencerName:'Mia Chen', amount:1734, status:'paid' as const, method:'Bank Transfer' as const, period:'May 2024', processedAt:'2024-06-02' },
  { id:'pay2', influencerId:'c16', influencerName:'Zara Kline', amount:3397, status:'paid' as const, method:'PayPal' as const, period:'May 2024', processedAt:'2024-06-02' },
  { id:'pay3', influencerId:'c4', influencerName:'Sophia Blanc', amount:2214, status:'processing' as const, method:'Bank Transfer' as const, period:'May 2024' },
  { id:'pay4', influencerId:'c8', influencerName:'Nadia Shah', amount:427, status:'paid' as const, method:'PayPal' as const, period:'April 2024', processedAt:'2024-05-03' },
  { id:'pay5', influencerId:'c7', influencerName:'Elijah Park', amount:2244, status:'pending' as const, method:'Crypto' as const, period:'May 2024' },
  { id:'pay6', influencerId:'c5', influencerName:'Marcus Webb', amount:1512, status:'pending' as const, method:'Bank Transfer' as const, period:'May 2024' },
  { id:'pay7', influencerId:'c20', influencerName:'Chloe Dupont', amount:3150, status:'paid' as const, method:'PayPal' as const, period:'April 2024', processedAt:'2024-05-04' },
  { id:'pay8', influencerId:'c15', influencerName:'Ryan Holloway', amount:825, status:'pending' as const, method:'Bank Transfer' as const, period:'May 2024' },
  { id:'pay9', influencerId:'c2', influencerName:'Jordan Rivers', amount:990, status:'processing' as const, method:'PayPal' as const, period:'May 2024' },
  { id:'pay10', influencerId:'c6', influencerName:'Ava Torres', amount:690, status:'paid' as const, method:'Crypto' as const, period:'April 2024', processedAt:'2024-05-05' },
]

export const commissionTiers = [
  { tier:'Bronze' as const, minRevenue:0, commissionBonus:0, color:'#cd7f32' },
  { tier:'Silver' as const, minRevenue:1000, commissionBonus:1, color:'#c0c0c0' },
  { tier:'Gold' as const, minRevenue:5000, commissionBonus:2, color:'#ffd700' },
  { tier:'Platinum' as const, minRevenue:20000, commissionBonus:3, color:'#e5e4e2' },
]

export const competitions = [
  { id:'comp1', title:'Summer Beauty Blitz', brand:'Luminos Beauty', prize:'$5,000 + Brand Ambassador Deal', prizeAmount:5000, deadline:'2024-07-31', daysLeft:36, participants:84, status:'active' as const, metric:'conversions' as const, leaderboard:[{rank:1,name:'Zara Kline',handle:'@zarakline',score:302,prize:'$2,500'},{rank:2,name:'Mia Chen',handle:'@mia.creates',score:289,prize:'$1,500'},{rank:3,name:'Chloe Dupont',handle:'@chloefoods',score:198,prize:'$1,000'},{rank:4,name:'Sophia Blanc',handle:'@sophiablanc',score:176},{rank:5,name:'Fatima Al-Rashid',handle:'@fatimalifestyle',score:142}] },
  { id:'comp2', title:'Fitness King/Queen Challenge', brand:'NovaPulse Sports', prize:'$3,000 + Lifetime Supply', prizeAmount:3000, deadline:'2024-07-15', daysLeft:20, participants:61, status:'active' as const, metric:'revenue' as const, leaderboard:[{rank:1,name:'Jordan Rivers',handle:'@jordanriversfit',score:9900,prize:'$1,500'},{rank:2,name:'Ryan Holloway',handle:'@ryanholloway',score:8250,prize:'$1,000'},{rank:3,name:'Lena Müller',handle:'@lena.wellness',score:6100,prize:'$500'},{rank:4,name:'Harper Kim',handle:'@harperkim',score:4800},{rank:5,name:'Devon Archer',handle:'@devonarcherstyle',score:3200}] },
  { id:'comp3', title:'Tech Unbox Viral Race', brand:'Orbital Devices', prize:'$2,500 + Latest Devices', prizeAmount:2500, deadline:'2024-08-10', daysLeft:46, participants:38, status:'active' as const, metric:'views' as const, leaderboard:[{rank:1,name:'Tyler Knox',handle:'@techknox',score:2100000,prize:'$1,250'},{rank:2,name:'Priya Nair',handle:'@priyatech',score:1840000,prize:'$750'},{rank:3,name:'Elijah Park',handle:'@elijahparkgames',score:1620000,prize:'$500'},{rank:4,name:'Ben Nakamura',handle:'@ben.games',score:1390000},{rank:5,name:'Sam Okafor',handle:'@samokafor',score:980000}] },
  { id:'comp4', title:'Street Style Showdown', brand:'Vaultline Apparel', prize:'$4,000 + Wardrobe', prizeAmount:4000, deadline:'2024-08-01', daysLeft:7, participants:112, status:'upcoming' as const, metric:'conversions' as const, leaderboard:[] },
  { id:'comp5', title:'Food Creator Cup', brand:'CrunchCo Foods', prize:'$1,500 + Year Supply', prizeAmount:1500, deadline:'2024-07-20', daysLeft:25, participants:47, status:'upcoming' as const, metric:'views' as const, leaderboard:[] },
  { id:'comp6', title:'Finance Educator Award', brand:'Meridian Capital', prize:'$2,000 Cash', prizeAmount:2000, deadline:'2024-07-25', daysLeft:30, participants:22, status:'upcoming' as const, metric:'conversions' as const, leaderboard:[] },
  { id:'comp7', title:'Travel Vlog Grand Prix', brand:'Skyward Travel', prize:'$3,500 + Free Flights', prizeAmount:3500, deadline:'2024-04-30', daysLeft:0, participants:73, status:'ended' as const, metric:'views' as const, leaderboard:[{rank:1,name:'Ava Torres',handle:'@avatravels',score:4200000,prize:'$1,750'},{rank:2,name:'Liam Santos',handle:'@liamsantosvlogs',score:3100000,prize:'$1,050'},{rank:3,name:'Sophia Blanc',handle:'@sophiablanc',score:2600000,prize:'$700'},{rank:4,name:'Fatima Al-Rashid',handle:'@fatimalifestyle',score:1900000},{rank:5,name:'Harper Kim',handle:'@harperkim',score:1400000}] },
  { id:'comp8', title:'Gaming Content King', brand:'Nexus Interactive', prize:'$5,000 + Gaming Setup', prizeAmount:5000, deadline:'2024-05-31', daysLeft:0, participants:95, status:'ended' as const, metric:'revenue' as const, leaderboard:[{rank:1,name:'Elijah Park',handle:'@elijahparkgames',score:18700,prize:'$2,500'},{rank:2,name:'Ben Nakamura',handle:'@ben.games',score:14200,prize:'$1,500'},{rank:3,name:'Tyler Knox',handle:'@techknox',score:11800,prize:'$1,000'},{rank:4,name:'Priya Nair',handle:'@priyatech',score:7600},{rank:5,name:'Sam Okafor',handle:'@samokafor',score:4200}] },
]

export const videoPackages = [
  { id:'pkg1', name:'TikTok Spark', videosCount:3, platform:'TikTok' as const, pricePerVideo:150, totalPrice:450, deliveryDays:7, goal:'awareness' as const, features:['3 x 15-30s short-form videos','Trending audio integration','Caption & hashtag optimization','One revision round'], popular:false },
  { id:'pkg2', name:'TikTok Dominator', videosCount:10, platform:'TikTok' as const, pricePerVideo:200, totalPrice:2000, deliveryDays:21, goal:'sales' as const, features:['10 x mixed-length videos','Duet & stitch strategy','A/B tested hooks','Affiliate link integration','Performance report','Unlimited revisions'], popular:true },
  { id:'pkg3', name:'Instagram Story Blitz', videosCount:5, platform:'Instagram' as const, pricePerVideo:180, totalPrice:900, deliveryDays:10, goal:'traffic' as const, features:['5 x Story + Reel combos','Swipe-up link CTA','Custom sticker overlays','Two revision rounds'], popular:false },
  { id:'pkg4', name:'Instagram Growth Engine', videosCount:8, platform:'Instagram' as const, pricePerVideo:250, totalPrice:2000, deliveryDays:18, goal:'sales' as const, features:['8 x Reels + carousel combos','Collab post strategy','Shopping tag integration','Influencer story takeover','Monthly analytics report'], popular:true },
  { id:'pkg5', name:'YouTube Deep Dive', videosCount:2, platform:'YouTube' as const, pricePerVideo:600, totalPrice:1200, deliveryDays:28, goal:'awareness' as const, features:['2 x 8-15 min long-form videos','SEO-optimized title & description','End-screen affiliate links','Pinned comment strategy','Thumbnail A/B test','One revision round'], popular:false },
  { id:'pkg6', name:'Multi-Platform Launch', videosCount:12, platform:'Multi-Platform' as const, pricePerVideo:350, totalPrice:4200, deliveryDays:30, goal:'sales' as const, features:['4 TikTok + 4 Instagram + 2 YouTube + 2 X','Cross-platform strategy alignment','Unified brand voice guide','All affiliate links configured','Weekly performance calls','Dedicated account manager','Unlimited revisions'], popular:true },
]

export const opportunities = [
  { id:'opp1', brand:'Nike', product:'Air Max 2024 Running Shoes', category:'Fitness', platforms:['TikTok','Instagram'], contentType:'short-form' as const, fixedFee:800, commissionRate:8, deadline:'2024-07-20', applicants:47, status:'open' as const, description:'Create compelling short-form content showcasing Nike Air Max 2024. Focus on performance and lifestyle integration.', aiRecommended:true },
  { id:'opp2', brand:'Gymshark', product:'Vital Seamless Leggings', category:'Fitness', platforms:['Instagram','TikTok'], contentType:'mixed' as const, fixedFee:600, commissionRate:10, deadline:'2024-07-25', applicants:63, status:'open' as const, description:'Authentic workout content featuring Gymshark Vital Seamless collection. Show the fit, feel, and performance.', aiRecommended:true },
  { id:'opp3', brand:'HelloFresh', product:'Weekly Meal Kit Subscription', category:'Food', platforms:['YouTube','Instagram'], contentType:'long-form' as const, fixedFee:1200, commissionRate:12, deadline:'2024-08-01', applicants:28, status:'open' as const, description:'Cook along videos using HelloFresh meal kits. Show unboxing, preparation, and final dish.', aiRecommended:false },
  { id:'opp4', brand:'Luminos Beauty', product:'Radiance Glow Vitamin C Serum', category:'Beauty', platforms:['TikTok','Instagram'], contentType:'short-form' as const, fixedFee:500, commissionRate:15, deadline:'2024-07-18', applicants:89, status:'applied' as const, description:'Skincare routine integration featuring Luminos Vitamin C Serum. Before/after content preferred.', aiRecommended:true },
  { id:'opp5', brand:'Orbital Devices', product:'Orbital Pro X Smartwatch', category:'Tech', platforms:['YouTube'], contentType:'long-form' as const, fixedFee:2000, commissionRate:8, deadline:'2024-08-15', applicants:19, status:'open' as const, description:'In-depth unboxing and review of Orbital Pro X. Cover all features including health tracking and connectivity.', aiRecommended:false },
  { id:'opp6', brand:'Skyward Travel', product:'Premium Travel Insurance Bundle', category:'Travel', platforms:['YouTube','Instagram'], contentType:'mixed' as const, fixedFee:900, commissionRate:18, deadline:'2024-07-30', applicants:34, status:'open' as const, description:'Travel content integrating Skyward insurance messaging naturally.', aiRecommended:true },
  { id:'opp7', brand:'Meridian Capital', product:'Meridian Invest App', category:'Finance', platforms:['X','YouTube'], contentType:'long-form' as const, fixedFee:1500, commissionRate:20, deadline:'2024-08-05', applicants:12, status:'open' as const, description:'Educational content about investing for beginners using Meridian Invest app.', aiRecommended:false },
  { id:'opp8', brand:'Nexus Interactive', product:'Nexus Arena Game Bundle', category:'Gaming', platforms:['YouTube','TikTok'], contentType:'mixed' as const, fixedFee:700, commissionRate:12, deadline:'2024-07-22', applicants:55, status:'accepted' as const, description:'Gameplay and reaction content for Nexus Arena Bundle. Show excitement and key game moments.', aiRecommended:true },
  { id:'opp9', brand:'Bloom Health', product:'Daily Wellness Supplements Pack', category:'Wellness', platforms:['Instagram','TikTok'], contentType:'story' as const, fixedFee:400, commissionRate:14, deadline:'2024-07-28', applicants:71, status:'open' as const, description:'Daily wellness routine content featuring Bloom Health supplements.', aiRecommended:true },
  { id:'opp10', brand:'CrunchCo Foods', product:'Protein Snack Discovery Box', category:'Food', platforms:['TikTok'], contentType:'short-form' as const, fixedFee:300, commissionRate:10, deadline:'2024-07-15', applicants:94, status:'open' as const, description:'Fun unboxing and taste test videos of CrunchCo Protein Snack Discovery Box.', aiRecommended:false },
  { id:'opp11', brand:'Canvas Collective', product:'Professional Art Supply Kit', category:'Art', platforms:['YouTube','Instagram'], contentType:'long-form' as const, fixedFee:650, commissionRate:12, deadline:'2024-08-10', applicants:21, status:'open' as const, description:'Tutorial or speed art videos using Canvas Collective supplies.', aiRecommended:false },
  { id:'opp12', brand:'Nike', product:'Nike Training Club App Premium', category:'Fitness', platforms:['TikTok','Instagram'], contentType:'short-form' as const, fixedFee:750, commissionRate:15, deadline:'2024-08-20', applicants:38, status:'open' as const, description:'Show your NTC workout routine and how Nike Training Club Premium elevates training.', aiRecommended:true },
  { id:'opp13', brand:'Vaultline Apparel', product:'Heritage Collection Streetwear', category:'Fashion', platforms:['TikTok','Instagram'], contentType:'mixed' as const, fixedFee:550, commissionRate:10, deadline:'2024-07-31', applicants:82, status:'open' as const, description:'Style and outfit showcase featuring Vaultline Heritage Collection.', aiRecommended:false },
  { id:'opp14', brand:'Bloom Health', product:'Sleep & Recovery Bundle', category:'Wellness', platforms:['Instagram','YouTube'], contentType:'mixed' as const, fixedFee:480, commissionRate:14, deadline:'2024-08-08', applicants:43, status:'closed' as const, description:'Evening routine content featuring Bloom Sleep & Recovery Bundle.', aiRecommended:false },
  { id:'opp15', brand:'HelloFresh', product:'Quick & Easy 15-min Meals', category:'Food', platforms:['TikTok','Instagram'], contentType:'short-form' as const, fixedFee:700, commissionRate:12, deadline:'2024-08-03', applicants:56, status:'open' as const, description:'Quick cook-along reels featuring HelloFresh 15-minute meals.', aiRecommended:true },
]

export const contentSubmissions = [
  { id:'sub1', campaignName:'Summer Glow 2024', brand:'Luminos Beauty', platform:'TikTok', status:'approved' as const, submittedAt:'2024-06-10', dueDate:'2024-06-12', payment:500 },
  { id:'sub2', campaignName:'FitLife Challenge', brand:'NovaPulse Sports', platform:'Instagram', status:'in_review' as const, submittedAt:'2024-06-20', dueDate:'2024-06-22', payment:600 },
  { id:'sub3', campaignName:'Street Style SS24', brand:'Vaultline Apparel', platform:'Instagram', status:'revision_requested' as const, submittedAt:'2024-06-18', feedback:'Please adjust the caption to include #VaultlineHeritage and reframe the outro to highlight the limited-edition nature of the collection.', dueDate:'2024-06-25', payment:550 },
  { id:'sub4', campaignName:'GameOn Launch', brand:'Nexus Interactive', platform:'YouTube', status:'submitted' as const, submittedAt:'2024-06-21', dueDate:'2024-06-28', payment:700 },
  { id:'sub5', campaignName:'Wanderlust 2024', brand:'Skyward Travel', platform:'Instagram', status:'draft' as const, dueDate:'2024-07-05', payment:900 },
  { id:'sub6', campaignName:'Seasonal Wellness Reset', brand:'Bloom Health', platform:'TikTok', status:'draft' as const, dueDate:'2024-07-10', payment:400 },
  { id:'sub7', campaignName:'Finance 101 Series', brand:'Meridian Capital', platform:'YouTube', status:'approved' as const, submittedAt:'2024-05-28', dueDate:'2024-05-30', payment:1500 },
  { id:'sub8', campaignName:'Clean Beauty Pledge', brand:'Luminos Beauty', platform:'TikTok', status:'draft' as const, dueDate:'2024-08-15', payment:500 },
]

export const influencerEarnings = {
  totalEarned:18450, pendingPayout:3225, thisMonth:4820, lastMonth:3910,
  totalClicks:48210, totalConversions:2847, avgCommissionRate:11.2,
  currentTier:'Gold' as const, nextTierRevenue:20000,
}
