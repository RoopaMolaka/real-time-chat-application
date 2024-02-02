import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "./image/live-chat_512px.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./mainContainer";
const theme = createTheme();

function Groups() {
  // const [refresh, setRefresh] = useState(true);
  const { refresh, setRefresh } = useContext(myContext);

  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const [groups, SetGroups] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("Data from LocalStorage : ", userInfo);
  const nav = useNavigate();
  if (!userInfo) {
    console.log("User not Authenticated");
    nav("/");
  }

  const user = userInfo;
  useEffect(() => {
    console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("http://localhost:8080/chat/fetchGroups", config)
      .then((response) => {
        console.log("Group Data from API ");
        SetGroups(response.data);
      });
  }, [refresh]);

  return (
    <AnimatePresence>
      <ThemeProvider theme={theme}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ ease: "anticipate", duration: "0.3" }}
          className="list-container"
        >
          <div className="ug-header">
            <img src={logo} style={{ height: "2rem", width: "2rem" }} />
            <p className="ug-title">Available Groups</p>
            <IconButton
              className="icon"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              <RefreshIcon />
            </IconButton>
          </div>

          <div className="search">
            <IconButton className="icon">
              <SearchIcon />
            </IconButton>
            <input placeholder="search" className="search-input" />
          </div>
          <div className="ug-list">
            {groups.map((group, index) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="list-item"
                  key={index}
                  onClick={() => {
                    console.log("Creating chat with group", group.chatName);
                    const config = {
                      headers: {
                        Authorization: `Bearer ${userInfo?.token}`,
                      },
                    };
                    axios.put(
                      "http://localhost:8080/chat/addSelfToGroup",
                      {
                        chatId: group._id,
                        userId: userInfo._id,
                      },
                      config
                    );
                    dispatch(refreshSidebarFun());
                    console.log("after dispatch")
                  }}
                >
                  <p className="con-icon">{group.chatName[0]}</p>
                  <p className="con-title">{group.chatName}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default Groups;
