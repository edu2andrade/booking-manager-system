import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      dateFormat="dd MMMM yyyy, p"
    />
  );
};

export default DateTimePicker;
