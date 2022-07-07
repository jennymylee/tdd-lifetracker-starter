import * as React from "react";
import "./LoginForm.css";
import { useAuthContext } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ loggedIn, setLoggedIn }) {
  const {
    error,
    setError,
    loginUser,
    refresh,
    setRefresh,
    user,
    setUser,
    initialized,
    setInitialized,
  } = useAuthContext();
  const navigate = useNavigate();
  // const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setError((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setError((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    if (form.email.indexOf("@") === -1) {
      setError((e) => ({ ...e, email: "Please enter a valid email." }));
    } else {
      setError((e) => ({ ...e, email: null }));
    }
    try {
      console.log("hello");
      const liRes = await loginUser(form);
      console.log("liRes", liRes);
      if (liRes?.user) {
        console.log("there is user logged in", liRes.user);
        // setUser(liRes.user);
      } else {
        console.log("overhere");
        setError((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        return;
      }
      setRefresh(true);
      setLoggedIn(true);
      setInitialized(true);

      // navigate("/activity");
    } catch (err) {
      console.log("login failed");
      console.log("this is login err", err);
      setRefresh(!refresh);
      setLoggedIn(false);
      console.log("login failed");
    }
  };
  return (
    <div className="login-form">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && error.form && <span className="error">{error.form}</span>}
        <div className="l-form">
          <div className="input-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              onChange={handleOnInputChange}
              placeholder="user@gmail.com"
              value={form.email}
            />
            {error && error.email && (
              <span className="error">{error.email}</span>
            )}
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handleOnInputChange}
              placeholder="password"
              value={form.password}
            />
            {error && error.password && (
              <span className="error">{error.password}</span>
            )}
          </div>
          <button className="submit-login" onClick={handleOnSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
