import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingByCompany } from "../../service/booking";
import { getUserProfile } from "../../service/user";

import styles from "./workerDashboard.module.css";

import BookingCard from "../../components/bookingCard/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Modal from "../../components/modal/index.jsx";
import Button from "../../components/button/index.jsx";
import DeleteToast from "../../components/deleteToast/index.jsx";
import Spinner from "../../components/spinner/index.jsx";
import Header from "../../components/header/index.jsx";
import SubHeader from "../../components/subHeader/index.jsx";

const WorkerDashboard = () => {
  const { store, actions } = useContext(Context);
  const userStoredInContext = store.userProfileData.userData;

  const [bookingList, setBookingList] = useState([]);
  const [bookingsByWorker, setBookingsByWorker] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { companyId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserProfile();
    console.log(user);
    actions.saveUserProfileData(user);
  };

  const getBookings = async () => {
    const bookings = await getBookingByCompany(companyId);
    setBookingList(bookings);
  };

  console.log("bookings list", bookingList);

  const data = localStorage.getItem("token/role/company_id");
  const data_json = JSON.parse(data);
  console.log(data_json.worker_id);

  const getBookingsByWorker = () => {
    const bookingsByWorkerId = bookingList.filter(
      (bookings) => bookings?.services_workers.worker_id === data_json.worker_id
    );
    console.log("bookings by worker ID", bookingsByWorkerId);
    setBookingsByWorker(bookingsByWorkerId);
  };

  useEffect(() => {
    fetchUser();
    getBookings();
    getBookingsByWorker();
  }, []);

  console.log("bookings by worker", bookingsByWorker);

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
          <h1 className={styles._title}>List of Reservations</h1>
          {Loading ? (
            <Spinner />
          ) : bookingsByWorker.length === 0 ? (
            <p>You have no bookings assigned yet!</p>
          ) : (
            <div className={styles._listContainer}>
              {bookingsByWorker.map((booking) => {
                return (
                  <BookingCard
                    // key={booking.id}
                    date={format(
                      // new Date(booking.start_service),
                      "MMM do yyyy 'at' hh:mm"
                    )}
                    // service={booking.services_workers.services.name}
                    // worker={booking.services_workers.workers.user.username}
                    setIsOpen={() => {
                      setSelectedBooking(booking);
                      setIsOpen(true);
                    }}
                    handleDelete={() =>
                      toast.error(
                        <DeleteToast
                          msg="Delete this booking?"
                          action={() => deleteReservation(booking.id)}
                        />,
                        { autoClose: false }
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </BigContainer>
        {/* <Modal
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
                <strong>Do you want to change your appointment??</strong>
              </p>
              <div className={styles._btnWrapper}>
                <Button
                  title="Update"
                  onClick={() =>
                    navigate(`/update-booking/${selectedBooking?.id}`)
                  }
                />
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
        </Modal> */}
      </main>
    </div>
  );
};
export default WorkerDashboard;
