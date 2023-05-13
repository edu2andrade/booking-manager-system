import React, { useState } from "react";
import Calendar from "../../components/calendar/calendar.jsx";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    console.log(date);
    setDate(date);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      {console.log(date)}
    </div>
  );
};

export default UserDashboard;
