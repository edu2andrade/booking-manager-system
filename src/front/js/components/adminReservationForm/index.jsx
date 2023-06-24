import React, { useState } from "react";
import styles from "./adminReservationForm.module.css";
import Button from "../button/index.jsx";
import InputBooking from "../inputBooking/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import { format } from "date-fns";

const AdminReservationForm = ({
  handleSubmit,
  serviceWorkers,
  servicesList,
  newBooking,
  setNewBooking,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");

  const handleNextStep = () => {
    if (step === 1 && selectedService === "") {
      return;
    }
    if (step === 2 && newBooking.worker === "") {
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChangeService = (e) => {
    if (e.target.name === "service") {
      setSelectedService(e.target.value);
      setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    }
  };

  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles._mainContainer}>
      <BigContainer>
        {step === 1 && (
          <div className={styles._dropdownContainer}>
            <p className={styles._firstTitle}>{step}/4</p>
            <p className={styles._secondTitle}>Book Your Service</p>
            <p className={styles._thirdTitle}>Which Service?</p>
            <p className={styles._fourthTitle}>
              Select the service you want to book
            </p>
            <div className={styles._inputContainer}>
              <i className="fa-solid fa-circle-user"></i>
              <select
                name="service"
                className={`${styles._select} _boxShadow`}
                onChange={handleChangeService}
              >
                <option value="Services">Services</option>
                {servicesList.map((op) => (
                  <option key={op.id} value={op.name}>
                    {op.name}
                  </option>
                ))}
              </select>
              {newBooking.service === "" && (
                <small className={styles._fail}>Please select a service</small>
              )}
            </div>
            <div className={styles._buttonNext}>
              <Button type="button" title="Next" onClick={handleNextStep} />
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className={styles._dropdownContainer}>
              <p className={styles._firstTitle}>{step}/4</p>
              <p className={styles._secondTitle}>Book your reservation</p>
              <p className={styles._thirdTitle}>With who?</p>
              <p className={styles._fourthTitle}>
                Select worker you want to make an appointment with
              </p>
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-circle-user"></i>
                {serviceWorkers && selectedService ? (
                  <select
                    className={`${styles._select} _boxShadow`}
                    name="worker"
                    onChange={handleChange}
                  >
                    <option value="Workers">Workers</option>
                    {serviceWorkers
                      .filter((elem) => elem.services.name === selectedService)
                      .map((op) => (
                        <option key={op.id}>
                          {op.workers.user.firstname && op.workers.user.lastname
                            ? `${op.workers.user.firstname} ${op.workers.user.lastname}`
                            : ""}
                        </option>
                      ))}
                  </select>
                ) : (
                  <select
                    className={`${styles._select} _boxShadow`}
                    name="worker"
                    onChange={handleChange}
                  >
                    <option value="Workers">Workers</option>
                  </select>
                )}
                {newBooking.worker === "" && (
                  <small className={styles._fail}>Please select a worker</small>
                )}
              </div>
              <div className={styles._buttonsWrapper}>
                <div className={styles._buttonInside}>
                  <Button
                    type="button"
                    title="Previous"
                    onClick={handlePreviousStep}
                  />
                </div>
                <div className={styles._buttonInside}>
                  <Button type="button" title="Next" onClick={handleNextStep} />
                </div>
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className={styles._dropdownContainer}>
              <p className={styles._firstTitle}>{step}/4</p>
              <p className={styles._secondTitle}>Book Your Service</p>
              <p className={styles._thirdTitle}>When?</p>
              <p className={styles._fourthTitle}>
                Select the date and time you want to book
              </p>
              <div className={styles._inputContainer}>
                <InputBooking
                  icon={<i className="fa-solid fa-calendar-days"></i>}
                />
              </div>
              <div className={styles._buttonsWrapper}>
                <div className={styles._buttonInside}>
                  <Button
                    type="button"
                    title="Previous"
                    onClick={handlePreviousStep}
                  />
                </div>
                <div className={styles._buttonInside}>
                  <Button type="button" title="Next" onClick={handleNextStep} />
                </div>
              </div>
            </div>
          </>
        )}
      </BigContainer>
    </main>
  );
};

export default AdminReservationForm;
