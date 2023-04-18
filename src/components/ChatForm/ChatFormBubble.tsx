import { Box, Input, Button, LinearProgress } from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { getInfoShared, sendQuestionShared } from "@/services/services";
import "./styled.css";

const SHOW_LOADING = false;
interface ChatSchema {
  msg: string;
  type: string;
}

const ChatFormBubble = (props: any) => {
  const messageEl = useRef(null as any);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<ChatSchema[]>();
  const [loading, setLoading] = useState(SHOW_LOADING);
  const [customPrompt, setCustomPrompt] = useState("");

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    document.body.classList.add("chatform");
  }, []);

  const handdleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      setQuestion(value);
    } else {
      setQuestion("");
    }
  };

  const fecthdata = async () => {
    let response = await getInfoShared(props.id);
    setCustomPrompt(response.template_prompt);
    setChat([...(chat || []), { msg: response.msgWelcome, type: "system" }]);
  };

  useEffect(() => {
    fecthdata();
  }, []);

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChat([...(chat || []), { msg: question, type: "user" }]);
    let questionSend = question;
    setQuestion("");
    setLoading(!SHOW_LOADING);
    let response = await sendQuestionShared(
      questionSend,
      props.id,
      customPrompt
    );

    if (response) {
      setChat((prev) => [
        ...(prev || []),
        { msg: response.response, type: "system" },
      ]);
      setLoading(SHOW_LOADING);
    }
  };
  return (
    <Box
      component="div"
      width={"100%"}
      height={420}
      sx={{ boxShadow: 0, borderRadius: "10px" }}
    >
      <Box
        component="div"
        height={400}
        sx={{ overflowY: "auto" }}
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
            {" "}
            {value.msg}{" "}
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
        </form>
      </Box>
    </Box>
  );
};

export default ChatFormBubble;
