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

/** Sempre liberamos o site oficial (evita falha de CORS se o .env não listar o domínio com www). */
const PRODUCTION_SITE_ORIGIN = 'https://www.jrxsistemas.com.br';

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
  const fromEnv = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set([PRODUCTION_SITE_ORIGIN, ...fromEnv])];
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
