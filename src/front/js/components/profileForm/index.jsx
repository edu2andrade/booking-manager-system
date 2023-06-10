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

// import React from "react";
// import { useForm } from "react-hook-form";
// import Button from "../button/index.jsx";
// import styles from "./profileForm.module.css";
// const ProfileForm = ({ handleChange, handleClick, user }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     handleClick(data);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         onChange={handleChange}
//         className={styles._form}
//       >
//         <div className={styles._inputContainer}>
//           {<i className="fa-solid fa-circle-user"></i>}
//           <input
//             className="_boxShadow"
//             type="text"
//             placeholder="Username"
//             name="username"
//             defaultValue={user?.username}
//             {...register("username", {
//               required: true,
//               maxLength: 12,
//               minLength: 3,
//             })}
//           />
//         </div>
//         {errors.username?.type === "required" && (
//           <small className={styles._fail}>El campo no puede estar vacío</small>
//         )}
//         {errors.username?.type === "maxLength" && (
//           <small className={styles._fail}>El maximo de character es 12</small>
//         )}
//         {errors.username?.type === "minLength" && (
//           <small className={styles._fail}>El minimo de character es 3</small>
//         )}
//         <div className={styles._inputContainer}>
//           {<i className="fa-solid fa-circle-user"></i>}
//           <input
//             className="_boxShadow"
//             type="text"
//             placeholder="First name"
//             name="firstname"
//             defaultValue={user?.firstname}
//             {...register("firstname", {
//               required: true,
//               maxLength: 12,
//               minLength: 3,
//             })}
//           />
//         </div>
//         {errors.firstname && (
//           <small className={styles._fail}>El campo no puede estar vacío</small>
//         )}
//         {errors.firstname?.type === "maxLength" && (
//           <small className={styles._fail}>El maximo de character es 12</small>
//         )}
//         {errors.firstname?.type === "minLength" && (
//           <small className={styles._fail}>El minimo de character es 3</small>
//         )}
//         <div className={styles._inputContainer}>
//           {<i className="fa-solid fa-circle-user"></i>}
//           <input
//             className="_boxShadow"
//             type="text"
//             placeholder="Last name"
//             name="lastname"
//             defaultValue={user?.lastname}
//             {...register("lastname", {
//               required: true,
//               maxLength: 12,
//               minLength: 3,
//             })}
//           />
//         </div>
//         {errors.lastname && (
//           <small className={styles._fail}>El campo no puede estar vacío</small>
//         )}
//         {errors.lastname?.type === "maxLength" && (
//           <small className={styles._fail}>El maximo de character es 12</small>
//         )}
//         {errors.lastname?.type === "minLength" && (
//           <small className={styles._fail}>El minimo de character es 3</small>
//         )}
//         <div className={styles._inputContainer}>
//           {<i className="fa-solid fa-envelope"></i>}
//           <input
//             className="_boxShadow"
//             type="email"
//             placeholder="Email"
//             name="email"
//             defaultValue={user?.email}
//             {...register("email", {
//               required: true,
//               maxLength: 30,
//               minLength: 10,
//             })}
//           />
//         </div>
//         {errors.email && (
//           <small className={styles._fail}>El campo no puede estar vacío</small>
//         )}
//         {errors.email?.type === "maxLength" && (
//           <small className={styles._fail}>El maximo de character es 30</small>
//         )}
//         {errors.email?.type === "minLength" && (
//           <small className={styles._fail}>El minimo de character es 10</small>
//         )}
//         <Button type="submit" title="Update" />
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
