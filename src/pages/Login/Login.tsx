import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "@/components";
import LoginForm from "@/components/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      {" "}
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
