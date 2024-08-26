import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import RoomResult from "../common/RoomResult";
import Pagination from "../common/Pagination";

const ManageRoomsPage = () => {
  const navigate = useNavigate();
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredRoom, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        setRooms(response.roomList);
        setFilteredRooms(response.roomList);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error("Error fetching room types:", error.message);
      }
    };
    fetchRooms();
    fetchRoomTypes();
  }, []);
  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRooms = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRoom.slice(indexOfFirstRooms, indexOfLastRoom);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
    
  return (
    <div className="all-rooms">
      <h2>All Rooms</h2>
      <div
        className="all-room-filter-div"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <div className="filter-select-div">
          <label>Filter by Room Type:</label>
          <select value={selectedRoomType} onChange={handleRoomTypeChange}>
            <option value="">All</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            className="add-room-button"
            onClick={() => navigate("/admin/add-room")}>
            Add Room
          </button>
        </div>
      </div>
      <RoomResult roomSearchResults={currentRooms} />

      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRoom.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ManageRoomsPage;
