import styles from "./search.module.css";
import search from "../../../assets/icons/ic-search.svg";
import close from "../../../assets/icons/ic-delete.svg";
export function Search({ value, onChange, placeholder, onSearch, onClear }) {
  // 서치 사용하는 사람들은 onClear 기능을 사용하고싶으면 해당 검색값의 setValue을 사용하여
  // onClear={() => setSearch("")} 형식으로 값을 념겨주어야 합니다.
  // 여기 안에서는 value 컨트롤 못함

  //onChange 에는 (e)=>setValue(e.target.value)넣어주셈

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };
  return (
    <div>
      <div className={styles.wrapper}>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${value ? styles["input-date"] : ""}`}
        />
        <img
          src={search}
          className={`${styles.icon} ${value ? styles["icon-data"] : ""}`}
          onClick={onSearch}
        />
        {value && (
          <img
            src={close}
            className={styles["close-icon"]}
            alt="초기화"
            width={24}
            height={24}
            onClick={onClear}
          />
        )}
      </div>
    </div>
  );
}
