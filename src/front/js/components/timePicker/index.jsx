import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
// import styles from "./timePicker.module.css";

const TimeSelector = () => {
  const [value, onChange] = useState("");

  return (
    <TimePicker
      //   className={styles._timePicker}
      onChange={onChange}
      value={value}
      format="HH:mm"
      name="time"
    />
  );
};

export default TimeSelector;
