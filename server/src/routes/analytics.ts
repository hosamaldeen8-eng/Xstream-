import { Router, Request, Response } from 'express';
import { creators, campaigns, brands, timeseries, platformStats, nicheStats } from '../data/mockData';

const router = Router();

// GET /api/analytics/overview
router.get('/overview', (_req: Request, res: Response) => {
  const totalCreators = creators.length;
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const avgEngagement =
    creators.reduce((sum, c) => sum + c.engagementRate, 0) / creators.length;
  const contentPiecesDeployed = campaigns
    .filter((c) => c.status === 'active' || c.status === 'completed')
    .reduce((sum, c) => sum + c.creatorsCount * 4, 0);
  const brandsServed = brands.filter((b) => b.status === 'active').length;

  res.json({
    totalCreators,
    activeCampaigns,
    totalReach,
    avgEngagement: Math.round(avgEngagement * 10) / 10,
    contentPiecesDeployed,
    brandsServed,
  });
});

// GET /api/analytics/timeseries
router.get('/timeseries', (_req: Request, res: Response) => {
  res.json(timeseries);
});

// GET /api/analytics/platforms
router.get('/platforms', (_req: Request, res: Response) => {
  res.json(platformStats);
});

// GET /api/analytics/niches
router.get('/niches', (_req: Request, res: Response) => {
  res.json(nicheStats);
});

export default router;
