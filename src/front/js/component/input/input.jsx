import React from "react";
import "./styles.css";

const Input = ({ type, placeholder }) => {
  return (
    <div className="inputContainer">
      <i className="fa-solid fa-user"></i>
      <input type={type} placeholder={placeholder} className="boxShadow" />
    </div>
  );
};

export default Input;
