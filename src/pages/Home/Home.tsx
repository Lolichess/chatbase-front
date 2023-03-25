import { Navbar } from "@/components";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import React, { useState, ChangeEvent, useContext } from "react";
import { uploadFile } from "@/services/services";
import { useNavigate } from "react-router-dom";
import { SigninContext } from "@/context";

const Home = () => {
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Navbar />
      <Box width={600} sx={{ margin: "0 auto" }}>
        <Typography variant="h3" fontSize={24} py={3}>
          Sube un archivo pdf para generar tu chatbot!
        </Typography>
        {!loading ? (
          <Button
            component="label"
            variant="contained"
            color="primary"
            onClick={handdleCLick}
          >
            Subir
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
      </Box>
    </>
  );
};

export default Home;
