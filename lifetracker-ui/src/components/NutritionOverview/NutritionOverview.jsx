import * as React from "react";
import "./NutritionOverview.css";
import Loading from "components/Loading/Loading";
import { Link } from "react-router-dom";
import NutritionFeed from "components/NutritionFeed/NutritionFeed";
import { useNutritionContext } from "../../../contexts/nutrition";
import { useAuthContext } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function NutritionOverview() {
  const { isLoading } = useNutritionContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
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
