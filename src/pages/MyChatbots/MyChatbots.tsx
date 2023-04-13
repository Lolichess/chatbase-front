import { Navbar } from "@/components";
import { ListChat } from "@/components/ListChat";
import { CssBaseline } from "@mui/material";
import React from "react";

const MyChatbots = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <ListChat />
    </div>
  );
};

export default MyChatbots;
