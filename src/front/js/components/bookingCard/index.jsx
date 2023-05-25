import React from "react";
import "./styles.css";

const BookingCard = ({ service, date, deleteReservation }) => {
  return (
    <div className="booking-container">
      <div className="button-container">
        <button onClick={deleteReservation}>x</button>
      </div>
      <div className="service-information">
        <h1>{date}</h1>
        <p>{service}</p>
      </div>
    </div>
  );
};

export default BookingCard;
