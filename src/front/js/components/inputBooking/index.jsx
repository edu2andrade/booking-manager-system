import React from "react";
import styles from "./inputBooking.module.css";

const InputBooking = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  date,
}) => {
  return (
    <div className={styles._inputContainer}>
      {icon}
      <input
        className="_boxShadow"
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        date={date}
      />
    </div>
  );
};

export default InputBooking;
