import React, { useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./style.css";

// import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

// import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function CreateGroups() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("Data from LocalStorage : ", userInfo);
  const nav = useNavigate();
  if (!userInfo) {
    console.log("User not Authenticated");
    nav("/");
  }
  const user = userInfo;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("User Data from CreateGroups : ", userInfo);

  const createGroup = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const selectedUserIds = [];
    selectedUserIds.push(user._id);

    axios
      .post(
        "https://fullstack-chat-app-y7gz.onrender.com/chat/createGroup",
        {
          name: groupName,
          users: JSON.stringify(selectedUserIds),
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        nav("/chatApp/groups");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("coming into create group");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you want to create a Group Named " + groupName}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will create a create group in which you will be the admin
                and other will be able to join this group.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={() => {
                  createGroup();
                  handleClose();
                }}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="create-Groups-container">
          <input
            placeholder="Enter Group Name"
            className="search-input"
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <IconButton
            className="icon"
            onClick={() => {
              handleClickOpen();
              // createGroup();
            }}
          >
            <DoneOutlineIcon />
          </IconButton>
        </div>
      </ThemeProvider>
    </>
  );
}

export default CreateGroups;
