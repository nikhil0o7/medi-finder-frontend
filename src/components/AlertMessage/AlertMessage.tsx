// import React from "react";
// import { Alert } from "react-bootstrap";
import { Alert } from "antd";
import { IAlertProps } from "./IAlertProps";
import "./AlertMessage.scss";
import React from "react";

// const AlertStyle: React.CSSProperties = {
//     display: overlay,
//     z-index: 1,
//     margin-top: 3%;
//   };

const AlertStyle: React.CSSProperties = {
  display: "overlay",
  zIndex: "1",
  marginTop: "30%",
};

const AlertMessage = ({ message }: IAlertProps) => {
  return (
    <Alert
      style={AlertStyle}
      type="error"
      banner
      closable
      message={message}
    ></Alert>
  );
};

export default AlertMessage;
