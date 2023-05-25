import React, { useContext, useEffect, useState } from "react";
import "../../pages/userDashboard/styles.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import { getInfoUser } from "../../service/user";
import { getInfoBooking } from "../../service/booking";
import { deleteBooking } from "../../service/booking";
import BigContainer from "../../components/bigContainer/index.jsx";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const { actions } = useContext(Context);
  const [deletedBooking, setDeletedBooking] = useState({});

  const fetchUser = async () => {
    const userData = await getInfoUser();
    setUser(userData);
    actions.saveUserProfileData(userData);
  };

  const getBooking = async () => {
    const bookingData = await getInfoBooking();
    setBookingList(bookingData);
  };

  const deleteReservation = async (booking_id) => {
    const deleted = await deleteBooking(booking_id);
    setDeletedBooking(deleted);
  };

  useEffect(() => {
    fetchUser();
    getBooking();
  }, [deletedBooking]);

  return (
    <div>
      <Navbar />
      <main className="main-container">
        <BigContainer>
          <h1>List of Reservations</h1>
          <div className="list-container">
            {bookingList.map((booking) => (
              <BookingCard
                key={booking.id}
                date={booking.created_at}
                service={booking.services_workers.services.name}
                deleteReservation={() => deleteReservation(booking.id)}
              />
            ))}
          </div>
        </BigContainer>
      </main>
    </div>
  );
};

export default UserDashboard;
