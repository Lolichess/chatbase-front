import { Navbar } from "@/components";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState, ChangeEvent, useContext } from "react";
import { uploadFile, scrapperWeb } from "@/services/services";
import { useNavigate } from "react-router-dom";
import { SigninContext } from "@/context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AlertModal } from "@/components/AlertModal";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showPageScrapper, setShowPageScrapper] = useState(false);
  const [url, setUrl] = useState("");
  const [openAlert, setopenAlert] = useState(false);

  const { user } = useContext(SigninContext);

  const navigate = useNavigate();

  const handdleCLick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handdleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading((prev) => !prev);
      let file = e.target.files;
      console.log(user);
      if (file) {
        let response = await uploadFile(file, user);
        if (response) {
          navigate("/chatbot/" + response);
        }
        setLoading((prev) => !prev);
      }
    }
  };

  const handdleCLickUrl = () => {
    setShowPageScrapper((prev) => !prev);
  };

  const validateWeb = (webUrl: string) => {
    try {
      const miUrl = new URL(webUrl);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handdleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      setLoading((prev) => !prev);
      if (url !== "" && validateWeb(url)) {
        let response = await scrapperWeb(url, user);
        if (response) {
          navigate("/chatbot/" + response);
        }
        setLoading((prev) => !prev);
      } else {
        setopenAlert(true);
        setLoading((prev) => !prev);
      }
    }
  };

  return (
    <>
      <Navbar />
      {!showPageScrapper ? (
        <Box width={600} sx={{ margin: "0 auto", width: { xs: "100%" } }}>
          <Typography variant="h1" fontSize={28} py={3}>
            Entrena a ChatGPT con sus datos y agréguelo a su sitio web
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            {!loading ? (
              <Button
                component="label"
                variant="contained"
                color="primary"
                onClick={handdleCLick}
              >
                Upload PDF
                {user ? (
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={handdleFileChange}
                  />
                ) : (
                  ""
                )}
              </Button>
            ) : (
              <CircularProgress />
            )}
            <Button
              component="label"
              variant="contained"
              color="primary"
              onClick={handdleCLickUrl}
            >
              URL
            </Button>
          </Box>
        </Box>
      ) : !loading ? (
        <Box sx={{ width: { md: "400px", xs: "100%" }, margin: "0 auto" }}>
          <Button
            sx={{
              color: "#000",
              margin: "20px 0px",
              display: "flex",
              padding: "0px",
            }}
            onClick={handdleCLickUrl}
          >
            <ArrowBackIcon />
            Regresar
          </Button>
          <form onSubmit={handdleSubmit}>
            <Typography sx={{ textAlign: "left" }}>URL</Typography>
            <TextField
              fullWidth
              placeholder="https://www.google.com/"
              value={url}
              onChange={(event) => setUrl(event?.target.value)}
            />
            <Typography
              component="p"
              sx={{
                textAlign: "left",
                color: "#ccc",
                fontSize: "12px",
                margin: "5px 0px",
              }}
            >
              {" "}
              La WEB solo extraera un maximo de 10 URL{" "}
            </Typography>
            <Button
              fullWidth
              sx={{ display: "flex", margin: "20px 0px" }}
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Box>
      ) : (
        <CircularProgress />
      )}
      <AlertModal
        text={"Error url incorrecto"}
        error={true}
        openAlert={openAlert}
        setopenAlert={setopenAlert}
      />
    </>
  );
};

export default Home;
