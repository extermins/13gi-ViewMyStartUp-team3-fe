import { useState } from "react";
import styles from "./dropdownList.module.css";

const SORT_OPTIONS = [
  { id: "investment_desc", label: "누적 투자금액 높은순" },
  { id: "investment_asc", label: "누적 투자금액 낮은순" },
  { id: "revenue_desc", label: "매출액 높은순" },
  { id: "revenue_asc", label: "매출액 낮은순" },
  { id: "employees_desc", label: "고용 인원 많은순" },
  { id: "employees_asc", label: "고용 인원 적은순" },
];

const STARTUP_OPTIONS = [
  { id: "vms_investment_desc", label: "View My Startup 투자 금액 높은순" },
  { id: "vms_investment_asc", label: "View My Startup 투자 금액 낮은순" },
  { id: "vms_actual_desc", label: "실제 누적 투자 금액 높은순" },
  { id: "vms_actual_asc", label: "실제 누적 투자 금액 낮은순" },
];

const ENTERPRISE_OPTIONS = [
  { id: "my_selection_desc", label: "나의 기업 선택 횟수 높은순" },
  { id: "my_selection_asc", label: "나의 기업 선택 횟수 낮은순" },
  { id: "actual_investment_desc", label: "실제 누적 투자 금액 높은순" },
  { id: "actual_investment_asc", label: "실제 누적 투자 금액 낮은순" },
];

const RANK_OPTIONS = [
  { id: "revenue_desc", label: "매출액 높은순" },
  { id: "revenue_asc", label: "매출액 낮은순" },
  { id: "headCount_desc", label: "고용 인원 많은순" },
  { id: "headCount_asc", label: "고용 인원 적은순" },
];

// 현재 선택된 옵션 id 관리
export default function DropdownList({
  standard = "pc",
  type = "sort",
  onSelect,
}) {
  let options = SORT_OPTIONS;
  if (type === "startup") options = STARTUP_OPTIONS;
  if (type === "enterprise") options = ENTERPRISE_OPTIONS;
  if (type === "rank") options = RANK_OPTIONS;

  const [selectedId, setSelectedId] = useState(null);

  const handleItemClick = (option) => {
    setSelectedId(option.id);
    if (onSelect) {
      onSelect(option);
    }
  };
  // standard 값에 따라 리스트 스타일 나누기 (PC, mobile)
  const listClassName = `${styles.dropdownList} ${
    standard === "mobile" ? styles.mobile : styles.pc
  } ${styles[type]}`;

  // standard 값에 따라 내부 아이템 스타일 나누기
  const itemSizeClassName =
    standard === "mobile" ? styles.mobileItem : styles.pcItem;

  return (
    <ul className={listClassName}>
      {options.map((option) => {
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
