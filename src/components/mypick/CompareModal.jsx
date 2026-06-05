import { useState, useEffect } from "react";
import styles from "./CompareModal.module.css";
import List from "../common/list/list";
import { Search } from "../common/searchfield/Search";
import closeIcon from "../../assets/icons/ic-delete.svg";
import Pagination from "../pagination/Pagination";

const CompareModal = ({ onClose }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState(
    () => JSON.parse(sessionStorage.getItem("compareCompany")) || [],
  );
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
          `https://one3gi-viewmystartup-team3-be.onrender.com/api/mypick/companies?search=${search}&page=${page}&limit=${limit}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCompanies(data.data);
        setTotal(data.total);
      } catch (err) {
        console.error("기업 목록 조회 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }
    companyData();
  }, [search, page]);

  // 선택한 기업에 추가
  const handleAddSelectCompany = (company) => {
    const updated = [...selectedCompanies, company];
    setSelectedCompanies(updated);
  };
  // 선택한 기업에서 삭제
  const handleRemoveSelectCompany = (id) => {
    setSelectedCompanies(
      selectedCompanies.filter((company) => company.id !== id),
    );
  };

  // 선택한 기업
  const select = () => {
    // 선택한 기업 없음
    if (selectedCompanies.length === 0)
      return (
        <div className={styles.selectMessageContainer}>
          <p className={styles.message}>기업을 선택해주세요</p>
        </div>
      );

    // 선택한 기업 있음
    return (
      <div className={styles.resultList}>
        {selectedCompanies.map((company) => (
          <List
            key={company.id}
            imageUrl={company.imageUrl || "https://placehold.co/80x80"}
            title={company.name}
            subtle={company.category}
            label="선택 해제"
            onSelect={() => handleRemoveSelectCompany(company.id)}
            buttonVariant="secondary"
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
        <div className={styles.resultMessageContainer}>
          <p className={styles.message}>
            검색 결과가 없어요
            <br />
            다시 검색해보세요
          </p>
        </div>
      );

    // 검색 결과 있음
    if (search && companies.length !== 0)
      return (
        <>
          <div className={styles.resultList}>
            {companies.map((company) => {
              // 선택한 기업 리스트
              const isSelected = selectedCompanies.some(
                (selectedCompany) => selectedCompany.id === company.id,
              );
              // 최대 5개 제한
              const isFull = selectedCompanies.length >= 5;
              return (
                <List
                  key={company.id}
                  imageUrl={company.imageUrl || "https://placehold.co/80x80"}
                  title={company.name}
                  subtle={company.category}
                  label={isSelected ? "선택완료" : "선택하기"}
                  onSelect={() =>
                    !isSelected && !isFull && handleAddSelectCompany(company)
                  }
                  buttonVariant={isSelected ? "secondary" : "outline"}
                  buttonRadius="square"
                  disabled={isSelected || (isFull && !isSelected)}
                />
              );
            })}
          </div>
          <div className={styles.pagination}>
            {companies.length >= 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(total / limit)}
                onPageChange={setPage}
                style={{
                  backgroundColor: "transparent",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
              />
            )}
          </div>
        </>
      );

    // 검색 전
    return (
      <div className={styles.resultMessageContainer}>
        <p className={styles.message}>기업을 검색해보세요</p>
      </div>
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>비교할 기업 선택하기</p>
          <img
            className={styles.image}
            src={closeIcon}
            onClick={() => onClose(selectedCompanies)}
          />
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

        <div className={styles.selectSection}>
          <div className={styles.textContainer}>
            <p className={styles.subtle}>선택한 기업</p>
            <span className={styles.selectSubtle}>(최대 5개)</span>
          </div>
          {select()}
        </div>

        <div className={styles.resultSection}>
          <p className={styles.subtle}>
            검색 결과 {search.length > 0 && `(${total})`}
          </p>
          {result()}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
