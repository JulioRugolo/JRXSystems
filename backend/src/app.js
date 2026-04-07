const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const corsOrigins = () => {
  const raw =
    process.env.FRONTEND_ORIGIN ||
    process.env.FRONTEND_URL ||
    process.env.FRONTEND_BASE_URL ||
    process.env.CORS_ORIGIN ||
    '';
  if (!raw.trim()) {
    return true;
  }
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

app.use(
  cors({
    origin: corsOrigins(),
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
