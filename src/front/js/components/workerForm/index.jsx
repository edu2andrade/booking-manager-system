import React from "react";
import styles from "./workerForm.module.css";
import Input from "../input/index.jsx";
// import UpdateMessage from "../updateMessage/index.jsx";
import { useNavigate } from "react-router-dom";
// { list, handleSubmit, handleChange, isUpdated }
const WorkerForm = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* {isUpdated && <UpdateMessage />} */}
      <main className={styles._mainContainerImg}>
        <div className={styles._parentTwo}>
          <div className={styles._childTwo}>
            <h2 className={styles._titleService}>Create Worker</h2>
            <form>
              <Input
                icon={<i className="fa-solid fa-circle-user"></i>}
                type="text"
                placeholder="Name"
                name="name"
                // value={list.name}
              />
              <Input
                icon={<i className="fa-solid fa-pen-to-square"></i>}
                type="text"
                placeholder="Description"
                name="description"
                // value={list.description}
              />
              <Input
                icon={<i className="fa-regular fa-clock"></i>}
                type="text"
                placeholder="Service duration"
                name="service_duration"
                // value={list.service_duration}
              />
              <Input
                icon={<i className="fa-solid fa-coins"></i>}
                type="text"
                placeholder="Price"
                name="price"
                // value={list.price}
              />
              <button type="submit" className={`${styles._loginBtn} boxShadow`}>
                Create
              </button>
            </form>
            <button
              className={`${styles._loginBtnGoBack} boxShadow`}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkerForm;
