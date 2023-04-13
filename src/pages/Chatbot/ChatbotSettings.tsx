import { Navbar } from "@/components";
import { Settings } from "@/components/Settings";
import { CssBaseline } from "@mui/material";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatbotSettings = (props: any) => {
  let { uid } = useParams();
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Settings uid={uid} />
    </div>
  );
};

export default ChatbotSettings;
