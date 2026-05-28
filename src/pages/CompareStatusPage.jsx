import { useEffect, useState } from 'react'
import { getComparisonStats } from '../api/compareApi'

const PAGE_SIZE = 10

const SORT_OPTIONS = [
  { label: '나의 기업 선택 횟수 높은순', sortBy: 'mypickCount', order: 'desc' },
  { label: '나의 기업 선택 횟수 낮은순', sortBy: 'mypickCount', order: 'asc' },
  { label: '비교 기업 선택 횟수 높은순', sortBy: 'comparisonCount', order: 'desc' },
  { label: '비교 기업 선택 횟수 낮은순', sortBy: 'comparisonCount', order: 'asc' },
]

// 기업명 첫 글자 기반으로 로고 배경색 결정
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

export default function CompareStatusPage() {
  const [stats, setStats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortIndex, setSortIndex] = useState(0)

  const { sortBy, order } = SORT_OPTIONS[sortIndex]
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  useEffect(() => {
    setIsLoading(true)
    setError('')
    getComparisonStats({ page, pageSize: PAGE_SIZE, sortBy, order })
      .then((data) => {
        setStats(data.data ?? data.companies ?? [])
        setTotalCount(data.totalCount ?? data.total ?? 0)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [page, sortBy, order])

  function handleSortChange(e) {
    setSortIndex(Number(e.target.value))
    setPage(1)
  }

  return (
    <div className="page">
      <h1>비교 현황</h1>

      <div className="table-controls">
        <select className="sort-select" value={sortIndex} onChange={handleSortChange} aria-label="정렬 기준 선택">
          {SORT_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="notice error">{error}</p>}

      <div className="table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>기업명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>나의 기업 선택 횟수</th>
              <th>비교 기업 선택 횟수</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="table-status">불러오는 중...</td>
              </tr>
            )}
            {!isLoading && stats.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="table-status">비교 현황 데이터가 없습니다.</td>
              </tr>
            )}
            {stats.map((item, i) => (
              <tr key={item.id}>
                <td className="col-rank">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td>
                  <div className="company-cell">
                    {item.imageUrl ? (
                      <img className="company-logo" src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div
                        className="company-logo company-logo-fallback"
                        style={{ backgroundColor: getLogoColor(item.name) }}
                      >
                        {item.name?.slice(0, 1)}
                      </div>
                    )}
                    <strong className="company-name">{item.name}</strong>
                  </div>
                </td>
                <td className="col-description">{item.description}</td>
                <td><span className="category-tag">{item.category}</span></td>
                <td className="col-count">{(item.mypickCount ?? 0).toLocaleString()}회</td>
                <td className="col-count">{(item.comparisonCount ?? 0).toLocaleString()}회</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="페이지 네비게이션">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="이전 페이지"
          >
            &lt;
          </button>
          {getPageRange(page, totalPages).map((n, i) =>
            n === '...' ? (
              <span key={`ellipsis-${i}`} className="page-ellipsis">...</span>
            ) : (
              <button
                key={n}
                className={`page-btn${page === n ? ' active' : ''}`}
                onClick={() => setPage(n)}
                aria-current={page === n ? 'page' : undefined}
              >
                {n}
              </button>
            )
          )}
          <button
            className="page-btn"
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
