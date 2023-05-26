import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { getCompanyById } from "../../service/company";
import Logotipo from "../../components/logotipo/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Avatar from "../../components/avatar/index.jsx";

const CompanyDetails = () => {
  const [company, setCompany] = useState({});

  const { companyId } = useParams();

  const getCompany = async (companyId) => {
    const data = await getCompanyById(companyId);
    setCompany(data);
  };

  useEffect(() => {
    getCompany(companyId);
  }, []);

  console.log("Data coming from local state ---->", company);

  return (
    <div className="main-container">
      <Logotipo className="logo" />
      <BigContainer>
        <h1>{company.name}</h1>
        <article className="content-container">
          <div className="services-container">
            <span className="service-title">Services:</span>
            <div>
              {company.services?.map((service) => (
                <p key={service.id}>{service.name}</p>
              ))}
            </div>
          </div>
          <div className="info-container">
            <div className="row">
              <span>Name:</span>
              <p>{company.name}</p>
            </div>
            <div className="row">
              <span>CIF:</span>
              <p>{company.cif}</p>
            </div>
            <div className="row">
              <span>Description:</span>
              <p>{company.description}</p>
            </div>
            <div className="row">
              <span>Address:</span>
              <p>{company.address}</p>
            </div>
            <div className="row">
              <span>Opening:</span>
              <p>{company.working_schedule}</p>
            </div>
            <div className="workers">
              <span>Workers:</span>
              <div className="workers-images-container">
                {company.workers?.map((worker) => (
                  <Link key={worker.id} to="/">
                    <div className="worker-img">
                      <Avatar />
                      <p>{worker.user?.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </BigContainer>
    </div>
  );
};

export default CompanyDetails;
