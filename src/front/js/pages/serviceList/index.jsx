import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import {
  deleteServiceList,
  listServiceByCompany,
} from "../../service/service.js";
import { useParams } from "react-router-dom";
import { ServiceCard } from "../../components/serviceCard/index.jsx";

export const ListService = () => {
  const [list, setList] = useState([]);

  const { companyID } = useParams();

  const getList = async () => {
    const serviceList = await listServiceByCompany(companyID);
    setList(serviceList);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDelete = async (service_id) => {
    const isDelete = window.confirm(
      `¿Deseas eliminar el servicio con ID ${service_id}?`
    );
    if (isDelete) {
      const deleted = await deleteServiceList(service_id);
      getList();
      deleted.is_active && deleted.is_active.success;
      console.log(`Service with ID ${service_id} was deleted successfully`);
      setList((prevList) => prevList.filter((item) => item.id !== service_id));
    }
  };

  return (
    <>
      <Navbar />
      <main className="mainContainerimg">
        <BigContainer>
          <h2 className="titleService">List Services</h2>

          {list.map((service) => {
            return !service.is_active ? null : (
              <ServiceCard
                key={service.id}
                service={service.name}
                handleDelete={() => handleDelete(service.id)}
              />
            );
          })}
        </BigContainer>
      </main>
    </>
  );
};
