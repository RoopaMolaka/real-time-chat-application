import React from "react";
import logo from "./image/live-chat_512px.png";
import { motion } from "framer-motion";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);
  const nav = useNavigate();
  if (!userInfo) {
    console.log("User not Authenticated");
    nav("/");
  }
  return (
    <div className="welcome-container" >
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="Logo"
        className="welcome-logo"
      />
      <b>Hi , {userInfo?.name} 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default Welcome;
