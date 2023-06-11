import React from "react";
import styles from "./inputField.module.css";

const InputField = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  register,
  errors,
}) => {
  return (
    <div className={styles._inputContainer}>
      {icon && <i className={icon}></i>}
      <input
        className="_boxShadow"
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {errors[name] && (
        <small className={styles._fail}>{errors[name].message}</small>
      )}
    </div>
  );
};

export default InputField;
