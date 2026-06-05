// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import ListFilter from "../components/listfilter/ListFilter";
import StartupTable from "../components/startuptable/StartupTable";
import Pagination from "../components/pagination/Pagination";
import styles from "./HomePage.module.css";
import { getCompanies } from "../api/companiesApi";
import { formatNumber } from "../components/utils/formatNumber.js";

const formatCurrency = (value) => {
  if (!value) return "0원";
  const num = Number(value);
  if (num >= 100000000) {
    return `${(num / 100000000).toLocaleString()}억 원`;
  }
  return `${num.toLocaleString()}원`;
};

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // 사용자가 입력한 검색어와 선택한 정렬 방식을 기억할 공간을 만듭니다
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "var(--color-black-400, #131313)";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const fetchCompaniesData = async () => {
      try {
        // API를 부를 때 우리가 기억해둔 검색어와 정렬 방식도 같이 보냅니다
        const result = await getCompanies({
          page: currentPage,
          pageSize: pageSize,
          keyword: searchKeyword,
          sort: sortOption,
        });

        if (result.success) {
          // 백엔드가 준 첫 번째 기업의 진짜 데이터
          console.log(
            "백엔드가 보낸 1등 기업 데이터:",
            JSON.stringify(result.data[0], null, 2),
          );

          const formattedData = result.data.map((company, index) => ({
            id: company.id,
            rank: `${(currentPage - 1) * pageSize + index + 1}위`,
            name: company.name,
            // 백엔드에서 온 imageUrl
            imageUrl: company.imageUrl || "",
            description: company.description,
            category: company.category,
            investment: formatNumber(company.actualInvestment),
            // investment: formatCurrency(company.actualInvestment),
            revenue: formatNumber(company.revenue),
            employees: `${company.headCount}명`,
          }));

          setCompanies(formattedData);
          setTotalPages(result.pagination.totalPages);
        }
      } catch (error) {
        console.error("스타트업 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchCompaniesData();
  }, [currentPage, searchKeyword, sortOption]);
  // 중요: currentPage, searchKeyword, sortOption 셋 중 하나라도 바뀌면 useEffect가 다시 실행

  return (
    <div className={styles.pageBackground}>
      <div className={styles.contentWrapper}>
        {/* ListFilter가 무전을 치면 어떻게 행동할지 지시 */}
        <ListFilter
          onSearch={(keyword) => {
            setSearchKeyword(keyword);
            setCurrentPage(1); // 검색을 새로 하면 무조건 1페이지로 돌아가야 합니다
          }}
          onSort={(option) => {
            // Dropdown 컴포넌트가 객체를 주는지 문자열을 주는지에 따라 유연하게 대응
            const sortValue = option.id || option.value || option;

            // 백엔드로 보내기 직전에 암호가 뭔지 콘솔에 찍어봅니다
            console.log("드롭다운 암호 확인:", sortValue);

            setSortOption(sortValue);
            setCurrentPage(1); // 정렬을 바꿔도 무조건 1페이지로 돌아가야 합니다
          }}
        />

        <StartupTable data={companies} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default HomePage;
