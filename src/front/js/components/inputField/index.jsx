import React from "react";
import styles from "./inputField.module.css";

const InputField = ({
  icon,
  type,
  placeholder,
  name,
  defaultValue,
  registerOptions,
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
        <small className={styles._fail}>El campo no puede estar vacío</small>
      )}
      {errors[name]?.type === "maxLength" && (
        <small className={styles._fail}>
          El máximo de caracteres es {registerOptions.maxLength}
        </small>
      )}
      {errors[name]?.type === "minLength" && (
        <small className={styles._fail}>
          El mínimo de caracteres es {registerOptions.minLength}
        </small>
      )}
    </div>
  );
};

export default InputField;
