import styles from "./List.module.css";
import Button from "../button";

const List = ({
  imageUrl,
  title,
  subtle,
  label,
  onSelect,
  disabled,
  buttonVariant,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <img className={styles.image} src={imageUrl} alt={title}></img>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtle}>{subtle}</p>
      </div>
      <Button onClick={onSelect} disabled={disabled} variant={buttonVariant}>
        {label}
      </Button>
    </section>
  );
};

export default List;
