import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/index.jsx";
import Header from "../../components/header/index.jsx";
import { loginUser } from "../../service";
import "./styles.css";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [newLogin, setNewLogin] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewLogin({ ...newLogin, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(newLogin);
    navigate("/");
    // navigate should redirect to dashboard company, client or worker
  };

  return (
    <main className="mainContainer">
      <Header />
      <section>
        <h2 className="title">Login</h2>
        {/* Form */}
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <Input
            icon={<i className="fa-solid fa-envelope"></i>}
            type="email"
            placeholder="Email"
            name="email"
          />
          <Input
            icon={<i className="fa-solid fa-lock"></i>}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit" className="boxShadow">
            Login
          </button>
        </form>
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default LoginPage;
