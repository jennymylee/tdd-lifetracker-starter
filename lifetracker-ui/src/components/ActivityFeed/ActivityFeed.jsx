import * as React from "react";
import { render } from "react-dom";
import "./ActivityFeed.css";
import SummaryStat from "components/SummaryStat/SummaryStat";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";
import NotFound from "components/NotFound/NotFound";

export default function ActivityFeed() {
  const { user } = useAuthContext();
  const avgCaloriesPerCategory = [
    { category: "candy", avgCaloriesPerCategory: 100.0 },
    { category: "drink", avgCaloriesPerCategory: 300.0 },
    { category: "fruit", avgCaloriesPerCategory: 266.6 },
    { category: "dairy", avgCaloriesPerCategory: 400.0 },
    { category: "carbs", avgCaloriesPerCategory: 500.0 },
    { category: "vegetables", avgCaloriesPerCategory: 330.0 },
    { category: "protein", avgCaloriesPerCategory: 550.0 },
  ];

  const totalCaloriesPerDay = [
    { date: "12-22-2022", totalCaloriesPerDay: 300 },
    { date: "12-23-2022", totalCaloriesPerDay: 1000 },
    { date: "12-24-2022", totalCaloriesPerDay: 800 },
  ];
  const getFormattedDate = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = (1 + d.getMonth()).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  };

  const renderAverageCaloriesPerCategory = () => {
    if (avgCaloriesPerCategory.length <= 6) {
      return avgCaloriesPerCategory.map((el, i) => {
        return (
          <SummaryStat
            stat={el.avgCaloriesPerCategory.toFixed(1)}
            label="calories"
            substat={el.category}
            key={i}
          />
        );
      });
    } else {
      let firstSix = avgCaloriesPerCategory.slice(0, 6);
      return firstSix.map((el, i) => {
        return (
          <SummaryStat
            stat={el.avgCaloriesPerCategory.toFixed(1)}
            label="calories"
            substat={el.category}
            key={i}
            color="teal"
          />
        );
      });
    }
  };

  const renderTotalCaloriesPerDay = () => {
    return totalCaloriesPerDay.map((el, i) => {
      return (
        <SummaryStat
          stat={el.totalCaloriesPerDay.toFixed(1)}
          label="calories"
          substat={getFormattedDate(el.date)}
          key={i}
          color="gold"
        />
      );
    });
  };
  return (
    <div className="activity-feed">
      {user ? (
        <div className="af-content">
          <div className="af-header">
            <p className="af-title">Activity Feed{user.email}</p>
            <Link to="/nutrition/create">
              <button className="record-nutrition">Record Nutrition</button>
            </Link>
          </div>
          <div className="per-category">
            <h4 className="acpc-title">Average Calories Per Category</h4>
            <div className="cards">
              {avgCaloriesPerCategory && renderAverageCaloriesPerCategory()}
            </div>
          </div>
          <div className="per-day">
            <h4 className="acpc-title">Total Calories Per Day</h4>
            <div className="cards">
              {totalCaloriesPerDay && renderTotalCaloriesPerDay()}
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
