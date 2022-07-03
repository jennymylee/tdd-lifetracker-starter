import * as React from "react";
import "./SummaryStat.css";

export default function SummaryStat({ label, stat, substat, color }) {
  return (
    <div className="summary-stat">
      <div
        className={
          color === "teal"
            ? "background teal-gradient"
            : "background gold-gradient"
        }
      >
        <p className="secondary-statistic">{substat}</p>
        <div className="cal">
          <p className="primary-statistic">{stat}</p>
          <p className="stat-label">{label}</p>
        </div>
      </div>
    </div>
  );
}
