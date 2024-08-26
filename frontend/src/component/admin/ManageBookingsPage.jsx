import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

const ManageBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await ApiService.getAllBookings();
        setBookings(response.bookingList);
        setFilteredBookings(response.bookingList);
      } catch (err) {
        console.error("Error fetching bookings: " + err.message);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings(searchTerm);
  }, [searchTerm, bookings]);

  const filterBookings = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.bookingConfirmationCode
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
    setCurrentPage(1);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bookings-container">
      <h2>All Bookings</h2>
      <div className="search-div">
        <label>Filter by Booking Number:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter booking number"
        />
      </div>

      <div className="booking-results">
        {currentBookings.map((booking) => (
          <div className="booking-result-item" key={booking.id}>
            <p>
              <strong>Booking Code: </strong> {booking.bookingConfirmationCode}
            </p>
            <p>
              <strong>Check In Date:</strong>
              {booking.checkInDate}
            </p>
            <p>
              <strong>Check Out Date:</strong>
              {booking.checkOutDate}
            </p>
            <p>
              <strong>Total Guests:</strong>
              {booking.totalNumOfGuest}
            </p>
            <button
              className="edit-room-button"
              onClick={() =>
                navigate(
                  `/admin/edit-booking/${booking.bookingConfirmationCode}`
                )
              }>
              Manage Booking
            </button>
          </div>
        ))}
      </div>

      <Pagination
        bookingsPerPage={bookingsPerPage}
        totalBookings={filteredBookings.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ManageBookingsPage;
