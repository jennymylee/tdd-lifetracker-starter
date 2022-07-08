import * as React from "react";
import "./ActivityPage.css";
import Loading from "components/Loading/Loading";
import ActivityFeed from "components/ActivityFeed/ActivityFeed";
import { useAuthContext } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function ActivityPage({ isProcessing = false }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="activity-page">
      {isProcessing ? <Loading /> : <ActivityFeed />}
      <div className="a-content"></div>
    </div>
  );
}
