import React from "react";
import { Navbar } from "../../components/navbar/index.jsx";
import "./styles.css";

export const ListService = () => {
  return (
    <>
      <Navbar />
      <main className="mainContainerimg">
        <div className="parenttwo">
          <div className="childtwo">
            <div className="form-div">
              <h2 className="titleService">List Services</h2>

              <div className="list-service mt-5">
                <div className="text-list-service">
                  <p className="text-servic">Corte de pelo "Macho Man”</p>
                </div>
                <button className="btn-list-service me-4">Edit</button>
                <button className="btn-list-service">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
