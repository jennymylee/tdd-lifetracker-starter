import * as React from "react";
import "./ActivityPage.css";
import Loading from "components/Loading/Loading";
import ActivityFeed from "components/ActivityFeed/ActivityFeed";

export default function ActivityPage({ isProcessing = false }) {
  return (
    <div className="activity-page">
      {isProcessing ? <Loading /> : <ActivityFeed />}
      <div className="a-content"></div>
    </div>
  );
}
