import * as React from "react";
import "./LoginPage.css";
import LoginForm from "components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";

export default function LoginPage() {
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user) {
      navigate("/activity");
    }
  }, []);
  // const isMounted = React.useRef(true);
  // React.useEffect(
  //   () => () => {
  //     isMounted.current = false;
  //   },
  //   []
  // );
  // React.useEffect(() => {
  //   if (isMounted && loggedIn) {
  //     console.log("trying to go to activity");
  //     navigate("/activity");
  //   }
  // }, [loggedIn]);

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}
