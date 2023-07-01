import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./updateBookingCard.module.css";
import Button from "../button/index.jsx";
import DateTimePicker from "../datePicker/index.jsx";
import { updateBooking } from "../../service/booking.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format, setHours, setMinutes, parse } from "date-fns";

const UpdateBookingList = ({
  textBtn,
  workerList,
  serviceList,
  currentBooking,
  minTime,
  maxTime,
  CompanyInfo,
}) => {
  const navigate = useNavigate();
  const { bookingID } = useParams();

  const [booking, setBooking] = useState({
    worker: "",
    service: "",
    start_service: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  const handleChange = ({ target }) => {
    setBooking({ ...booking, [target.name]: target.value });
  };

  console.log(booking);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    setSelectedDate(date);
    setStartDate(formattedDate);
    setBooking({ ...booking, start_service: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDeafult();
    const resMsg = await updateBooking(bookingID, booking);
    console.log(resMsg);
    if (resMsg.data) {
      toast.success(resMsg?.msg);
      navigate("/user-dashboard");
    } else {
      toast.error(resMsg?.msg);
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
                  value={booking.worker}
                  name="worker"
                >
                  <option>Select Worker</option>
                  {workerList.map((workerId) => (
                    <option key={workerId.id} value={workerId.id}>
                      {workerId.user.firstname}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                <select
                  className="_boxShadow"
                  value={booking.service}
                  name="service"
                >
                  <option>Select Service</option>
                  {serviceList.map((serviceId) => (
                    <option key={serviceId.id} value={serviceId.id}>
                      {serviceId.name}
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
                className={`${styles._loginBtnGoBack} boxShadow`}
                onClick={() => navigate(-1)}
                title="Go Back"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBookingList;
