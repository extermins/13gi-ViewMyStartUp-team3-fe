// src/components/Pagination/Pagination.jsx
import React from "react";
import styles from "./Pagination.module.css";

import ArrowLeftIcon from "../../assets/icons/ic-arrow-left.svg";
import ArrowRightIcon from "../../assets/icons/ic-arrow-right.svg";

// 커스텀을 위한 className과 style이라는 props 생성. 기본값은 빈 상태로 둡니다
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  style = {},
}) {
  const pagesPerGroup = 5;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    // 외부에서 들어온 className과 style을 최상단 컨테이너 적용
    <div className={`${styles.paginationContainer} ${className}`} style={style}>
      {/* ◀ 이전 페이지 버튼 */}
      <button
        className={`${styles.arrowButton} ${currentPage === 1 ? styles.disabledButton : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeftIcon} alt="이전 페이지" />
      </button>

      {/* 숫자 버튼 그룹 */}
      <div className={styles.numbersWrapper}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.pageButton} ${currentPage === number ? styles.activeButton : ""}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>

      {/* ▶ 다음 페이지 버튼 */}
      <button
        className={`${styles.arrowButton} ${currentPage === totalPages ? styles.disabledButton : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={ArrowRightIcon} alt="다음 페이지" />
      </button>
    </div>
  );
}

export default Pagination;
