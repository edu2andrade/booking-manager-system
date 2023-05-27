import React from "react";
import styles from "./updateServiceCard.module.css";
import Input from "../input/index.jsx";

export const UpdateServiceList = ({ list, handleSubmit, handleChange }) => {
  return (
    <>
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Update service</h2>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="text"
                placeholder="Name"
                name="name"
                value={list.name}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="Description"
                name="description"
                value={list.description}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Service duration"
                name="service_duration"
                value={list.service_duration}
              />
              <Input
                icon={<i className="fa-solid fa-coins"></i>}
                type="text"
                placeholder="Price"
                name="price"
                value={list.price}
              />
              <button type="submit" className={`${styles._loginBtn} boxShadow`}>
                Update
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
