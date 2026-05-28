// src/components/startuptable/StartupTable.jsx
import React from "react";
import styles from "./StartupTable.module.css";

function StartupTable({ data = [] }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.thRank}`}>순위</th>
            <th className={`${styles.th} ${styles.thName}`}>기업 명</th>
            <th className={`${styles.th} ${styles.thDescription}`}>
              기업 소개
            </th>
            <th className={`${styles.th} ${styles.thCategory}`}>카테고리</th>
            <th className={`${styles.th} ${styles.thInvestment}`}>
              누적 투자 금액
            </th>
            <th className={`${styles.th} ${styles.thRevenue}`}>매출액</th>
            <th className={`${styles.th} ${styles.thEmployee}`}>고용 인원</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "16px" }}></tr>

          {data.map((item) => (
            <tr key={item.id} className={styles.tr}>
              <td className={`${styles.td} ${styles.tdRank}`}>{item.rank}</td>
              <td className={`${styles.td} ${styles.tdName}`}>{item.name}</td>
              <td className={`${styles.td} ${styles.tdDescription}`}>
                {item.description}
              </td>
              <td className={`${styles.td} ${styles.tdCategory}`}>
                {item.category}
              </td>
              <td className={`${styles.td} ${styles.tdInvestment}`}>
                {item.investment}
              </td>
              <td className={`${styles.td} ${styles.tdRevenue}`}>
                {item.revenue}
              </td>
              <td className={`${styles.td} ${styles.tdEmployee}`}>
                {item.employees}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StartupTable;
