import { Router } from 'express';
import { contentSubmissions } from '../data/affiliateMockData';

const router = Router();

// GET /api/submissions
router.get('/', (_req, res) => {
  res.json(contentSubmissions);
});

// POST /api/submissions
router.post('/', (req, res) => {
  const newSubmission = {
    id: `sub${Date.now()}`,
    ...req.body,
    status: 'submitted',
    submittedAt: new Date().toISOString().split('T')[0],
  };
  contentSubmissions.push(newSubmission);
  res.status(201).json(newSubmission);
});

// PATCH /api/submissions/:id/status
router.patch('/:id/status', (req, res) => {
  const submission = contentSubmissions.find((s) => s.id === req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  submission.status = req.body.status;
  if (req.body.feedback) submission.feedback = req.body.feedback;
  res.json(submission);
});

export default router;
