import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { SigninContext } from "@/context";
import { createSessionStripe } from "@/services/services";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    pricing: "price_1Mv7qJEBmXtipPelmFClWoaG",
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

function PricingContent() {
  const { user } = React.useContext(SigninContext);

  const navigate = useNavigate();

  const pushToContact = () => {
    window.location.href = "https://www.doc2chat.com/contacto";
  };

  const pushToLogin = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  const createSession = async (price_id: any) => {
    if (!user) {
      navigate("/login");
    } else {
      const stripe = await loadStripe(
        "pk_live_51MpU22EBmXtipPelBCTtQP7k3tn0UMvWoye8Q4DMKRbjSFZQ1GupxmR8NNtprvfCcd8atgrQB8lchF6fbLClsT9200xeddDzmv"
      );
      let response = await createSessionStripe(price_id, user);

      if (response.session_id) {
        const result = await stripe.redirectToCheckout({
          sessionId: response.session_id,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Planes
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={
                      tier.pricing
                        ? () => createSession(tier.pricing)
                        : tier.price === "0"
                        ? pushToLogin
                        : pushToContact
                    }
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
