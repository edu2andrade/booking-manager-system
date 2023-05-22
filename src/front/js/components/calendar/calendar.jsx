import React from "react";
import ReactCalendar from "react-calendar";

const Calendar = () => {
  return (
    <div className="calendar">
      <h1 className="text-center">React Calendar</h1>
      <div className="calendar-container">
        <ReactCalendar
          onChange={onChange}
          value={value}
          onClickDay={onClickDay}
        />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
};

export default Calendar;
