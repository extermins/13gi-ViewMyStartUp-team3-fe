import React, { useState } from "react";
import modalStyles from "./../../pages/compareresult/CompareResult.module.css";

import { useModal } from "../../hooks/useModal";

import { Input, PasswordInput, TextArea } from "../common/inputfield/Input";
import Modal from "./Modal";
import Button from "../common/button/button";
import corpinvestAPI from "../../pages/companypage/corpinvestAPI";

export default function InvesetModal({
  type,
  isOpen,
  onClose,
  onUpdate,
  id,
  invesetId,
  invesetComment,
  info,
}) {
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

    console.log(type);

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
          companyId: id,
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
        openAlert();
        onUpdate();
      } else {
        setAlertMessage("투자에 실패했습니다.");
        openAlert();
      }
    } catch (error) {
      console.error("투자 실패:", error);
      setAlertMessage("서버 오류가 발생했습니다.");
      openAlert();
    }
    onClose();
  };

  const handleUpdateSubmit = async () => {
    //즉시 실행함수로 유효성 검사.
    const newErrors = (() => {
      const newErrors = {};

      if (!modalForm.amount) {
        newErrors.amount = "투자 금액을 입력해주세요";
      } else if (isNaN(Number(modalForm.amount))) {
        newErrors.amount = "숫자만 입력해주세요";
      } else if (Number(modalForm.amount) <= 0) {
        newErrors.amount = "투자 금액은 0보다 커야 합니다";
      }
      return newErrors;
    })();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const comment = modalForm.comment || invesetComment;
    try {
      const response = await corpinvestAPI.patchInvest(invesetId, {
        comment: comment,
        amount: modalForm.amount,
      });
      setAlertMessage("수정이 완료 되었습니다.");
      onUpdate();
    } catch (error) {
      console.error("수정 실패:", error.message);
    }
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="기업에 투자하기">
        <div className={modalStyles.label}>투자기업 정보</div>
        <div className={modalStyles["modal-company-wrap"]}>
          <img
            src={"https://placehold.co/80x80"}
            className={modalStyles["modal-img"]}
          />
          <span className={modalStyles["company-names"]}> {info.name}</span>
          <span className={modalStyles["company-category"]}>
            {" "}
            {info.category}
          </span>
        </div>
        {type === "create" && (
          <div className={modalStyles["input-wrap"]}>
            <span className={modalStyles.label}>투자자 이름</span>
            <div className={modalStyles.input}>
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
        )}

        <div className={modalStyles["input-wrap"]}>
          <span className={modalStyles.label}>투자 금액</span>
          <div className={modalStyles.input}>
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
        <div className={modalStyles["input-wrap"]}>
          <span className={modalStyles.label}>투자자 코멘트</span>
          <div className={modalStyles.input}>
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
        {type === "create" && (
          <>
            <div className={modalStyles["input-wrap"]}>
              <span className={modalStyles.label}>비밀번호</span>
              <div className={modalStyles.input}>
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
            <div className={modalStyles["input-wrap"]}>
              <span className={modalStyles.label}>비밀번호 확인</span>
              <div className={modalStyles.input}>
                <PasswordInput
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  error={errors.passwordConfirm}
                />
              </div>
            </div>
          </>
        )}

        <div className={modalStyles["button-wrap"]}>
          <Button
            onClick={onClose}
            size="large"
            variant="outline"
            className={modalStyles["button-cancel"]}
          >
            닫기
          </Button>
          <Button
            className={modalStyles["button-ok"]}
            onClick={type === "create" ? handleSubmit : handleUpdateSubmit}
          >
            {type === "create" ? "투자하기" : "수정하기"}
          </Button>
        </div>
      </Modal>
      <Modal isOpen={isAlertOpen} onClose={closeAlert}>
        <p className={modalStyles["create-res"]}>{alertMessage}</p>
        <div className={modalStyles["button-wrap"]}>
          <Button
            onClick={() => {
              closeAlert();
            }}
            size="large"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
}
