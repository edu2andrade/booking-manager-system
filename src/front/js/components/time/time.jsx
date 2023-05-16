import React from "react";
import Times from "../times/times.jsx";

const Time = ({ showTime, date }) => {
  return <div>{showTime ? <Times date={date} /> : null}</div>;
};

export default Time;
