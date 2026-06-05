// src/components/startuptable/StartupTable.jsx

import React from "react";
import { Link } from "react-router";
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

              {/* 글자만 있던 곳을 Link로 묶어 로고와 이름 전체가 클릭되게 만듭니다 */}
              <td className={`${styles.td} ${styles.tdName}`}>
                <Link
                  to={`/company/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }} // Link 특유의 파란 밑줄 제거
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer", // 마우스를 올리면 누를 수 있게 손가락 모양으로 변경
                    }}
                  >
                    {item.imageUrl ? (
                      // 1. 백엔드에서 이미지가 넘어온 경우
                      <img
                        src={item.imageUrl}
                        alt={`${item.name} 로고`}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          objectFit: "cover", // 이미지가 찌그러지지 않게 꽉 채움
                          border: "1px solid #333",
                        }}
                      />
                    ) : (
                      // 2. 이미지가 없는 경우 (피그마 디자인을 위한 빈 박스)
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "#2a2a2a", // 어두운 배경에 맞는 회색 박스
                          border: "1px solid #333",
                        }}
                      ></div>
                    )}
                    <span>{item.name}</span>
                  </div>
                </Link>
              </td>

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
