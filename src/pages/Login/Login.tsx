import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "@/components";
import LoginForm from "@/components/LoginForm/LoginForm";
import { CssBaseline } from "@mui/material";

const Login = () => {
  return (
    <>
      {" "}
      <CssBaseline />
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
