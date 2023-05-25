import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/index.jsx";
import "./styles.css";
import {
  deleteServiceList,
  listServiceByCompany,
} from "../../service/service.js";
import { useParams } from "react-router-dom";

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

  const handleDelete = async (companyID) => {
    const deleteList = await deleteServiceList(params.companyID);
    if (deleteList && deleteList.success) {
      console.log(
        `Service with ID ${params.companyID} was deleted successfully`
      );
      setList((prevList) => prevList.filter((item) => item.id !== companyID));
    } else {
      console.log(`Failed to delete service with ID ${params.companyID}`);
    }
  };
  // const handleDelete = async () => {
  //   const deleteList = await deleteServiceList(params.companyID);
  //   setList(deleteList)
  // };

  return (
    <>
      <Navbar />
      <main className="mainContainerimg">
        <div className="parenttwo">
          <div className="childtwo">
            <div className="form-div">
              <h2 className="titleService">List Services</h2>
              <div className="scroll-container">
                {list.map((todo, index) => {
                  return (
                    <div className="list-service " key={index}>
                      <div className="text-list-service">
                        <p className="text-servic">{todo.name}</p>
                      </div>
                      <button className="btn-list-service me-4">Edit</button>
                      <button
                        className="btn-list-service"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
