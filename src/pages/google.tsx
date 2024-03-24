import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { errorFunction, successFunction } from "../utils/alert";
import { fetchGetRequest, fetchPostRequest } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Define an interface for the user data
interface UserData {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

const Google: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchGetRequest(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user-app/users`
      );
      console.log(res);
    };
    fetchdata();
  }, []);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const code = codeResponse.code;
      const response = await fetchPostRequest(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/v1/auth-app/google-auth?code=${code}`,
        JSON.stringify({})
      );
      const accessToken = response?.access_token;

      dispatch({
        type: "LOGIN",
        payload: { access_token: accessToken, username: response?.name },
      });
      successFunction("Login Successfully");
      navigate("/");
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      const errorMsg = errorResponse?.error_description || "";
      errorFunction(errorMsg);
    },
  });
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <button onClick={googleLogin}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default Google;
