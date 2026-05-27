import React, { useState } from "react";
import "./Compare.css";
import plusIcon from "../assets/icons/ic-plus.svg";
import CompareSectionBox from "../components/comparesectionbox/CompareSectionBox";
import Card from "../components/common/card/card";
import Button from "../components/common/button/button";

const Compare = () => {
  const [myCompany, setMyCompany] = useState(
    () => JSON.parse(localStorage.getItem("myCompany")) || null,
  );
  const [compareCompany, setCompareCompany] = useState(
    () => JSON.parse(localStorage.getItem("compareCompany")) || [],
  );
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // (임시) 나의 기업 로컬 스토리지
  const handleSelectMyCompany = (company) => {
    setMyCompany(company);
    localStorage.setItem("myCompany", JSON.stringify(company));
    setIsMyModalOpen(false);
  }; // -> 모달 작업 후 연결
  const handleRemoveMyCompany = () => {
    setMyCompany(null);
    localStorage.removeItem("myCompany");
  };

  // (임시) 비교 기업 로컬 스토리지
  const handleSelectCompareCompany = (company) => {
    const updated = [...compareCompany, company];
    setCompareCompany(updated);
    localStorage.setItem("compareCompany", JSON.stringify(updated));
    setIsCompareModalOpen(false);
  }; // -> 모달 작업 후 연결
  const handleRemoveCompareCompany = (id) => {
    const updated = compareCompany.filter((c) => c.id !== id);
    setCompareCompany(updated);
    localStorage.setItem("compareCompany", JSON.stringify(updated));
  };

  // 전체 초기화
  const handleReset = () => {
    setMyCompany(null);
    setCompareCompany([]);
    localStorage.removeItem("myCompany");
    localStorage.removeItem("compareCompany");
  };

  return (
    <div className="CompareLayout">
      {/* 나의 기업 */}
      <section>
        <div className="selectContainer">
          <div className="textContainer">
            <h1 className="selectTitle">나의 기업을 선택해 주세요!</h1>
          </div>
          {myCompany && compareCompany.length >= 1 && (
            <Button onClick={handleReset}>전체 초기화</Button>
          )}
        </div>
        <CompareSectionBox variant={myCompany === null ? "empty" : "default"}>
          {myCompany === null ? (
            // 빈케이스
            <button
              className="addButton"
              onClick={
                () =>
                  handleSelectMyCompany({
                    id: 1,
                    name: "코드잇",
                    category: "에듀테크",
                    imageUrl: "https://picsum.photos/seed/codeit/100",
                  })
                // 모달 추가 후 교체 () => setIsMyModalOpen(true)
              }
            >
              <img className="addIcon" src={plusIcon} alt="" />
              <p className="emptyLabel">기업 추가</p>
            </button>
          ) : (
            // 기업 선택시
            <div>
              <button className="textButton" onClick={handleRemoveMyCompany}>
                선택 취소
              </button>
              <div className="info">
                <img
                  className="cardImage"
                  src={myCompany.imageUrl}
                  alt={myCompany.name}
                />
                <p className="cardTitle">{myCompany.name}</p>
                <p className="cardSubtle">{myCompany.category}</p>
              </div>
            </div>
          )}
        </CompareSectionBox>
      </section>

      {/* 비교 기업 */}
      {myCompany !== null && (
        <section>
          <div className="selectContainer">
            <div className="textContainer">
              <h2 className="selectTitle">어떤 기업이 궁금하세요?</h2>
              <span className="selectSubtle">(최대 5개)</span>
            </div>
            <Button
              disabled={compareCompany.length >= 5}
              onClick={
                () => {
                  const mocks = [
                    {
                      id: 2,
                      name: "카카오",
                      category: "IT",
                      imageUrl: "https://picsum.photos/seed/kakao/100",
                    },
                    {
                      id: 3,
                      name: "네이버",
                      category: "IT",
                      imageUrl: "https://picsum.photos/seed/naver/100",
                    },
                    {
                      id: 4,
                      name: "토스",
                      category: "핀테크",
                      imageUrl: "https://picsum.photos/seed/toss/100",
                    },
                  ];
                  setCompareCompany(mocks);
                  localStorage.setItem("compareCompany", JSON.stringify(mocks));
                }
                // 모달 추가 후 교체 () => setIsCompareModalOpen(true)
              }
            >
              기업 추가하기
            </Button>
          </div>
          <CompareSectionBox
            variant={compareCompany.length === 0 ? "empty" : "default"}
          >
            {compareCompany.length === 0 ? (
              <p className="emptyMessage">
                아직 추가된 기업이 없어요.
                <br />
                버튼을 눌러 기업을 추가해보세요!
              </p>
            ) : (
              <div className="cardList">
                {compareCompany.map((company) => (
                  <Card
                    key={company.id}
                    imageUrl={company.imageUrl}
                    title={company.name}
                    subtle={company.category}
                    onRemove={() => handleRemoveCompareCompany(company.id)}
                  />
                ))}
              </div>
            )}
          </CompareSectionBox>
        </section>
      )}
      <Button
        size="large"
        disabled={!myCompany || compareCompany.length === 0}
        onClick={() => {
          /* 비교 결과 페이지 이동 */
        }}
      >
        기업 비교하기
      </Button>
    </div>
  );
};

export default Compare;
