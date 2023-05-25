import React, { useContext, useEffect, useState } from "react";
import "../../pages/userDashboard/styles.css";
import { Context } from "../../store/appContext";
import { Navbar } from "../../components/navbar/index.jsx";
import Calendar from "../../components/calendar/index.jsx";
import BookingCard from "../../components/bookingCard/index.jsx";
import { getInfoUser } from "../../service/user";
import { getInfoBooking } from "../../service/booking";
import { deleteBooking } from "../../service/booking";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
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
      <div className="services-calendar-container">
        <div className="services-container">
          <div className="profile-services">
            <div className="user-profile">
              <img src="https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI" />
              {/* <h1>{user.username}</h1> */}
            </div>
            <h2>Next Services:</h2>
          </div>
          <div className="bookings">
            <h1>List of Reservations</h1>
            {bookingList.map((booking) => (
              <BookingCard
                key={booking.id}
                date={booking.created_at}
                service={booking.services_workers.services.name}
                deleteReservation={() => deleteReservation(booking.id)}
              />
            ))}
          </div>
        </div>
        <div className="calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
