import React from "react";

const SendMessage = ({ item }) => {
  return (
    <div className={`message ${item.type}`}>
      <h5>{item.user}</h5>
      <p>{item.message}</p>
    </div>
  );
};

export default SendMessage;
