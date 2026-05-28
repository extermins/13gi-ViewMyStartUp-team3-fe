// src/components/Pagination/Pagination.jsx
import styles from "./Pagination.module.css";

import ArrowLeftIcon from "../../assets/icons/ic-arrow-left.svg";
import ArrowRightIcon from "../../assets/icons/ic-arrow-right.svg";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagesPerGroup = 5; //  한 화면에 보여줄 페이지 번호 개수

  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지가 속한 그룹 계산 (예: 1~5페이지는 1그룹, 6~10페이지는 2그룹)

  // 현재 그룹의 시작 번호와 끝 번호 계산
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  // 계산된 구간(startPage ~ endPage)만큼만 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      {/* ◀ 이전 페이지 버튼 */}
      <button
        className={`${styles.arrowButton} ${currentPage === 1 ? styles.disabledButton : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeftIcon} alt="이전 페이지" />
      </button>

      {/* 숫자 버튼 그룹 (최대 5개만 렌더링) */}
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
