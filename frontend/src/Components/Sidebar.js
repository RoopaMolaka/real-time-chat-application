import { useState, useEffect, useContext } from "react";
import * as React from "react";
import "./style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
// import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "../Features/themeSlice";
import axios from "axios";
import { myContext } from "./mainContainer";
// import { refreshSidebarFun } from "../Features/refreshSidebar";

const theme = createTheme();

const Sidebar = () => {
  const dispatch = useDispatch();
  const newRe = useSelector(state => state)
  // console.log(newRe,"ooooo")

  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(myContext);
  const [chats, setChats] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [userState , setUserState] = useState(false)

  if (newRe.refreshKey != userState) {
    setRefresh(!refresh);
    setUserState(newRe.refreshKey);
  }
  const nav = useNavigate();
  if (!userInfo) {
    console.log("User not Authenticated");
    nav("/");
  }
  const user = userInfo;

  useEffect(() => {
    // console.log("Sidebar : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    axios.get("http://localhost:8080/chat/", config).then((response) => {
      console.log("Data refresh in sidebar ");
      setChats(response?.data);
      // setRefresh(!refresh);
    });
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <div className="sidebar-container">
        <div className="header-sb">
          <div className="other-icons">
            <IconButton
              onClick={() => {
                nav("/chatApp/welcome");
              }}
            >
              <AccountCircleIcon className="icon" />
            </IconButton>

            <IconButton
              onClick={() => {
                navigate("users");
              }}
            >
              <PersonAddIcon className="icon" />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("groups");
              }}
            >
              <GroupAddIcon className="icon" />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("createGroups");
              }}
            >
              <AddCircleIcon className="icon" />
            </IconButton>

            <IconButton
              onClick={() => {
                localStorage.removeItem("userInfo");
                navigate("/");
              }}
            >
              <ExitToAppIcon className="icon" />
            </IconButton>
          </div>
        </div>
        <div className="search">
          <IconButton className="icon">
            <SearchIcon />
          </IconButton>
          <input placeholder="search" className="search-input" />
        </div>
        <div className="chats">
          {chats?.map((chat, index) => {
            var chatName = "";
            if (chat.isGroupChat) {
              chatName = chat.chatName;
            } else {
              chat.users.map((user) => {
                if (user?._id != userInfo?._id) {
                  chatName = user?.name;
                }
              });
            }

            if (chat.latestMessage === undefined) {
              // console.log("No Latest Message with ", conversation.users[1]);
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log("Refresh fired from sidebar");
                    setRefresh(!refresh);
                  }}
                >
                  <div
                    key={index}
                    className="conversations-container"
                    onClick={() => {
        
                      navigate("chat/" + chat._id + "&" + chatName);
                      // navigate(`chat/${chat._id}&${chatName}`);
                    }}
                    // dispatch change to refresh so as to update chatArea
                  >
                    <p className="con-icon">{chatName[0]}</p>

                    <p className="con-title">{chatName}</p>

                    <p className="con-lastMessage">
                      No previous Messages, click here to start a new chat
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="conversations-container"
                  onClick={() => {
                    navigate("chat/" + chat?._id + "&" + chatName);
                  }}
                >
                  <p className="con-icon">{chatName[0]}</p>
                  <p className="con-title">{chatName}</p>

                  <p className="con-lastMessage">
                    {chat?.latestMessage?.content}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
