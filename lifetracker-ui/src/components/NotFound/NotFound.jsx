import * as React from "react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="nf-code">404</p>
      <p className="nf-message">That page does not exist</p>
    </div>
  );
}
