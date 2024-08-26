import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingConfirmationCode(
          bookingCode
        );
        console.log(response);
        setBookingDetails(response.booking);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBookingDetails();
  }, [bookingCode]);

  const achieveBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to Acheive this booking?")) {
      return;
    }
    try {
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccess("The booking was successfully achieved.");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-bookings");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <div className="find-booking-page">
      <h2>Booking Detail</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {bookingDetails && (
        <div className="booking-details">
          <h3>Booking Details</h3>
          <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
          <p>Check-in Date: {bookingDetails.checkInDate}</p>
          <p>Check-out Date: {bookingDetails.checkOutDate} </p>
          <p>Num of Adults: {bookingDetails.numOfAdults} </p>
          <p>Num of Children: {bookingDetails.numOfChildren} </p>
          <p>Guest Email : {bookingDetails.guestEmail}</p>

          <br />
          <hr />
          <br />

          <h3>Booker Details</h3>
          <p>Name : {bookingDetails.user.name}</p>
          <p>Email: {bookingDetails.user.email}</p>
          <p>Phone Number: {bookingDetails.user.phoneNumber}</p>
          <br />
          <hr />
          <br />

          <h3>Room Details</h3>
          <div>
            <p>Room Type: {bookingDetails.room.roomType}</p>
            <p>Room Price: ${bookingDetails.room.roomPrice}</p>
            <p>Room Description: {bookingDetails.room.roomDescription}</p>
            <img src={bookingDetails.room.roomPhotoUrl} />
          </div>
          <button
            className="acheive-booking"
            onClick={() => achieveBooking(bookingDetails.id)}>
            Acheive Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBookingPage;
