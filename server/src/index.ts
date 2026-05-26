import express from 'express';
import cors from 'cors';
import creatorsRouter from './routes/creators';
import campaignsRouter from './routes/campaigns';
import analyticsRouter from './routes/analytics';
import brandsRouter from './routes/brands';

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/creators', creatorsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/brands', brandsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Xstream API server running on http://localhost:${PORT}`);
});

export default app;
