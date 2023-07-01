import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import UpdateBookingList from "../../components/updateBookingCard/index.jsx";
import { getBookingByUser, getBookingById } from "../../service/booking.js";
import { getInfoCompanyById } from "../../service/company.js";
import { format, setHours, setMinutes, parse } from "date-fns";

const UpdateBooking = () => {
  const [workerList, setWorkerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);
  const { bookingID } = useParams();

  const navigate = useNavigate();

  const { store } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const getBooking = async () => {
    const bookingData = await getBookingByUser();
    // Filter by workers unique
    const uniqueWorkers = bookingData.reduce((workers, booking) => {
      const worker = booking.services_workers.workers;
      if (!workers.some((w) => w.id === worker.id)) {
        workers.push(worker);
      }
      return workers;
    }, []);
    setWorkerList(uniqueWorkers);

    // Filter by services unique
    const uniqueServices = bookingData.reduce((services, booking) => {
      const service = booking.services_workers.services;
      if (!services.some((s) => s.id === service.id)) {
        services.push(service);
      }
      return services;
    }, []);
    setServiceList(uniqueServices);
  };

  // const getReservation = async () => {
  //   const booking = await getBookingById(bookingID);
  //   setCurrentBooking(booking);
  // };

  useEffect(() => {
    getBooking();
    // getReservation();
  }, []);

  // const getCompany = async () => {
  //   const company = await getInfoCompanyById(currentBooking.company_id);
  //   setCompanyInfo(company);
  // };

  // useEffect(() => {
  //   getCompany();
  // }, [currentBooking]);

  // useEffect(() => {
  //   if (companyInfo?.opening_time) {
  //     const openingTime = parse(companyInfo.opening_time, "HH:mm", new Date());
  //     const calculatedMinTime = setHours(
  //       setMinutes(openingTime, 0),
  //       openingTime.getHours()
  //     );
  //     setMinTime(calculatedMinTime);
  //   }
  // }, [companyInfo]);

  // useEffect(() => {
  //   if (companyInfo?.closing_time) {
  //     const closingTime = parse(companyInfo.closing_time, "HH:mm", new Date());
  //     const calculatedMaxTime = setHours(
  //       setMinutes(closingTime, 0),
  //       closingTime.getHours()
  //     );
  //     setMaxTime(calculatedMaxTime);
  //   }
  // }, [companyInfo]);

  return (
    <>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
      />
      <UpdateBookingList
        textBtn="Update"
        workerList={workerList}
        serviceList={serviceList}
        currentBooking={currentBooking}
        minTime={minTime}
        maxTime={maxTime}
        companyInfo={companyInfo}
      />
    </>
  );
};
export default UpdateBooking;
