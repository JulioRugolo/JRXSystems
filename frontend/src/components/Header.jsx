import { Link } from 'react-router-dom';
import { COMPANY } from '../constants.js';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label={`${COMPANY.name} — início`}>
          <span className={styles.logoShell}>
            <img
              src="/logo.png"
              alt=""
              className={styles.logo}
              width={808}
              height={391}
              decoding="async"
            />
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Principal">
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#contato">Contato</a>
        </nav>
      </div>
    </header>
  );
}
