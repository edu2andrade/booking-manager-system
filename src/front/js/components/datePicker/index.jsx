import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePicker.module.css";

const DateTimePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      className={styles._dateTimePicker}
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      showTimeSelect
      dateFormat="dd MMMM yyyy, p"
      placeholderText="Select a date"
    />
  );
};

export default DateTimePicker;
