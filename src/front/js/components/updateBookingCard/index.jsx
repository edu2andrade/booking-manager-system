import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./updateBookingCard.module.css";
import Button from "../button/index.jsx";
import DateTimePicker from "../datePicker/index.jsx";
import { updateBooking } from "../../service/booking.js";
import { getInfoCompanyById } from "../../service/company.js";
import { getBookingById } from "../../service/booking.js";
import { setHours, setMinutes, parse, format } from "date-fns";

import { toast } from "react-toastify";

const initialState = {
  service: "",
  worker: "",
  start_service: "",
  description: "",
};

const UpdateBookingList = ({
  textBtn,
  workersList,
  servicesList,
  setServicesList,
  setWorkersList,
  serviceWorkers,
}) => {
  const [booking, setBooking] = useState(initialState);
  const [selectedDate, setSelectedDate] = useState("");
  const [companyInfo, setCompanyInfo] = useState({});
  const [currentBooking, setCurrentBooking] = useState({});
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );
  useEffect(() => {
    getCompany();
    getReservation();
  }, []);

  console.log(workersList);

  const navigate = useNavigate();
  const { bookingID } = useParams();

  const getReservation = async () => {
    const booking = await getBookingById(bookingID);
    setCurrentBooking(booking);
    getCompany(booking.company_id);
  };

  const getCompany = async (companyId) => {
    const company = await getInfoCompanyById(companyId);
    setCompanyInfo(company);
  };

  useEffect(() => {
    if (companyInfo?.opening_time) {
      const openingTime = parse(companyInfo.opening_time, "HH:mm", new Date());
      const calculatedMinTime = setHours(
        setMinutes(openingTime, 0),
        openingTime.getHours()
      );
      setMinTime(calculatedMinTime);
    }
  }, [companyInfo]);

  useEffect(() => {
    if (companyInfo?.closing_time) {
      const closingTime = parse(companyInfo.closing_time, "HH:mm", new Date());
      const calculatedMaxTime = setHours(
        setMinutes(closingTime, 0),
        closingTime.getHours()
      );
      setMaxTime(calculatedMaxTime);
    }
  }, [companyInfo]);

  const handleServiceSelect = (e) => {
    const selectedServiceId = parseInt(e.target.value);
    const service = servicesList.filter(
      (service) => service.id === selectedServiceId
    );

    if (service) {
      const newListWorkers = [];
      serviceWorkers.forEach((serviceWorker) => {
        if (serviceWorker.service_id === selectedServiceId) {
          newListWorkers.push(serviceWorker.workers);
        }
      });
      setWorkersList(newListWorkers);
      setBooking({ ...booking, service: selectedServiceId });
    }
  };

  console.log(booking);

  const handleWorkerSelect = (e) => {
    const worker = workersList.filter(
      (elem) => elem.id === parseInt(e.target.value)
    );
    const newListServices = [];
    serviceWorkers.forEach((serviceWorker) => {
      if (serviceWorker.worker_id === worker.id) {
        newListServices.push(serviceWorker.services);
      }
    });
    setServicesList(newListServices);
    setBooking({ ...booking, worker: worker.id });
  };

  const handleChange = ({ target }) => {
    setBooking({ ...booking, [target.name]: target.value });
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    setSelectedDate(date);
    setStartDate(formattedDate);
    setBooking({ ...booking, start_service: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await updateBooking(bookingID, booking);
    if (resMsg?.error) {
      toast.error(resMsg?.msg);
    } else {
      toast.success(resMsg?.msg);
      navigate("/user-dashboard");
    }
  };

  return (
    <>
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Update Booking</h2>
            <form
              className={styles._form}
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                <select
                  className="_boxShadow"
                  value={booking.service}
                  name="service"
                  onChange={(e) => handleServiceSelect(e)}
                >
                  <option>Select Service</option>
                  {servicesList?.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op && op.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                <select
                  className="_boxShadow"
                  value={booking.worker}
                  name="worker"
                  onChange={(e) => handleWorkerSelect(e)}
                >
                  <option>Select Worker</option>
                  {workersList?.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.user.firstname} {worker.user.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <DateTimePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleDateChange={handleDateChange}
                startDate={startDate}
                minTime={minTime}
                maxTime={maxTime}
              />
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-pen-to-square"></i>
                <input
                  className="_boxShadow"
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={booking.description}
                />
              </div>
              <Button type="submit" title={textBtn} />
              <Button
                type="submit"
                title="Go Back"
                onClick={() => navigate(-1)}
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBookingList;
