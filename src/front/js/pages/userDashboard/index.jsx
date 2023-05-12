import React, { useEffect, useState } from "react";
import { obtainInfo } from "../../service";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await obtainInfo();
      console.log(userData.email, "data");
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
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
    </div>
  );
};

export default UserDashboard;
