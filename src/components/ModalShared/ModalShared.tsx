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
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "../AlertModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: { md: "400px", xs: "80%" },
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

  const navigate = useNavigate();

  const pushtoSetting = () => {
    navigate("/chatbot/" + props.uid + "/settings");
  };

  const handleClick = () => {
    copy(
      '<iframe src="' +
        import.meta.env.VITE_SERVER +
        "/shared/chatbot/" +
        props.uid +
        '" width="100%" height="600px" frameborder="0" ></iframe>'
    );
    setopenAlert(true);
  };

  const handleClickBubble = () => {
    copy(
      '<script  src="' +
        import.meta.env.VITE_BUBBLE +
        '" id="' +
        props.uid +
        '" ></script>'
    );
    setopenAlert(true);
  };

  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        right: "-40px",
        top: "0px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <SettingsIcon onClick={pushtoSetting} sx={{ cursor: "pointer" }} />
      <ShareIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Embed on website
          </Typography>

          <Typography id="modal-modal-title" component="p">
            To add the chatbot any where on your website, add this iframe to
            your html code
          </Typography>
          <TextareaAutosize
            disabled
            style={{ width: "100%", height: "60px" }}
            value={
              "<iframe src=" +
              import.meta.env.VITE_SERVER +
              "/shared/chatbot/" +
              props.uid +
              '" width="100%" height="600px" frameborder="0" ></iframe>'
            }
          />

          <Typography id="modal-modal-title" component="p">
            To add a chat bubble to the bottom right of your website add this
            script tag to your html
          </Typography>
          <TextareaAutosize
            disabled
            style={{ width: "100%", height: "60px" }}
            value={
              '<script  src="' +
              import.meta.env.VITE_BUBBLE +
              '" id="' +
              props.uid +
              '" ></script>'
            }
          />
          <Button
            sx={{ width: "100%", margin: "10px 0px" }}
            variant="contained"
            onClick={handleClick}
          >
            Copy Iframe
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleClickBubble}
          >
            Copy Bubble
          </Button>
        </Box>
      </Modal>
      <AlertModal
        text={"Copied!!"}
        openAlert={openAlert}
        setopenAlert={setopenAlert}
      />
    </Box>
  );
};

export default ModalShared;
