import { ChatForm, ChatFormShared, Navbar } from "@/components";
import { ModalShared } from "@/components/ModalShared";
import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const ChatbotShared = () => {
  let { uid } = useParams();

  return (
    <>
      <CssBaseline />
      <Box component="div" sx={{ position: "relative" }}>
        <ChatFormShared id={uid} />
      </Box>
    </>
  );
};

export default ChatbotShared;
