import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/index.jsx";
import UpdateBookingList from "../../components/updateBookingCard/index.jsx";
import { useParams } from "react-router-dom";
import { getBookingByUser, updateBooking } from "../../service/booking.js";

const initialState = {
  worker: "",
  service: "",
  start_service: "",
  description: "",
};

const UpdateBooking = () => {
  const { bookingID } = useParams();
  const [list, setList] = useState(initialState);
  const [isUpdated, setIsUpdated] = useState(false);
  const [workerList, setWorkerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [bookingList, setBookingList] = useState([]);

  const getBooking = async () => {
    const bookingData = await getBookingByUser();
    setBookingList(bookingData);

    // Filtrar trabajadores únicos
    const uniqueWorkers = bookingData.reduce((workers, booking) => {
      workers.add(booking.services_workers.workers.id);
      return workers;
    }, new Set());
    setWorkerList(Array.from(uniqueWorkers));

    // Filtrar servicios únicos
    const uniqueServices = bookingData.reduce((services, booking) => {
      services.add(booking.services_workers.services.id);
      return services;
    }, new Set());
    setServiceList(Array.from(uniqueServices));
  };

  useEffect(() => {
    getBooking();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setList(initialState);
    const booking = await updateBooking(bookingID, list);

    setList(booking);
    setIsUpdated(true);
  };

  const handleChange = ({ target }) => {
    setList({ ...list, [target.name]: target.value });
  };

  return (
    <>
      <Navbar />
      <UpdateBookingList
        list={list}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isUpdated={isUpdated}
        textBtn="Update"
        workerList={workerList}
        serviceList={serviceList}
      />
    </>
  );
};
export default UpdateBooking;
