import { getInfo, sendData } from "@/services/services";
import { Box, Button, Input, Typography, TextField, Link } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = (props: any) => {
  const [msgInitial, setMsginitial] = useState("");
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const featchData = async () => {
    let response = await getInfo(props.uid);
    console.log(response);
    setMsginitial(response.msgWelcome);
    setName(response.name);
    setPrompt(response.template_prompt);
  };

  const handdleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let data = {
      name: name,
      prompt: prompt,
      msgWelcome: msgInitial,
      uid: props.uid,
    };
    let response = await sendData(data);
    console.log(response);
  };

  const pushBack = () => {
    navigate("/chatbot/" + props.uid);
  };

  useEffect(() => {
    featchData();
  }, []);
  return (
    <Box component="div" sx={{ width: "800px", margin: "0 auto" }}>
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
      <Box component="div" sx={{ width: "600px", margin: "0 auto" }}>
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
          />
          <Button variant="contained" type="submit" fullWidth>
            {" "}
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Settings;
