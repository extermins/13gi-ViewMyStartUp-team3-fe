import { useState } from 'react'
import { startups } from '../data/startups'
import ComparisonTable from '../components/comparison/ComparisonTable'
import Dropdown from '../components/common/dropdown/dropdown'
import './ComparisonPage.css'

const ITEMS_PER_PAGE = 10

// 정렬 옵션 id → 정렬 함수 매핑
const SORT_FN = {
  my_selection_desc: (a, b) => b.mySelectionCount - a.mySelectionCount,
  my_selection_asc: (a, b) => a.mySelectionCount - b.mySelectionCount,
  actual_investment_desc: (a, b) => b.totalInvestment - a.totalInvestment,
  actual_investment_asc: (a, b) => a.totalInvestment - b.totalInvestment,
}

export default function ComparisonPage() {
  const [sortId, setSortId] = useState('my_selection_desc')
  const [currentPage, setCurrentPage] = useState(1)

  // 정렬된 전체 데이터
  const sorted = [...startups].sort(SORT_FN[sortId] ?? SORT_FN.my_selection_desc)

  // 페이지네이션 계산
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const startRank = (currentPage - 1) * ITEMS_PER_PAGE + 1

  function handleSortSelect(option) {
    setSortId(option.id)
    // 정렬 변경 시 첫 페이지로 이동
    setCurrentPage(1)
  }

  function handlePageChange(page) {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className="comparison-page">
      <div className="comparison-page-inner">

        {/* 헤더 */}
        <div className="comparison-header">
          <h1 className="comparison-title">비교 현황</h1>
          <Dropdown type="enterprise" onSelect={handleSortSelect} />
        </div>

        {/* 테이블 */}
        <ComparisonTable data={paginated} startRank={startRank} />

        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            className="pagination-btn pagination-arrow"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'pagination-btn--active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ›
          </button>
        </div>

      </div>
    </div>
  )
}
