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

  const params = useParams();

  useEffect(() => {
    const getList = async () => {
      const serviceList = await listServiceByCompany(params.companyID);
      setList(serviceList);
    };
    getList();
  }, [params.companyID]);

  const deleteList = async (service_id) => {
    const deleted = await deleteServiceList(service_id);
    if (deleted && deleted.success) {
      console.log(`Service with ID ${service_id} was deleted successfully`);
      setList((prevList) => prevList.filter((item) => item.id !== service_id));
    } else {
      console.log(`Failed to delete service with ID ${service_id}`);
    }
  };
  return (
    <>
      <Navbar />

      <main className="mainContainerimg">
        <BigContainer>
          <h2 className="titleService">List Services</h2>
          {list.map((service) => {
            return (
              <ServiceCard
                key={service.id}
                service={service.name}
                deleteList={() => deleteList(service.id)}
              />
            );
          })}
        </BigContainer>
      </main>
    </>
  );
};
