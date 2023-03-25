import { SigninContext } from "@/context";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const SettingsAccount = () => {
  const { user, setUser } = useContext(SigninContext);
  const navigate = useNavigate();
  const logoutUser = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#000" }}
        onClick={logoutUser}
      >
        Logout
      </Button>
    </>
  );
};

export default SettingsAccount;
