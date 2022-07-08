import * as React from "react";
import "./NutritionPage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NutritionOverview from "components/NutritionOverview/NutritionOverview";
import NutritionNew from "components/NutritionNew/NutritionNew";
import NutritionDetail from "components/NutritionDetail/NutritionDetail";
import NotFound from "components/NotFound/NotFound";
import { useNutritionContext } from "../../../contexts/nutrition";
import { useAuthContext } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function NutritionPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { setRefresh, refresh } = useNutritionContext();
  // React.useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  React.useEffect(() => {
    setRefresh(!refresh);
  }, []);
  return (
    <div className="nutrition-page">
      <div className="nutrition-title">
        <p className="n">Nutrition</p>
      </div>

      <Routes>
        <Route path="/" element={<NutritionOverview />} />
        <Route path="/create" element={<NutritionNew />} />
        <Route path="/id/:nutritionId" element={<NutritionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
