import { useEffect, useState } from "react";
import styles from "./CompareResult.module.css";
import Dropdown from "../../components/common/dropdown/dropdown";
import Button from "../../components/common/button/button";
import { formatNumber } from "../../components/utils/formatNumber.js";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal.js";
import Modal from "../../components/modal/Modal.jsx";
import {
  Input,
  PasswordInput,
  TextArea,
} from "../../components/common/inputfield/Input.jsx";

export default function CompareResult() {
  // 정렬
  const [rankOrderBy, setRankOrderBy] = useState("revenue");
  const [rankSort, setRankSort] = useState("desc");
  const [compareOrderBy, setCompareOrderBy] = useState("totalAmount");
  const [compareSort, setCompareSort] = useState("desc");

  // localStorage 값 가져오기
  const mypickid = localStorage.getItem("myCompany") ?? "";
  const compareCompaniesId = JSON.parse(
    localStorage.getItem("compareCompany") ?? "[]",
  );

  // 데이터
  const [mypickData, setMypickData] = useState(null);
  const [compareData, setCompareData] = useState(null);
  console.log("compareData : ", compareData);
  const [rankData, setRankData] = useState(null);

  const navigate = useNavigate();

  // mypick 회사 데이터
  useEffect(() => {
    const mypickCompany = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/mypick/${mypickid}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMypickData(data);
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    mypickCompany();
  }, []);

  const handleCompareSelect = (option) => {
    const [orderBy, sort] = option.id.split("_");

    const orderByMap = {
      investment: "totalAmount",
      employees: "headCount",
    };

    setCompareOrderBy(orderByMap[orderBy] ?? orderBy);
    setCompareSort(sort);
  };

  useEffect(() => {
    const compareCompanies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/compare/${[mypickid, ...compareCompaniesId].join(",")}?orderBy=${compareOrderBy}&sort=${compareSort}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompareData(data);
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    compareCompanies();
  }, [compareOrderBy, compareSort]);

  const handleRankSelect = (option) => {
    const [orderBy, sort] = option.id.split("_");
    setRankOrderBy(orderBy);
    setRankSort(sort);
  };

  useEffect(() => {
    const rankCompanies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/rank/${mypickid}?orderBy=${rankOrderBy}&sort=${rankSort}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRankData(data);
      } catch (error) {
        console.error("fetch 실패:", error);
      }
    };
    rankCompanies();
  }, [rankOrderBy, rankSort]);

  // 모달 관련
  const { isOpen, open, close } = useModal();
  const {
    isOpen: isAlertOpen,
    open: openAlert,
    close: closeAlert,
  } = useModal();
  const [alertMessage, setAlertMessage] = useState("");

  const [modalForm, setModalForm] = useState({
    name: "",
    amount: "",
    comment: "",
    password: "",
    organization: "mystartup",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  // 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    if (!modalForm.name.trim()) {
      newErrors.name = "투자자 이름을 입력해주세요";
    }

    if (!modalForm.amount) {
      newErrors.amount = "투자 금액을 입력해주세요";
    } else if (isNaN(Number(modalForm.amount))) {
      newErrors.amount = "숫자만 입력해주세요";
    } else if (Number(modalForm.amount) <= 0) {
      newErrors.amount = "투자 금액은 0보다 커야 합니다";
    }

    if (!modalForm.comment.trim()) {
      newErrors.comment = "투자자 코멘트를 입력해주세요";
    }

    if (!modalForm.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (modalForm.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요";
    } else if (modalForm.password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`http://localhost:3000/api/invest/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: mypickid,
          name: modalForm.name,
          amount: modalForm.amount,
          comment: modalForm.comment,
          password: modalForm.password,
          organization: modalForm.organization,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setAlertMessage("투자가 완료되었어요!");
        close();
        openAlert();
      } else {
        setAlertMessage("투자에 실패했습니다.");
        openAlert();
      }
    } catch (error) {
      console.error("투자 실패:", error);
      setAlertMessage("서버 오류가 발생했습니다.");
      openAlert();
    }
  };

  return (
    <div>
      <div className={styles["section-title-wrap"]}>
        <span className={styles["section-title"]}>내가 선택한 기업</span>
        <Button
          className={styles["button"]}
          onClick={() => navigate("/mypick")}
        >
          다른 기업 비교하기
        </Button>
      </div>
      <div className={styles["card-wrapper"]}>
        <div className={styles.field}>
          <div className={styles.card}>
            <img
              src="https://placehold.co/84x84"
              className={styles["card-img"]}
            />
            <span className={styles["card-name"]}>
              {mypickData?.data?.name}
            </span>
            <span className={styles["card-category"]}>
              {mypickData?.data?.category}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className={styles["section-title-wrap"]}>
          <span className={styles["section-title"]}>비교결과 확인하기</span>
          <Dropdown onSelect={handleCompareSelect} />
        </div>

        <div className={styles["grid-template-v1"]}>
          <div>기업 명</div>
          <div>기업 소개</div>
          <div>카테고리</div>
          <div>누적 투자 금액</div>
          <div>매출액</div>
          <div>고용 인원</div>
        </div>
        {compareData?.data?.map((company) => (
          <div
            key={company.id}
            className={`${styles["grid-template-v1-field"]} ${company.id == mypickid ? styles["grid-template-v1-field-active"] : ""}`}
          >
            <div>
              <div className={styles["company-name-wrapper"]}>
                <img
                  className={styles["company-name-image"]}
                  src={"https://placehold.co/80x80"}
                  alt={company.name}
                />
                <p className={styles["company-name"]}>{company.name}</p>
              </div>
            </div>
            <div>
              <div className={styles.description}>{company.description}</div>
            </div>
            <div className={styles["font-center"]}>{company.category}</div>
            <div className={styles["font-center"]}>
              {formatNumber(company.totalAmount)}
            </div>
            <div className={styles["font-center"]}>
              {formatNumber(company.revenue)}
            </div>
            <div className={styles["font-center"]}>{company.headCount} 명</div>
          </div>
        ))}
      </div>

      <div>
        <div className={styles["section-title-wrap"]}>
          <span className={styles["section-title"]}>기업 순위 확인하기</span>
          <Dropdown type="rank" onSelect={handleRankSelect} />
        </div>

        <div className={styles["grid-template-v2"]}>
          <div>순위</div>
          <div>기업 명</div>
          <div>기업 소개</div>
          <div>카테고리</div>
          <div>누적 투자 금액</div>
          <div>매출액</div>
          <div>고용 인원</div>
        </div>
        {rankData?.data?.map((company) => (
          <div
            key={company.id}
            className={`${styles["grid-template-v2-field"]} ${company.id == mypickid ? styles["grid-template-v2-field-active"] : ""}`}
          >
            <div className={styles["font-center"]}>{company.rank}</div>
            <div>
              <div className={styles["company-name-wrapper"]}>
                <img
                  className={styles["company-name-image"]}
                  src={"https://placehold.co/80x80"}
                  alt={company.name}
                />
                <p className={styles["company-name"]}>{company.name}</p>
              </div>
            </div>
            <div>
              <div className={styles.description}>{company.description}</div>
            </div>
            <div className={styles["font-center"]}>{company.category}</div>
            <div className={styles["font-center"]}>
              {formatNumber(company.totalInvestment)}
            </div>
            <div className={styles["font-center"]}>
              {formatNumber(company.revenue)}
            </div>
            <div className={styles["font-center"]}>{company.headCount} 명</div>
          </div>
        ))}
      </div>

      <div className={styles["investment"]}>
        <Button onClick={open} size="large">
          나의 기업에 투자하기
        </Button>

        <Modal isOpen={isOpen} onClose={close} title="기업에 투자하기">
          <div className={styles.label}>투자기업 정보</div>
          <div className={styles["modal-company-wrap"]}>
            <img
              src={"https://placehold.co/80x80"}
              className={styles["modal-img"]}
            />
            <span className={styles["company-names"]}>
              {mypickData?.data?.name}
            </span>
            <span className={styles["company-category"]}>
              {mypickData?.data?.category}
            </span>
          </div>
          <div className={styles["input-wrap"]}>
            <span className={styles.label}>투자자 이름</span>
            <div className={styles.input}>
              <Input
                value={modalForm.name}
                onChange={(e) =>
                  setModalForm({ ...modalForm, name: e.target.value })
                }
                placeholder="투자자 이름을 입력해주세요"
                error={errors.name}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <span className={styles.label}>투자 금액</span>
            <div className={styles.input}>
              <Input
                value={modalForm.amount}
                onChange={(e) =>
                  setModalForm({ ...modalForm, amount: e.target.value })
                }
                placeholder="투자 금액을 입력해주세요"
                error={errors.amount}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <span className={styles.label}>투자자 코멘트</span>
            <div className={styles.input}>
              <TextArea
                value={modalForm.comment}
                onChange={(e) =>
                  setModalForm({ ...modalForm, comment: e.target.value })
                }
                placeholder="투자에 대한 코멘트를 입력해주세요"
                error={errors.comment}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <span className={styles.label}>비밀번호</span>
            <div className={styles.input}>
              <PasswordInput
                value={modalForm.password}
                onChange={(e) =>
                  setModalForm({ ...modalForm, password: e.target.value })
                }
                placeholder="비밀번호를 입력해주세요"
                error={errors.password}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <span className={styles.label}>비밀번호 확인</span>
            <div className={styles.input}>
              <PasswordInput
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                error={errors.passwordConfirm}
              />
            </div>
          </div>
          <div className={styles["button-wrap"]}>
            <Button
              onClick={close}
              size="large"
              variant="outline"
              className={styles["button-cancel"]}
            >
              닫기
            </Button>
            <Button className={styles["button-ok"]} onClick={handleSubmit}>
              투자하기
            </Button>
          </div>
        </Modal>

        <Modal isOpen={isAlertOpen} onClose={closeAlert}>
          <p className={styles["create-res"]}>{alertMessage}</p>
          <div className={styles["button-wrap"]}>
            <Button
              onClick={() => {
                closeAlert();
                navigate("/");
              }}
              size="large"
            >
              확인
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
