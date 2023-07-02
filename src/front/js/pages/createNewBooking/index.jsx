import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import ReservationForm from "../../components/reservationForm/index.jsx";
import { listServicesByCompany } from "../../service/services.js";
import { createBooking } from "../../service/booking.js";
import { getAllServiceWorkers } from "../../service/service_worker.js";
import Spinner from "../../components/spinner/index.jsx";
import { toast } from "react-toastify";
import Header from "../../components/header/index.jsx";

const initialState = {
  service: "",
  worker: "",
  start_service: "",
  description: "",
};

const CreateNewBooking = () => {
  const [servicesList, setServicesList] = useState([]);
  const [newBooking, setNewBooking] = useState(initialState);
  const [serviceWorkers, setServiceWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const navigate = useNavigate();
  const { company_id } = useParams();

  const listServiceWorkers = async () => {
    const allServiceWorkers = await getAllServiceWorkers();
    setServiceWorkers(allServiceWorkers);
  };

  const servicesByCompany = async () => {
    setIsLoading(true);
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
    setIsLoading(false);
  };

  useEffect(() => {
    listServiceWorkers();
    servicesByCompany();
  }, []);

  const handleSubmit = async () => {
    const resMsg = await createBooking(company_id, newBooking);
    if (resMsg.data) {
      toast.success(resMsg?.msg);
      navigate("/user-dashboard");
    } else {
      toast.error(resMsg?.msg);
    }
  };

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      {!isLoading ? (
        <ReservationForm
          handleSubmit={handleSubmit}
          servicesList={servicesList}
          newBooking={newBooking}
          setNewBooking={setNewBooking}
          serviceWorkers={serviceWorkers}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CreateNewBooking;
