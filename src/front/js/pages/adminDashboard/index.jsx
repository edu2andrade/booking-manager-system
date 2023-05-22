import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { obtainInfo } from "../../service";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  console.log("storeasa", store.userDashboardAdmin.userAdminData);

  useEffect(() => {
    const fetchUserAdmin = async () => {
      const userAdminData = await obtainInfo();
      console.log(userAdminData, "inside funcion");
      actions.saveUserAdmin(userAdminData);
    };
    fetchUserAdmin();
  }, []);
  return (
    <>
      <h1>Admin Dashboard</h1>
    </>
  );
};
export default AdminDashboard;
