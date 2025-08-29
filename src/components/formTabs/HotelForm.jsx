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
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childAges: [] },
  ]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyDate2, setJourneyDate2] = useState("");

  const navigate = useNavigate();

  const searchTab = () => {
    navigate("/searchHotel");
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setJourneyDate(today);
    setJourneyDate2(today)
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };
  
  const handleDateChange2 = (e) => {
    setJourneyDate2(e.target.value);
  };

  // Passengers Calender Data Code
  const totalGuests = rooms.reduce((sum, r) => sum + r.adults + r.children, 0);

  // ➕ Add new room
  const addRoom = () => {
    if (rooms.length >= 8) return;
    setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
  };

  // ❌ Remove room
  const removeRoom = (index) => {
    if (rooms.length === 1) return;
    setRooms(rooms.filter((_, i) => i !== index));
  };

  // Increment
  const handleIncrement = (index, type) => {
    if(children <= 3){
      setError("Child Age must be 3 years");
      return;
    }
    const updatedRooms = [...rooms];
    if (type === "adult" && updatedRooms[index].adults < 8) {
      updatedRooms[index].adults++;
    }
    if (type === "child" && updatedRooms[index].children < 3) {
      updatedRooms[index].children++;
      updatedRooms[index].childAges.push("");
    }
    setRooms(updatedRooms);
  };

  // Decrement
  const handleDecrement = (index, type) => {
     setError("");
    const updatedRooms = [...rooms];
    if (type === "adult" && updatedRooms[index].adults > 1) {
      updatedRooms[index].adults--;
    }
    if (type === "child" && updatedRooms[index].children > 0) {
      updatedRooms[index].children--;
      updatedRooms[index].childAges.pop();
    }
    setRooms(updatedRooms);
  };

  // Handle child age dropdown change
  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childAges[childIndex] = age;
    setRooms(updatedRooms);
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
                      <input
                        type="text"
                        placeholder="Where do you want to stay?"
                      />
                    </div>
                    <span>Where do you want to stay?</span>
                  </div>
                  <div className="flight_Search_boxed date_flex_area">
                    <div className="Journey_date">
                      <span>Check-in</span>
                      <div className="">
                        <input
                          type="date"
                          value={journeyDate}
                          onChange={handleDateChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
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
                        <input
                          type="date"
                          value={journeyDate2}
                          onChange={handleDateChange2}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <span>
                        {journeyDate2 &&
                          new Date(journeyDate2).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                      </span>
                    </div>
                  </div>
                  <div className="flight_Search_boxed dropdown_passenger_area">
                    <div>
                      <span>Guests and rooms</span>
                    </div>
                    <div className="dropdown">
                      {/* Toggle Button */}
                      <button
                        className="dropdown-toggle final-count"
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {rooms.length} Room{rooms.length > 1 ? "s" : ""},{" "}
                        {totalGuests} Guest
                        {totalGuests !== 1 ? "s" : ""}
                      </button>

                      {/* Dropdown Content */}
                      {showDropdown && (
                        <div
                          className="dropdown-menu dropdown_passenger_info show"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="dropdown-header hdr-drop">
                            <h6>Select Rooms & Guests</h6>
                          </div>
                          <div className="card travel-card">
                            <div className="card-body">
                            {error && (
                              <div style={{color:"red",
                              fontSize:"12px",
                              marginBottom:"0px"}}>
                                {error}
                              </div>
                            )}
                              {/* Rooms List */}
                              {rooms.map((room, roomIndex) => (
                                <div
                                  key={roomIndex}
                                  className="traveller-calulate-persons"
                                >
                                  <h6>Room {roomIndex + 1}</h6>

                                  <div className="passengers">
                                    {/* Adults */}

                                    <div className="passengers-types">
                                      <div className="passengers-type">
                                        <div className="type-label">
                                          <p>
                                            Adults <span></span>
                                          </p>
                                        </div>
                                        <div className="button-set">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDecrement(
                                                roomIndex,
                                                "adult"
                                              )
                                            }
                                          >
                                            <FaMinus />
                                          </button>
                                          <span className="count">
                                            {room.adults}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleIncrement(
                                                roomIndex,
                                                "adult"
                                              )
                                            }
                                          >
                                            <FaPlus />
                                          </button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Children */}
                                    <div className="passengers-types">
                                      <div className="passengers-type">
                                        <div className="type-label">
                                          <p>
                                            Children <span>(0-17 yrs)</span>
                                          </p>
                                        </div>
                                        <div className="button-set">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDecrement(
                                                roomIndex,
                                                "child"
                                              )
                                            }
                                          >
                                            <FaMinus />
                                          </button>
                                          <span className="count">
                                            {room.children}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleIncrement(
                                                roomIndex,
                                                "child"
                                              )
                                            }
                                          >
                                            <FaPlus />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Child Age Dropdowns */}
                                  {room.childAges.map((age, childIndex) => (
                                    <select
                                    className="mt-3 mx-1 age_select"
                                      key={childIndex}
                                      value={age}
                                      onChange={(e) =>
                                        handleChildAgeChange(
                                          roomIndex,
                                          childIndex,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">
                                        Child {childIndex + 1} age
                                      </option>
                                      {[...Array(17).keys()].map((n) => (
                                        <option key={n} value={n + 1}>
                                          {n + 1}
                                        </option>
                                      ))}
                                    </select>
                                  ))}

                                  {/* Remove Room */}
                                  {rooms.length > 1 && (
                                    <button
                                      className="age_remove mt-2"
                                      onClick={() => removeRoom(roomIndex)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}

                              {/* Add another room */}
                              <button
                                className="age_add"
                                onClick={addRoom}
                                type="button"
                              >
                                + Add another room
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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
      </div>
    </div>
  );
};
export default HotelForm;
