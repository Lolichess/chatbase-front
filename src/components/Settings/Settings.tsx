import { SigninContext } from "@/context";
import { getInfo, sendData } from "@/services/services";
import { Box, Button, Input, Typography, TextField, Link } from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "../AlertModal";

const Settings = (props: any) => {
  const [msgInitial, setMsginitial] = useState("");
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [openAlert, setopenAlert] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(SigninContext);

  const featchData = async () => {
    if (user) {
      try {
        let response = await getInfo(props.uid, user);
        setMsginitial(response.msgWelcome);
        setName(response.name);
        setPrompt(response.template_prompt);
      } catch (error) {
        setopenAlert(true);
        setError(true);
      }
    }
  };

  const handdleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let data = {
      name: name,
      prompt: prompt,
      msgWelcome: msgInitial,
      uid: props.uid,
    };
    try {
      let response = await sendData(data, user);
      setError(false);
      setopenAlert(true);
    } catch (error) {
      // TypeError: Failed to fetch
      setopenAlert(true);
      setError(true);
    }
  };

  const pushBack = () => {
    navigate("/chatbot/" + props.uid);
  };

  useEffect(() => {
    featchData();
  }, [user]);
  return (
    <Box
      component="div"
      sx={{
        width: { md: "800px", xs: "90%" },
        margin: { md: "0 auto", xs: "30px auto" },
      }}
    >
      <Link
        onClick={pushBack}
        sx={{
          textAlign: "center",
          marginBottom: "30px",
          marginTop: "50px",
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        Back to chatbot
      </Link>
      <Box
        component="div"
        sx={{ width: { md: "600px", xs: "90%" }, margin: "0 auto" }}
      >
        <form onSubmit={handdleSubmit}>
          <Typography align="left" variant="h6">
            Chatbot Name
          </Typography>
          <TextField
            variant="outlined"
            type="text"
            value={name}
            sx={{ margin: "10px 0px" }}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <Typography align="left" variant="h6">
            Initial message
          </Typography>
          <TextField
            variant="outlined"
            type="text"
            value={msgInitial}
            sx={{ margin: "10px 0px" }}
            fullWidth
            onChange={(e) => setMsginitial(e.target.value)}
          />
          {/*
          <Typography variant="h6" align="left">
            Template prompt
          </Typography>
          <TextField
            variant="outlined"
            type="text"
            sx={{ margin: "10px 0px" }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            fullWidth
            multiline
            rows={6}
            maxRows={6}
      />*/}
          <Button variant="contained" type="submit" fullWidth>
            {" "}
            Save
          </Button>
        </form>
      </Box>
      <AlertModal
        text={error ? "Something went wrong" : "Saved!!"}
        error={error}
        openAlert={openAlert}
        setopenAlert={setopenAlert}
      />
    </Box>
  );
};

export default Settings;
