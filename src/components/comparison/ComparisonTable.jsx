import React from "react";
import "./ComparisonTable.css";

// 투자 지표 행 정의
const METRICS = [
  { key: "industry", label: "업종", format: (v) => v, type: "text" },
  { key: "foundedYear", label: "설립연도", format: (v) => `${v}년`, type: "text" },
  {
    key: "stage",
    label: "투자 단계",
    format: (v) => v,
    type: "badge",
  },
  {
    key: "totalInvestment",
    label: "누적 투자금액",
    format: (v) => formatAmount(v),
    type: "number",
    higher: "better",
  },
  {
    key: "latestRoundAmount",
    label: "최근 라운드 금액",
    format: (v) => (v === 0 ? "IPO 완료" : formatAmount(v)),
    type: "number",
    higher: "better",
  },
  {
    key: "valuation",
    label: "기업가치",
    format: (v) => formatAmount(v),
    type: "number",
    higher: "better",
  },
  {
    key: "investorCount",
    label: "투자자 수",
    format: (v) => (v === 0 ? "공개상장" : `${v.toLocaleString()}개`),
    type: "number",
    higher: "better",
  },
  {
    key: "employeeCount",
    label: "임직원 수",
    format: (v) => `${v.toLocaleString()}명`,
    type: "number",
    higher: "better",
  },
  {
    key: "revenue",
    label: "연간 매출",
    format: (v) => formatAmount(v),
    type: "number",
    higher: "better",
  },
];

function formatAmount(amount) {
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}조 원`;
  }
  return `${amount.toLocaleString()}억 원`;
}

// 수치가 가장 높은 스타트업 id 찾기
function getBestId(startupList, key) {
  if (startupList.length < 2) return null;
  const values = startupList.map((s) => s[key]);
  const max = Math.max(...values);
  if (values.filter((v) => v === max).length > 1) return null; // 동점이면 강조 없음
  return startupList.find((s) => s[key] === max)?.id ?? null;
}

export default function ComparisonTable({ startupList }) {
  if (startupList.length === 0) {
    return (
      <div className="table-empty">
        <p>비교할 스타트업을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="metric-col">비교 항목</th>
            {startupList.map((startup) => (
              <th key={startup.id} className="startup-col">
                <div className="startup-col-inner">
                  <span className="startup-col-logo">{startup.logo}</span>
                  <span className="startup-col-name">{startup.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {METRICS.map((metric) => {
            const bestId =
              metric.higher === "better"
                ? getBestId(startupList, metric.key)
                : null;

            return (
              <tr key={metric.key}>
                <td className="metric-label">{metric.label}</td>
                {startupList.map((startup) => {
                  const isBest = bestId === startup.id;
                  return (
                    <td
                      key={startup.id}
                      className={`metric-value ${isBest ? "metric-value--best" : ""}`}
                    >
                      {metric.type === "badge" ? (
                        <span className="stage-badge">
                          {metric.format(startup[metric.key])}
                        </span>
                      ) : (
                        metric.format(startup[metric.key])
                      )}
                      {isBest && <span className="best-marker">▲</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
