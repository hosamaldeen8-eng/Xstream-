import express from 'express';
import cors from 'cors';
import creatorsRouter from './routes/creators';
import campaignsRouter from './routes/campaigns';
import analyticsRouter from './routes/analytics';
import brandsRouter from './routes/brands';
import affiliateRouter from './routes/affiliate';
import competitionsRouter from './routes/competitions';
import packagesRouter from './routes/packages';
import opportunitiesRouter from './routes/opportunities';
import submissionsRouter from './routes/submissions';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/creators', creatorsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/affiliate', affiliateRouter);
app.use('/api/competitions', competitionsRouter);
app.use('/api/packages', packagesRouter);
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/submissions', submissionsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Xstream API server running on http://localhost:${PORT}`);
});

export default app;
