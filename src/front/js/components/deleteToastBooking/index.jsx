import React from "react";
import styles from "./deleteToastBooking.module.css";
import Button from "../button/index.jsx";

const DeleteToastBooking = ({ msg, action }) => {
  return (
    <div className={styles._toastContainer}>
      <p>{msg}</p>
      <div className={styles._btnWrapper}>
        <Button title="Delete" onClick={action} />
      </div>
    </div>
  );
};

export default DeleteToastBooking;
