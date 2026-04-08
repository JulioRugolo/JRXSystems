import { useState } from 'react';
import { sendContact } from '../api/client.js';
import {
  buildContactWhatsAppMessage,
  contactWhatsAppUrl,
  openContactWhatsApp,
} from '../utils/whatsappContact.js';
import styles from './ContactSection.module.css';

const initial = {
  name: '',
  email: '',
  phone: '',
  company: '',
  interest: '',
  message: '',
  website: '',
};

export default function ContactSection({ projectTitles = [] }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [waManualUrl, setWaManualUrl] = useState('');

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (form.website) return;
    setError('');
    setWaManualUrl('');
    setStatus('loading');
    const waText = buildContactWhatsAppMessage(form);
    try {
      await sendContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company || undefined,
        interest: form.interest || undefined,
        message: form.message,
      });
      const opened = openContactWhatsApp(waText);
      setWaManualUrl(opened ? '' : contactWhatsAppUrl(waText));
      setStatus('success');
      setForm(initial);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        'Não foi possível enviar. Tente novamente.';
      setError(msg);
      setStatus('idle');
    }
  }

  return (
    <section id="contato" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Pedir orçamento ou projeto sob medida</h2>
        <p className={styles.lead}>
          Conte o que você precisa: guardamos sua solicitação e abrimos o <strong>WhatsApp</strong> com o texto
          pronto — é só enviar. Se você quer apenas assinar um dos sistemas da lista, o contrato e o pagamento ficam no
          site de cada solução; <strong>este formulário é para algo novo ou personalizado</strong>.
        </p>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={onChange}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Nome completo *</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                autoComplete="name"
                disabled={status === 'loading'}
              />
            </label>
            <label className={styles.field}>
              <span>E-mail *</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
                disabled={status === 'loading'}
              />
            </label>
            <label className={styles.field}>
              <span>Telefone *</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                required
                autoComplete="tel"
                placeholder="(14) 99999-9999"
                disabled={status === 'loading'}
              />
            </label>
            <label className={styles.field}>
              <span>Empresa (opcional)</span>
              <input
                name="company"
                value={form.company}
                onChange={onChange}
                autoComplete="organization"
                disabled={status === 'loading'}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Interesse (opcional)</span>
            <select
              name="interest"
              value={form.interest}
              onChange={onChange}
              disabled={status === 'loading'}
            >
              <option value="">Selecione…</option>
              {projectTitles.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="Projeto sob medida / outro">Projeto sob medida / outro</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Mensagem *</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
              placeholder="Ex.: hoje uso planilha para X, perco tempo com Y, gostaria de Z em até ___ meses."
              disabled={status === 'loading'}
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}
          {status === 'success' ? (
            <div className={styles.successBlock} role="status">
              <p className={styles.success}>
                Solicitação registrada. O WhatsApp deve ter aberto com sua mensagem — é só enviar por lá.
              </p>
              {waManualUrl ? (
                <p className={styles.waFallback}>
                  Se não abriu automaticamente,{' '}
                  <a href={waManualUrl} target="_blank" rel="noopener noreferrer">
                    abra o WhatsApp por aqui
                  </a>
                  .
                </p>
              ) : null}
            </div>
          ) : null}

          <button type="submit" className={styles.submit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando…' : 'Enviar e abrir WhatsApp'}
          </button>
        </form>
      </div>
    </section>
  );
}
