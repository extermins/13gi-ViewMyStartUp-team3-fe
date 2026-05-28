import { useState, useEffect } from 'react'
import ComparisonTable from '../components/comparison/ComparisonTable'
import Dropdown from '../components/common/dropdown/dropdown'
import './ComparisonPage.css'

// 드롭다운 option id → API 쿼리 파라미터 매핑
const SORT_PARAM_MAP = {
  my_selection_desc:      { sortBy: 'mypickCount',      order: 'desc' },
  my_selection_asc:       { sortBy: 'mypickCount',      order: 'asc'  },
  actual_investment_desc: { sortBy: 'totalInvestment',  order: 'desc' },
  actual_investment_asc:  { sortBy: 'totalInvestment',  order: 'asc'  },
}

const PAGE_SIZE = 10

export default function ComparisonPage() {
  const [sortId, setSortId] = useState('my_selection_desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { sortBy, order } = SORT_PARAM_MAP[sortId]
    const params = new URLSearchParams({
      sortBy,
      order,
      page: currentPage,
      pageSize: PAGE_SIZE,
    })

    setIsLoading(true)
    fetch(`/api/comparison-stats?${params}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data)
        setTotalPages(json.totalPages)
      })
      .catch((err) => console.error('[비교현황] API 오류:', err))
      .finally(() => setIsLoading(false))
  }, [sortId, currentPage])

  function handleSortSelect(option) {
    setSortId(option.id)
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
        {isLoading ? (
          <div className="table-empty">로딩 중...</div>
        ) : (
          <ComparisonTable data={data} />
        )}

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
