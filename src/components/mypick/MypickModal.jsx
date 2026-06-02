import { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import List from "../common/list/list";
import { Search } from "../common/searchfield/Search";
import closeIcon from "../../assets/icons/ic-delete.svg";
import Pagination from "../pagination/Pagination";

const MypickModal = ({ onSelect }) => {
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
          `http://localhost:3000/mypick/companies?search=${search}&page=${page}&limit=${limit}`,
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

  const session = () => {
    const companies = JSON.parse(sessionStorage.getItem("myCompany"));
    if (!companies)
      return (
        <div className={styles.sessionEmptyContainer}>
          <p className={styles.empty}>최근 선택한 기업이 없어요</p>
        </div>
      );
    return (
      <div className={styles.resultList}>
        {companies.map((company) => (
          <List
            key={company.id}
            imageUrl={company.imageUrl ?? "https://placehold.co/80x80"}
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

  const result = () => {
    if (isLoading)
      return (
        <div className={styles.emptyContainer}>
          <p className={styles.empty}>로딩 중...</p>
        </div>
      );
    if (search && companies.length === 0)
      return (
        <div className={styles.emptyContainer}>
          <p className={styles.empty}>
            검색 결과가 없어요
            <br />
            다시 검색해보세요
          </p>
        </div>
      );
    return companies.map((company) => (
      <List
        key={company.id}
        imageUrl={company.imageUrl ?? "https://placehold.co/80x80"}
        title={company.name}
        subtle={company.category}
        label="선택하기"
        onSelect={() => {
          onSelect(company);
        }}
        buttonVariant="outline"
        buttonRadius="square"
      />
    ));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>나의 기업 선택하기</p>
          <img className={styles.image} src={closeIcon} />
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
        <div className={styles.section}>
          <p className={styles.title}>최근 선택된 기업</p>
          {session()}
        </div>
        {search && (
          <div className={styles.section}>
            <p className={styles.title}>검색 결과</p>
            <div className={styles.result}>
              <div className={styles.resultList}>{result()}</div>
              {companies.length >= 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(total / limit)}
                  onPageChange={setPage}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypickModal;
