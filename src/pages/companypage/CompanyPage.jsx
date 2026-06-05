import React, { useEffect, useState } from "react";
import styles from "/src/pages/companyPage/CompanyPage.module.css";
import { useParams } from "react-router";
import { formatNumber } from "../../components/utils/formatNumber";
import corpinvestAPI from "./corpinvestAPI";
import { useModal } from "../../hooks/useModal";
import InvesetModal from "../../components/modal/InvesetModal";
import PasswordModal from "../../components/modal/PasswordModal";
import kebab from "/src/assets/icons/ic-kebab.svg";
import DropdownList from "../../components/common/dropdownlist/dropdownList";
import Button from "../../components/common/button/button";
import Pagination from "../../components/pagination/Pagination";

export default function CompanyPage() {
  const { id } = useParams();
  //투자하기or 수정하기 모달상태
  const { isOpen, open, close } = useModal();
  //투자하기 or 수정하기 어떤 모달을 여는지 관리하는 상태
  const [modalType, setModlaType] = useState("");

  const {
    isOpen: isOpenPassword,
    open: openPassword,
    close: closePassword,
  } = useModal();

  //페이지 관련 상태.
  const [totalPage, setTotalPages] = useState();
  const [currentPage, setCurPage] = useState(1);

  //기업 정보
  const [info, setInfo] = useState({});
  //투자 정보
  const [invesetList, setInvestList] = useState([]);

  //수정하기 삭제하기 드롭다운 관리
  const [isOpenId, setOpenDropDown] = useState(null);
  //모달에 넘겨줄 정보.
  const [modalInfo, setModalInfo] = useState({
    invesetId: 0,
    invesetComment: "",
    type: "",
  });

  //모달에 넘겨줄 정보담는 함수.
  function SetModalInfo(option, id, comment) {
    setModalInfo({
      type: option,
      invesetComment: comment,
      invesetId: id,
    });
  }
  //투자자 리스트 가져오는 함수
  async function getInvest() {
    const pageSize = 5;
    try {
      const data = await corpinvestAPI.getInvest(id, {
        page: currentPage,
        pageSize: pageSize,
      });

      setInvestList(data.data);
      const totalSize = Math.ceil(data.totalCnt / pageSize);
      setTotalPages(totalSize);
      getCompany();

      if (!data.data && currentPage > 1) {
        setCurPage(currentPage - 1);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //기업 정보 가져오는 함수
  async function getCompany() {
    try {
      const data = await corpinvestAPI.getCompany(id);
      setInfo(data);
    } catch (error) {
      console.error(error);
    }
  }

  //데이터 갱신.
  async function dataUpdate() {
    getCompany();
    getInvest();
  }

  useEffect(() => {
    dataUpdate();
  }, []);

  useEffect(() => {
    getInvest();
  }, [currentPage]);

  return (
    <div>
      <section>
        <div className={styles["company-info"]}>
          <div className={styles["company-inner"]}>
            <img
              className={styles["company-img"]}
              src={
                info.imageUrl ||
                "https://placehold.co/80x80" /*"https://picsum.photos/100/100"*/
              } //imageUrl이 없다면 그냥 랜덤이미지로 했는데 기본이미지 주소를 https://placehold.co/80x80로 하는것 같아서 변경.
              alt="로고이미지"
            />
            <div className={styles["name-category"]}>
              <span className={styles["company-name"]}>{info.name}</span>
              <span className={styles["company-category"]}>
                {info.category}
              </span>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1200"
            height="1"
            viewBox="0 0 1200 1"
            fill="none"
          >
            <path d="M0 0.5H1200" stroke="#2E2E2E" />
          </svg>
        </div>

        <ul className={styles["company-info-money"]}>
          <li className={styles["card-money"]}>
            <span className={styles["text-title"]}>누적투자 금액</span>
            <span className={styles["text-money"]}>
              {formatNumber(info.totalAmount)}
            </span>
          </li>
          <li className={styles["card-money"]}>
            <span className={styles["text-title"]}>매출액</span>
            <span className={styles["text-money"]}>
              {formatNumber(info.revenue)}
            </span>
          </li>
          <li className={styles["card-money"]}>
            <span className={styles["text-title"]}>고용인원</span>
            <span className={styles["text-money"]}>{info.headCount}명</span>
          </li>
        </ul>

        <div className={styles["company-desc-back"]}>
          <h2 className={styles["company-desc-title"]}>기업소개</h2>
          <p className={styles["company-desc"]}>{info.description}</p>
        </div>
      </section>

      <section>
        <div className={styles["invest-inner"]}>
          <h2 className={styles["invest-title"]}>
            View My Startup에서 받은 투자
          </h2>
          <Button
            className={styles["invest-button"]}
            onClick={() => {
              open();
              setModlaType("create");
            }}
          >
            기업투자하기
          </Button>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1200"
          height="1"
          viewBox="0 0 1200 1"
          fill="none"
        >
          <path d="M0 0.5H1200" stroke="#2E2E2E" />
        </svg>
        {totalPage !== 0 ? (
          <>
            <p
              className={styles["total-money"]}
            >{`총 ${formatNumber(info.totalAmount)}`}</p>
            <table className={styles["invest-table"]}>
              <thead>
                <tr>
                  <th>투자자 이름</th>
                  <th>순위</th>
                  <th>투자 금액</th>
                  <th>투자 코멘트</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* 밑에 tr은 테이블 간격주려고 만든 tr */}
                <tr />
                {invesetList.map((invest) => (
                  <tr key={invest.id}>
                    <td>{invest.name}</td>
                    <td>{invest.rank}</td>
                    <td>{formatNumber(invest.amount)}</td>
                    <td>{invest.comment}</td>
                    <td className={styles["kebab-cell"]}>
                      <button
                        className={styles["kebab-btn"]}
                        onClick={() => {
                          invest.id === isOpenId
                            ? setOpenDropDown(null)
                            : setOpenDropDown(invest.id);
                        }}
                      >
                        <img src={kebab} alt="옵션이미지" />
                      </button>
                      <div className={styles["listWrapper"]}>
                        {invest.id === isOpenId && (
                          <DropdownList
                            type="investment"
                            onSelect={(option) => {
                              openPassword();
                              SetModalInfo(option, isOpenId, invest.comment);
                              setOpenDropDown(null);
                            }}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={(page) => {
                setCurPage(page);
              }}
            />
          </>
        ) : (
          <p className={styles["inveset-empty"]}>
            아직 투자한 기업이 없어요,
            <br /> 버튼을 눌러 기업에 투자해보세요!
          </p>
        )}

        {isOpenPassword && (
          <PasswordModal
            onClose={closePassword}
            onDelete={dataUpdate}
            onUpdate={() => {
              open();
              setModlaType("update");
            }}
            option={modalInfo.type}
            id={modalInfo.invesetId}
          />
        )}

        {
          <InvesetModal
            type={modalType}
            isOpen={isOpen}
            onClose={close}
            onUpdate={dataUpdate}
            id={id}
            invesetId={modalInfo.invesetId}
            invesetComment={modalInfo.comment}
            info={info}
          />
        }
      </section>
    </div>
  );
}
