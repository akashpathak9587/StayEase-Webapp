import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const FindBookingsPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await ApiService.getBookingConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <div className="find-bookings-page">
      <h2>Find Booking</h2>
      <div className="search-container">
        <input
          type="text"
          value={confirmationCode}
          placeholder="Enter your booking confirmation code"
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
        />
        <button onClick={handleSearch}>Find</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookingDetails && (
        <div className="booking-details">
          <h3>Booking Details</h3>
          <p>Confirmation Code : {bookingDetails.bookingConfirmationCode}</p>
          <p>Check-in Date : {bookingDetails.checkInDate}</p>
          <p>Check-out Date : {bookingDetails.checkOutDate}</p>
          <p>Num of Adults : {bookingDetails.numOfAdults}</p>
          <p>Num of Children : {bookingDetails.numOfChildren}</p>
          <br />
          <hr />
          <br />
          <h3>Booker Details</h3>
          <div>
            <p>Name: {bookingDetails.user.name}</p>
            <p>Email: {bookingDetails.user.email}</p>
            <p>Phone: {bookingDetails.user.phoneNumber}</p>
          </div>

          <br />
          <hr />
          <br />
          <h3>Room Details</h3>
          <div>
            <p>Room Type: {bookingDetails.room.roomType}</p>
            <img src={bookingDetails.room.roomPhotoUrl} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingsPage;
