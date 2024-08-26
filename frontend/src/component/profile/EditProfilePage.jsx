import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setUser(response.user);
      } catch (err) {
        setError(error.response?.data?.message || err.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
      try {
          console.log(user.id);
      await ApiService.deleteUser(user.id);
      navigate("/register");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user && (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number: </strong> {user.phoneNumber}
          </p>
          <button
            className="delete-profile-button"
            onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
