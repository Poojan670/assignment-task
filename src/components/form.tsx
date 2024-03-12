import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/react.svg";
import { fetchPostRequest } from "../utils/fetch";
import { useDispatch } from "react-redux";
import { successFunction } from "../utils/alert";

interface FormValues {
  username: string;
  password: string;
}

interface Props {
  title: string;
  buttonText: string;
  linkText: string;
  linkTo: string;
  hyperLinkText: string;
}

const initialFormValues: FormValues = {
  username: "",
  password: "",
};

const AuthForm: React.FC<Props> = ({
  title,
  buttonText,
  linkText,
  linkTo,
  hyperLinkText,
}) => {
  const [formData, setFormData] = useState<FormValues>(initialFormValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonText === "Login") {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    const response = await fetchPostRequest(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth-app/login`,
      JSON.stringify({ username, password })
    );
    const accessToken = response?.access_token;
    dispatch({
      type: "LOGIN",
      payload: { access_token: accessToken, username: response?.username },
    });
    successFunction("Login Successfully");
    navigate("/");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    await fetchPostRequest(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth-app/sign-up`,
      JSON.stringify({ username, password })
    );
    dispatch({ type: "SIGNUP" });
    successFunction("Successfully signed up");
    navigate("/login");
  };

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main className="container">
        <div className="logo">
          <img src={Logo} alt="React Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            minLength={4}
            maxLength={20}
            placeholder="admin"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={4}
            maxLength={20}
            placeholder="*****"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">{buttonText}</button>
          <div>
            {linkText} <Link to={linkTo}>{hyperLinkText}</Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default AuthForm;
