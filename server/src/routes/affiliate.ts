import { Router } from 'express';
import {
  affiliateLinks,
  payouts,
  commissionTiers,
  influencerEarnings,
  affiliateTimeseries,
} from '../data/affiliateMockData';

const router = Router();

// GET /api/affiliate/links
router.get('/links', (_req, res) => {
  res.json(affiliateLinks);
});

// GET /api/affiliate/links/:id
router.get('/links/:id', (req, res) => {
  const link = affiliateLinks.find((l) => l.id === req.params.id);
  if (!link) return res.status(404).json({ error: 'Affiliate link not found' });
  res.json(link);
});

// GET /api/affiliate/payouts
router.get('/payouts', (_req, res) => {
  res.json(payouts);
});

// GET /api/affiliate/earnings
router.get('/earnings', (_req, res) => {
  res.json(influencerEarnings);
});

// GET /api/affiliate/tiers
router.get('/tiers', (_req, res) => {
  res.json(commissionTiers);
});

// GET /api/affiliate/timeseries
router.get('/timeseries', (_req, res) => {
  res.json(affiliateTimeseries);
});

// POST /api/affiliate/links
router.post('/links', (req, res) => {
  const newLink = {
    id: `afl${Date.now()}`,
    ...req.body,
    clicks: 0,
    conversions: 0,
    conversionRate: 0,
    revenue: 0,
    commission: 0,
    tier: 'Bronze',
    createdAt: new Date().toISOString().split('T')[0],
  };
  affiliateLinks.push(newLink);
  res.status(201).json(newLink);
});

// PATCH /api/affiliate/payouts/:id/request
router.patch('/payouts/:id/request', (req, res) => {
  const payout = payouts.find((p) => p.id === req.params.id);
  if (!payout) return res.status(404).json({ error: 'Payout not found' });
  payout.status = 'processing';
  res.json(payout);
});

export default router;
