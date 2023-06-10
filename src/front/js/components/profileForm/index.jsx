import React from "react";
import { useForm } from "react-hook-form";
import Button from "../button/index.jsx";
import InputField from "../inputField/index.jsx";
import styles from "./profileForm.module.css";

const ProfileForm = ({ handleChange, handleClick, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          registerOptions={{
            required: true,
            maxLength: 12,
            minLength: 3,
          }}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-circle-user"
          type="text"
          placeholder="First name"
          name="firstname"
          defaultValue={user?.firstname}
          registerOptions={{
            required: true,
            maxLength: 12,
            minLength: 3,
          }}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-circle-user"
          type="text"
          placeholder="Last name"
          name="lastname"
          defaultValue={user?.lastname}
          registerOptions={{
            required: true,
            maxLength: 12,
            minLength: 3,
          }}
          register={register}
          errors={errors}
        />
        <InputField
          icon="fa-solid fa-envelope"
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={user?.email}
          registerOptions={{
            required: true,
            maxLength: 30,
            minLength: 10,
          }}
          register={register}
          errors={errors}
        />
        <Button type="submit" title="Update" />
      </form>
    </div>
  );
};

export default ProfileForm;
