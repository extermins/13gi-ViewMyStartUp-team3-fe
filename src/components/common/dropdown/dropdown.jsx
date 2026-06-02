import { useState } from "react";
import styles from "./dropdown.module.css";
import DropdownList from "../dropdownlist/dropdownList";
import toggleIconUrl from "../../../assets/icons/ic-toggle.svg";

const DEFAULT_LABELS = {
  sort: "누적 투자금액 높은순",
  startup: "View My Startup 투자 금액 높은순",
  enterprise: "나의 기업 선택 횟수 높은순",
  rank: "매출액 높은순",
};

export default function Dropdown({ standard = "pc", type = "sort", onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userSelectedLabel, setUserSelectedLabel] = useState(null);
  const [prevType, setPrevType] = useState(type);

  if (type !== prevType) {
    setPrevType(type);
    setUserSelectedLabel(null);
  }

  const currentLabel =
    userSelectedLabel || DEFAULT_LABELS[type] || DEFAULT_LABELS.sort;
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setUserSelectedLabel(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const isMobile = standard === "mobile";
  const containerClassName = `${styles.dropdownContainer} ${
    isMobile ? styles.mobileContainer : styles.pcContainer
  } ${styles[type] || ""}`;

  const triggerClassName = `${styles.dropdownTrigger} ${isOpen ? styles.activeTrigger : ""}`;

  return (
    <div className={containerClassName}>
      <button
        className={triggerClassName}
        onClick={toggleDropdown}
        type="button"
      >
        <div className={styles.labelWrapper}>
          <span className={styles.selectedLabel}>{currentLabel}</span>
        </div>

        <div className={styles.arrowIconBox}>
          <img
            src={toggleIconUrl}
            alt="화살표 아이콘"
            className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className={styles.listWrapper}>
          <DropdownList
            standard={standard}
            type={type}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
