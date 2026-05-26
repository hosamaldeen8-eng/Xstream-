import { Router, Request, Response } from 'express';
import { campaigns, Campaign } from '../data/mockData';

const router = Router();

// GET /api/campaigns
router.get('/', (req: Request, res: Response) => {
  let result = [...campaigns];

  const { status, brand, platform } = req.query;

  if (status) {
    result = result.filter((c) => c.status === status);
  }
  if (brand) {
    result = result.filter((c) => c.brand.toLowerCase().includes((brand as string).toLowerCase()));
  }
  if (platform) {
    result = result.filter((c) => c.platforms.includes(platform as string));
  }

  res.json(result);
});

// GET /api/campaigns/:id
router.get('/:id', (req: Request, res: Response) => {
  const campaign = campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  res.json(campaign);
});

// POST /api/campaigns
router.post('/', (req: Request, res: Response) => {
  const { name, brand, budget, startDate, endDate, platforms, contentType } = req.body;

  if (!name || !brand || !budget || !startDate || !endDate || !platforms || !contentType) {
    return res.status(400).json({
      error: 'Missing required fields: name, brand, budget, startDate, endDate, platforms, contentType',
    });
  }

  const newCampaign: Campaign = {
    id: `camp${Date.now()}`,
    name,
    brand,
    status: 'draft',
    creatorsCount: 0,
    reach: 0,
    engagement: 0,
    budget: Number(budget),
    spent: 0,
    startDate,
    endDate,
    platforms: Array.isArray(platforms) ? platforms : [platforms],
    contentType,
  };

  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

export default router;
