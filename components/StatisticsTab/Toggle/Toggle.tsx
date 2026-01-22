"use client";

import { useState } from "react";
import css from "./Toggle.module.css";

export default function Toggle() {
  const [isExpense, setExpense] = useState<boolean>(true);

  const handleBtnClick = () => {
    setExpense(!isExpense);
  };

  return (
    <div className={css["togle-container"]}>
      <p className={css["togle-text"]}>Income</p>
      <div className={css["togle-box"]}>
        <button
          className={
            isExpense
              ? `${css["togle-circle"]} ${css["expense-active"]}`
              : `${css["togle-circle"]}`
          }
          onClick={handleBtnClick}
        >
          <span className={`${css["line"]} ${css["vertical"]}`}></span>
          <span className={`${css["line"]} ${css["horizontal"]}`}></span>
        </button>
      </div>
      <p className={css["togle-text"]}>Expense</p>
    </div>
  );
}
