import React, { useState } from "react";
import RoomSearch from "../common/RoomSearch";
import RoomResult from "../common/RoomResult";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);
    const handleSearchResults = (results) => {
      setRoomSearchResults(results);
    }
  return (
    <div className="home">
      <section>
        <header className="header-banner">
          <img
            src="./assets/images/hotel.webp"
            alt="Stay Ease Hotel"
            className="header-image"
          />
          <div className="overlay"></div>
          <div className="animated-texts overlay-content">
            <h1>
              Welcome to <span className="phegon-color">StayEase Hotel</span>
            </h1>
            <br />
            <h3>Step into a heavel of comfort and care</h3>
          </div>
        </header>
      </section>

      <RoomSearch handleSearchResults={handleSearchResults} />
      <RoomResult roomSearchResults={roomSearchResults}  />

      <h4>
        <a className="view-rooms-home" href="/rooms">
          All Rooms
        </a>
      </h4>

      <h2 className="home-services">
        Services at <span className="phegon-color">StayEase Hotel</span>
      </h2>
      <section className="services-section">
        <div className="service-card">
          <img src="./assets/images/ac.png" alt="Air Condtioning" />
          <div className="service-details">
            <h3 className="service-details">Air Conditioning</h3>
            <p className="service-description">
              Stay cool and comfortable throughout your stay with our
              individually controlled in-room air conditioning.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="./assets/images/min-bar.png" alt="Mini Bar" />
          <div className="service-details">
            <h3 className="service-details">Mini Bar</h3>
            <p className="service-description">
              Enjoy a convenient selection of beverages and snacks stocked in
              your room's mini bar with no additional cost.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="./assets/images/parking.png" alt="Parking" />
          <div className="service-details">
            <h3 className="service-details">Parking</h3>
            <p className="service-description">
              We offer on-site parking for your convenience . Please inquire
              about valet parking options if available.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="./assets/images/wifi.png" alt="WiFi" />
          <div className="service-details">
            <h3 className="service-details">WiFi</h3>
            <p className="service-description">
              Stay connected throughout your stay with complimentary high-speed
              Wi-Fi access available in all guest rooms and public areas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;