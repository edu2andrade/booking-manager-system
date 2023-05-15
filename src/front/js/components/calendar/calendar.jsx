import React from "react";
import ReactCalendar from "react-calendar";
import "../../components/calendar/styles.css";

const Calendar = ({ onChange, value }) => {
  return (
    <div>
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
