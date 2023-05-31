import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./userDashboard.module.css";
import Navbar from "../../components/navbar/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import { getBookingByUser } from "../../service/booking";
import { deleteBooking } from "../../service/booking";
import BigContainer from "../../components/bigContainer/index.jsx";
import ModalBooking from "../../components/modalBooking/index.jsx";
import Button from "../../components/button/index.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteToastBooking from "../../components/deleteToastBooking/index.jsx";

const UserDashboard = () => {
  const [bookingList, setBookingList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});

  const navigate = useNavigate();

  const getBooking = async () => {
    const bookingData = await getBookingByUser();
    setBookingList(bookingData);
  };
  useEffect(() => {
    getBooking();
  }, []);

  const deleteReservation = async (bookingID) => {
    const resMsg = await deleteBooking(bookingID);
    await getBooking();
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
  };

  return (
    <div>
      <Navbar />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._title}>List of Reservations</h1>
          <div className={styles._listContainer}>
            {bookingList.map((booking) => {
              return (
                <BookingCard
                  key={booking.id}
                  date={format(
                    new Date(booking.start_service),
                    "MMM do yyyy 'at' hh:mm"
                  )}
                  service={booking.services_workers.services.name}
                  worker={booking.services_workers.workers.user.username}
                  setIsOpen={() => {
                    setSelectedBooking(booking);
                    setIsOpen(true);
                  }}
                  handleDelete={() =>
                    toast.error(
                      <DeleteToastBooking
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
        </BigContainer>
        <ModalBooking
          title="Booking Details"
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          selectedBooking={selectedBooking}
        >
          <div className={styles._modalContent}>
            <p>
              <strong> Company ID: </strong>
              {selectedBooking?.company_id}
            </p>
            <p>
              <strong>Worker Service: </strong>
              {selectedBooking?.service_workers_id}
            </p>

            <p>
              <strong> reservation identifier : </strong>
              {selectedBooking?.id}
            </p>

            <p>
              <strong>Duration: </strong>
              {selectedBooking?.start_service} min
            </p>
            <p>
              <strong>Description: </strong>
              {selectedBooking?.description} min
            </p>

            <div className={styles._modalFooter}>
              <p>
                <strong>Do you want to update or delete this booking?</strong>
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
                      <DeleteToastBooking
                        msg="Delete this booking"
                        action={() => deleteReservation(selectedBooking?.id)}
                      />,
                      { autoClose: false }
                    )
                  }
                />
              </div>
            </div>
          </div>
        </ModalBooking>
      </main>
    </div>
  );
};

export default UserDashboard;
