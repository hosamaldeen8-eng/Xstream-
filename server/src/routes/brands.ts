import { Router, Request, Response } from 'express';
import { brands, Brand } from '../data/mockData';

const router = Router();

// GET /api/brands
router.get('/', (_req: Request, res: Response) => {
  res.json(brands);
});

// GET /api/brands/:id
router.get('/:id', (req: Request, res: Response) => {
  const brand = brands.find((b) => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  res.json(brand);
});

// POST /api/brands
router.post('/', (req: Request, res: Response) => {
  const { name, industry } = req.body;

  if (!name || !industry) {
    return res.status(400).json({ error: 'Missing required fields: name, industry' });
  }

  const newBrand: Brand = {
    id: `b${Date.now()}`,
    name,
    industry,
    campaigns: 0,
    totalSpend: 0,
    totalReach: 0,
    status: 'active',
    logo: name
      .split(' ')
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3),
  };

  brands.push(newBrand);
  res.status(201).json(newBrand);
});

export default router;
