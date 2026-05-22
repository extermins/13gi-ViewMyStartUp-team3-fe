import styles from "./List.module.css";
import Button from "../Button/Button.jsx";

const List = ({ imageUrl, title, subtle, label }) => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <img className={styles.image} src={imageUrl} alt={title}></img>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtle}>{subtle}</p>
      </div>
      <Button>{label}</Button>
    </section>
  );
};

export default List;
