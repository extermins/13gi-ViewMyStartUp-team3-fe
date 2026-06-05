// src/components/ListFilter/ListFilter.jsx (또는 listfilter/ListFilter.jsx)
import React, { useState, useEffect } from "react";
import styles from "./ListFilter.module.css";
import { Search } from "../common/searchfield/Search.jsx";
import Dropdown from "../common/dropdown/dropdown.jsx";

// 부모(HomePage)가 내려준 (onSearch, onSort)를 받습니다
function ListFilter({ onSearch, onSort }) {
  const [keyword, setKeyword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 375);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    // 돋보기 버튼을 누르면 부모에게 검색어를 알립니다
    if (onSearch) onSearch(keyword);
  };

  const handleSort = (option) => {
    // 정렬을 선택하면 부모에게 선택된 옵션(예: 매출액 높은순)을 알립니다
    if (onSort) onSort(option);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>전체 스타트업 목록</h2>

      <div className={styles.filterGroup}>
        <div className={styles.searchWrapper}>
          <Search
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력해주세요"
            onSearch={handleSearch}
            onClear={() => {
              setKeyword("");
              // x 버튼을 눌러 초기화할 때도 부모에게 빈 검색어를 알려서 목록을 원래대로 돌려놓습니다.
              if (onSearch) onSearch("");
            }}
          />
        </div>

        <Dropdown
          standard={isMobile ? "mobile" : "pc"}
          type="sort"
          onSelect={handleSort}
        />
      </div>
    </div>
  );
}

export default ListFilter;
