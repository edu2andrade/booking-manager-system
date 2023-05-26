import React from "react";
import "./styles.css";

export const ServiceCard = ({ service, handleDelete }) => {
  return (
    <div className="list-service ">
      <div className="text-list-service">
        <p className="text-servic">{service}</p>
      </div>
      <button className="btn-list-service me-4">Edit</button>
      <button className="btn-list-service" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
