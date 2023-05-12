import React, { useEffect, useState } from "react";
import { obtainInfo } from "../../service";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await obtainInfo();
      console.log(userData, "data");
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleSubmit = () => {
    navigate(`/profile/${user.id}`);
  };
  // const [state, setState] = useState({
  //   id: 0,
  //   email: "",
  //   avatar: "",
  // });

  // const getUser = async () => {
  //   const data = await obtainInfo();
  //   console.log("DATA", data);
  //   setState(data);
  // };

  // useEffect(() => getUser(), []);

  return (
    <div className="jumbotron">
      <h1>User Dashboard</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <img src={user.avatar} alt="Avatar" />
      <button onClick={handleSubmit}>profile</button>
    </div>
  );
};

export default UserDashboard;
