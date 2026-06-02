import styles from "./Field.module.css";

export default function Field({ status, children }) {
  const statusClass = {
    active: styles.active,
    inactive: styles.inactive,
    error: styles.error,
  }[status];
  return (
    <div className={`${styles.wrapper} ${statusClass ?? ""}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
