import Image from 'next/image';
import headerImg from '../../public/images/icon.svg';
import searchButtonImg from '../../public/images/search-button.svg';
import cartImg from '../../public/images/cart.svg';
import styles from '../styles/components/header.module.css';
import { useCallback, useState } from 'react';

export default function Header() {
  const [contracted, setContracted] = useState(true);
  const handleMenu = useCallback(() => setContracted(!contracted));

  return (
    <header className={styles.header}>
      <div className={styles.iconContainer}>
        <Image src={headerImg} className={styles.icon} />
      </div>
      <div className={styles.menuContainer} onClick={handleMenu}>
        <span className={contracted ? styles.menuContracted : styles.menuExpanded}></span>
        <p className={styles.menuText}>Menú</p>
      </div>
      <div className={styles.searchBarContainer}>
        <input className={styles.search} placeholder={'Buscar en falabella.com'} />
        <Image src={searchButtonImg} className={styles.searchIcon} />
      </div>
      <div className={styles.signInContainer}>
        <p className={styles.greeting}>Hola,</p>
        <p className={styles.signInText}>Inicia sesión</p>
      </div>
      <div className={styles.purchasesContainer}>
        <p>Mis compras</p>
      </div>
      <div className={styles.shoppingCarContainer}>
        <Image src={cartImg} />
      </div>
    </header>
  );
}
