import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: "",
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails({
          roomPhotoUrl: response.room.roomPhotoUrl,
          roomType: response.room.roomType,
          roomPrice: response.room.roomPrice,
          roomDescription: response.room.roomDescription,
        });
      } catch (err) {
        setError(err.reponse?.data?.message || err.message);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleInputChange = (e) => {
    setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);
      if (file) {
        formData.append("photo", file);
      }
      const response = await ApiService.updateRoom(roomId, formData);
      if (response.statusCode === 200) {
        setSuccess("Room updated successfully!");
        setTimeout(() => {
          setSuccess("");
          navigate(`/admin/manage-rooms`);
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }
    try {
      const response = await ApiService.deleteRoom(roomId);
      if (response.statusCode === 200) {
        setSuccess("Room deleted successfully!");
        setTimeout(() => {
          setSuccess("");
          navigate(`/admin/manage-rooms`);
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  }
  return (
    <div className="edit-room-container">
      <h2>Edit Room</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="edit-room-form">
        <div className="form-group">
          {preview ? (
            <img
              src={preview}
              alt="Room Preview"
              className="room-photo-preview"
            />
          ) : (
            <img
              src={roomDetails.roomPhotoUrl}
              alt="Room Preview"
              className="room-photo-preview"
            />
          )}
          <input type="file" name="roomPhoto" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Room Type</label>
          <input
            type="text"
            name="roomType"
            value={roomDetails.roomType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Room Price</label>
          <input
            type="text"
            name="roomPrice"
            value={roomDetails.roomPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Room Description</label>
          <textarea
            type="text"
            name="roomDescription"
            value={roomDetails.roomDescription}
            onChange={handleInputChange}></textarea>
        </div>
        <button className="update-button" onClick={handleUpdate}>
          Update Room
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete Room
        </button>
      </div>
    </div>
  );
};

export default EditRoomPage;
