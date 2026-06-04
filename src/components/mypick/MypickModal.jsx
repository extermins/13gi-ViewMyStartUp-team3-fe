import { useState, useEffect } from "react";
import styles from "./MypickModal.module.css";
import List from "../common/list/list";
import { Search } from "../common/searchfield/Search";
import closeIcon from "../../assets/icons/ic-delete.svg";
import Pagination from "../pagination/Pagination";

const MypickModal = ({ onSelect, onClose }) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  // 검색
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // 페이지네이션
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    async function companyData() {
      try {
        if (!search) {
          setCompanies([]);
          return;
        }
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/mypick/companies?search=${search}&page=${page}&limit=${limit}`,
        );
        const data = await res.json();
        setCompanies(data.data);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    companyData();
  }, [search, page]);

  // 최근 선택한 기업
  const session = () => {
    const companies =
      JSON.parse(sessionStorage.getItem("recentCompanies")) || [];
    // 선택한 기업 없음
    if (!companies)
      return (
        <div className={styles.sessionMessageContainer}>
          <p className={styles.message}>최근 선택한 기업이 없어요</p>
        </div>
      );

    // 선택한 기업 있음
    return (
      <div className={styles.sessionList}>
        {companies.map((company) => (
          <List
            key={company.id}
            imageUrl={company.imageUrl || "https://placehold.co/80x80"}
            title={company.name}
            subtle={company.category}
            label="선택하기"
            onSelect={() => {
              onSelect(company);
            }}
            buttonVariant="outline"
            buttonRadius="square"
          />
        ))}
      </div>
    );
  };

  // 검색 결과
  const result = () => {
    // 검색한 후 로딩
    if (isLoading)
      return (
        <div className={styles.resultMessageContainer}>
          <p className={styles.message}>로딩 중...</p>
        </div>
      );

    // 검색한 후 결과 없음
    if (search && companies.length === 0)
      return (
        <div className={styles.resultList}>
          <div className={styles.resultMessageContainer}>
            <p className={styles.message}>
              검색 결과가 없어요
              <br />
              다시 검색해보세요
            </p>
          </div>
        </div>
      );

    // 검색 결과 있음
    return (
      <>
        <div className={styles.resultList}>
          {companies.map((company) => (
            <List
              key={company.id}
              imageUrl={company.imageUrl || "https://placehold.co/80x80"}
              title={company.name}
              subtle={company.category}
              label="선택하기"
              onSelect={() => {
                onSelect(company);
              }}
              buttonVariant="outline"
              buttonRadius="square"
            />
          ))}
        </div>
        <div className={styles.pagination}>
          {companies.length >= 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
              onPageChange={setPage}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>나의 기업 선택하기</p>
          <img className={styles.image} src={closeIcon} onClick={onClose} />
        </div>

        <Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClear={() => {
            setSearchText("");
          }}
          onSearch={() => setSearch(searchText)}
          placeholder="기업 이름을 입력해주세요"
        ></Search>

        <div className={styles.sessionSection}>
          <p className={styles.subtle}>최근 선택된 기업</p>
          {session()}
        </div>

        {/* 검색 결과 있는 경우에만 검색 결과 제공 */}
        {search && (
          <div className={styles.resultSection}>
            <p className={styles.subtle}>검색 결과</p>
            {result()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MypickModal;
