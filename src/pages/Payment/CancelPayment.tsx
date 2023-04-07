import { Navbar } from "@/components";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CancelPayment = () => {
  const navigate = useNavigate();

  const pushToHome = () => {
    navigate("/pricing");
  };

  return (
    <Box component="div">
      <Navbar />
      <Box component="div" sx={{ width: "600px", margin: "0 auto" }}>
        <ErrorIcon sx={{ fontSize: "80px", color: "#C0392B" }} />
        <Typography variant="h5" sx={{ margin: "20px 0px" }}>
          {" "}
          Algo no ha sido bien, la session de suscripcion ha sido cancelada.
        </Typography>
        <Button variant="contained" onClick={pushToHome}>
          Click to Pricing
        </Button>
      </Box>
    </Box>
  );
};

export default CancelPayment;
