import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Chatbot, ChatbotShared } from "@/pages/Chatbot";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot/:uid" element={<Chatbot />} />
        <Route path="shared/chatbot/:uid" element={<ChatbotShared />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
