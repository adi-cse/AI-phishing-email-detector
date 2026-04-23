import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import detectRoutes from './routes/detectRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/api/detect', detectRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend running!', 
    apiProvider: 'OpenRouter (Claude 3.5 Sonnet)',
    environment: process.env.NODE_ENV
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running on port ${PORT}`);
  console.log(`📍 API: OpenRouter (Claude 3.5 Sonnet)\n`);
});