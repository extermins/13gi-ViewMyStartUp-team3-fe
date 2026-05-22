import React, { useState } from "react";
import { startups } from "../../data/startups";
import "./StartupSelectorModal.css";

export default function StartupSelectorModal({ selectedIds, onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = startups.filter(
    (s) =>
      !selectedIds.includes(s.id) &&
      (s.name.includes(searchQuery) || s.industry.includes(searchQuery)),
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">스타트업 선택</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          className="modal-search"
          type="text"
          placeholder="기업명 또는 업종 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <ul className="modal-list">
          {filtered.length === 0 && (
            <li className="modal-empty">검색 결과가 없습니다.</li>
          )}
          {filtered.map((startup) => (
            <li
              key={startup.id}
              className="modal-item"
              onClick={() => {
                onSelect(startup.id);
                onClose();
              }}
            >
              <span className="modal-item-logo">{startup.logo}</span>
              <div className="modal-item-info">
                <span className="modal-item-name">{startup.name}</span>
                <span className="modal-item-industry">{startup.industry}</span>
              </div>
              <span className="modal-item-stage">{startup.stage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
