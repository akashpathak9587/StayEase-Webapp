import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBooking = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBooking.user);
            } catch (err) {
                setError(error.response?.data?.message || err.message);
            }
        }
        fetchUserProfile();
    }, [])
    const handleEditProfile = () => {
        navigate('/edit-profile');
    }

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    }

    return (
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Phone Number: </strong> {user.phoneNumber}</p>
                </div>
            )}

            <div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div className="booking-item" key={booking.id}>
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                                <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                                <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                                <p><strong>Room Type:</strong> {booking.room.roomType}</p>
                                <img src={booking.room.roomPhotoUrl} alt="room" className='room-photo' />
                            </div>
                        ))
                    ) : (
                            <p>No bookings found.</p>
                    )}
                </div>
            </div>
      </div>
  )
}

export default ProfilePage