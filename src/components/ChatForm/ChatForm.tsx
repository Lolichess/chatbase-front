import {
  Box,
  Input,
  Button,
  Typography,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { sendQuestion, getInfo } from "@/services/services";
import { ModalShared } from "../ModalShared";
import { SigninContext } from "@/context";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

interface ChatSchema {
  msg: string;
  type: string;
}

const SHOW_LOADING = false;

const ChatForm = (props: any) => {
  const messageEl = useRef(null as any);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<ChatSchema[]>();
  const [namefile, setNamefile] = useState("");
  const [loading, setLoading] = useState(SHOW_LOADING);
  const [list, setList] = useState<string[]>();

  const { user } = useContext(SigninContext);

  const navigate = useNavigate();

  const fecthdata = async () => {
    if (user) {
      let response = await getInfo(props.id, user);
      setNamefile(response.name);
      setChat([...(chat || []), { msg: response.msgWelcome, type: "system" }]);
    }
  };

  const generateListSuggetions = async () => {
    if (user) {
      const DEFAULT_TEMPLATE =
        "Crea una lista de preguntas sugeridas en un formato array de string valido de max size 3";

      let response = await sendQuestion(DEFAULT_TEMPLATE, props.id, user);

      if (response) {
        try {
          setList(JSON.parse(response.response));
        } catch (e) {}
      }
    }
  };

  const pushSuggetions = async (question: string) => {
    setChat([...(chat || []), { msg: question, type: "user" }]);

    let questionSend = question;
    setQuestion("");
    setLoading(!SHOW_LOADING);
    let response = await sendQuestion(questionSend, props.id, user);

    if (response) {
      setChat((prev) => [
        ...(prev || []),
        { msg: response.response, type: "system" },
      ]);
      setLoading(SHOW_LOADING);
    }
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    generateListSuggetions();
    fecthdata();
  }, [user]);

  const pushtoHome = () => {
    navigate("/");
  };

  const handdleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      setQuestion(value);
    } else {
      setQuestion("");
    }
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChat([...(chat || []), { msg: question, type: "user" }]);
    let questionSend = question;
    setQuestion("");
    setLoading(!SHOW_LOADING);
    let response = await sendQuestion(questionSend, props.id, user);

    if (response) {
      setChat((prev) => [
        ...(prev || []),
        { msg: response.response, type: "system" },
      ]);
      setLoading(SHOW_LOADING);
    }
  };
  return (
    <Box component="div" sx={{ position: "relative" }}>
      <Box
        component="div"
        sx={{
          flexDirection: "column",
          alignItems: "center",
          marginTop: { xs: "60px" },
        }}
      >
        <Typography
          variant="h6"
          marginTop={6}
          sx={{
            width: { xs: "270px", md: "100%" },
            textOverflow: { xs: "ellipsis" },
            whiteSpace: { xs: "nowrap" },
            overflow: { xs: "hidden" },
          }}
        >
          {namefile}
        </Typography>
        <Box
          component="div"
          width={800}
          height={500}
          marginTop={2}
          sx={{
            boxShadow: 0,
            border: "1px solid #ccc",
            borderRadius: "10px",
            position: "relative",
            width: { xs: "90%", md: "800px" },
            height: { xs: "450px", md: "500px" },
          }}
        >
          <Box
            component="div"
            height={400}
            sx={{ overflowY: "auto", height: { xs: "350px", md: "400px" } }}
            ref={messageEl}
          >
            {chat?.map((value, index) => (
              <Box
                key={index}
                component="div"
                mx={5}
                my={2}
                py={2}
                px={1}
                width={"fit-content"}
                maxWidth={"70%"}
                textAlign={value.type === "user" ? "left" : "end"}
                marginLeft={value.type !== "user" ? "auto" : "40px"}
                sx={{ boxShadow: 3, borderRadius: "4px" }}
              >
                {value.msg}
              </Box>
            ))}
            {loading === true ? (
              <Box
                component="div"
                mx={5}
                my={2}
                py={2}
                px={1}
                width={"fit-content"}
                maxWidth={"70%"}
                textAlign={"end"}
                marginLeft={"auto"}
                sx={{ boxShadow: 3, borderRadius: "4px" }}
              >
                <LinearProgress sx={{ width: "120px", height: "7px" }} />
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Box component="div">
            <form onSubmit={handdleSubmit}>
              <Box component="div" px={2} sx={{ display: "flex", gap: "4px" }}>
                <Input
                  type="text"
                  placeholder="Pregunta algo..."
                  fullWidth
                  onChange={handdleInputChange}
                  value={question}
                ></Input>
                <Button type="submit" variant="contained">
                  Enviar
                </Button>
              </Box>
              <Box
                component="div"
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexWrap: "wrap",
                }}
              >
                {list?.map((value, index) => (
                  <Box
                    component="div"
                    key={value}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      margin: "10px",
                    }}
                    onClick={() => pushSuggetions(value)}
                  >
                    <Tooltip title={value} placement="top">
                      <Typography
                        sx={{
                          fontSize: "11px",
                          width: "180px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {value}
                      </Typography>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </form>
          </Box>
          <ModalShared uid={props.id} />
        </Box>
      </Box>
      <Button
        variant="outlined"
        sx={{
          position: { md: "absolute", xs: "relative" },
          right: { md: "0px", xs: "inherit" },
          top: { md: "45px", xs: "inherit" },
          bottom: { md: "inherit", xs: "inherit" },
          margin: { xs: "20px 0px" },
        }}
        onClick={pushtoHome}
      >
        Crear chatbot
      </Button>
    </Box>
  );
};

export default ChatForm;
