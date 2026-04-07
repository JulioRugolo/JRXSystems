import { COMPANY } from '../constants.js';

/** Limite conservador para URL do WhatsApp Web / app */
const MAX_TEXT_LEN = 3500;

/**
 * Monta o texto da conversa com os dados do formulário.
 * @param {{ name: string; email: string; phone: string; company?: string; interest?: string; message: string }} data
 */
export function buildContactWhatsAppMessage(data) {
  const lines = [
    `Olá! Solicitação pelo site *${COMPANY.name}*.`,
    '',
    `*Nome:* ${data.name}`,
    `*E-mail:* ${data.email}`,
    `*Telefone:* ${data.phone}`,
  ];
  const company = data.company?.trim();
  if (company) lines.push(`*Empresa:* ${company}`);
  const interest = data.interest?.trim();
  if (interest) lines.push(`*Interesse:* ${interest}`);
  lines.push('', '*Mensagem:*', data.message);

  let text = lines.join('\n');
  if (text.length > MAX_TEXT_LEN) {
    text = `${text.slice(0, MAX_TEXT_LEN - 40)}\n\n[…mensagem truncada]`;
  }
  return text;
}

/**
 * URL wa.me com texto pré-preenchido.
 */
export function contactWhatsAppUrl(text) {
  const base = COMPANY.whatsappUrl.replace(/\/?$/, '');
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Abre conversa no WhatsApp (nova aba / app).
 * @returns {boolean} se window.open não retornou null (popup pode ter sido bloqueado)
 */
export function openContactWhatsApp(text) {
  const url = contactWhatsAppUrl(text);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  return win != null && !win.closed;
}
