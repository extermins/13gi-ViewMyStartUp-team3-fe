import React, { useState } from "react";
import { NavLink } from "react-router";
import "./Header.css";

const NAV_ITEMS = [
  { label: "홈", to: "/" },
  { label: "스타트업", to: "/startups" },
  { label: "비교 현황", to: "/comparison" },
  { label: "투자 현황", to: "/investments" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* 로고 */}
        <NavLink to="/" className="header-logo">
          <span className="header-logo-icon">📊</span>
          <span className="header-logo-text">ViewMyStartup</span>
        </NavLink>

        {/* 데스크톱 네비게이션 */}
        <nav className="header-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "header-nav-link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="header-actions">
          <button className="header-login-btn">로그인</button>
          <button className="header-signup-btn">회원가입</button>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <nav className="header-mobile-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `header-mobile-link ${isActive ? "header-mobile-link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="header-mobile-actions">
            <button className="header-login-btn">로그인</button>
            <button className="header-signup-btn">회원가입</button>
          </div>
        </nav>
      )}
    </header>
  );
}
