import icon from "../../../assets/icons/ic-minus.svg";
import styles from "./Card.module.css";

const Card = ({ imageUrl, title, subtle }) => {
  return (
    <section className={styles.container}>
      <div className={styles.icon}>
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
