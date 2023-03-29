import React, { useState } from "react";
import Button from "../button";
import styles from "../layout-register/styles.module.css";

const LayoutRegister = ({ children }) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];

  const goNextPage = () => {
    setActivePageIndex(index => index + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>{currentPage}</div>
      <div className={styles.container__button} onClick={goNextPage}>
        $
        {activePageIndex < 3 ? (
          <Button theme="primary" className="">
            Aceptar
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LayoutRegister;
