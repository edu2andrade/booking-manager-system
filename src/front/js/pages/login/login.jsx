import React, { useState } from "react";
import logoDetail from "../../../../assets/logo_detail.png";
import "./styles.css";
import Input from "../../component/input/input.jsx";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [newLogin, setNewLogin] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewUser({ ...newLogin, [target.name]: target.value });
  };
  console.log("Login User -->", newLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    // make request to API
    // redirects based on role
  };
  return (
    <main className="mainContainer">
      <header>
        <h1 className="logoTitle">Booking Manager.</h1>
        <span className="logoSubtitle">
          A complete booking management software that allows your business to
          manage their bookings effectively.
        </span>
        <img src={logoDetail} alt="purple square design used as logo" />
      </header>
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
