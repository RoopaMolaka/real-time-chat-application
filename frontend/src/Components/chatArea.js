import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import MsgOthers from "./msgOther";
import MsgSelf from "./msgSelf";
import { IconButton } from "@mui/material";
import "./style.css";
// import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./mainContainer";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { refreshSidebar, refreshSidebarFun } from "../Features/refreshSidebar";

// const {io}=require("socket.io-client")
const theme = createTheme();

const ENDPOINT = "https://fullstack-chat-app-y7gz.onrender.com/";
var socket, chat;

function ChatArea() {
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  // console.log(chat_id, chat_user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  // console.log("Chat area id : ", chat_id._id);
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  const dispatch = useDispatch();
  const sendMessage = () => {
    var data = null;
    // console.log("SendMessage Fired to", chat_id._id);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    axios
      .post(
        "http://localhost:8080/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ response }) => {
        data = response;
        console.log("Message Fired");
      })
      .catch((error) => {
        console.error("AxiosError: ", error);
      });
    dispatch(refreshSidebarFun());
    socket.emit("newMsg", data);
    setRefresh(!refresh);
    // window.location.reload();
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    axios
      .get("http://localhost:8080/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit("join chat", chat_id);
      });
    setAllMessagesCopy(allMessages);
    // scrollToBottom();
  }, [refresh, chat_id, userInfo.token]);

  if (!loaded) {
    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            border: "20px",
            padding: "10px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            height={60}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              borderRadius: "10px",
              flexGrow: "1",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            height={60}
          />
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="chatarea-container">
          <div className="chatarea-header">
            <p className="con-icon">{chat_user[0]}</p>
            <div className="header-text">
              <p className="header-title">{chat_user}</p>
            </div>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="messages-container">
            {console.log("data displayed")}
            {allMessages.slice(0).map((message, index) => {
              const sender = message?.sender;
              const self_id = userInfo?._id;
              if (sender?._id === self_id) {
                // console.log("I sent it ", message);
                return <MsgSelf props={message} key={index} />;
              } else {
                // console.log("Someone Sent it");
                return <MsgOthers props={message} key={index} />;
              }
            })}
          </div>
          <div ref={messagesEndRef} className="BOTTOM" />
          <div className="text-input-area">
            <input
              placeholder="Type a Message"
              className="search-bar"
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  // console.log(event);
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              className="icon"
              onClick={() => {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
                // dispatch(refreshSidebar())
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default ChatArea;
