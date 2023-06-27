import React, { useState } from "react";
import styles from "./reservationForm.module.css";
import Button from "../button/index.jsx";
import DateTimePicker from "../datePicker/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import { format } from "date-fns";

const ReservationForm = ({
  handleSubmit,
  serviceWorkers,
  servicesList,
  newBooking,
  setNewBooking,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [service, setService] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerSurname, setWorkerSurname] = useState("");

  const handleNextStep = () => {
    if (step === 1 && selectedService === "") {
      return;
    }
    if (step === 2 && newBooking.worker === "") {
      return;
    }
    if (step === 3 && selectedDate === "") {
      return;
    }
    if (step === 4 && newBooking.description === "") {
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChangeService = (e) => {
    const service = parseInt(e.target.value);
    const serviceFilter = serviceWorkers
      .filter((elem) => elem.service_id === service)
      .map((elem) => elem.services.name);
    setService(serviceFilter);
    setSelectedService(service);
    setNewBooking({ ...newBooking, [e.target.name]: service });
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    setSelectedDate(date);
    setNewBooking({ ...newBooking, start_service: formattedDate });
  };

  const handleChange = (e) => {
    const worker = parseInt(e.target.value);
    const workerFilter = serviceWorkers
      .filter((elem) => elem.worker_id === worker)
      .find(
        (elem) => elem.workers.user.firstname && elem.workers.user.lastname
      );
    setWorkerName(workerFilter?.workers.user.firstname);
    setWorkerSurname(workerFilter?.workers.user.lastname);
    setNewBooking({
      ...newBooking,
      [e.target.name]: worker,
    });
  };

  const handleDescription = (e) => {
    setNewBooking({
      ...newBooking,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles._mainContainer}>
      <BigContainer>
        {step === 1 && (
          <div className={styles._dropdownContainer}>
            <p className={styles._firstTitle}>{step}/5</p>
            <p className={styles._secondTitle}>Book Your Service</p>
            <p>
              <strong>Which Service?</strong>
            </p>
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
                  <option key={op.id} value={op.id}>
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
              <p className={styles._firstTitle}>{step}/5</p>
              <p className={styles._secondTitle}>Book your reservation</p>
              <p>
                <strong>With who?</strong>
              </p>
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
                      .filter(
                        (elem) => elem.service_id === parseInt(selectedService)
                      )
                      .map((op) => (
                        <option key={op.id} value={op.worker_id}>
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
              <p className={styles._firstTitle}>{step}/5</p>
              <p className={styles._secondTitle}>Book Your Service</p>
              <p>
                <strong>When?</strong>
              </p>
              <p className={styles._fourthTitle}>
                Select the date and time you want to book
              </p>
              <DateTimePicker
                className={styles._dateTimePicker}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleDateChange={handleDateChange}
              />
              {selectedDate === "" && (
                <small className={styles._fail}>
                  Please select date and time
                </small>
              )}
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
        {step === 4 && (
          <>
            <div className={styles._dropdownContainer}>
              <p className={styles._firstTitle}>{step}/5</p>
              <p className={styles._secondTitle}>Book Your Service</p>
              <p>
                <strong>Any special request?</strong>
              </p>
              <p className={styles._fourthTitle}>
                If you want to ask something more...
              </p>
              <div className={styles._inputContainer}>
                <i className="fa-solid fa-pen-to-square"></i>
                <input
                  className="_boxShadow"
                  placeholder="Ask Something"
                  name="description"
                  value={newBooking.description}
                  onChange={handleDescription}
                />
              </div>
              {newBooking.description === "" && (
                <small className={styles._fail}>
                  Please add any extra requirements
                </small>
              )}
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
        {step === 5 && (
          <>
            <div className={styles._dropdownContainer}>
              <p className={styles._firstTitle}>{step}/5</p>
              <p className={styles._secondTitle}>Book Your Service</p>
              <p>
                <strong>Confirm your appointment</strong>
              </p>
              <br />
              <p>
                <strong>Service:</strong>
              </p>
              <p className={styles._fourthTitle}>
                {`${service} with ${workerName} ${workerSurname}`}
              </p>
              <p>
                <strong>Date and Time:</strong>
              </p>
              <p className={styles._fourthTitle}>
                {format(selectedDate, "MMMM d, yyyy h:mm aa")}
              </p>
              <p>
                <strong>Description:</strong>
              </p>
              <p className={styles._fourthTitle}>{newBooking.description}</p>
              <p>
                <strong> Do you want to confirm your appointment?</strong>
              </p>
              <div className={styles._buttonsWrapper}>
                <div className={styles._buttonInside}>
                  <Button
                    type="button"
                    title="Change"
                    onClick={handlePreviousStep}
                  />
                </div>
                <div className={styles._buttonInside}>
                  <Button
                    type="button"
                    title="Confirm"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </BigContainer>
    </main>
  );
};

export default ReservationForm;
