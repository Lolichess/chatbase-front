import { SigninContext } from "@/context";
import { getListChat } from "@/services/services";
import { Box, Link, useStepperContext } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListChat = () => {
  const { user } = useContext(SigninContext);

  const [listChatFile, setlistChatFile] = useState([]);

  const navigate = useNavigate();

  const featchdata = async () => {
    if (user) {
      let response = await getListChat(user);
      setlistChatFile(JSON.parse(response));
    }
  };

  const pushTopage = (id: any) => {
    navigate("/chatbot/" + id);
  };

  useEffect(() => {
    featchdata();
  }, [user]);

  return (
    <div>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          width: { sm: "720px", xs: "100%" },
          margin: "0 auto",
          flexWrap: "wrap",
          marginTop: { md: "45px", xs: "80px" },
        }}
      >
        {listChatFile.map((data: any, index) => (
          <Box component={"div"} sx={{ width: "180px" }} key={data.document_id}>
            <Link
              onClick={() => pushTopage(data.document_id)}
              sx={{ cursor: "pointer", display: "content", width: "180px" }}
            >
              <img
                src={
                  import.meta.env.VITE_API_URL +
                  "/getimagen?uid=" +
                  data.user_book +
                  "&id=" +
                  data.document_id
                }
                width={"180px"}
                height={"240px"}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
              {data.document_id}
            </Link>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ListChat;
