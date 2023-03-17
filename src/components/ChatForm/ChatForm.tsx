import { Box, Input, Button } from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { sendQuestion } from "@/services/services";
import { ModalShared } from "../ModalShared";

interface ChatSchema {
  msg: string;
  type: string;
}

const ChatForm = (props: any) => {
  const messageEl = useRef(null as any);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<ChatSchema[]>();

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

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

    let response = await sendQuestion(questionSend, props.id);

    if (response) {
      setChat((prev) => [
        ...(prev || []),
        { msg: response.response, type: "system" },
      ]);
    }
  };
  return (
    <Box
      component="div"
      width={800}
      height={500}
      marginTop={7}
      sx={{
        boxShadow: 0,
        border: "1px solid #ccc",
        borderRadius: "10px",
        position: "relative",
      }}
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
      <ModalShared uid={props.id} />
    </Box>
  );
};

export default ChatForm;
