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
  const totalPassengers = adults + children ;

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
      <div className="row">
        <div className="col-lg-12">
          <div className="tour_search_form">
            <form onSubmit={searchTab}>
              <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                  <div className="flight_Search_boxed">
                    <p>Place</p>
                    <input
                      type="text"
                      placeholder="Where do you want to stay?"
                    />
                    <span>Where do you want to stay?</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="form_search_date">
                    <div className="flight_Search_boxed date_flex_area">
                      <div className="Journey_date">
                        <p>Check-in</p>
                        <input
                          type="date"
                          value={journeyDate}
                          onChange={handleDateChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <span>
                          {journeyDate &&
                            new Date(journeyDate).toLocaleDateString("en-US", {
                              weekday: "long",
                            })}
                        </span>
                      </div>
                      <div className="Journey_date">
                        <p>Check-out</p>
                        <input
                          type="date"
                          value={journeyDate}
                          onChange={handleDateChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        <span>
                          {journeyDate &&
                            new Date(journeyDate).toLocaleDateString("en-US", {
                              weekday: "long",
                            })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="flight_Search_boxed dropdown_passenger_area">
                    <p>Guests and rooms </p>
                    <div className="dropdown">
                      <button
                        className="dropdown-toggle final-count"
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {totalPassengers} Guests
                        {totalPassengers !== 1 ? "s" : ""}
                      </button>

                      {showDropdown && (
                        <div
                          className="dropdown-menu dropdown_passenger_info show"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="traveller-calulate-persons">
                            <div className="passengers">
                              <h6>Guests</h6>
                              {error && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "14px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {error}
                                </div>
                              )}

                              {/* Adult */}
                              <div className="passengers-types">
                                <div className="passengers-type">
                                  <div className="text">
                                    <div className="type-label">
                                      <p>Adult</p>
                                      <span>12+ yrs</span>
                                    </div>
                                  </div>
                                  <div className="button-set">
                                    <button
                                      type="button"
                                      className="btn-subtract"
                                      onClick={() => handleDecrement("adult")}
                                    >
                                      <FaMinus />
                                    </button>
                                    <span className="count pcount">
                                      {adults}
                                    </span>
                                    <button
                                      type="button"
                                      className="btn-add"
                                      onClick={() => handleIncrement("adult")}
                                    >
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
                                      <p className="fz14 mb-xs-0">Children</p>
                                      <span>2 - Less than 12 yrs</span>
                                    </div>
                                  </div>
                                  <div className="button-set">
                                    <button
                                      type="button"
                                      className="btn-subtract-in"
                                      onClick={() => handleDecrement("child")}
                                    >
                                      <FaMinus />
                                    </button>
                                    <span className="count pcount">
                                      {children}
                                    </span>
                                    <button
                                      type="button"
                                      className="btn-add-in"
                                      onClick={() => handleIncrement("child")}
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Child Age Selects */}
                              {Array.from({
                                length: children,
                              }).map((_, index) => (
                                <div key={index} className="mb-2 mt-2">
                                  <select
                                    className="form-control"
                                    value={childAges[index] || ""}
                                    onChange={(e) =>
                                      handleChildAgeChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select Age</option>
                                    {Array.from(
                                      { length: 11 },
                                      (_, i) => i + 2
                                    ).map((age) => (
                                      <option key={age} value={age}>
                                        {age}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ))}

                              {/* Infant */}
                              <div className="passengers-types">
                                <div className="passengers-type">
                                  <div className="text">
                                    <div className="type-label">
                                      <p className="fz14 mb-xs-0">rooms</p>
                                      <span>Less than 2 yrs</span>
                                    </div>
                                  </div>
                                  <div className="button-set">
                                    <button
                                      type="button"
                                      className="btn-subtract-in"
                                      onClick={() => handleDecrement("rooms")}
                                    >
                                      <FaMinus />
                                    </button>
                                    <span className="count incount">
                                      {rooms}
                                    </span>
                                    <button
                                      type="button"
                                      className="btn-add-in"
                                      onClick={() => handleIncrement("infant")}
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="cabin-selection mt-0">
                              <button
                                className="btn commonBtn"
                                onClick={handleDone}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <span>{`${adults} Adults` }</span>
                  </div>
                </div>
                <div className="top_form_search_button">
                  <button className="btn btn_theme btn_md">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelForm;
