const express = require('express');
const rateLimit = require('express-rate-limit');
const projectController = require('../controllers/projectController');
const contactController = require('../controllers/contactController');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Muitas solicitações. Tente novamente em alguns minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/projects', projectController.listPublic);
router.post('/contact', contactLimiter, contactController.create);

module.exports = router;
