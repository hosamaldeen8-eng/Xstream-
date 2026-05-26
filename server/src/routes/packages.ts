import { Router } from 'express';
import { videoPackages } from '../data/affiliateMockData';

const router = Router();

// GET /api/packages
router.get('/', (_req, res) => {
  res.json(videoPackages);
});

// GET /api/packages/:id
router.get('/:id', (req, res) => {
  const pkg = videoPackages.find((p) => p.id === req.params.id);
  if (!pkg) return res.status(404).json({ error: 'Package not found' });
  res.json(pkg);
});

// POST /api/packages/book
router.post('/book', (req, res) => {
  const { packageId, goal, script } = req.body;
  const pkg = videoPackages.find((p) => p.id === packageId);
  if (!pkg) return res.status(404).json({ error: 'Package not found' });
  const booking = {
    id: `booking${Date.now()}`,
    packageId,
    packageName: pkg.name,
    goal: goal || pkg.goal,
    script: script || null,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + pkg.deliveryDays * 86400000)
      .toISOString()
      .split('T')[0],
  };
  res.status(201).json(booking);
});

export default router;
