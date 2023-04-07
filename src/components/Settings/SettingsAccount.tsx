import { SigninContext } from "@/context";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/services/services";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "30 messages/month",
      "1 chatbot",
      "400,000 characteres/chatbot",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Hobby",
    subheader: "Most popular",
    price: "10",
    description: [
      "1,000 messages/month",
      "10 chatbot",
      "2,000,000 characteres/chatbot",
      "Embed on website",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
    pricing: "price_1Mt29eEBmXtipPelVd7Z2XiA",
  },
  {
    title: "Servicios",
    price: "",
    description: [
      "Optimización de documentación",
      "Servicios personalizados",
      "Chat personalizado",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

const SettingsAccount = () => {
  const { user, setUser } = useContext(SigninContext);
  const [plan, setPlan] = useState("");
  const navigate = useNavigate();
  const logoutUser = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const getUserPrivilgios = async () => {
    let response = await getUser(user);

    if (response) {
      let data = JSON.parse(response);
      setPlan(
        data.type == "free"
          ? "Free"
          : data.type === "pro"
          ? "Servicios"
          : "Hobby"
      );
    }
  };

  useEffect(() => {
    if (user) {
      getUserPrivilgios();
    }
  }, [user]);

  return (
    <>
      <Box
        component="div"
        sx={{
          width: "600px",
          margin: "20px auto",
        }}
      >
        <Typography variant="h4">Current Plant: {plan} </Typography>
        <Box
          component="div"
          sx={{
            width: "600px",
            margin: "20px auto",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          {tiers.map((tier) =>
            tier.title === plan ? (
              <Box sx={{ display: "flex" }}>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  {" "}
                  <Typography variant="h4" align="center">
                    {tier.price}$ /mo
                  </Typography>
                </Box>
              </Box>
            ) : (
              ""
            )
          )}
        </Box>
      </Box>
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
