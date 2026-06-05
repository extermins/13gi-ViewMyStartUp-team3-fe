import { useState, useEffect } from "react";
import "./InvestmentPage.css";
import { formatNumber } from "../components/utils/formatNumber";
import { Link } from "react-router";

// 공통 컴포넌트 임포트
import Pagination from "../components/pagination/Pagination";
import Dropdown from "../components/common/dropdown/dropdown";

const InvestmentPage = () => {
  const [sortBy, setSortBy] = useState("simulated");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // 페이지 번호나 정렬 조건 변경 시 데이터 호출
  useEffect(() => {
    const getPageData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://one3gi-viewmystartup-team3-be.onrender.com/api/investcompanies?page=${currentPage}&pageSize=10&orderBy=${sortBy}&sort=${sortOrder}`,
        );

        const result = await response.json();

        if (result.success) {
          setDataList(result.data);
          setTotalCount(result.pagination.totalCount);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPageData();
  }, [currentPage, sortBy, sortOrder]);

  const handleSortChange = (selectedOption) => {
    const id = selectedOption.id;

    if (id.includes("vms_investment")) {
      setSortBy("simulated");
    } else if (id.includes("vms_actual")) {
      setSortBy("actual");
    }

    if (id.includes("asc")) {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }

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
                ) : dataList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="table-message">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  dataList.map((item, index) => (
                    <tr key={item.id || index} className="data-row">
                      <td className="rank-cell">
                        {(currentPage - 1) * 10 + (index + 1)}위
                      </td>
                      <td className="company-name">
                        <Link to={`/company/${item.id}`} className="aaa">
                          <div className="company-info-wrap">
                            <img
                              // src={item.logoUrl}
                              src={"https://placehold.co/80x80"}
                              // alt={item.name}
                              className="company-logo"
                            />
                            <span>{item.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="company-desc">
                        <div className="desc-cell-container">
                          <div className="desc-text-wrap">
                            {item.description}
                          </div>
                        </div>
                      </td>

                      <td className="category-cell">
                        <span className="category-tag">{item.category}</span>
                      </td>
                      <td className="amount-cell">
                        {formatNumber(item.simulatedInvestment)}
                      </td>
                      <td className="amount-cell">
                        {formatNumber(item.actualInvestment)}
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
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </main>
    </div>
  );
};

export default InvestmentPage;
