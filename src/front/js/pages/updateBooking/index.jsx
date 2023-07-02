import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import UpdateBookingList from "../../components/updateBookingCard/index.jsx";
import { getBookingByUser, getBookingById } from "../../service/booking.js";
import { listServicesByCompany } from "../../service/services.js";
import { listWorkers } from "../../service/workers.js";
import { getAllServiceWorkers } from "../../service/service_worker.js";

const UpdateBooking = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [serviceWorkers, setServiceWorkers] = useState([]);
  const [company, setCompany] = useState("");

  const navigate = useNavigate();
  const { bookingID } = useParams();

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const getBooking = async () => {
    const bookingData = await getBookingById(bookingID);
    setCompany(bookingData.company_id);
  };

  useEffect(() => {
    getBooking();
  }, []);

  const listServiceWorkers = async () => {
    const allServiceWorkers = await getAllServiceWorkers();
    setServiceWorkers(allServiceWorkers);
  };

  const servicesByCompany = async () => {
    const services = await listServicesByCompany(company);
    setServicesList(services);
  };

  const workersByCompany = async () => {
    const workers = await listWorkers(company);
    setWorkersList(workers);
  };

  useEffect(() => {
    listServiceWorkers();
    servicesByCompany();
    workersByCompany();
  }, [company]);

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <UpdateBookingList
        textBtn="Update"
        workersList={workersList}
        servicesList={servicesList}
        setServicesList={setServicesList}
        setWorkersList={setWorkersList}
        serviceWorkers={serviceWorkers}
      />
    </>
  );
};
export default UpdateBooking;
