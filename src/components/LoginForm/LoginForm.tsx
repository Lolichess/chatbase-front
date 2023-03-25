import React, { useContext } from "react";
import {
  GoogleLogin,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SigninContext } from "@/context";
import GoogleIcon from "@mui/icons-material/Google";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(SigninContext);

  const responseMessage = (response: CredentialResponse) => {
    localStorage.setItem("user", JSON.stringify(response));
    setUser(JSON.stringify(response));
    navigate("/");
  };

  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <Box component="div" sx={{ width: "400px", margin: "0 auto" }}>
      <Typography variant="h5">Sign In on ChatPDF</Typography>
      <Box
        component="div"
        py={2}
        sx={{
          width: "300px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GoogleLogin onSuccess={responseMessage} onError={onError} />
        {/* 
        <Divider sx={{ margin: "30px 0px 20px" }} />
        <Box component="div" py={2}>
          <form>
            <InputLabel sx={{ textAlign: "left" }}>Email address</InputLabel>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Your email address"
              sx={{ margin: "10px 0px" }}
              fullWidth
            ></TextField>
            <InputLabel sx={{ textAlign: "left" }}>Your Password</InputLabel>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Your password"
              sx={{ margin: "10px 0px" }}
              fullWidth
            ></TextField>
            <Button type="submit" variant="contained" fullWidth>
              Sign in
            </Button>
          </form>
        </Box>
        */}
      </Box>
    </Box>
  );
};

export default LoginForm;
