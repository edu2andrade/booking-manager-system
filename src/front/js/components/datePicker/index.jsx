import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePicker.module.css";

const DateTimePicker = ({
  selectedDate,
  handleDateChange,
  minTime,
  maxTime,
}) => {
  return (
    <DatePicker
      className={`${styles._dateTimePicker} _boxShadow`}
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      showTimeSelect
      dateFormat="dd MMMM yyyy, p"
      placeholderText="Select a date"
      minTime={minTime}
      maxTime={maxTime}
    />
  );
};

export default DateTimePicker;
