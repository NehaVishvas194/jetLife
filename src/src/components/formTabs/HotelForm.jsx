import React from "react";
import { FaHotel, FaHelicopter } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { HOTEL_API } from "../../Url/BaseUrl";


const HotelForm = () => {
  // const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childAges: [] },
  ]);
  const [error, setError] = useState("");
  const [hotel, sethotel] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // Passengers Calender Data Code
  const totalGuests = rooms.reduce((sum, r) => sum + r.adults + r.children, 0);

  // Calculate totals
  const totalAdults = rooms.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = rooms.reduce((sum, r) => sum + r.children, 0);
  const allChildAges = rooms.flatMap((r) => r.childAges);

  const formatDate = (date) => (date ? date.toISOString().split("T")[0] : null); // YYYY-MM-DD format

  const searchHotel = async (e) => {
    e.preventDefault(); // prevent page refresh

    if (!hotel || !departureDate || !returnDate) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      hotels: [hotel],
      checkIn: formatDate(departureDate),
      checkOut: formatDate(returnDate),
      adultCount: totalAdults,
      childCount: totalChildren,
      childAges: allChildAges,
      nationality: "TR",
      version: "2",
    };

    try {
      const response = await axios.post(
        `/api/rest/json/search/D6F4E8ADB1B3FFC8BC8BCCC811EF7645AEA21EBE`,
        data
      );
      const hotel = response.data;
      console.log("Hotel Search Result:", hotel);
      navigate("/searchHotel", { state: { hotel } });
    } catch (error) {
      console.error("Hotel search failed:", error);
    }
  };

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

  // const handleDone = () => {
  //   setShowDropdown(false);
  // };

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
        <form onSubmit={searchHotel}>
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="oneway_search_form">
                <div className="d-flex">
                  <div className="flight_Search_boxed">
                    <span>Place</span>
                    <div className="">
                      <input
                        type="text"
                        placeholder="City, Location or Hotel Name"
                        value={hotel}
                        onChange={(e) => sethotel(e.target.value)}
                      />
                    </div>
                    <span>Where do you want to stay?</span>
                  </div>
                  <div className="flight_Search_boxed date_flex_area">
                    <div className="Journey_date">
                      <span>Check-in</span>
                      <div className="">
                        <DatePicker
                          selected={departureDate}
                          onChange={setDepartureDate}
                          monthsShown={1}
                          minDate={new Date()}
                          dateFormat="dd MMM yyyy"
                          placeholderText="dd-mm-yyyy"
                          className="rounded w-full cursor-pointer"
                        />
                      </div>
                      {departureDate && (
                        <div className="mt-1 text-sm">
                          <span className="block italic text-gray-500">
                            {departureDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flight_Search_boxed date_flex_area">
                    <div className="Journey_date">
                      <span>Check-out</span>
                      <div className="">
                        <DatePicker
                          selected={returnDate}
                          onChange={setReturnDate}
                          monthsShown={1}
                          minDate={departureDate || new Date()}
                          dateFormat="dd MMM yyyy"
                          placeholderText="dd-mm-yyyy"
                          className="rounded w-full cursor-pointer"
                        />
                      </div>
                      {returnDate && (
                        <div className="mt-1 text-sm">
                          <span className="block italic text-gray-500">
                            {returnDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
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
                          // onClick={(e) => e.stopPropagation()}
                        >
                          <div className="dropdown-header hdr-drop">
                            <h6>Select Rooms & Guests</h6>
                          </div>
                          <div className="card travel-card">
                            <div className="card-body">
                              {error && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginBottom: "0px",
                                  }}
                                >
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
                              <div className="text-center mt-2">
                                <span
                                  className="custom_button"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  Save
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="top_form_search_button">
                <button type="submit" className="btn btn_theme btn_md">
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
