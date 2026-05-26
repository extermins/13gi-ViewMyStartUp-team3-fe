import { useEffect, useState } from 'react'
import { formatAmount } from '../utils/formatNumber'
import './InvestmentStatusPage.css'

const PAGE_SIZE = 10

const SORT_OPTIONS = [
  { label: '누적 투자금 높은순', sortBy: 'totalInvestment', order: 'desc' },
  { label: '누적 투자금 낮은순', sortBy: 'totalInvestment', order: 'asc' },
  { label: '투자 건수 높은순',   sortBy: 'investmentCount', order: 'desc' },
  { label: '투자 건수 낮은순',   sortBy: 'investmentCount', order: 'asc' },
]

// 기업명 첫 글자 기반으로 로고 배경색 결정 (이미지 없을 때 폴백)
const LOGO_COLORS = ['#aa3bff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
function getLogoColor(name = '') {
  let hash = 0
  for (const char of name) hash += char.charCodeAt(0)
  return LOGO_COLORS[hash % LOGO_COLORS.length]
}

// 페이지 범위 계산 (최대 7개 버튼, 초과 시 말줄임표)
function getPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

// 투자 현황 데이터 조회 (목 데이터 → 백엔드 연동 시 startupApi.getStartups()로 교체)
async function fetchInvestmentStats({ page, pageSize, sortBy, order, keyword }) {
  const { MOCK_INVESTMENTS, INVESTMENT_TOTAL_COUNT } = await import('../mocks/investmentData.js')

  // 검색어 필터링
  const filtered = keyword
    ? MOCK_INVESTMENTS.filter((item) => item.name.includes(keyword))
    : MOCK_INVESTMENTS

  // 정렬
  const sorted = [...filtered].sort((a, b) =>
    order === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
  )

  const start = (page - 1) * pageSize
  return {
    data: sorted.slice(start, start + pageSize),
    totalCount: keyword ? filtered.length : INVESTMENT_TOTAL_COUNT,
  }
}

export default function InvestmentStatusPage() {
  const [investments, setInvestments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortIndex, setSortIndex] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  // 실제 검색에 사용되는 키워드 (엔터/버튼 클릭 시에만 반영)
  const [keyword, setKeyword] = useState('')

  const { sortBy, order } = SORT_OPTIONS[sortIndex]
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError('')
      try {
        const data = await fetchInvestmentStats({ page, pageSize: PAGE_SIZE, sortBy, order, keyword })
        if (!cancelled) {
          setInvestments(data.data)
          setTotalCount(data.totalCount)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [page, sortBy, order, keyword])

  function handleSortChange(e) {
    setSortIndex(Number(e.target.value))
    setPage(1)
  }

  function handleSearch(e) {
    e.preventDefault()
    setKeyword(searchInput.trim())
    setPage(1)
  }

  function handleSearchReset() {
    setSearchInput('')
    setKeyword('')
    setPage(1)
  }

  return (
    <div className="investment-page">
      <h1 className="investment-page__title">투자 현황</h1>

      <div className="investment-page__controls">
        {/* 검색 폼 */}
        <form className="investment-page__search" onSubmit={handleSearch}>
          <input
            className="investment-page__search-input"
            type="text"
            placeholder="기업명을 검색하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="기업명 검색"
          />
          {keyword && (
            <button
              type="button"
              className="investment-page__search-reset"
              onClick={handleSearchReset}
              aria-label="검색 초기화"
            >
              ✕
            </button>
          )}
          <button type="submit" className="investment-page__search-btn">검색</button>
        </form>

        {/* 정렬 선택 */}
        <select
          className="investment-page__sort"
          value={sortIndex}
          onChange={handleSortChange}
          aria-label="정렬 기준 선택"
        >
          {SORT_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="investment-page__notice investment-page__notice--error">{error}</p>}

      <div className="investment-page__table-wrap">
        <table className="investment-page__table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기업명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>누적 투자금</th>
              <th>투자 건수</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="investment-page__status">불러오는 중...</td>
              </tr>
            )}
            {!isLoading && investments.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="investment-page__status">
                  {keyword ? `"${keyword}" 검색 결과가 없습니다.` : '투자 현황 데이터가 없습니다.'}
                </td>
              </tr>
            )}
            {investments.map((item, i) => (
              <tr key={item.id}>
                <td className="investment-page__col-rank">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td>
                  <div className="investment-page__company">
                    {item.imageUrl ? (
                      <img
                        className="investment-page__logo"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    ) : (
                      <div
                        className="investment-page__logo investment-page__logo--fallback"
                        style={{ backgroundColor: getLogoColor(item.name) }}
                      >
                        {item.name?.slice(0, 1)}
                      </div>
                    )}
                    <strong className="investment-page__company-name">{item.name}</strong>
                  </div>
                </td>
                <td className="investment-page__col-desc">{item.description}</td>
                <td>
                  <span className="investment-page__category">{item.category}</span>
                </td>
                <td className="investment-page__col-amount">
                  {formatAmount(item.totalInvestment)}
                </td>
                <td className="investment-page__col-count">{item.investmentCount}건</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="investment-page__pagination" aria-label="페이지 네비게이션">
          <button
            className="investment-page__page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="이전 페이지"
          >
            &lt;
          </button>
          {getPageRange(page, totalPages).map((n, i) =>
            n === '...' ? (
              <span key={`ellipsis-${i}`} className="investment-page__ellipsis">...</span>
            ) : (
              <button
                key={n}
                className={`investment-page__page-btn${page === n ? ' investment-page__page-btn--active' : ''}`}
                onClick={() => setPage(n)}
                aria-current={page === n ? 'page' : undefined}
              >
                {n}
              </button>
            )
          )}
          <button
            className="investment-page__page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="다음 페이지"
          >
            &gt;
          </button>
        </nav>
      )}
    </div>
  )
}
