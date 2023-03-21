import { Navbar } from "@/components";
import { Settings } from "@/components/Settings";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatbotSettings = (props: any) => {
  let { uid } = useParams();
  return (
    <div>
      <Navbar />
      <Settings uid={uid} />
    </div>
  );
};

export default ChatbotSettings;
