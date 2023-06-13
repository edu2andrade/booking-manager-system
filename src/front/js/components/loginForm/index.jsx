import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "../button/index.jsx";
import styles from "./login.module.css";
import InputField from "../inputField/index.jsx";

const validationShema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
  .matches(/^(?=.*\d{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{12,}$/, 'La contraseña no cumple los requisitos')
  .required('Password is required')
});


const LoginForm = ({ handleChange, handleClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationShema),
  });
 
  const onSubmit = (data) =>{
    handleClick(data);
  };
 
 
  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    onChange={handleChange}
    className={styles._form}    
  >
    <InputField
      icon="classNamefa-solid fa-envelope"
      type="email"
      placeholder="Email"
      name="email"
      register={register}
      errors={errors}
    />
    <InputField
      icon="fa-solid fa-lock"
      type="password"
      placeholder="Password"
      name="password"
      register={register}
      errors={errors}
    />
    <Button type="submit" title="Login" />
  </form>
  )
 };

export default LoginForm;
