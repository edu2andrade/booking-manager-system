import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../pages/servicesWorkers/styles.css";
import BigContainer from "../../components/bigContainer/index.jsx";
import { listWorkers } from "../../service/workers";
import { listServices } from "../../service/service";

const ServicesWorkers = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const navigate = useNavigate();

  const { company_id } = useParams();

  const getWorkers = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  const getServices = async () => {
    const services = await listServices(company_id);
    setServicesList(services);
  };

  useEffect(() => {
    getWorkers();
    getServices();
  }, []);

  return (
    <main className="main-container">
      <BigContainer>
        <h1>Assign Services to Workers</h1>
        <div className="dropdownContainer">
          <select name="select" className="boxShadow">
            {workersList.map((op) => (
              <option key={op.id}>{op.user.username}</option>
            ))}
          </select>
          <select name="select" className="boxShadow">
            {servicesList.map((op) => (
              <option key={op.id}>{op.name}</option>
            ))}
          </select>
          <button type="submit" className="loginBtn boxShadow">
            Assign Service
          </button>
        </div>
      </BigContainer>
    </main>
  );
};

export default ServicesWorkers;
