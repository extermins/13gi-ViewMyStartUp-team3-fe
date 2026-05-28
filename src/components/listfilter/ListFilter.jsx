import React from "react";
import styles from "./ListFilter.module.css";
import SearchIcon from "../../assets/icons/ic-search.svg";
import ToggleIcon from "../../assets/icons/ic-toggle.svg";

function ListFilter() {
  return (
    <div className={styles.container}>
      {/* 좌측 타이틀 */}
      <h2 className={styles.title}>전체 스타트업 목록</h2>

      {/* 우측 검색 & 드롭다운 */}
      <div className={styles.filterGroup}>
        {/* 검색창 */}
        <div className={styles.searchWrapper}>
          <img src={SearchIcon} alt="검색" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className={styles.searchInput}
          />
        </div>

        {/* 정렬 드롭다운 */}
        <div className={styles.dropdownWrapper}>
          <select className={styles.dropdown}>
            <option value="revenue-high">매출액 높은 순</option>
            <option value="revenue-low">매출액 낮은 순</option>
          </select>
          <img src={ToggleIcon} alt="토글" className={styles.toggleIcon} />
        </div>
      </div>
    </div>
  );
}

export default ListFilter;
