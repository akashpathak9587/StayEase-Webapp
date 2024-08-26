import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import HomePage from "./component/home/HomePage";
import { AdminRoute, ProtectedRoute } from "./service/guard";
import Footer from "./component/common/Footer";
import AllRoomsPage from "./component/booking_rooms/AllRoomsPage";
import FindBookingsPage from "./component/booking_rooms/FindBookingsPage";
import RoomDetailsBookingPage from "./component/booking_rooms/RoomDetailsBookingPage";
import LoginPage from "./component/auth/LoginPage";
import RegisterPage from "./component/auth/RegisterPage";
import ProfilePage from "./component/profile/ProfilePage";
import EditProfilePage from "./component/profile/EditProfilePage";
import AdminPage from "./component/admin/AdminPage";
import ManageRoomsPage from "./component/admin/ManageRoomsPage";
import ManageBookingsPage from "./component/admin/ManageBookingsPage";
import AddRoomPage from "./component/admin/AddRoomPage";
import EditRoomPage from "./component/admin/EditRoomPage";
import EditBookingPage from "./component/admin/EditBookingPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-bookings" element={<FindBookingsPage />} />

            <Route path="/room-details-book/:roomId" element={<ProtectedRoute element={<RoomDetailsBookingPage />} />} />

            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />

            <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfilePage />} />} />

            <Route path="/admin/manage-rooms" element={<AdminRoute element={<ManageRoomsPage />} />} />

            <Route path="/admin/edit-room/:roomId" element={<AdminRoute element={<EditRoomPage />} />} />

            <Route path="/admin/add-room" element={<AdminRoute element={<AddRoomPage />} />} />

            <Route path="/admin/manage-bookings" element={<AdminRoute element={<ManageBookingsPage />} />} />

            <Route path="/admin/edit-booking/:bookingCode" element={<AdminRoute element={<EditBookingPage />} />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
