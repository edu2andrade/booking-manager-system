import React, { useState } from "react";
import calendarBox from "../../../../assets/calendar_box.png";
import { Link } from "react-router-dom";
import "./styles.css";
import { insertImg } from "../../service";
import { useParams } from "react-router-dom";
import UserDashboard from "../userDashboard/index.jsx";
import { ProfileForm } from "../../components/profileForm/index.jsx";
import { Navbar } from "../../components/navbar/index.jsx";
const Profile = () => {
  const { userId } = useParams();

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    console.log(target.files);
    if (target.files) {
      setFile(target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          console.log("result", reader.result);
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  // const handleClick = () => {
  //   const form = new FormData();
  //   form.append("avatar", file);
  //   form.append("user", JSON.stringify(user));
  //   insertImg(form);
  // };
  const handleClick = () => {
    const form = new FormData();
    form.append("avatar", file);
    form.append("email", user.email);
    form.append("username", user.username);
    form.append("firstname", user.firstname);
    form.append("lastname", user.lastname);
    form.append("password", user.password);

    insertImg(form);
    setFile("");
    setFileUrl("");
    setUser({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };
  console.log(user, "user");

  return (
    <main className="">
      <Navbar />
      <p>User ID: {userId}</p>

      <main className="mainContainer">
        <div className="background">
          <h2 className="title">Profile update</h2>
          <ProfileForm />
        </div>
      </main>
      {/* <UserDashboard></UserDashboard> */}
      {/* <section>
        <div className="btnWrapper">
          <Link to={"/login"}>
            <button type="button" className="loginBtn boxShadow">
              Login
            </button>
          </Link>
          <Link to={"/user-register"}>
            <p className="registerLink">
              Don’t have an account yet? Register here!
            </p>
          </Link>
          <Link to={"/company-register"}>
            <p className="registerLink">Register your company here!</p>
          </Link>
        </div>
        <div className="calendarWrapper">
          <div className="calendar">
            <h1>Añadiendo la img</h1>
            <input type="file" onChange={handleChange} />

            <input
              type="text"
              value={user.username}
              onChange={({ target }) =>
                setUser((prevUser) => ({ ...prevUser, username: target.value }))
              }
              placeholder="username"
            />
            <input
              type="text"
              value={user.firstname}
              onChange={({ target }) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  firstname: target.value,
                }))
              }
              placeholder="firstname"
            />
            <input
              type="text"
              value={user.lastname}
              onChange={({ target }) =>
                setUser((prevUser) => ({ ...prevUser, lastname: target.value }))
              }
              placeholder="lastname"
            />

            <input
              type="email"
              value={user.email}
              onChange={({ target }) =>
                setUser((prevUser) => ({ ...prevUser, email: target.value }))
              }
              placeholder="email"
            />
            <input
              type="password"
              value={user.password}
              onChange={({ target }) =>
                setUser((prevUser) => ({ ...prevUser, password: target.value }))
              }
              placeholder="password"
            />
            {fileUrl && <img src={fileUrl} alt="Avatar" height={120} />}
            <button onClick={handleClick}>enviar</button> */}
      {/* </div> */}
      {/* </div> */}

      {/* </section> */}
    </main>
  );
};
export default Profile;
