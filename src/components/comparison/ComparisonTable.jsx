import './ComparisonTable.css'

export default function ComparisonTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>데이터가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="col-rank">순위</th>
            <th className="col-name">기업 명</th>
            <th className="col-desc">기업 소개</th>
            <th className="col-category">카테고리</th>
            <th className="col-count">나의 기업 선택 횟수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((startup) => (
            <tr key={startup.id}>
              <td className="col-rank">{startup.rank}위</td>
              <td className="col-name">
                <div className="startup-name-cell">
                  {startup.imageUrl ? (
                    <img
                      src={startup.imageUrl}
                      alt={startup.name}
                      className="startup-logo-img"
                    />
                  ) : (
                    <div className="startup-logo-placeholder" />
                  )}
                  <div className="startup-name-info">
                    <span className="startup-name">{startup.name}</span>
                    <span className="startup-category-sub">{startup.category}</span>
                  </div>
                </div>
              </td>
              <td className="col-desc">
                <span className="startup-desc">{startup.description}</span>
              </td>
              <td className="col-category">{startup.category}</td>
              <td className="col-count">
                {startup.mypickCount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
