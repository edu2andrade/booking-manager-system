import React, { useState } from "react";
import Calendar from "../../components/calendar/calendar.jsx";
// import Calendar from "react-calendar";
import "../../pages/userDashboard/styles.css";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    console.log(newDate);
  };

  return (
    <div>
      <div className="services-box">
        <div className="bg">
          <div className="d-flex align-items-center">
            <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"></img>
            <h1>Worker</h1>
          </div>
          <div>
            <h2>Next Services:</h2>
          </div>
          <div></div>
        </div>
        <div className="calendar">
          <Calendar onChange={onDateChange} value={date} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
