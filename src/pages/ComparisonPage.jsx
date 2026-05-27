import React, { useState } from "react";
import { startups } from "../data/startups";
import ComparisonTable from "../components/comparison/ComparisonTable";
import StartupSelectorModal from "../components/comparison/StartupSelectorModal";
import Button from "../components/common/Button";
import "./ComparisonPage.css";

const MAX_COMPARE = 4;

export default function ComparisonPage() {
  // 비교 중인 스타트업 id 목록 (최대 4개)
  const [selectedIds, setSelectedIds] = useState([1, 2]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedStartups = selectedIds.map((id) => startups.find((s) => s.id === id));

  function handleAdd(id) {
    if (selectedIds.length >= MAX_COMPARE) return;
    setSelectedIds((prev) => [...prev, id]);
  }

  function handleRemove(id) {
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  }

  return (
    <div className="comparison-page">
      <div className="comparison-page-inner">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h1 className="page-title">비교 현황</h1>
          <p className="page-desc">
            관심 스타트업의 투자 지표를 나란히 비교해보세요. (최대 {MAX_COMPARE}개)
          </p>
        </div>

        {/* 선택된 스타트업 카드 목록 */}
        <div className="selected-area">
          {selectedStartups.map((startup) => (
            <div key={startup.id} className="selected-card">
              <span className="selected-card-logo">{startup.logo}</span>
              <div className="selected-card-info">
                <span className="selected-card-name">{startup.name}</span>
                <span className="selected-card-industry">{startup.industry}</span>
              </div>
              <button
                className="selected-card-remove"
                onClick={() => handleRemove(startup.id)}
                aria-label={`${startup.name} 제거`}
              >
                ✕
              </button>
            </div>
          ))}

          {/* 추가 버튼 */}
          {selectedIds.length < MAX_COMPARE && (
            <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
              + 스타트업 추가
            </Button>
          )}
        </div>

        {/* 비교 테이블 */}
        <ComparisonTable startupList={selectedStartups} />
      </div>

      {/* 스타트업 선택 모달 */}
      {isModalOpen && (
        <StartupSelectorModal
          selectedIds={selectedIds}
          onSelect={handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
