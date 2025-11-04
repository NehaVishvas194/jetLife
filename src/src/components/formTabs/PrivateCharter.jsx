import React, { useState, useEffect } from "react";
import { FaHotel, FaHelicopter } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PrivateCharter = () => {
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyDate2, setJourneyDate2] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [travelClass, setTravelClass] = useState("LIGHT JET");
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setJourneyDate(today);
    setJourneyDate2(today);
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };
  const handleDateChange2 = (e) => {
    setJourneyDate2(e.target.value);
  };

  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  // Passengers Calender Data Code
  const totalPassengers = adults + children + infants;

  const handleIncrement = (type) => {
    if (totalPassengers >= 6) {
      setError("Maximum of 6 total passengers allowed.");
      return;
    }
    setError("");
    if (type === "adult" && adults < 6) setAdults(adults + 1);
    if (type === "child" && children < 5) {
      setChildren(children + 1);
      setChildAges([...childAges, ""]);
    }
    if (type === "infant" && infants < 2) setInfants(infants + 1);
  };

  const handleDecrement = (type) => {
    setError("");
    if (type === "adult" && adults > 1) setAdults(adults - 1);
    if (type === "child" && children > 0) {
      setChildren(children - 1);
      setChildAges(childAges.slice(0, -1));
    }
    if (type === "infant" && infants > 0) setInfants(infants - 1);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="tour_search_form">
            <form>
              <div className="row mb-2 align-items-center">
                <div className="col-lg-12">
                  <div className="oneway_search_form">
                    <div className="d-flex">
                      <div className="flight_Search_boxed">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>From</span>
                          <div className="plan_icon_posation">
                            <FaHelicopter />
                          </div>
                        </div>
                        <div className="">
                          <input type="text" placeholder="Origin Airport" />
                        </div>
                        <div className="">
                          <span>Start typing to filter stops</span>
                        </div>
                      </div>
                      <div className="flight_Search_boxed">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>To</span>
                          <div className="plan_icon_posation">
                            <FaHelicopter />
                          </div>
                        </div>
                        <div className="">
                          <input
                            type="text"
                            placeholder="Destination Airport"
                          />
                        </div>
                        <div className="range_plan">
                          <i>
                            <FaExchangeAlt />
                          </i>
                        </div>
                        <div className="">
                          <span>Start typing to filter stops</span>
                        </div>
                      </div>
                      <div className="flight_Search_boxed date_flex_area">
                        <div className="Journey_date">
                          <span>Journey date</span>
                          {/* <input
                            type="date"
                            value={journeyDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split("T")[0]}
                          /> */}
                          <div className="">
                            <DatePicker
                              selected={departureDate}
                              onChange={(date) => setDepartureDate(date)}
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
                          <span>Return date</span>
                          {/* <input
                            type="date"
                            value={journeyDate2}
                            onChange={handleDateChange2}
                            min={new Date().toISOString().split("T")[0]}
                          /> */}
                          <div className="">
                            <DatePicker
                              selected={returnDate}
                              onChange={(date) => setReturnDate(date)}
                              monthsShown={1}
                              minDate={new Date()}
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
                      <div
                        className="flight_Search_boxed dropdown_passenger_area"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <div className="">
                          <span>Travellers and Type</span>
                        </div>
                        <div className="dropdown">
                          <button
                            className="dropdown-toggle final-count"
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            {totalPassengers} Passenger
                            {totalPassengers !== 1 ? "s" : ""}
                          </button>
                          {showDropdown && (
                            <div
                              className="dropdown-menu dropdown_passenger_info show"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="dropdown-header hdr-drop">
                                <h6>Select Travelers & Aircraft Type</h6>
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
                                  <div className="traveller-calulate-persons">
                                    <h6>Travelers</h6>
                                    <div className="passengers">
                                      {/* Adult */}
                                      <div className="passengers-types">
                                        <div className="passengers-type">
                                          <div className="text">
                                            <div className="type-label">
                                              <p>
                                                Adult <span>(12+ yrs)</span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-subtract"
                                              onClick={() =>
                                                handleDecrement("adult")
                                              }
                                            >
                                              <FaMinus />
                                            </button>
                                            <span className="count pcount">
                                              {adults}
                                            </span>
                                            <button
                                              type="button"
                                              className="btn-add"
                                              onClick={() =>
                                                handleIncrement("adult")
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
                                          <div className="text">
                                            <div className="type-label">
                                              <p>
                                                Children <span>(2-12 yrs)</span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-subtract-in"
                                              onClick={() =>
                                                handleDecrement("child")
                                              }
                                            >
                                              <FaMinus />
                                            </button>
                                            <span className="count pcount">
                                              {children}
                                            </span>
                                            <button
                                              type="button"
                                              className="btn-add-in"
                                              onClick={() =>
                                                handleIncrement("child")
                                              }
                                            >
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
                                              <p>
                                                Infant <span>(0-12 yrs)</span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-subtract-in"
                                              onClick={() =>
                                                handleDecrement("infant")
                                              }
                                            >
                                              <FaMinus />
                                            </button>
                                            <span className="count incount">
                                              {infants}
                                            </span>
                                            <button
                                              type="button"
                                              className="btn-add-in"
                                              onClick={() =>
                                                handleIncrement("infant")
                                              }
                                            >
                                              <FaPlus />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <h6 className="mb-2">Types</h6>
                                    <div className="class-options">
                                      {[
                                        "LIGHT JET",
                                        "MID-SIZE JET",
                                        "HEAVY JET",
                                        "HELICOPTER",
                                      ].map((cls) => (
                                        <label
                                          className="class-radio"
                                          key={cls}
                                        >
                                          <input
                                            type="radio"
                                            name="cabin"
                                            value={cls}
                                            checked={travelClass === cls}
                                            onChange={handleClassChange}
                                          />
                                          <span className="custom-circle"></span>
                                          <span>{cls}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                   <div className="text-center mt-2">
                                  <span
                                    className="custom_button"
                                    onClick={() =>
                                      setShowDropdown(!showDropdown)
                                    }
                                  >
                                    Save
                                  </span>
                                </div>
                                </div>
                               
                              </div>
                            </div>
                          )}
                        </div>
                        <span onChange={handleClassChange}>{travelClass}</span>
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
      </div>
    </>
  );
};

export default PrivateCharter;
