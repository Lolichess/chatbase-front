import { ChatForm, Navbar } from "@/components";
import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Chatbot = () => {
  let { uid } = useParams();

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
        <ChatForm id={uid} />
      </Box>
    </>
  );
};

export default Chatbot;
