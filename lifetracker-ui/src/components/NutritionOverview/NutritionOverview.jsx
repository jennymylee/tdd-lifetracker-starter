import * as React from "react";
import "./NutritionOverview.css";
import Loading from "components/Loading/Loading";
import { Link } from "react-router-dom";
import NutritionFeed from "components/NutritionFeed/NutritionFeed";
import { useNutritionContext } from "../../../contexts/nutrition";

export default function NutritionOverview() {
  const { isLoading } = useNutritionContext();
  return (
    <div className="nutrition-overview">
      <div className="no-content">
        <div className="no-header">
          <p className="no-title">Overview</p>
          <Link to="/nutrition/create">
            <button className="record-nutrition">Record Nutrition</button>
          </Link>
        </div>
        {isLoading ? <Loading /> : <NutritionFeed />}
      </div>
    </div>
  );
}
