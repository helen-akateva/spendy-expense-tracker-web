import css from "./StatisticsTable.module.css";

export default function StatisticsTable() {
  return (
    <div>
      <div className={css["table-header"]}>
        <p className={css["table-header-text"]}>Category</p>
        <p className={css["table-header-text"]}>Sum</p>
      </div>
      <ul className={css["table-list"]}>
        <li className={css["table-list-item"]}>
          <div className={css["category-color"]}></div>
          <p className={css["category-name"]}>Main expenses</p>
          <p>8 700.00</p>
        </li>
        <li className={css["table-list-item"]}>
          <div className={css["category-color"]}></div>
          <p className={css["category-name"]}>Main expenses</p>
          <p>8 700.00</p>
        </li>
        <li className={css["table-list-item"]}>
          <div className={css["category-color"]}></div>
          <p className={css["category-name"]}>Main expenses</p>
          <p>8 700.00</p>
        </li>

        <li className={css["table-list-total"]}>
          <p className={css["table-list-total-type"]}>{`Expenses:`}</p>
          <p className={css["table-list-total-amount"]}>22 549.24</p>
        </li>
      </ul>
    </div>
  );
}
