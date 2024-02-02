import React from 'react'
import"./style.css"

const MsgSelf = ({props}) => {
  return (
    <div className="self-msgs">
      <div className="msgs-box">
        <p style={{ color: "black" }}>{props.content}</p>
      </div>
    </div>
  );
}

export default MsgSelf;