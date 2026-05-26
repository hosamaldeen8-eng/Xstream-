import { Router } from 'express';
import { competitions } from '../data/affiliateMockData';

const router = Router();

// GET /api/competitions
router.get('/', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(competitions.filter((c) => c.status === status));
  }
  res.json(competitions);
});

// GET /api/competitions/:id
router.get('/:id', (req, res) => {
  const competition = competitions.find((c) => c.id === req.params.id);
  if (!competition) return res.status(404).json({ error: 'Competition not found' });
  res.json(competition);
});

// POST /api/competitions
router.post('/', (req, res) => {
  const newCompetition = {
    id: `comp${Date.now()}`,
    ...req.body,
    participants: 0,
    daysLeft: req.body.daysLeft ?? 30,
    leaderboard: [],
  };
  competitions.push(newCompetition);
  res.status(201).json(newCompetition);
});

export default router;
