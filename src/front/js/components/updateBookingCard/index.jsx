import React from "react";
import styles from "./updateBookingCard.module.css";
import Input from "../input/index.jsx";
import Button from "../button/index.jsx";
import UpdateMessage from "../updateMessage/index.jsx";
import { useNavigate } from "react-router-dom";

const UpdateBookingList = ({
  list,
  handleSubmit,
  handleChange,
  isUpdated,
  textBtn,
  workerList,
  serviceList,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {isUpdated && <UpdateMessage />}
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Update service</h2>
            <form
              className={styles._form}
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="number"
                placeholder="Worker"
                name="worker"
                value={list.worker}
              />
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="number"
                placeholder="Service"
                name="service"
                value={list.service}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Booking Time"
                name="start_service"
                value={list.start_service}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="description"
                name="description"
                value={list.description}
              />
              <Button type="submit" title={textBtn} />
            </form>
            <button
              className={`${styles._loginBtnGoBack} boxShadow`}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
        <select value={list.worker} onChange={handleChange} name="worker">
          <option value="">Select Worker ID</option>
          {workerList.map((workerId) => (
            <option key={workerId} value={workerId}>
              {workerId}
            </option>
          ))}
        </select>
        <select value={list.service} onChange={handleChange} name="service">
          <option value="">Select service ID</option>
          {serviceList.map((serviceId) => (
            <option key={serviceId} value={serviceId}>
              {serviceId}
            </option>
          ))}
        </select>
      </main>
    </>
  );
};

export default UpdateBookingList;
