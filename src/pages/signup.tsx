import React from "react";
import AuthForm from "../components/form";

const SignUp: React.FC = () => {
  return (
    <AuthForm
      title="Sign Up to our Application!"
      buttonText="Register"
      linkText="Old User? Login here:"
      linkTo="/login"
      hyperLinkText="Login Here"
    />
  );
};

export default SignUp;
