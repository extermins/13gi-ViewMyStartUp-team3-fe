import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { getCompareById, getCompares } from '../api/compareApi'
import { formatAmount } from '../utils/formatNumber'

export default function CompareResultPage() {
  const [searchParams] = useSearchParams()
  const compareId = searchParams.get('compareId')
  const [compare, setCompare] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCompare = async () => {
      try {
        const data = compareId
          ? await getCompareById(compareId)
          : (await getCompares())[0]

        if (!data) {
          setCompare(null)
          return
        }
        setCompare(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadCompare()
  }, [compareId])

  const companies = compare?.companies.map(({ company }) => company) ?? []

  return (
    <div className="page">
      <h1>비교 결과</h1>

      {isLoading && <p>비교 결과를 불러오는 중입니다.</p>}
      {error && <p className="notice error">{error}</p>}

      {!isLoading && !error && !compare && (
        <p className="notice">비교할 데이터가 없습니다.</p>
      )}

      {compare && (
        <>
          <div className="page-head">
            <div>
              <h2>{compare.title}</h2>
              <p>{companies.length}개 기업 비교</p>
            </div>
            <Link className="button secondary" to="/compare">
              목록으로
            </Link>
          </div>

          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>기업명</th>
                  <th>카테고리</th>
                  <th>매출</th>
                  <th>누적 투자금</th>
                  <th>투자 건수</th>
                  <th>최근 라운드</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => {
                  const latestInvestment = [...company.investments].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                  )[0]

                  return (
                    <tr key={company.id}>
                      <td>
                        <strong>{company.name}</strong>
                        <span>{company.description}</span>
                      </td>
                      <td>{company.category || '-'}</td>
                      <td>{company.revenue ? formatAmount(company.revenue) : '-'}</td>
                      <td>{formatAmount(company.totalInvestment || 0)}</td>
                      <td>{company.investments.length}건</td>
                      <td>{latestInvestment?.round || '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
