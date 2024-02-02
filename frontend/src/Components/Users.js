import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import logo from "./image/live-chat_512px.png";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./mainContainer";

const theme = createTheme();

function Users() {
  const { refresh, setRefresh } = useContext(myContext);
  const [users, setUsers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  const dispatch = useDispatch();

  if (!userInfo) {
    console.log("User not Authenticated");
    nav(-1);
  }
  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    axios.get("https://fullstack-chat-app-y7gz.onrender.com/fetchUsers", config).then((data) => {
      console.log("UData refreshed in Users panel ");
      setUsers(data.data);
      // setRefresh(!refresh);
    });
  }, [refresh]);
  console.log("Data refresh in users ");
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
            <p className="ug-title">Available Users</p>
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
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input placeholder="search" className="search-input" />
          </div>
          <div className="ug-list">
            {users.map((user, index) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="list-item"
                  key={index}
                  onClick={() => {
                    console.log("Creating chat with ", user?.name);
                    const config = {
                      headers: {
                        Authorization: `Bearer ${userInfo?.token}`,
                      },
                    };
                    axios.post(
                      "https://fullstack-chat-app-y7gz.onrender.com/chat/",
                      {
                        userId: user._id,
                      },
                      config
                    );
                    dispatch(refreshSidebarFun());
                  }}
                >
                  <p className="con-icon">{user.name[0]}</p>
                  <p className="con-title">{user.name}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default Users;
