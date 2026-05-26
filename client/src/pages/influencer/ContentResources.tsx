import { useState } from 'react'
import { Search, Copy, BookOpen, Music, Hash, FileText, Download } from 'lucide-react'

const productKnowledge = [
  {
    id: 'pk1',
    brand: 'Nike',
    product: 'Air Max 2024',
    category: 'Fitness',
    talkingPoints: ['Responsive Air cushioning for all-day comfort', 'Breathable mesh upper reduces heat', 'Rubber outsole for outdoor durability'],
    keyBenefits: ['45% more cushioning vs previous gen', 'Available in 12 colorways', 'Vegan materials option'],
    targetAudience: 'Fitness enthusiasts, 18-35, urban lifestyle',
  },
  {
    id: 'pk2',
    brand: 'Luminos Beauty',
    product: 'Radiance Vitamin C Serum',
    category: 'Beauty',
    talkingPoints: ['20% pure Vitamin C concentration', 'Fades dark spots in 4 weeks', 'Lightweight, non-greasy formula'],
    keyBenefits: ['Clinically tested on all skin tones', 'No artificial fragrances', 'Cruelty-free certified'],
    targetAudience: 'Skincare enthusiasts, 20-40, beauty focused',
  },
  {
    id: 'pk3',
    brand: 'Gymshark',
    product: 'Vital Seamless Leggings',
    category: 'Fitness',
    talkingPoints: ['Seamless construction eliminates chafing', 'Four-way stretch for unrestricted movement', 'Squat-proof fabric technology'],
    keyBenefits: ['Machine washable, keeps shape', 'High waistband for core support', '15+ color options'],
    targetAudience: 'Gym-goers, 18-30, fitness lifestyle',
  },
  {
    id: 'pk4',
    brand: 'HelloFresh',
    product: 'Weekly Meal Kits',
    category: 'Food',
    talkingPoints: ['Pre-portioned ingredients reduce food waste', '25 minutes average cook time', 'Chef-designed seasonal recipes'],
    keyBenefits: ['Save $150/month vs restaurant dining', 'Free shipping on first order', 'Pause or cancel anytime'],
    targetAudience: 'Busy professionals, 25-45, health-conscious',
  },
]

const hashtagSets = [
  { niche: 'Fitness', tags: ['#FitnessMotivation', '#WorkoutLife', '#GymGoals', '#FitLife', '#ActiveLifestyle', '#FitnessJourney', '#HealthFirst', '#Gains'] },
  { niche: 'Beauty', tags: ['#SkincareTips', '#GlowUp', '#BeautyRoutine', '#SkincareJunkie', '#NaturalBeauty', '#GlowingSkin', '#SelfCare', '#CleanBeauty'] },
  { niche: 'Food', tags: ['#FoodInspo', '#MealPrep', '#HealthyEating', '#CookingAtHome', '#FoodLovers', '#RecipeIdeas', '#EatWell', '#Foodie'] },
  { niche: 'Fashion', tags: ['#OOTD', '#StyleInspo', '#FashionForward', '#StreetStyle', '#FashionBlogger', '#OutfitOfTheDay', '#TrendAlert', '#StyleTips'] },
  { niche: 'Tech', tags: ['#TechReview', '#GadgetLife', '#TechNews', '#TechTalk', '#Unboxing', '#TechLovers', '#Innovation', '#Gadgets'] },
]

const trendingMusic = [
  { title: 'Midnight Energy', artist: 'Synthwave Beats', bpm: 128, platforms: ['TikTok', 'Instagram'], mood: 'Energetic' },
  { title: 'Golden Hour Flow', artist: 'Chill House', bpm: 110, platforms: ['Instagram', 'YouTube'], mood: 'Aesthetic' },
  { title: 'Power Move', artist: 'Hip-Hop Collective', bpm: 95, platforms: ['TikTok'], mood: 'Motivational' },
  { title: 'Morning Ritual', artist: 'Lo-Fi Studio', bpm: 85, platforms: ['YouTube', 'Instagram'], mood: 'Calm' },
  { title: 'Viral Summer', artist: 'Pop Factory', bpm: 120, platforms: ['TikTok', 'Instagram', 'YouTube'], mood: 'Happy' },
]

const brandKits = [
  { brand: 'Nike', color: 'from-slate-700 to-slate-600', assets: ['Logo Pack', 'Brand Guidelines', 'Product Images', 'Social Templates'] },
  { brand: 'Gymshark', color: 'from-blue-700 to-blue-600', assets: ['Logo Pack', 'Color Palette', 'Typography Guide'] },
  { brand: 'Luminos Beauty', color: 'from-pink-700 to-pink-600', assets: ['Logo Pack', 'Brand Story', 'Product Shots', 'Lifestyle Images'] },
]

const scriptTemplates = [
  {
    title: 'Skincare Review Hook',
    category: 'Beauty',
    preview: '"I\'ve tried every serum on the market, but this one actually changed my skin in just 2 weeks. Here\'s why I\'m obsessed with [Product Name]..."',
  },
  {
    title: 'Fitness Product Transformation',
    category: 'Fitness',
    preview: '"30 days ago I started using [Product Name] in every workout. The difference? I\'m hitting PRs I never thought possible. Let me show you..."',
  },
  {
    title: 'Food Unboxing CTA',
    category: 'Food',
    preview: '"I just got this week\'s [Brand] box and you won\'t believe what\'s inside. Tonight\'s dinner is going to be incredible. Come cook with me..."',
  },
  {
    title: 'Tech Deep Dive Opener',
    category: 'Tech',
    preview: '"After 30 days living with the [Product Name], I have THOUGHTS. It did some things I loved and a few things that surprised me. Full honest review..."',
  },
]

export default function ContentResources() {
  const [search, setSearch] = useState('')
  const [copiedTag, setCopiedTag] = useState<string | null>(null)
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  function copyTag(tag: string) {
    navigator.clipboard.writeText(tag)
    setCopiedTag(tag)
    setTimeout(() => setCopiedTag(null), 1500)
  }

  function platformBadge(p: string) {
    const map: Record<string, string> = {
      TikTok: 'bg-pink-500/20 text-pink-400',
      Instagram: 'bg-purple-500/20 text-purple-400',
      YouTube: 'bg-red-500/20 text-red-400',
    }
    return map[p] || 'bg-gray-500/20 text-gray-400'
  }

  const filteredProducts = productKnowledge.filter(
    p => !search || p.brand.toLowerCase().includes(search.toLowerCase()) || p.product.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Creator Resources</h2>
        <p className="text-gray-400 text-sm mt-1">Everything you need to create winning content</p>
      </div>

      {/* Section 1: AI Product Knowledge Base */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">AI Product Knowledge Base</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI-Powered</span>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search products and brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 hover:border-emerald-500/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{p.product}</p>
                  <p className="text-gray-500 text-xs">{p.brand} · {p.category}</p>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  {expandedProduct === p.id ? 'Collapse' : 'View Details'}
                </button>
              </div>
              {expandedProduct === p.id && (
                <div className="space-y-3 mt-3 border-t border-[#1a1a2e] pt-3">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Talking Points</p>
                    <ul className="space-y-1">
                      {p.talkingPoints.map((tp, i) => (
                        <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>{tp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Key Benefits</p>
                    <ul className="space-y-1">
                      {p.keyBenefits.map((kb, i) => (
                        <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">→</span>{kb}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#080811] rounded-lg px-3 py-2">
                    <p className="text-gray-500 text-xs">Target: <span className="text-gray-300">{p.targetAudience}</span></p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Hashtag Suggestions */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Hashtag Suggestions by Niche</h3>
        </div>
        <div className="space-y-3">
          {hashtagSets.map((hs) => (
            <div key={hs.niche} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4">
              <p className="text-white font-medium text-sm mb-3">{hs.niche}</p>
              <div className="flex flex-wrap gap-2">
                {hs.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => copyTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                      copiedTag === tag
                        ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50'
                        : 'bg-white/5 text-gray-400 border-[#1a1a2e] hover:bg-white/10 hover:text-white hover:border-emerald-500/30'
                    }`}
                  >
                    {copiedTag === tag ? '✓ Copied!' : tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Trending Music */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Trending Audio</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">Updated Daily</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {trendingMusic.map((track, i) => (
            <div key={i} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center mb-3">
                <Music className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-white text-xs font-semibold mb-0.5 truncate">{track.title}</p>
              <p className="text-gray-500 text-xs mb-2 truncate">{track.artist}</p>
              <p className="text-gray-600 text-xs mb-2">{track.bpm} BPM · {track.mood}</p>
              <div className="flex flex-wrap gap-1">
                {track.platforms.map((p) => (
                  <span key={p} className={`text-xs px-1.5 py-0.5 rounded font-medium ${platformBadge(p)}`}>{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Brand Kits */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Brand Guidelines & Kits</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {brandKits.map((kit) => (
            <div key={kit.brand} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl overflow-hidden">
              <div className={`bg-gradient-to-r ${kit.color} px-5 py-4`}>
                <p className="text-white font-bold text-lg">{kit.brand}</p>
                <p className="text-white/60 text-xs">Brand Kit</p>
              </div>
              <div className="p-4 space-y-2">
                {kit.assets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300 text-xs">{asset}</span>
                    <button className="text-xs px-2 py-1 rounded bg-white/5 text-emerald-400 hover:bg-white/10 transition-colors">
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Script Templates */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">AI Script Templates</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {scriptTemplates.map((t, i) => (
            <div key={i} className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl p-5 hover:border-emerald-500/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-semibold">{t.title}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{t.category}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 italic">"{t.preview}"</p>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-xs font-semibold transition-all duration-200">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
