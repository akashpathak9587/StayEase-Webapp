import axios from "axios";
export default class ApiService {
  static BASE_URL = "http://localhost:4040";
  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(loginDetails) {
    console.log(loginDetails.password);
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserProfile() {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async getUser(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-id/${userId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async getUserBookings(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-user-bookings/${userId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async addRoom(formData) {
    const response = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async getAllAvailableRooms() {
    const response = await axios.get(
      `${this.BASE_URL}/rooms/all-available-rooms`
    );
    return response.data;
  }

  static async getAllAvailableRoomsByDateAndType(
    checkInDate,
    checkOutDate,
    roomType
  ) {
    const response = await axios.get(
      `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return response.data;
  }

  static async getRoomTypes() {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`);
    return response.data;
  }

  static async getAllRooms() {
    const response = await axios.get(`${this.BASE_URL}/rooms/all`);
    return response.data;
  }

  static async getRoomById(room_id) {
    const response = await axios.get(
      `${this.BASE_URL}/rooms/room-by-id/${room_id}`
    );
    return response.data;
  }

  static async updateRoom(room_id, formData) {
    const response = await axios.put(
      `${this.BASE_URL}/rooms/update/${room_id}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async deleteRoom(room_id) {
    const response = await axios.delete(
      `${this.BASE_URL}/rooms/delete/${room_id}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async bookRoom(roomId, userId, booking) {
    const response = await axios.post(
      `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllBookings() {
    const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getBookingConfirmationCode(bookingCode) {
    const response = await axios.get(
      `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return response.data;
  }

  static async cancelBooking(bookingId) {
    const response = await axios.delete(
      `${this.BASE_URL}/bookings/delete/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );

    return response.data;
  }
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
