import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/user";
import styles from "./userRegister.module.css";
import { bgImg } from "../../../../assets/assets.jsx";
import UserForm from "../../components/userForm/index.jsx";
import Logotipo from "../../components/logotipo/index.jsx";
import Spinner from "../../components/spinner/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const UserRegister = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setNewUser({ ...newUser, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await registerUser(newUser);
    if (resMsg) {
      toast.success(resMsg?.msg);
      navigate("/user-dashboard");
    } else {
      toast.error(resMsg?.msg);
    }
  };

  return (
    <main className={styles._mainContainer}>
      <section className={styles._sectionContainer}>
        <img
          className={styles._bgImg}
          src={bgImg}
          alt="Woman booking a service in your computer"
        />
        <div className={styles._actionContainer}>
          <Logotipo />
          <h1 className={styles._heading}>Sign Up</h1>
          {!isLoading ? (
            <UserForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              textBtn="Register"
            />
          ) : (
            <Spinner />
          )}
          <span className={styles._credits}>
            Photo by Andrew Neel on Unsplash
          </span>
          <span className={`${styles._line} _gradient1`}></span>
        </div>
      </section>
    </main>
  );
};
export default UserRegister;
