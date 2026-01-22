import Chart from "./Chart/Chart";
import StatisticsDashboard from "./StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "./StatisticsTable/StatisticsTable";
import Toggle from "./Toggle/Toggle";
import css from "./StatisticsTab.module.css";

export default function StatisticsTab() {
  return (
    <div className={css["stat-tab-container"]}>
      <div className={css["chart-wrapper"]}>
        <Toggle />
        <Chart />
      </div>
      <div>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
}
