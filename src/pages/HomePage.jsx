import React, { useState, useEffect } from "react";
import ListFilter from "../components/ListFilter/ListFilter";
import StartupTable from "../components/StartupTable/StartupTable";
import Pagination from "../components/Pagination/Pagination";
import styles from "./HomePage.module.css";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 페이지에 들어오면 body 배경을 까맣게 칠함
    document.body.style.backgroundColor = "var(--color-black-400, #131313)";

    // 다른 페이지로 이동할 때(언마운트) 원래대로 초기화
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // 백엔드 연결 전 임시 '더미 데이터'
  const [companies, setCompanies] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      rank: `${index + 1}위`,
      name: `주식회사 뷰마스타${index + 1}`,
      description:
        "세상을 바꾸는 혁신적인 아이디어로 출발한 IT 스타트업입니다.",
      category: "IT/Web",
      investment: "100억 원",
      revenue: "300억 원",
      employees: "120명",
    })),
  );

  return (
    <div className={styles.pageBackground}>
      <div className={styles.contentWrapper}>
        <ListFilter />

        {/* 자식 테이블에게 더미 데이터를 props로 던져줍니다 */}
        <StartupTable data={companies} />

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default HomePage;
