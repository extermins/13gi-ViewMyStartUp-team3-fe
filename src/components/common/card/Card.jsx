import icon from "../../../assets/icons/ic-minus.svg";
import styles from "./card.module.css";

const Card = ({ imageUrl, title, subtle, onRemove }) => {
  return (
    <section className={styles.container}>
      <div className={styles.icon} onClick={onRemove}>
        <img src={icon} alt="선택 해제" />
      </div>
      <div className={styles.info}>
        <img className={styles.image} src={imageUrl} alt={title}></img>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtle}>{subtle}</p>
      </div>
    </section>
  );
};

export default Card;
