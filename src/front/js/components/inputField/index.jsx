import React from "react";
import styles from "./inputField.module.css";

const InputField = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  registerOptions,
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
        {...register(name, registerOptions)}
      />
      {errors[name]?.type === "required" && (
        <small className={styles._fail}>The field cannot be empty</small>
      )}
      {errors[name]?.type === "maxLength" && (
        <small className={styles._fail}>
          The maximum characters is {registerOptions.maxLength}
        </small>
      )}
      {errors[name]?.type === "minLength" && (
        <small className={styles._fail}>
          The minimum of characters is {registerOptions.minLength}
        </small>
      )}
    </div>
  );
};

export default InputField;
