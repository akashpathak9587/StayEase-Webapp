import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AddRoomPage = () => {
  const navigate = useNavigate();
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
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (err) {
        console.error("Error fetching room types:", err.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    if (e.target.value === "new") {
      setNewRoomType(true);
      setRoomDetails({ ...roomDetails, roomType: "" });
    } else {
      setNewRoomType(false);
      setRoomDetails({ ...roomDetails, roomType: e.target.value });
    }
  };
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

  const addRoom = async () => {
    if (
      !roomDetails.roomType ||
      !roomDetails.roomPrice ||
      !roomDetails.roomDescription
    ) {
      setError("All room details must be provided");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);
      if (file) {
        formData.append("photo", file);
      }

      const response = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess("Room added successfully");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <div className="edit-room-container">
      <h2>Add New Room</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="edit-room-form">
        <div className="form-group">
          {preview && (
            <img
              src={preview}
              alt="Room Preview"
              className="room-photo-preview"
            />
          )}
          <input type="file" name="roomPhoto" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Room Type</label>
          <select value={roomDetails.roomType} onChange={handleRoomTypeChange}>
            <option value="">Select a room type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="new">Other (please specify)</option>
          </select>
          {newRoomType && (
            <input
              type="text"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleInputChange}
            />
          )}
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
        <button className="update-button" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoomPage;
