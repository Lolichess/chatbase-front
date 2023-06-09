import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Chatbot, ChatbotShared } from "@/pages/Chatbot";
import ChatbotSettings from "@/pages/Chatbot/ChatbotSettings";
import Login from "@/pages/Login/Login";
import { AccountSetting } from "@/pages/AccountSetting";
import ChatbotBubble from "@/pages/Chatbot/ChatbotBubble";
import { MyChatbots } from "@/pages/MyChatbots";
import PricingPage from "@/pages/PricingPage/PricingPage";
import SucessPayment from "@/pages/Payment/SucessPayment";
import CancelPayment from "@/pages/Payment/CancelPayment";
import ChatbotAdd from "@/pages/Chatbot/ChatbotAdd";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot/:uid" element={<Chatbot />} />
        <Route path="/shared/chatbot/:uid" element={<ChatbotShared />} />
        <Route path="/shared-bubble/chatbot/:uid" element={<ChatbotBubble />} />
        <Route path="/chatbot/:uid/settings" element={<ChatbotSettings />} />
        <Route path="/chatbot/:uid/add" element={<ChatbotAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<AccountSetting />} />
        <Route path="/my-chatbots" element={<MyChatbots />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success" element={<SucessPayment />} />
        <Route path="/error" element={<CancelPayment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
