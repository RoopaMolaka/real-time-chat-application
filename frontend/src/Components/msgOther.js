import React from "react";
import "./style.css";

const MsgOthers = ({ props }) => {
  console.log("msgOthers", props);
  return (
    <div className="message-container">
      <div>
        <p className="con-icon">{props.sender?.name[0]}</p>
      </div>
      <div className="chatarea-other-text-content">
        <p className="chatarea-con-title ">{props.sender?.name}</p>
        <p className="chatarea-con-lastMessage">{props?.content}</p>
      </div>
    </div>
  );
};

export default MsgOthers;
