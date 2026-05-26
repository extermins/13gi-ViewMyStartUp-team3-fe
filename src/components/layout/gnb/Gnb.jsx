import { Link, NavLink } from "react-router";
import logoPc from "/src/assets/images/img-logo-pc.png";
import logoMobile from "/src/assets/images/img-logo-mobile.png";
import styles from "/src/components/layout/gnb/gnb.module.css";
import { useEffect, useState } from "react";

export default function Gnb() {
  //굳이 상수로 만들필요가 있나 싶긴한데 나중에 다른 사이즈로 변경 하게 된다면? MOBILE_SIZE변수 내용만 바꾸면 되니깐...
  const MOBILE_SIZE = 375;
  //해상도에 따라 모바일 로고로 이미지 바꿔야 해서 해상도를 확인하는 State를 만들었다.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);

  useEffect(() => {
    const handleMobileSize = () => {
      //해상도가 지정한 사이즈보다 작다면 mobile로 체크하자...
      setIsMobile(window.innerWidth <= MOBILE_SIZE);
    };

    window.addEventListener("resize", handleMobileSize);

    //cleanup해주기.
    return () => window.removeEventListener("resize", handleMobileSize);
  }, []);

  return (
    <header className={styles["header-inner"]}>
      <nav className={styles["nav-inner"]}>
        <Link to="/">
          <img src={isMobile ? logoMobile : logoPc} alt="페이지 로고" />
        </Link>

        <div className={styles["menu-list"]}>
          {/* 각 NavLink에 연결된 경로는 임의로 지정해놨습니다. 담당자 분이 수정해주시면 될 것 같습니다. */}
          <NavLink
            to="/compare"
            end
            className={({ isActive }) =>
              `${styles["nav-text"]} ${isActive ? styles["active"] : ""}`
            }
          >
            나의 기업 비교
          </NavLink>
          <NavLink
            to="/compare/status"
            className={({ isActive }) =>
              `${styles["nav-text"]} ${isActive ? styles["active"] : ""}`
            }
          >
            비교 현황
          </NavLink>
          <NavLink
            to="/investment"
            className={({ isActive }) =>
              `${styles["nav-text"]} ${isActive ? styles["active"] : ""}`
            }
          >
            투자 현황
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
