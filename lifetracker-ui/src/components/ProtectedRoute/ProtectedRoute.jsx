import * as React from "react";
import { useAuthContext } from "../../../contexts/auth";
import LoginPage from "components/LoginPage/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { initialized, user } = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    // if (!initialized) {
    //   navigate("/login");
    // }
    // if (!user) {
    //   navigate("/login");
    // }
  }, [initialized, user]);

  return children;
}
