"use client";

import { useState } from "react";
import { Month, MonthSelect } from "./Select/MonthSelect/MonthSelect";
import css from "./StatisticsDashboard.module.css";
import { YearSelect } from "./Select/YearSelect/YearSelect";

export default function StatisticsDashboard() {
  const [month, setMonth] = useState<Month>("January");
  const [year, setYear] = useState<number>(2026);

  return (
    <div className={css["stat-dashboard-container"]}>
      <div
        className={`${css["stat-dasboard-select"]} ${css["stat-dashboard-month"]}`}
      >
        <MonthSelect value={month} onChange={setMonth} />
      </div>
      <div
        className={`${css["stat-dasboard-select"]} ${css["stat-dashboard-year"]}`}
      >
        <YearSelect
          value={year}
          onChange={setYear}
          years={[
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
            2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
            2022, 2023, 2024, 2025, 2026,
          ].sort((a, b) => b - a)}
        />
      </div>
    </div>
  );
}
