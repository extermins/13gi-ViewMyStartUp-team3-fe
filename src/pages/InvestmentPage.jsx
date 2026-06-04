import { useState, useEffect } from "react";
import "./InvestmentPage.css";

// 공통 컴포넌트 임포트
import Pagination from "../components/pagination/Pagination";
import Dropdown from "../components/common/dropdown/dropdown";

// 임시 Mock 데이터 요청 함수 임포트
import { MOCK_DATA_LIST } from "../data/InvestmentMock";

const InvestmentPage = () => {
  const [sortBy, setSortBy] = useState("vms_investment_desc");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // API 연결 시 주석 해제할 상태값들
  // const [dataList, setDataList] = useState([]);
  // const [totalCount, setTotalCount] = useState(0);

  // 페이지 번호나 정렬 조건 변경 시 데이터 호출
  useEffect(() => {
    // const getPageData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetchInvestmentRankings({
    //       page: currentPage,
    //       limit: 10,
    //       sort: sortBy,
    //     });
    //     setDataList(response.data.list);
    //     setTotalCount(response.data.totalCount);
    //   } catch (error) {
    //     console.error("데이터 로딩 실패:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // getPageData();
  }, [currentPage, sortBy]);

  // 임시 Mock 데이터 정렬
  const getSortedMockData = () => {
    const sorted = [...MOCK_DATA_LIST];

    // View My Startup 투자 금액 정렬 (vms_investment)
    if (sortBy === "vms_investment_desc" || sortBy === "vms_desc") {
      return sorted.sort((a, b) => b.latestRoundAmount - a.latestRoundAmount);
    } else if (sortBy === "vms_investment_asc" || sortBy === "vms_asc") {
      return sorted.sort((a, b) => a.latestRoundAmount - b.latestRoundAmount);
    }

    // 실제 누적 투자 금액 정렬 (total_investment)
    else if (sortBy === "vms_actual_desc" || sortBy === "total_desc") {
      return sorted.sort((a, b) => b.totalInvestment - a.totalInvestment);
    } else if (sortBy === "vms_actual_asc" || sortBy === "total_asc") {
      return sorted.sort((a, b) => a.totalInvestment - b.totalInvestment);
    }

    return sorted;
  };

  // 임시 현재 정렬된 전체 데이터 개수로 totalCount 동적 연동
  const sortedMockData = getSortedMockData();
  const currentTotalCount = sortedMockData.length;

  // 현재 페이지(10개 단위)에 맞춰서 배열 자르기 (Slice)
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDataList = sortedMockData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 드롭다운 정렬 변경 시 호출
  const handleSortChange = (selectedOption) => {
    console.log("선택된 드롭다운 옵션:", selectedOption);
    setSortBy(selectedOption.id);
    setCurrentPage(1);
  };

  return (
    <div className="investment-page-container">
      <main className="investment-main">
        {/* 상단 헤더 영역 타이틀 & 드롭다운 */}
        <section className="investment-header">
          <h1 className="page-title">투자 현황</h1>
          <div className="filter-area">
            <Dropdown type="startup" onSelect={handleSortChange} />
          </div>
        </section>

        {/* 중앙 테이블 영역 */}
        <section className="table-container">
          <div className="table-header-wrapper">
            <table className="investment-table">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>기업 명</th>
                  <th>기업 소개</th>
                  <th>카테고리</th>
                  <th>View My Startup 투자 금액</th>
                  <th>실제 누적 투자 금액</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body-wrapper">
            <table className="investment-table">
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="table-message">
                      로딩 중...
                    </td>
                  </tr>
                ) : // ) : dataList.length === 0 ? (
                currentDataList.length === 0 ? ( // 임시
                  <tr>
                    <td colSpan="6" className="table-message">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  // dataList.map((item, index) => (
                  currentDataList.map((item, index) => (
                    <tr key={item.id || index} className="data-row">
                      <td className="rank-cell">
                        {(currentPage - 1) * 10 + (index + 1)}위
                      </td>
                      <td className="company-name">
                        <div className="company-info-wrap">
                          <img
                            src={item.logoUrl}
                            alt={item.name}
                            className="company-logo"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="company-desc">
                        <div className="desc-cell-container">
                          <div className="desc-text-wrap">
                            {item.description}
                          </div>
                        </div>
                      </td>

                      <td className="category-cell">
                        <span className="category-tag">{item.industry}</span>
                      </td>
                      <td className="amount-cell">
                        {item.latestRoundAmount?.toLocaleString()}억 원
                      </td>
                      <td className="amount-cell">
                        {item.totalInvestment?.toLocaleString()}억 원
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 하단 페이지네이션 영역 */}
        <section className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(currentTotalCount / 10)} // 임시
            // totalPages={Math.ceil(totalCount / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </main>
    </div>
  );
};

export default InvestmentPage;
