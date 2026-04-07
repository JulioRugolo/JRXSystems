import { useCallback, useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../constants.js';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMenu]);

  function handleNavClick() {
    closeMenu();
  }

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

        <nav className={styles.navDesktop} aria-label="Principal">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.hamburger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className={styles.mobileLayer} role="presentation">
          <button
            type="button"
            className={styles.overlay}
            aria-label="Fechar menu"
            onClick={closeMenu}
          />
          <div
            id={menuId}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Fechar"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav className={styles.navMobile} aria-label="Principal">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} onClick={handleNavClick}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
