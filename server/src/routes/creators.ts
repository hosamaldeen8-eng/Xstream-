import { Router, Request, Response } from 'express';
import { creators, Creator } from '../data/mockData';

const router = Router();

// GET /api/creators
router.get('/', (req: Request, res: Response) => {
  let result = [...creators];

  const { platform, niche, status } = req.query;

  if (platform && platform !== 'All') {
    result = result.filter((c) => c.platform === platform);
  }
  if (niche) {
    result = result.filter((c) => c.niche.toLowerCase() === (niche as string).toLowerCase());
  }
  if (status) {
    result = result.filter((c) => c.status === status);
  }

  res.json(result);
});

// GET /api/creators/:id
router.get('/:id', (req: Request, res: Response) => {
  const creator = creators.find((c) => c.id === req.params.id);
  if (!creator) {
    return res.status(404).json({ error: 'Creator not found' });
  }

  const extended = {
    ...creator,
    topContent: [
      { title: 'Morning Routine 2024', views: creator.avgViews * 1.4, likes: Math.floor(creator.avgViews * 0.08) },
      { title: 'Brand Collab Review', views: creator.avgViews * 0.9, likes: Math.floor(creator.avgViews * 0.05) },
      { title: 'Community Q&A', views: creator.avgViews * 0.7, likes: Math.floor(creator.avgViews * 0.04) },
    ],
    monthlyGrowth: 3.2 + Math.random() * 4,
    revenueEarned: creator.campaigns * 4500 + Math.floor(Math.random() * 12000),
  };

  res.json(extended);
});

// POST /api/creators
router.post('/', (req: Request, res: Response) => {
  const { name, handle, platform, niche, followers, engagementRate, avgViews, country } = req.body;

  if (!name || !handle || !platform || !niche || !followers || !country) {
    return res.status(400).json({ error: 'Missing required fields: name, handle, platform, niche, followers, country' });
  }

  const newCreator: Creator = {
    id: `c${Date.now()}`,
    name,
    handle,
    platform,
    niche,
    followers: Number(followers),
    engagementRate: Number(engagementRate) || 3.0,
    avgViews: Number(avgViews) || Math.floor(Number(followers) * 0.3),
    status: 'pending',
    avatar: name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2),
    campaigns: 0,
    country,
  };

  creators.push(newCreator);
  res.status(201).json(newCreator);
});

// PATCH /api/creators/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  const creator = creators.find((c) => c.id === req.params.id);
  if (!creator) {
    return res.status(404).json({ error: 'Creator not found' });
  }

  const { status } = req.body;
  const valid = ['active', 'inactive', 'pending'];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be active, inactive, or pending.' });
  }

  creator.status = status;
  res.json(creator);
});

export default router;
