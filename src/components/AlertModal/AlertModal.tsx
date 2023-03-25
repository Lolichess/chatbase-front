import { AlertProps, Snackbar } from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AlertModal = (props: any) => {
  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setopenAlert(false);
  };

  return (
    <Snackbar
      open={props.openAlert}
      autoHideDuration={2000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={props.error ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default AlertModal;
