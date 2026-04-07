const { ContactMessage } = require('../models');
const AppError = require('../utils/AppError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 8000;

function create(body) {
  const name = body.name != null ? String(body.name).trim() : '';
  const email = body.email != null ? String(body.email).trim() : '';
  const phone = body.phone != null ? String(body.phone).trim() : '';
  const company =
    body.company != null && String(body.company).trim()
      ? String(body.company).trim().slice(0, 255)
      : null;
  const interest =
    body.interest != null && String(body.interest).trim()
      ? String(body.interest).trim().slice(0, 255)
      : null;
  const message = body.message != null ? String(body.message).trim() : '';

  if (!name) throw new AppError('Nome é obrigatório', 400);
  if (!email) throw new AppError('E-mail é obrigatório', 400);
  if (!EMAIL_RE.test(email)) throw new AppError('E-mail inválido', 400);
  if (!phone) throw new AppError('Telefone é obrigatório', 400);
  if (!message) throw new AppError('Mensagem é obrigatória', 400);
  if (message.length > MAX_MESSAGE) {
    throw new AppError(`Mensagem muito longa (máx. ${MAX_MESSAGE} caracteres)`, 400);
  }

  return ContactMessage.create({
    name: name.slice(0, 255),
    email: email.slice(0, 255),
    phone: phone.slice(0, 50),
    company,
    interest,
    message,
  });
}

module.exports = { create };
