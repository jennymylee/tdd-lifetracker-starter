import * as React from "react";
import "./RegistrationForm.css";
import { useAuthContext } from "../../../contexts/auth";

export default function RegistrationForm({ loggedIn, setLoggedIn }) {
  // const [errors, setErrors] = React.useState({});
  const { error, setError, signupUser, refresh, setRefresh } = useAuthContext();
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "passwords don't match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "passwords don't match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
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
    if (form.email.indexOf("@") <= 0) {
      console.log("email is invalid");
      setError((e) => ({
        ...e,
        form: "email is invalid",
      }));
      return;
    }
    if (form.password !== form.passwordConfirm) {
      console.log("passwords do not match");
      setError((e) => ({
        ...e,
        form: "passwords do not match",
      }));
      return;
    }
    try {
      const res = await signupUser({
        email: form.email,
        username: form.username,
        first_name: form.firstName,
        last_name: form.lastName,
        password: form.password,
      });
      console.log("suRes", res);
      if (res?.user) {
        console.log("there is user registered", res.user);
      } else {
        console.log("overhere");
        setError((e) => ({
          ...e,
          form: "Something went wrong with registration",
        }));
        return;
      }
      setRefresh(!refresh);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setError((e) => ({ ...e, form: message ?? String(err) }));
      setRefresh(!refresh);
      setLoggedIn(false);
    }
  };

  return (
    <div className="registration-form">
      <div className="reg-card">
        <h2 className="reg-title">Register</h2>
        {error.form && <span className="error">{error.form}</span>}
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
            {error.email && <span className="error">{error.email}</span>}
          </div>

          <div className="input-field">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-input"
              type="text"
              name="username"
              onChange={handleOnInputChange}
              placeholder="your_username"
              value={form.username}
            />
            {error.username && <span className="error">{error.username}</span>}
          </div>

          <div className="split-inputs">
            <div className="input-field">
              <label className="form-label" htmlFor="name">
                First Name
              </label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {error.firstName && (
                <span className="error">{error.firstName}</span>
              )}
            </div>
            <div className="input-field">
              <label className="form-label" htmlFor="name">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              {error.lastName && (
                <span className="error">{error.lastName}</span>
              )}
            </div>
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
              placeholder="Enter a secure password"
              value={form.password}
            />
            {error.password && <span className="error">{error.password}</span>}
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="form-input"
              type="password"
              name="passwordConfirm"
              onChange={handleOnInputChange}
              placeholder="Confirm your password"
              value={form.passwordConfirm}
            />
            {error.passwordConfirm && (
              <span className="error">{error.passwordConfirm}</span>
            )}
          </div>
          <button className="submit-registration" onClick={handleOnSubmit}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
