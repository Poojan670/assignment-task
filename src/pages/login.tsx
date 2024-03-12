import React from "react";
import AuthForm from "../components/form";

const Login: React.FC = () => {
  return (
    <AuthForm
      title="Login to our Application!"
      buttonText="Login"
      linkText="New user? Register here:"
      linkTo="/sign-up"
      hyperLinkText="Sign Up Here"
    />
  );
};

export default Login;
