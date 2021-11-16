import styles from '../styles/components/header.module.css';
import { useState } from 'react';

export default function Header() {
  const [contracted, setContracted] = useState(true);
  const handleMenu = () => setContracted(!contracted);

  return (
    <header className={styles.header}>
      <div className={styles.iconContainer}>
        <img src={'./images/icon.svg'} className={styles.icon} alt={'Icon'} />
      </div>
      <div className={styles.menuContainer} onClick={handleMenu}>
        <span className={contracted ? styles.menuContracted : styles.menuExpanded}></span>
        <p className={styles.menuText}>Menú</p>
      </div>
      <div className={styles.searchBarContainer}>
        <input className={styles.search} placeholder={'Buscar en falabella.com'} />
        <img src={'./images/search-button.svg'} className={styles.searchIcon} alt={'Search'} />
      </div>
      <div className={styles.signInContainer}>
        <p className={styles.greeting}>Hola,</p>
        <p className={styles.signInText}>Inicia sesión</p>
      </div>
      <div className={styles.purchasesContainer}>
        <p>Mis compras</p>
      </div>
      <div className={styles.shoppingCarContainer}>
        <img src={'./images/cart.svg'} alt={'Cart'} />
      </div>
    </header>
  );
}
