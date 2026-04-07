const contactService = require('../services/contactService');

async function create(req, res, next) {
  try {
    const row = await contactService.create(req.body);
    res.status(201).json({
      id: row.id,
      ok: true,
      message: 'Recebemos sua mensagem. Entraremos em contato em breve.',
    });
  } catch (e) {
    next(e);
  }
}

module.exports = { create };
