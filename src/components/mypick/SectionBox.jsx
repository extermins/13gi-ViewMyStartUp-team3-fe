import React from "react";
import styles from "./SectionBox.module.css";

const CompareSectionBox = ({ variant = "default", children }) => {
  return (
    <div className={`${styles.boxContainer} ${styles[variant]}`}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};

export default CompareSectionBox;
