import { Router } from 'express';
import { opportunities } from '../data/affiliateMockData';

const router = Router();

// GET /api/opportunities
router.get('/', (req, res) => {
  let result = [...opportunities];
  const { niche, platform, status } = req.query;
  if (niche) result = result.filter((o) => o.category.toLowerCase() === String(niche).toLowerCase());
  if (platform) result = result.filter((o) => o.platforms.includes(String(platform)));
  if (status) result = result.filter((o) => o.status === String(status));
  res.json(result);
});

// GET /api/opportunities/:id
router.get('/:id', (req, res) => {
  const opp = opportunities.find((o) => o.id === req.params.id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
  res.json(opp);
});

// POST /api/opportunities/:id/apply
router.post('/:id/apply', (req, res) => {
  const opp = opportunities.find((o) => o.id === req.params.id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
  if (opp.status !== 'open') return res.status(400).json({ error: 'Opportunity is not open for applications' });
  opp.status = 'applied';
  opp.applicants += 1;
  res.json({ success: true, opportunity: opp });
});

export default router;
