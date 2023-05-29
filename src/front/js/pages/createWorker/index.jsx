import React from "react";

import Navbar from "../../components/navbar/index.jsx";
import { useNavigate } from "react-router-dom";
import WorkerForm from "../../components/workerForm/index.jsx";

export const CreateWorker = () => {
  return (
    <>
      <Navbar />
      <WorkerForm />
    </>
  );
};
