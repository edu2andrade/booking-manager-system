import React from "react";
import logoDetail from "../../../../assets/logo_detail.png";
import "./styles.css";

const RegisterPage = () => (
  <main className="mainContainer">
    <header>
      <h1 className="logoTitle">Booking Manager.</h1>
      <span className="logoSubtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        tempora? Qui maiores exercitationem non sed
      </span>
      <img src={logoDetail} alt="purple square design used as logo" />
    </header>
    <section>
      <h2 className="title">Register</h2>
      {/* Bootstrap thing here */}
      <form>
        <input type="text" className="form-control" placeholder="Username" />
        <input type="text" className="form-control" placeholder="First Name" />
        <input type="text" className="form-control" placeholder="Last Name" />
        <input type="email" className="form-control" placeholder="Email" />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
        <div>
          <label for="role-select">Please select a role:</label>
          <select name="role" id="role-select">
            <option value="admin">admin</option>
            <option value="client">client</option>
            <option value="worker">worker</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="bgImg"></div>
    </section>
  </main>
);
export default RegisterPage;
