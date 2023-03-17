import {
  Box,
  Button,
  Typography,
  Modal,
  TextareaAutosize,
  Snackbar,
  AlertProps,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import copy from "copy-to-clipboard";

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ModalShared = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setopenAlert] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setopenAlert(false);
  };

  const handleClick = () => {
    copy(
      '<iframe src="https://dazzling-eclair-81ce56.netlify.app/shared/chatbot/' +
        props.uid +
        '" width="100%" height="600px" frameborder="0" ></iframe>'
    );
    setopenAlert(true);
  };

  return (
    <Box
      component="div"
      sx={{ position: "absolute", right: "-40px", top: "0px" }}
    >
      <ShareIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Iframe
          </Typography>
          <TextareaAutosize
            disabled
            style={{ width: "100%", height: "60px" }}
            value={
              '<iframe src="http://127.0.0.1:5173/shared/chatbot/' +
              props.uid +
              '" width="100%" height="600px" frameborder="0" ></iframe>'
            }
          />
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleClick}
          >
            Copy
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied!!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ModalShared;
