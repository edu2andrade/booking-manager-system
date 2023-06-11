import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "../button/index.jsx";
import InputField from "../inputField/index.jsx";
import styles from "./profileForm.module.css";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(12, "Username must not exceed 12 characters"),
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(12, "First name must not exceed 12 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .max(12, "Last name must not exceed 12 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .max(30, "Email must not exceed 30 characters"),
});
const ProfileForm = ({ handleChange, handleClick, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleClick(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleChange}
        className={styles._form}
      >
        <InputField
          icon="fa-solid fa-circle-user"
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={user?.username}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-circle-user"
          type="text"
          placeholder="First name"
          name="firstname"
          defaultValue={user?.firstname}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-circle-user"
          type="text"
          placeholder="Last name"
          name="lastname"
          defaultValue={user?.lastname}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-envelope"
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={user?.email}
          register={register}
          errors={errors}
        />
        <Button type="submit" title="Update" />
      </form>
    </div>
  );
};

export default ProfileForm;
