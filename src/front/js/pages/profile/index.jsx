import React, { useState } from "react";
import calendarBox from "../../../../assets/calendar_box.png";
import { Link } from "react-router-dom";
import "./styles.css";
import { insertImg } from "../../service";
import { useParams } from "react-router-dom";
import UserDashboard from "../userDashboard/index.jsx";
import { ProfileForm } from "../../components/profileForm/index.jsx";
import { Navbar } from "../../components/navbar/index.jsx";
import { ImgProfile } from "../../components/imgProfile/index.jsx";

const Profile = () => {
  const { userId } = useParams();

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  console.log(user, "userrr++++");
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
    } else {
      setUser({ ...user, [target.name]: target.value });
    }
  };

  // const handleClick = () => {
  //   const form = new FormData();
  //   form.append("avatar", file);
  //   form.append("user", JSON.stringify(user));
  //   insertImg(form);
  // };
  const handleClick = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("avatar", file);
    form.append("email", user.email);
    form.append("username", user.username);
    form.append("firstname", user.firstname);
    form.append("lastname", user.lastname);
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
      {/* <p>User ID: {userId}</p> */}

      <ImgProfile img={fileUrl} handleChange={handleChange} />

      <main className="mainContainerProfile">
        <div className="background">
          <h2 className="title">Profile update</h2>
          <ProfileForm handleChange={handleChange} handleClick={handleClick} />
          {/* <section>
            <form>
              <div className="inputs">
                <input type="file" onChange={handleChange} placeholder="File" />
              </div>

              <div className="inputs">
                <input
                  type="text"
                  value={user.username}
                  onChange={({ target }) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      username: target.value,
                    }))
                  }
                  placeholder="Username"
                />
              </div>

              <div className="inputs">
                <input
                  type="text"
                  value={user.firstname}
                  onChange={({ target }) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      firstname: target.value,
                    }))
                  }
                  placeholder="First name"
                />
              </div>

              <div className="inputs">
                <input
                  type="text"
                  value={user.lastname}
                  onChange={({ target }) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      lastname: target.value,
                    }))
                  }
                  placeholder="Last name"
                />
              </div>

              <div className="inputs">
                <input
                  type="email"
                  value={user.email}
                  onChange={({ target }) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      email: target.value,
                    }))
                  }
                  placeholder="Email"
                />
              </div>

              {fileUrl && <img src={fileUrl} alt="Avatar" height={120} />}
              <button type="button" onClick={handleClick}>
                Enviar
              </button>
            </form>
          </section> */}
        </div>
      </main>
      {/* <UserDashboard></UserDashboard> */}
    </main>
  );
};
export default Profile;
