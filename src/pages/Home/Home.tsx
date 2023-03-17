import { Navbar } from "@/components";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { uploadFile } from "@/services/services";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handdleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading((prev) => !prev);
    let file = e.target.files;
    if (file) {
      let response = await uploadFile(file);
      console.log(response);
      if (response) {
        navigate("/chatbot/" + response);
      }
      setLoading((prev) => !prev);
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
          <Button component="label" variant="contained" color="primary">
            Subir
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={handdleFileChange}
            />
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default Home;
