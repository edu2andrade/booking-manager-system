import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service";
import "./styles.css";
import UserForm from "../../components/userForm/index.jsx";
import Header from "../../components/header/index.jsx";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewUser({ ...newUser, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(newUser);
    console.log(`new user ---> ${data}`);
    // if (data.role_id === 3) navigate("/");
  };

  return (
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">Register</h2>
        <UserForm handleChange={handleChange} handleSubmit={handleSubmit} />
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default RegisterPage;
