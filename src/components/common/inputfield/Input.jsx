import styles from "./input.module.css";
import OpenEye from "../../../assets/icons/ic-visibility-on.svg";
import CloseEye from "../../../assets/icons/ic-visibility-off.svg";
import { useState } from "react";

export function Input({ value, onChange, placeholder, error }) {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          styles["input-text"],
          error ? styles["input-error"] : "",
        ].join(" ")}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function TextArea({ value, onChange, placeholder, error }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          styles["textarea"],
          error ? styles["input-error"] : "",
        ].join(" ")}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function PasswordInput({ onChange, placeholder, value, error }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className={styles["password-wrapper"]}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[
            styles["input-password"],
            error ? styles["input-error"] : "",
          ].join(" ")}
        />
        <button
          type="button"
          className={styles["icon-btn"]}
          onClick={() => setShow((prev) => !prev)}
        >
          <img
            src={show ? OpenEye : CloseEye}
            alt="비밀번호 보기"
            width={24}
            height={24}
          />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
