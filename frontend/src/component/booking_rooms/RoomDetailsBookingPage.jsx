import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import DatePicker from "react-datepicker";

const RoomDetailsBookingPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomDetails, setRoomDetails] = useState(null);
  const [userId, setUserId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfAdults, setNumOfAdults] = useState(1);
  const [numOfChildrent, setNumOfChildrent] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message) || error.message;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    if (
      isNaN(numOfAdults) ||
      numOfAdults < 1 ||
      isNaN(numOfChildrent) ||
      numOfChildrent < 0
    ) {
      setErrorMessage("Please enter valid number of adults and children.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
    const totalGuests = numOfAdults + numOfChildrent;

    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const formattedCheckInDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numOfAdults,
        numOfChildrent: numOfChildrent,
      };

      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/rooms");
        }, 10000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };
  if (isLoading) {
    return <p className="room-detail-loading">Loading room details....</p>;
  }

  if (error) {
    return <p className="room-detail-loading">{error}</p>;
  }
  if (!roomDetails) {
    return <p className="room-detail-loading">Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } =
    roomDetails;

  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          Booking successful! Confirmation Code {confirmationCode}. An SMS and
          email of your booking details have been send to you.
        </p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>Room Details</h2>
      <br />
      <img src={roomPhotoUrl} alt={roomType} className="room-details-page" />
      <div className="room-details-info">
        <h3>{roomType}</h3>
        <p>Price : ${roomPrice} / night</p>
        <p>{description}</p>
      </div>

      {bookings && bookings.length > 0 && (
        <div>
          <h3>Existing Booking Details</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">Booking {index + 1}</span>
                <span className="booking-text">
                  Check-in: {booking.checkInDate}
                </span>
                <span className="booking-text">
                  Check-out: {booking.checkOutDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info">
        <button
          className="button-book-now"
          onClick={() => setShowDatePicker(true)}>
          Book Now
        </button>
        <button
          className="go-back-button"
          onClick={() => setShowDatePicker(false)}>
          Go Back
        </button>
        {showDatePicker && (
          <div className="date-picker-container">
            <DatePicker
              className="detail-search-field"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat={"dd/MM/yyyy"}
            />
            <DatePicker
              className="detail-search-field"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-out Date"
              dateFormat={"dd/MM/yyyy"}
            />

            <div className="guest-container">
              <div className="guest-div">
                <label>Adults:</label>
                <input
                  type="number"
                  value={numOfAdults}
                  onChange={(e) => setNumOfAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="guest-div">
                <label>Children:</label>
                <input
                  type="number"
                  value={numOfChildrent}
                  onChange={(e) => setNumOfChildrent(parseInt(e.target.value))}
                />
              </div>
              <button
                className="confirm-booking"
                onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
            <p>Total Guests: {totalGuests}</p>
            <button onClick={acceptBooking} className="accept-booking">
              Accept Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsBookingPage;
