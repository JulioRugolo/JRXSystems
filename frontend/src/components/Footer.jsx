import { COMPANY } from '../constants.js';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>{COMPANY.name}</strong>
          <p className={styles.meta}>
            CNPJ {COMPANY.cnpj}
            <br />
            <a href={`tel:${COMPANY.phoneTel}`}>{COMPANY.phoneDisplay}</a>
            {' · '}
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </p>
        </div>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
