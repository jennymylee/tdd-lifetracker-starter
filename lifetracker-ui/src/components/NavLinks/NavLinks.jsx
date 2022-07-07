import * as React from "react";
import "./NavLinks.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";

export default function NavLinks() {
  const { user, loggedIn, logoutUser } = useAuthContext();
  return (
    <div className="nav-links">
      <div className="nl-content">
        <Link className="nll" to="/activity">
          <p className="nlp">Activity</p>
        </Link>
        <Link className="nll" to="/exercise">
          <p className="nlp">Exercise</p>
        </Link>
        <Link className="nll" to="/nutrition">
          <p className="nlp">Nutrition</p>
        </Link>
        <Link className="nll" to="/sleep">
          <p className="nlp">Sleep</p>
        </Link>

        {user ? (
          <Link to="/">
            <button
              className="logout-button"
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </button>
          </Link>
        ) : (
          <>
            <Link className="nll" to="/login">
              <p className="nlp">Login</p>
            </Link>
            <Link className="nll" to="/register">
              <button className="signup-button nll">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
