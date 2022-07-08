import * as React from "react";
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (user) {
      navigate("/activity");
    }
  }, []);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/activity");
  //   }
  // }, [loggedIn]);
  return (
    <div className="registration-page">
      <RegistrationForm />
    </div>
  );
}
