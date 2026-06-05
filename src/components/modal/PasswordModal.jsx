import React, { useState } from "react";
import passwordStyle from "./PasswordModal.module.css";
import { PasswordInput } from "../common/inputfield/Input";
import Button from "../common/button/button";
import corpinvestAPI from "../../pages/companypage/CorpInvestAPI";
import Modal from "./Modal";

export default function PasswordModal({
  onClose,
  onDelete,
  onUpdate,
  option,
  id,
}) {
  const [password, setPassword] = useState("");
  const [isFail, setFail] = useState(false);

  async function deleteInveset() {
    try {
      const data = await corpinvestAPI.deleteInvest(id);
      if (data) {
        onDelete();
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
  }
  async function sendPassword() {
    try {
      const data = await corpinvestAPI.checkPassword(id, password);
      //비밀번호 확인 했으니 삭제 진행 타입이 삭제일 경우.
      if (data) {
        if (option.id === "inveset_update") {
          onUpdate();
          onClose();
        } else {
          deleteInveset();
        }
        setFail(false);
        return;
      }
    } catch (error) {
      //비밀번호가 안맞아도 에러로 뱉게했는데 수정할필요가 있어보임.
      console.error(error);
    }
    setFail(true); //비밀번호가 맞지 않다.
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        option.id === "inveset_update" ? "수정 권한 인증" : "삭제 권한 인증"
      }
    >
      {isFail ? (
        <>
          <div className={passwordStyle["center"]}>
            <p className={passwordStyle["fail-text"]}>
              {option.id === "inveset_update"
                ? " 잘못된 비밀번호로 수정에 실패하셨습니다."
                : " 잘못된 비밀번호로 삭제에 실패하셨습니다."}
            </p>
            <Button className={passwordStyle["buttonSize"]} onClick={onClose}>
              확인
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={passwordStyle["center"]}>
            <h2 className={passwordStyle["center-text"]}>비밀번호</h2>
            <div className={passwordStyle["input-password"]}>
              <PasswordInput
                placeholder={"비밀번호를 입력해 주세요."}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              className={passwordStyle["buttonSize"]}
              onClick={sendPassword}
            >
              {option.label}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
