import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Input from "../input/index.jsx";
import styles from "./companyForm.module.css";
import Button from "../button/index.jsx";
import TimeSelector from "../../components/timeSelector/index.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "../../validations/companyValidation.js";
import { format } from "date-fns";

const CompanyForm = ({ textBtn }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  const onSubmit = (data) => {
    actions.saveCompanyData(data);
    navigate("/company-register-2");
  };

  return (
    <form className={styles._form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Name"
        label="name"
        name="name"
        register={register}
      />
      {errors?.name && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i>{" "}
          {errors.name?.message}
        </small>
      )}
      <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="CIF"
        label="cif"
        name="cif"
        register={register}
      />
      {errors?.cif && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i>{" "}
          {errors.cif?.message}
        </small>
      )}
      <Input
        icon={<i className="fa-solid fa-pen-to-square"></i>}
        type="text"
        placeholder="Description"
        label="description"
        name="description"
        register={register}
      />
      {errors?.description && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i>{" "}
          {errors.description?.message}
        </small>
      )}
      <Input
        icon={<i className="fa-solid fa-location-dot"></i>}
        type="text"
        placeholder="Address"
        label="address"
        name="address"
        register={register}
      />
      {errors?.address && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i>{" "}
          {errors.address?.message}
        </small>
      )}
      <div>
        <div className={styles._inputContainer}>
          <i className="fa-solid fa-business-time"></i>
        </div>
        <TimeSelector
          label="opening_time"
          name="opening_time"
          register={register}
          placeholder="Select Opening Time"
        />
      </div>
      <div>
        <div className={styles._inputContainer}>
          <i className="fa-solid fa-business-time"></i>
        </div>
        <TimeSelector
          label="closing_time"
          name="closing_time"
          register={register}
          placeholder="Select Closing Time"
        />
      </div>
      <Button type="submit" title={textBtn} />
    </form>
  );
};

export default CompanyForm;
