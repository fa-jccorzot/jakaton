import styles from '../../styles/components/arrows.module.css';

export default function Right(props) {
  return (
    <button className={styles.arrowContainer} {...props}>
      <span className={`${styles.arrow} ${styles.right}`}></span>
    </button>
  );
}
