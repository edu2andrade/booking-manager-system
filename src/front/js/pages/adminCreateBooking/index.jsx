import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./adminCreateBooking.module.css";
import AdminReservationForm from "../../components/adminReservationForm/index.jsx";
import { listServicesByCompany } from "../../service/services.js";
import { createBooking } from "../../service/booking.js";
import { getAllServiceWorkers } from "../../service/service_worker.js";
import { toast } from "react-toastify";
import Header from "../../components/header/index.jsx";

const initialState = {
  service: "",
  worker: "",
  start_service: "",
  description: "",
};

const AdminCreateBooking = () => {
  const [servicesList, setServicesList] = useState([]);
  const [newBooking, setNewBooking] = useState(initialState);
  const [serviceWorkers, setServiceWorkers] = useState([]);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();
  const { company_id } = useParams();

  const listServiceWorkers = async () => {
    const allServiceWorkers = await getAllServiceWorkers();
    setServiceWorkers(allServiceWorkers);
  };

  const servicesByCompany = async () => {
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
  };

  useEffect(() => {
    listServiceWorkers();
    servicesByCompany();
  }, []);

  const handleSubmit = async () => {
    const resMsg = await createBooking(company_id, newBooking);
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
    if (resMsg.data.user.role_id === 3) {
      navigate(`/worker-dashboard/${company_id}`);
    } else {
      navigate(`/admin-dashboard/${company_id}`);
    }
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <div className={styles._mainContainer}>
        <AdminReservationForm
          handleSubmit={handleSubmit}
          servicesList={servicesList}
          newBooking={newBooking}
          setNewBooking={setNewBooking}
          serviceWorkers={serviceWorkers}
        />
      </div>
    </>
  );
};

export default AdminCreateBooking;
