import { Navbar } from "@/components";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  CssBaseline,
  Tooltip,
  Modal,
  Link,
} from "@mui/material";
import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import {
  uploadFileRetrain,
  scrapperWeb,
  getFilesUploaded,
  removeFile,
} from "@/services/services";
import { useNavigate } from "react-router-dom";
import { SigninContext } from "@/context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertModal } from "@/components/AlertModal";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: { md: "600px", xs: "80%" },
};

const ChatbotSettings = (props: any) => {
  let { uid } = useParams();

  const [loading, setLoading] = useState(false);
  const [showPageScrapper, setShowPageScrapper] = useState(false);
  const [url, setUrl] = useState("");
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const [error, setError] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [msg, setMsg] = useState("Error url incorrecto");
  const { user } = useContext(SigninContext);
  const [files, setFiles] = useState([]);
  const [remove, setRemove] = useState({ filename: "", id: "" });

  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

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
      if (file) {
        let response = await uploadFileRetrain(file, user, uid);
        if (response) {
          if (response.value == "InvalidPlan") {
            setMsg("Ha alcanzado el numero maximo de Chatbot");
            setError(true);
            setopenAlert(true);
          } else {
            currentFilesUpload();
            console.log(response);
          }
        }
        setLoading((prev) => !prev);
      }
    }
  };

  const currentFilesUpload = async () => {
    let response = await getFilesUploaded(uid, user);
    let files = JSON.parse(response);
    setFiles(files);
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
    setError(false);
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      setLoading((prev) => !prev);
      if (url !== "" && validateWeb(url)) {
        let response = await scrapperWeb(url, user);
        if (response) {
          if (response.value == "InvalidPlan") {
            setMsg("Ha alcanzado el numero maximo de Chatbot");
            setError(true);
            setopenAlert(true);
          } else {
            navigate("/chatbot/" + response.value);
          }
          setLoading((prev) => !prev);
        }
      } else {
        setError(true);
        setMsg("Error url incorrecto");
        setopenAlert(true);
        setLoading((prev) => !prev);
      }
    }
  };

  const pushBack = () => {
    navigate("/chatbot/" + uid);
  };

  const removeDocument = (filename: any, id: any) => {
    setRemove({
      filename: filename,
      id: id.$oid,
    });
    handleOpenRemove();
  };

  const handleClickRemove = async () => {
    let filename = remove.filename;
    let id = remove.id;

    setLoadingFile((prev) => !prev);

    let response = await removeFile(user, uid, filename, id);
    console.log(response);
    if (response) {
      setLoadingFile((prev) => !prev);
      currentFilesUpload();
      handleCloseRemove();
    }
  };

  useEffect(() => {
    currentFilesUpload();
  }, [user]);

  return (
    <>
      <CssBaseline />
      <Navbar />
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
      {!showPageScrapper ? (
        <Box width={600} sx={{ margin: "0 auto", width: { xs: "100%" } }}>
          <Typography variant="h1" fontSize={28} py={3}>
            Re-entrena tu chatbot agregando un nuevo documento
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            {!loading ? (
              <Button
                component="label"
                variant="contained"
                color="primary"
                onClick={handdleCLick}
              >
                Subir PDF
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
            {/*<Button
              component="label"
              variant="contained"
              color="primary"
              onClick={handdleCLickUrl}
            >
              URL
            </Button>*/}
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
              La WEB solo extraera un maximo de 25 URL{" "}
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
        text={msg}
        error={error}
        openAlert={openAlert}
        setopenAlert={setopenAlert}
      />
      <Box sx={{ margin: "0 auto", width: "600px", padding: "20px" }}>
        <Typography variant="h1" fontSize={28} py={3}>
          PDF Agregados
        </Typography>
        <Box sx={{ border: "1px solid #ccc", width: "600px", padding: "20px" }}>
          {files.length > 0 ? (
            files?.map((item: any, index) => (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "16px",
                      textAlign: "left",
                      lineHeight: "48px",
                    }}
                  >
                    {item.name_file}
                  </Typography>
                  <Tooltip title={"Eliminar"} placement="top">
                    <DeleteIcon
                      onClick={() => removeDocument(item.name_file, item._id)}
                      sx={{ cursor: "pointer", marginLeft: "auto" }}
                    />
                  </Tooltip>
                </Box>
              </>
            ))
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                textAlign: "center",
                lineHeight: "48px",
              }}
            >
              No se encontraron documentos
            </Typography>
          )}
          <Modal
            open={openRemove}
            onClose={handleCloseRemove}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{}}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h6">
                Si eliminar el archivo el chatbot se RE-entrenara, esta seguro
                de eliminar este archivo ?
              </Typography>

              {loadingFile === false ? (
                <>
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
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />\
                </Box>
              )}
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default ChatbotSettings;
