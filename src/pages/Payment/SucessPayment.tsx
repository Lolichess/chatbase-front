import { Navbar } from "@/components";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SucessPayment = () => {
  const navigate = useNavigate();

  const pushToHome = () => {
    navigate("/");
  };

  return (
    <Box component="div">
      <Navbar />
      <Box component="div" sx={{ width: "600px", margin: "0 auto" }}>
        <CheckCircleIcon sx={{ fontSize: "80px", color: "#27AE60" }} />
        <Typography variant="h5" sx={{ margin: "20px 0px" }}>
          {" "}
          La suscripcion ha sido completa de forma satisfactoria
        </Typography>
        <Button variant="contained" onClick={pushToHome}>
          Click to Home
        </Button>
      </Box>
    </Box>
  );
};

export default SucessPayment;
