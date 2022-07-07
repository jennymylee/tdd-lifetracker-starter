import * as React from "react";
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "components/RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/activity");
    }
  }, [loggedIn]);
  return (
    <div className="registration-page">
      <RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>
  );
}
