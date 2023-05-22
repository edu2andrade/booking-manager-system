import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/index.jsx";
import Input from "../../components/input/index.jsx";
import "./styles.css";
import { createService } from "../../service/user.js";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

export const CreateService = () => {
  const [newService, setNewService] = useState(initialState);
  // console.log(newService, "new");
  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(companyID, newService);
  };
  handleSubmit();

  return (
    <>
      <Navbar />
      <main className="mainContainerimg">
        <div className="parenttwo">
          <div className="childtwo">
            <div className="form-div">
              <h2 className="titleService">Create new service</h2>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Input
                  icon={<i className="fa-solid fa-circle-user"></i>}
                  type="text"
                  placeholder="Name"
                  name="name"
                />
                <Input
                  icon={<i className="fa-solid fa-pen-to-square"></i>}
                  type="text"
                  placeholder="Description"
                  name="description"
                />
                <Input
                  icon={<i className="fa-regular fa-clock"></i>}
                  type="text"
                  placeholder="Service duration"
                  name="serviceduration"
                />
                <Input
                  icon={<i className="fa-solid fa-coins"></i>}
                  type="text"
                  placeholder="Price"
                  name="price"
                />
                <button type="button" className="loginBtn boxShadow">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
