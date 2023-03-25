import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Chatbot, ChatbotShared } from "@/pages/Chatbot";
import ChatbotSettings from "@/pages/Chatbot/ChatbotSettings";
import Login from "@/pages/Login/Login";
import { AccountSetting } from "@/pages/AccountSetting";
import ChatbotBubble from "@/pages/Chatbot/ChatbotBubble";
import { MyChatbots } from "@/pages/MyChatbots";
import PricingPage from "@/pages/PricingPage/PricingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot/:uid" element={<Chatbot />} />
        <Route path="/shared/chatbot/:uid" element={<ChatbotShared />} />
        <Route path="/shared-bubble/chatbot/:uid" element={<ChatbotBubble />} />
        <Route path="/chatbot/:uid/settings" element={<ChatbotSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<AccountSetting />} />
        <Route path="/my-chatbots" element={<MyChatbots />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
