import { useEffect, useState } from "react";
import styles from "./CompareResult.module.css";
import Field from "../../components/common/field/Field";
import img from "../../assets/images/img-logo-pc.png";
import { useSearchParams } from "react-router";

export default function CompareResult() {
  // 정렬
  const [rankOrderBy, setRankOrderBy] = useState("revenue");
  const [rankSort, setRankSort] = useState("desc");
  const [compareOrderBy, setCompareOrderBy] = useState("revenue");
  const [compareSort, setCompareSort] = useState("desc");

  // localStorage 값 가져오기
  const mypickid = localStorage.getItem("myCompany") ?? "";
  const compareCompaniesId = JSON.parse(
    localStorage.getItem("compareCompany") ?? "[]",
  );

  // 데이터
  const [mypickData, setMypickData] = useState(null);

  // console.log("mypickData : ", mypickData);
  const [compareData, setCompareData] = useState(null);
  // console.log("compareDate : ", compareData);
  const [rankData, setRankData] = useState(null);
  console.log("rankDate : ", rankData);

  // mypick 회사 데이터
  useEffect(() => {
    const mypickCompany = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/mypick/${mypickid}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMypickData(data);
        // console.log("mypick : ", data);
        return data;
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    mypickCompany();
  }, []);

  useEffect(() => {
    const compareCompanies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/compare/${[mypickid, ...compareCompaniesId].join(",")}?orderBy=${compareOrderBy}&sort=${compareSort}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCompareData(data);
        // console.log("mypick : ", data);
        return data;
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    compareCompanies();
  }, [compareOrderBy, compareSort]);

  useEffect(() => {
    const rankCompanies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/rank/${mypickid}?orderBy=${rankOrderBy}&sort=${rankSort}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRankData(data);
        // console.log("mypick : ", data);
        return data;
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    rankCompanies();
  }, [rankOrderBy, rankSort]);

  return (
    <div>
      <div className={styles["section-title-wrap"]}>
        <span className={styles["section-title"]}>내가 선택한 기업</span>
        <button>다른기업 비교하기</button>
      </div>
      <div className={styles.field}>
        <Field status={"active"}>
          <div className={styles.card}>
            <img src={img} className={styles["card-img"]}></img>
            <span className={styles["card-name"]}>
              {mypickData?.data?.name}
            </span>
            <span className={styles["card-des"]}>
              {mypickData?.data?.category}
            </span>
          </div>
        </Field>
      </div>

      <div>
        <div className={styles["section-title-wrap"]}>
          <span className={styles["section-title"]}>비교결과 확인하기</span>
          <div>dropdown</div>
        </div>

        <table className={styles.table}>
          <colgroup>
            <col className={styles.col1} />
            <col className={styles.col2} />
            <col className={styles.col3} />
            <col className={styles.col3} />
            <col className={styles.col3} />
            <col className={styles.col3} />
          </colgroup>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>기업 명</th>
              <th className={styles.th}>기업 소개</th>
              <th className={styles.th}>카테고리</th>
              <th className={styles.th}>누적 투자 금액</th>
              <th className={styles.th}>매출액</th>
              <th className={styles.th}>고용 인원</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {compareData?.data?.map((company) => (
              <tr
                key={company.id}
                className={
                  company.id == mypickid ? styles.highlight : styles.normal
                }
              >
                <td className={styles.td}>{company.name}</td>
                <td className={styles.td2}>
                  <div className={styles.word}>{company.description}</div>
                </td>
                <td className={styles.td2}>{company.category}</td>
                <td className={styles.td2}>{company.totalAmount}</td>
                <td className={styles.td2}>{company.revenue}</td>
                <td className={styles.td2}>{company.headCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div className={styles["section-title-wrap"]}>
          {/* margin-top이 56px 이지만 내 편의상 그냥 클래스 통합함 */}
          <span className={styles["section-title"]}>기업 순위 확인하기</span>
          <div>dropdown</div>
        </div>
        <table className={styles.table}>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className={styles.thead}>
            <tr>
              <th>순위</th>
              <th>기업 명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>누적 투자 금액</th>
              <th>매출액</th>
              <th>고용 인원</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {rankData?.data?.map((company) => (
              <tr
                key={company.id}
                className={
                  company.id == mypickid ? styles.highlight : styles.normal
                }
              >
                <td className={styles.td}>{company.rank}</td>
                <td className={styles.td}>{company.name}</td>
                <td className={styles.td2}>
                  <div className={styles.word}>{company.description}</div>
                </td>
                <td className={styles.td2}>{company.category}</td>
                <td className={styles.td2}>{company.totalAmount}</td>
                <td className={styles.td2}>{company.revenue}</td>
                <td className={styles.td2}>{company.headCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button>나의 기업에 투자하기</button>
    </div>
  );
}
