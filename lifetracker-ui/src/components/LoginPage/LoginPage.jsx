import * as React from "react";
import "./LoginPage.css";
import LoginForm from "components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loggedIn) {
      navigate("/activity");
    }
  }, [loggedIn]);
  return (
    <div className="login-page">
      <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>
  );
}
