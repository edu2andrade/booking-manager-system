import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBooking, getBookingByCompany } from "../../service/booking";
import { getUserProfile } from "../../service/user";
import { format } from "date-fns";
import { toast } from "react-toastify";

import styles from "./workerDashboard.module.css";

import BigContainer from "../../components/bigContainer/index.jsx";
import Modal from "../../components/modal/index.jsx";
import Button from "../../components/button/index.jsx";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";
import DeleteToast from "../../components/deleteToast/index.jsx";
import Spinner from "../../components/spinner/index.jsx";

const initialState = {
  services_workers: {
    services: {
      name: "",
      created_at: "",
      service_duration: "",
      description: "",
    },
  },
};

const WorkerDashboard = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const [selectedBooking, setSelectedBooking] = useState(initialState);
  const [bookingList, setBookingList] = useState([]);
  const [bookingsByWorker, setBookingsByWorker] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    actions.saveUserProfileData(user);
  };

  const getBookings = async () => {
    setLoading(true);
    const bookings = await getBookingByCompany(companyId);
    setBookingList(bookings);
    setLoading(false);
  };

  const getBookingsByWorker = () => {
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id")
    );
    const { worker_id } = localStorageData;

    const bookingsByWorkerId = bookingList.filter(
      (booking) => booking?.services_workers?.worker_id === worker_id
    );

    setBookingsByWorker(bookingsByWorkerId);
  };

  useEffect(() => {
    fetchUser();
    getBookings();
  }, []);

  useEffect(() => {
    if (bookingList?.length > 0) {
      getBookingsByWorker();
    }
  }, [bookingList]);

  const deleteReservation = async (companyId) => {
    const resMsg = await deleteBooking(companyId);
    await getBookings();
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
  };

  return (
    <div>
      <Header
        imgProfile={userStoredInContext?.avatar}
        updateProfile={() => navigate(`/profile/${userStoredInContext?.id}`)}
        settingsTitle="Worker Settings"
        settings={<div className={styles._workerSettings}></div>}
      />
      <SubHeader
        navigate={() => navigate(`/admin-create-booking/${companyId}`)}
      />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._heading}>List of Reservations</h1>
          <div className={styles._bookingsContainer}>
            {Loading ? (
              <Spinner />
            ) : bookingsByWorker.length === 0 ? (
              <p>You have no bookings assigned yet!</p>
            ) : (
              bookingsByWorker.map((booking) => (
                <div
                  className={`${styles._bookingContainer} _boxShadow`}
                  key={booking.id}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsOpen(true);
                  }}
                >
                  <p>
                    <strong>Name: </strong>
                    {booking.services_workers.services.name}
                  </p>
                  <p>
                    <strong>Price: </strong>
                    {booking.services_workers.services.price}€
                  </p>
                  <p>
                    <strong>Start: </strong>
                    {format(
                      new Date(booking.start_service),
                      "EEE, dd MMM yyyy h:mm a"
                    )}
                  </p>
                  <p>
                    <strong>Duration: </strong>
                    {booking.services_workers.services.service_duration}minutes
                  </p>
                  <p>
                    <strong>Description: </strong>
                  </p>
                  <p>{booking.description}</p>
                </div>
              ))
            )}
          </div>
        </BigContainer>

        <Modal
          title="Booking Details"
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          selectedBooking={selectedBooking}
        >
          <div className={styles._modalContent}>
            <p>
              <strong> Service: </strong>
              {selectedBooking?.services_workers.services.name}
            </p>
            <p>
              <strong>Date and time: </strong>
              {selectedBooking?.services_workers.services.created_at}
            </p>

            <p>
              <strong> Duration: </strong>
              {selectedBooking?.services_workers.services.service_duration}{" "}
              hours
            </p>
            <p>
              <strong>Description: </strong>
              {selectedBooking?.services_workers.services.description}
            </p>
            <div className={styles._modalFooter}>
              <p>
                <strong>Do you want to delete your appointment??</strong>
              </p>
              <div className={styles._btnWrapper}>
                <Button
                  title="Delete"
                  onClick={() =>
                    toast.error(
                      <DeleteToast
                        msg="Delete this booking?"
                        action={() => deleteReservation(selectedBooking?.id)}
                      />,
                      { autoClose: false }
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};
export default WorkerDashboard;
