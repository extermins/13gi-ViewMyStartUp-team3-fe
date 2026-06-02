// src/components/listfilter/ListFilter.jsx
import React, { useState, useEffect } from "react";
import styles from "./ListFilter.module.css";
import { Search } from "../common/searchfield/Search.jsx";
import Dropdown from "../common/dropdown/dropdown.jsx";

function ListFilter() {
  const [keyword, setKeyword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 375);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    console.log("검색어:", keyword);
  };

  const handleSort = (option) => {
    console.log("선택된 정렬:", option.id);
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
            onClear={() => setKeyword("")}
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
