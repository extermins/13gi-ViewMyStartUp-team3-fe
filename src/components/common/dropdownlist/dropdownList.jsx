import { useState } from "react";
import styles from "./dropdownList.module.css";

export default function DropdownList({ standard = "pc", onSelect }) {
  const SORT_OPTIONS = [
    { id: "investment_desc", label: "누적 투자금액 높은순" },
    { id: "investment_asc", label: "누적 투자금액 낮은순" },
    { id: "revenue_desc", label: "매출액 높은순" },
    { id: "revenue_asc", label: "매출액 낮은순" },
    { id: "employees_desc", label: "고용 인원 많은순" },
    { id: "employees_asc", label: "고용 인원 적은순" },
  ];

  // 현재 선택된 옵션 id 관리
  const [selectedId, setSelectedId] = useState(null);

  const handleItemClick = (option) => {
    setSelectedId(option.id);
    if (onSelect) {
      onSelect(option);
    }
  };
  // standard 값에 따라 리스트 스타일 나누기 (PC, mobile)
  const listClassName = `${styles.dropdownList} ${standard === "mobile" ? styles.mobile : styles.pc}`;

  // standard 값에 따라 내부 아이템 스타일 나누기
  const itemSizeClassName =
    standard === "mobile" ? styles.mobileItem : styles.pcItem;

  return (
    <ul className={listClassName}>
      {SORT_OPTIONS.map((option) => {
        const itemClassName = `${styles.dropdownItem} ${itemSizeClassName} ${selectedId === option.id ? styles.isSelected : ""}`;

        return (
          <li
            key={option.id}
            className={itemClassName}
            onClick={() => handleItemClick(option)}
          >
            {option.label}
          </li>
        );
      })}
    </ul>
  );
}
