import { Navbar } from "@/components";
import { SettingsAccount } from "@/components/Settings";
import { CssBaseline } from "@mui/material";
import React from "react";

const AccountSetting = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <SettingsAccount />
    </>
  );
};

export default AccountSetting;
