import React from "react";
import { FaHotel, FaHelicopter } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HotelForm = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [journeyDate, setJourneyDate] = useState("");

  const navigate = useNavigate();

  const searchTab = () => {
    navigate("/searchHotel")
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setJourneyDate(today);
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };

  // Passengers Calender Data Code
  const totalPassengers = adults + children;

  const handleIncrement = (type) => {
    if (totalPassengers >= 15) {
      setError("Maximum of 15 total Guests allowed.");
      return;
    }
    setError("");
    if (type === "adult" && adults < 10) setAdults(adults + 1);
    if (type === "child" && children < 5) {
      setChildren(children + 1);
      setChildAges([...childAges, ""]);
    }
    if (type === "rooms" && rooms < 10) setRooms(rooms + 1);
  };

  const handleDecrement = (type) => {
    setError("");
    if (type === "adult" && adults > 1) setAdults(adults - 1);
    if (type === "child" && children > 0) {
      setChildren(children - 1);
      setChildAges(childAges.slice(0, -1));
    }
    if (type === "rooms" && rooms > 0) setRooms(rooms - 1);
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const handleDone = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="">
            <h6>Book Hotel - Villas, Apartments & more.</h6>
          </div>
        </div>
      </div>
      <div className="tour_search_form">
        <form onSubmit={searchTab}>
          <div className="row mb-2 align-items-center">
            <div className="col-md-10">
              <div className="oneway_search_form">
                <div className="d-flex">
                  <div className="flight_Search_boxed">
                    <span>Place</span>
                    <div className="">
                      <input type="text" placeholder="Where do you want to stay?" />
                    </div>
                    <span>Where do you want to stay?</span>
                  </div>
                  <div className="flight_Search_boxed date_flex_area">
                    <div className="Journey_date">
                      <span>Check-in</span>
                      <div className="">
                        <input type="date" value={journeyDate} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <span>
                        {journeyDate &&
                          new Date(journeyDate).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                      </span>
                    </div>
                    <div className="Journey_date">
                      <span>Check-out</span>
                      <div className="">
                        <input type="date" value={journeyDate} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <span>
                        {journeyDate &&
                          new Date(journeyDate).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                      </span>
                    </div>
                  </div>
                  <div className="flight_Search_boxed dropdown_passenger_area">
                    <div className="">
                      <span>Guests and rooms</span>
                    </div>
                    <div className="dropdown">
                      <button className="dropdown-toggle final-count" type="button" onClick={() => setShowDropdown(!showDropdown)}>
                        {totalPassengers} Guests
                        {totalPassengers !== 1 ? "s" : ""}
                      </button>
                      {showDropdown && (
                        <div className="dropdown-menu dropdown_passenger_info show" onClick={(e) => e.stopPropagation()}>
                          <div className="dropdown-header hdr-drop">
                            <h6>Select Travelers & Class</h6>
                          </div>
                          <div className="card travel-card">
                            <div className="card-body">
                              <div className="traveller-calulate-persons">
                                <h6>Travelers</h6>
                                <div className="passengers">
                                  {/* Adult */}
                                  <div className="passengers-types">
                                    <div className="passengers-type">
                                      <div className="text">
                                        <div className="type-label">
                                          <p>Adult <span>(12+ yrs)</span></p>
                                        </div>
                                      </div>
                                      <div className="button-set">
                                        <button type="button" className="btn-subtract" onClick={() => handleDecrement("adult")}>
                                          <FaMinus />
                                        </button>
                                        <span className="count pcount">{adults}</span>
                                        <button type="button" className="btn-add" onClick={() => handleIncrement("adult")}>
                                          <FaPlus />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Children */}
                                  <div className="passengers-types">
                                    <div className="passengers-type">
                                      <div className="text">
                                        <div className="type-label">
                                          <p>Children <span>(2-12 yrs)</span></p>
                                        </div>
                                      </div>
                                      <div className="button-set">
                                        <button type="button" className="btn-subtract-in" onClick={() => handleDecrement("child")}>
                                          <FaMinus />
                                        </button>
                                        <span className="count pcount">{children}</span>
                                        <button type="button" className="btn-add-in" onClick={() => handleIncrement("child")}>
                                          <FaPlus />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Infant */}
                                  <div className="passengers-types">
                                    <div className="passengers-type">
                                      <div className="text">
                                        <div className="type-label">
                                          <p>Infant <span>(0-12 yrs)</span></p>
                                        </div>
                                      </div>
                                      <div className="button-set">
                                        <button type="button" className="btn-subtract-in" onClick={() => handleDecrement("rooms")}>
                                          <FaMinus />
                                        </button>
                                        <span className="count incount">{rooms}</span>
                                        <button type="button" className="btn-add-in" onClick={() => handleIncrement("rooms")}>
                                          <FaPlus />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <span>{`${adults} Adults`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="top_form_search_button">
                <button
                  type="submit"
                  onClick={searchTab}
                  className="btn btn_theme btn_md"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
};
export default HotelForm;