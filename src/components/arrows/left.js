import styles from '../../styles/components/arrows.module.css';

export default function Left(props) {
  return (
    <button className={styles.arrowContainer} {...props}>
      <span className={`${styles.arrow} ${styles.left}`}></span>
    </button>
  );
}
