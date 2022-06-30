import * as React from "react";
import "./NutritionCard.css";

export default function NutritionCard({ nutrition }) {
  const getFormattedDate = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = (1 + d.getMonth()).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  };
  return (
    <div className="nutrition-card">
      <div className="background aqua-gradient">
        <div className="nc-top-row">
          {nutrition.image_url && (
            <img className="nutrition-image" src={nutrition.image_url} />
          )}
          <p className="nutrition-name">{nutrition.name}</p>
        </div>
        <div className="nc-mid-row">
          <div className="cal">
            <p className="n-cal-title">Calories</p>
            <p className="nutrition-calories">{nutrition.calories}</p>
          </div>
          <div className="cal">
            <p className="n-cal-title">Quantity</p>
            <p className="nutrition-calories">{nutrition.quantity}</p>
          </div>
        </div>
        <div className="nc-mid-row">
          <p className="nutrition-date">
            {getFormattedDate(nutrition.created_at)}
          </p>
          <div className="nutrition-category">{nutrition.category}</div>
        </div>
      </div>
    </div>
  );
}
