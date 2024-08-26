import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar = () => {
  const isUser = ApiService.isUser();
  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to log out?");
    if (isLogout) {
      ApiService.logout();
      navigate("/home");
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to={"/home"}>StayEase Hotel</NavLink>
      </div>
      <div className="navbar-ul">
        <li>
          <NavLink to={"/home"} activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/rooms"} activeclassname="active">
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to={"/find-bookings"} activeclassname="active">
            Find my Booking
          </NavLink>
        </li>
        {isUser && (
          <li>
            <NavLink to={"/profile"} activeclassname="active">
              Profile
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink to={"/admin"} activeclassname="active">
              Admin
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <NavLink to={"/login"} activeclassname="active">
              Login
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <NavLink to={"/register"} activeclassname="active">
              Register
            </NavLink>
          </li>
        )}
        {isAuthenticated && <li onClick={handleLogout} style={{cursor: "pointer", color:"blue"}}>Logout</li>}
      </div>
    </nav>
  );
};

export default Navbar;
