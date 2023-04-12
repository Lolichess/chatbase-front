import { SigninContext } from "@/context";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/services/services";

const tiers = [
  {
    title: "Gratis",
    price: "0",
    description: [
      "30 mensajes/mensual",
      "1 chatbot",
      "400,000 caracteres/chatbot",
    ],
    buttonText: "Entra",
    buttonVariant: "outlined",
  },
  {
    title: "Basico",
    subheader: "Mas popular",
    price: "10",
    description: [
      "1,000 mensajes/mensual",
      "10 chatbot",
      "2,000,000 caracteres/chatbot",
      "Embed en sitio web",
    ],
    buttonText: "Comienza ahora",
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
    buttonText: "Contacta con nosotros",
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
          ? "Gratis"
          : data.type === "pro"
          ? "Servicios"
          : "Basico"
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
          width: { xs: "100%", md: "600px" },
          margin: "20px auto",
        }}
      >
        <Typography variant="h4">Plan actual: {plan} </Typography>
        <Box
          component="div"
          sx={{
            width: { xs: "100%", md: "600px" },
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
        Cerrar Sesion
      </Button>
    </>
  );
};

export default SettingsAccount;
