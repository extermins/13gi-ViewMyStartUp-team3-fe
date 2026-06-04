import { useState } from "react";
import styles from "./Mypick.module.css";
import plusIcon from "../assets/icons/ic-plus.svg";
import SectionBox from "../components/mypick/SectionBox";
import Card from "../components/common/card/card";
import Button from "../components/common/button/button";
import MypickModal from "../components/mypick/MypickModal";
import CompareModal from "../components/mypick/CompareModal";
import { useNavigate } from "react-router";

const Mypick = () => {
  // 세션 스토리지 가져오기
  const getMyCompany = () =>
    JSON.parse(sessionStorage.getItem("myCompany")) || null;
  const getCompareCompany = () =>
    JSON.parse(sessionStorage.getItem("compareCompany")) || [];

  const [myCompany, setMyCompany] = useState(getMyCompany);
  const [compareCompany, setCompareCompany] = useState(getCompareCompany);
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // 나의 기업 세션/로컬 스토리지 저장하기/세션 스토리지 삭제하기
  const handleSelectMyCompany = (company) => {
    // 선택한 기업 (페이지))
    setMyCompany(company);
    sessionStorage.setItem("myCompany", JSON.stringify(company));
    // 최근 선택한 기업 (모달)
    const recent = JSON.parse(localStorage.getItem("recentCompanies")) || [];
    const filter = recent.filter((recent) => recent.id !== company.id);
    const updated = [company, ...filter].slice(0, 5);
    localStorage.setItem("recentCompanies", JSON.stringify(updated));

    setIsMyModalOpen(false);
  };
  const handleRemoveMyCompany = () => {
    setMyCompany(null);
    sessionStorage.removeItem("myCompany");
  };

  // 비교 기업 세션 스토리지 저장하기/삭제하기
  const handleSelectCompareCompany = (selectedCompanies) => {
    setCompareCompany(selectedCompanies);
    sessionStorage.setItem("compareCompany", JSON.stringify(selectedCompanies));
    setIsCompareModalOpen(false);
  };
  const handleRemoveCompareCompany = (id) => {
    const updated = compareCompany.filter((company) => company.id !== id);
    setCompareCompany(updated);
    sessionStorage.setItem("compareCompany", JSON.stringify(updated));
  };

  // 전체 초기화
  const handleReset = () => {
    if (!window.confirm("전체 초기화 하시겠습니까?")) return;
    setMyCompany(null);
    setCompareCompany([]);
    sessionStorage.removeItem("myCompany");
    sessionStorage.removeItem("compareCompany");
  };

  const navigate = useNavigate();
  // 기업 비교하기 버튼 클릭시
  const handleCompare = async () => {
    if (!myCompany) return;
    await fetch(
      `http://localhost:3000/api/mypick/companies/${myCompany.id}/mypick`,
      {
        method: "PATCH",
      },
    );
    await Promise.all(
      compareCompany.map((company) =>
        fetch(
          `http://localhost:3000/api/mypick/companies/${company.id}/comparison`,
          {
            method: "PATCH",
          },
        ),
      ),
    );

    // 결과 페이지로 보낼 데이터 로컬 스토리지로 저장하기 -> id 값으로 넘기기
    localStorage.setItem("myCompany", JSON.stringify(myCompany));
    localStorage.setItem("compareCompany", JSON.stringify(compareCompany));

    navigate("/mypick/result");
  };

  return (
    <div className={styles.compareLayout}>
      {/* 나의 기업 */}
      <section>
        <div className={styles.selectContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.selectTitle}>나의 기업을 선택해 주세요!</h1>
          </div>
          {myCompany && compareCompany.length >= 1 && (
            <Button onClick={handleReset}>전체 초기화</Button>
          )}
        </div>
        <SectionBox variant={myCompany === null ? "empty" : "default"}>
          {myCompany === null ? (
            // 빈케이스
            <button
              className={styles.addButton}
              onClick={() => setIsMyModalOpen(true)}
            >
              <img className={styles.addIcon} src={plusIcon} alt="" />
              <p className={styles.emptyLabel}>기업 추가</p>
            </button>
          ) : (
            // 기업 선택시
            <div>
              <button
                className={styles.textButton}
                onClick={handleRemoveMyCompany}
              >
                선택 취소
              </button>
              <div className={styles.info}>
                <img
                  className={styles.cardImage}
                  src={myCompany.imageUrl || "https://placehold.co/80x80"}
                  alt={myCompany.name}
                />
                <p className={styles.cardTitle}>{myCompany.name}</p>
                <p className={styles.cardSubtle}>{myCompany.category}</p>
              </div>
            </div>
          )}
        </SectionBox>
      </section>

      {/* 비교 기업 */}
      {(myCompany !== null || compareCompany.length > 0) && (
        <section>
          <div className={styles.selectContainer}>
            <div className={styles.textContainer}>
              <h2 className={styles.selectTitle}>어떤 기업이 궁금하세요?</h2>
              <span className={styles.selectSubtle}>(최대 5개)</span>
            </div>
            <Button
              disabled={compareCompany.length >= 5}
              onClick={() => setIsCompareModalOpen(true)}
            >
              기업 추가하기
            </Button>
          </div>
          <SectionBox
            variant={compareCompany.length === 0 ? "empty" : "default"}
          >
            {compareCompany.length === 0 ? (
              <p className={styles.emptyMessage}>
                아직 추가된 기업이 없어요.
                <br />
                버튼을 눌러 기업을 추가해보세요!
              </p>
            ) : (
              <div className={styles.cardList}>
                {compareCompany.map((company) => (
                  <Card
                    key={company.id}
                    imageUrl={company.imageUrl || "https://placehold.co/80x80"}
                    title={company.name}
                    subtle={company.category}
                    onRemove={() => handleRemoveCompareCompany(company.id)}
                  />
                ))}
              </div>
            )}
          </SectionBox>
        </section>
      )}
      <div className={styles.compareButton}>
        <Button
          size="large"
          disabled={!myCompany || compareCompany.length === 0}
          onClick={() => handleCompare()}
        >
          기업 비교하기
        </Button>
      </div>

      {/* 모달 */}
      {isMyModalOpen && (
        <MypickModal
          onSelect={handleSelectMyCompany}
          onClose={() => setIsMyModalOpen(false)}
        />
      )}
      {isCompareModalOpen && (
        <CompareModal onClose={handleSelectCompareCompany} />
      )}
    </div>
  );
};

export default Mypick;
