import {
  Box,
  Button,
  Typography,
  Modal,
  TextareaAutosize,
  Snackbar,
  AlertProps,
  Tooltip,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useContext, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "../AlertModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";
import { SigninContext } from "@/context";
import { getUser, removeChatbot } from "@/services/services";

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
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openRestrictionModal, setOpenRestrictionModal] = React.useState(false);
  const [openAlert, setopenAlert] = React.useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const handleOpenRestrictionModal = () => setOpenRestrictionModal(true);
  const handleCloseRestrictionModal = () => setOpenRestrictionModal(false);

  const [showEmbed, setShowEmbed] = useState(false);
  const [msgText, setMsgtext] = useState("Copied!!");

  const { user } = useContext(SigninContext);

  const navigate = useNavigate();

  const pushtoSetting = () => {
    navigate("/chatbot/" + props.uid + "/settings");
  };

  const handleClick = () => {
    setError(false);
    setMsgtext("Copied!!");
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
    setError(false);
    setMsgtext("Copied!!");
    copy(
      '<script  src="' +
        import.meta.env.VITE_BUBBLE +
        '" id="' +
        props.uid +
        '" ></script>'
    );
    setopenAlert(true);
  };

  const openRestriction = () => {
    if (!showEmbed) {
      handleOpenRestrictionModal();
    } else {
      handleOpen();
    }
  };

  const pushtoPricing = () => {
    navigate("/pricing");
  };

  const getUserPrivilgios = async () => {
    let response = await getUser(user);

    let data = JSON.parse(response);
    if (response) {
      setShowEmbed(data.type !== "free" ? true : false);
    }
  };

  const handleAddNewDocument = () => {
    navigate("/chatbot/" + props.uid + "/add");
  };

  useEffect(() => {
    if (user) {
      getUserPrivilgios();
    }
  }, [user]);

  const handleClickRemove = async () => {
    let response = await removeChatbot(props.uid, user);

    if (response.status) {
      navigate("/my-chatbots");
    } else {
      setMsgtext("Error de conexion");
      setError(true);
      handleClose();
    }
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
      <Tooltip title={"Configuración"} placement="top">
        <SettingsIcon onClick={pushtoSetting} sx={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title={"Compartir"} placement="top">
        <CodeIcon onClick={openRestriction} sx={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title={"Eliminar"} placement="top">
        <DeleteIcon onClick={handleOpenRemove} sx={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title={"Agregar"} placement="top">
        <AddIcon onClick={handleAddNewDocument} sx={{ cursor: "pointer" }} />
      </Tooltip>
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
      <Modal
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Realmente desea eliminar el chatbot ?
          </Typography>

          <Button
            sx={{ width: "100%", margin: "10px 0px" }}
            variant="contained"
            onClick={handleClickRemove}
          >
            Si
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleCloseRemove}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openRestrictionModal}
        onClose={handleCloseRestrictionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Necesita actualizar su plan para usar este servicio
          </Typography>

          <Button
            sx={{ width: "100%", margin: "10px 0px" }}
            variant="contained"
            onClick={pushtoPricing}
          >
            Click to Pricing
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleCloseRestrictionModal}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
      <AlertModal
        text={msgText}
        openAlert={openAlert}
        setopenAlert={setopenAlert}
        error={error}
      />
    </Box>
  );
};

export default ModalShared;
