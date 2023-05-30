import React from "react";
import styles from "./reservationForm.module.css";
import Input from "../input/index.jsx";

const ReservationForm = ({
  handleChange,
  handleSubmit,
  workersList,
  servicesList,
  setNewBooking,
  newBooking,
}) => {
  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <div className={styles._selectContainer}>
        <select name="worker" className="boxShadow">
          {workersList.map((op) => (
            <option key={op.id}>{op.user.username}</option>
          ))}
        </select>
        <select name="service" className="boxShadow">
          {servicesList.map((op) => (
            <option key={op.id}>{op.name}</option>
          ))}
        </select>
      </div>
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Start Service"
        name="startservice"
      />
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Description"
        name="description"
      />
      <button type="submit" className={styles._loginBtn}>
        Create
      </button>
    </form>
  );
};

export default ReservationForm;
