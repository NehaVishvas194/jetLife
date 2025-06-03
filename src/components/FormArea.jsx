import React, { useEffect, useState } from "react";
import { FaHotel, FaHelicopter } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CarForm from "./formTabs/CarForm";
import HotelForm from "./formTabs/HotelForm";

const FormArea = () => {
  const [airportList, setAirPortList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [filteredToList, setFilteredToList] = useState([]);
  const [fromInput2, setFromInput2] = useState("");
  const [filteredList2, setFilteredList2] = useState([]);
  const [toInput2, setToInput2] = useState("");
  const [filteredToList2, setFilteredToList2] = useState([]);
  const [multiFromInput, setMultiFromInput] = useState([]);
  const [multiToInput, setMultiToInput] = useState([]);
  const [multiFilteredList, setMultiFilteredList] = useState([]);
  const [multiFilteredToList, setMultiFilteredToList] = useState([]);
  const [journeyDate, setJourneyDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [travelClass, setTravelClass] = useState("Economy");
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: getTodayDate() },
    { from: "", to: "", date: getTodayDate() },
  ]);
  const navigate = useNavigate();

  // const searchTab = () => {
  //   navigate("/searchFlight");
  // };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setJourneyDate(today);
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };

  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  useEffect(() => {
    // Flight airportList api
    const fetchAirportList = async () => {
      try {
        const response = await axios.post("/api/airport_list", {
          user_id: "jetlifeglobal_testAPI",
          user_password: "jetlifeglobalTest@2025",
          access: "Test",
          ip_address: "192.168.1.28",
        });
        console.log(response.data);
        setAirPortList(response.data);
      } catch (error) {
        console.log("Error Fetching Airport List Data:", error);
      }
    };
    fetchAirportList();
  }, []);

  // OneWay SearchAbility Data
  const fetchAirportSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/availability", {
        user_id: "jetlifeglobal_testAPI",
        user_password: "jetlifeglobalTest@2025",
        access: "Test",
        ip_address: "192.168.1.28",
        requiredCurrency: "USD",
        journeyType: "OneWay",
        OriginDestinationInfo: [
          {
            departureDate: journeyDate,
            airportOriginCode: fromInput,
            airportDestinationCode: toInput,
          },
        ],
        class: travelClass,
        adults: adults,
        childs: children,
        infants: infants,
      });
      console.log(
        "Navigating to searchFlight with data:",
        response.data.AirSearchResponse.AirSearchResult.FareItineraries
      );
      navigate("/searchFlight", {
        state: {
          searchResults:
            response.data.AirSearchResponse.AirSearchResult.FareItineraries,
        },
      });
      sessionStorage.setItem(
        "session_id",
        response.data.AirSearchResponse.session_id
      );

      // if (response === 200) {
      //   sessionStorage.getItem('session_id')
      // }

      console.log(response.data.AirSearchResponse);
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
    }
  };

  // OneWay filter data
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFromInput(value);

    const filtered = airportList.filter((airport) =>
      `${airport.AirportCode} ${airport.AirportName} ${airport.City}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredList(filtered);
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInput(value);

    const filtered = airportList.filter((airport) =>
      `${airport.AirportCode} ${airport.AirportName} ${airport.City}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredToList(filtered);
  };

  // Roundtrip filter data
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setFromInput2(value);

    const filtered = airportList.filter((airport) =>
      `${airport.AirportCode} ${airport.AirportName} ${airport.City}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredList2(filtered);
  };

  const handleToInputChange2 = (e) => {
    const value = e.target.value;
    setToInput2(value);

    const filtered = airportList.filter((airport) =>
      `${airport.AirportCode} ${airport.AirportName} ${airport.City}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredToList2(filtered);
  };

  // Multi filter data
  const handleMultiInputChange = (e, index, type) => {
    const value = e.target.value;
    const updatedData = [...multiCityData];
    updatedData[index][type] = value;
    setMultiCityData(updatedData);

    const filtered = airportList.filter((airport) =>
      `${airport.AirportCode} ${airport.AirportName} ${airport.City}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    if (type === "from") {
      const updatedFiltered = [...multiFilteredList];
      updatedFiltered[index] = filtered;
      setMultiFilteredList(updatedFiltered);
    } else if (type === "to") {
      const updatedFiltered = [...multiFilteredToList];
      updatedFiltered[index] = filtered;
      setMultiFilteredToList(updatedFiltered);
    }
  };

  const handleSelectAirport = (airport, index, type) => {
    const formatted = `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`;
    const updatedData = [...multiCityData];
    updatedData[index][type] = formatted;
    setMultiCityData(updatedData);

    if (type === "from") {
      const updatedFiltered = [...multiFilteredList];
      updatedFiltered[index] = [];
      setMultiFilteredList(updatedFiltered);
    } else {
      const updatedFiltered = [...multiFilteredToList];
      updatedFiltered[index] = [];
      setMultiFilteredToList(updatedFiltered);
    }
  };

  const handleMultiDateChange = (e, index) => {
    const updatedData = [...multiCityData];
    updatedData[index].date = e.target.value;
    setMultiCityData(updatedData);
  };

  const addFlightSegment = () => {
    setMultiCityData([...multiCityData, { from: "", to: "", date: "" }]);
    setMultiFilteredList([...multiFilteredList, []]);
    setMultiFilteredToList([...multiFilteredToList, []]);
  };

  const removeFlightSegment = (index) => {
    const updated = [...multiCityData];
    updated.splice(index, 1);
    setMultiCityData(updated);

    const updatedFromFiltered = [...multiFilteredList];
    updatedFromFiltered.splice(index, 1);
    setMultiFilteredList(updatedFromFiltered);

    const updatedToFiltered = [...multiFilteredToList];
    updatedToFiltered.splice(index, 1);
    setMultiFilteredToList(updatedToFiltered);
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

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const handleDone = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <section id="theme_search_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                <div className="theme_search_form_tabbtn">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="flights-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#flights"
                        type="button"
                        role="tab"
                        aria-controls="flights"
                        aria-selected="true"
                      >
                        <FaPlaneDeparture size={20} /> Flights
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="hotels-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#hotels"
                        type="button"
                        role="tab"
                        aria-controls="hotels"
                        aria-selected="false"
                      >
                        <FaHotel size={15} /> Hotels
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="bus-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#bus"
                        type="button"
                        role="tab"
                        aria-controls="bus"
                        aria-selected="false"
                      >
                        <IoCarSport size={20} /> Cars
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="bus-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#bus"
                        type="button"
                        role="tab"
                        aria-controls="bus"
                        aria-selected="false"
                      >
                        {" "}
                        <FaHelicopter size={20} /> Private Charters
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="bus-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#bus"
                        type="button"
                        role="tab"
                        aria-controls="bus"
                        aria-selected="false"
                      >
                        <ImSpoonKnife size={20} /> Concierge{" "}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="flights"
                    role="tabpanel"
                    aria-labelledby="flights-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="flight_categories_search">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="oneway-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#oneway_flight"
                                type="button"
                                role="tab"
                                aria-controls="oneway_flight"
                                aria-selected="true"
                              >
                                One Way
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="roundtrip-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#roundtrip"
                                type="button"
                                role="tab"
                                aria-controls="roundtrip"
                                aria-selected="false"
                              >
                                Roundtrip
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="multi_city-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#multi_city"
                                type="button"
                                role="tab"
                                aria-controls="multi_city"
                                aria-selected="false"
                              >
                                Multi city
                              </button>
                            </li>
                            <li>
                              <div className="form-group">
                                <select
                                  id="travelClass"
                                  className="form-control"
                                  value={travelClass}
                                  onChange={handleClassChange}
                                >
                                  <option value="Economy">Economy</option>
                                  <option value="Premium economy">
                                    Premium economy
                                  </option>
                                  <option value="Business class">
                                    Business class
                                  </option>
                                  <option value="First class">
                                    First class
                                  </option>
                                </select>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="tab-content" id="myTabContent1">
                      <div
                        className="tab-pane fade show active"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form onSubmit={fetchAirportSearch}>
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div
                                      className="flight_Search_boxed"
                                      style={{ position: "relative" }}
                                    >
                                      <p>From</p>
                                      <input
                                        type="text"
                                        value={fromInput}
                                        onChange={handleInputChange}
                                        placeholder="Leaving From"
                                      />
                                      <span>
                                        Start typing to filter airports...
                                      </span>

                                      <div className="plan_icon_posation">
                                        <FaPlaneDeparture
                                          size={30}
                                          style={{ color: "#143d69" }}
                                        />
                                      </div>

                                      {fromInput.length > 0 && (
                                        <ul className="airportList_ul">
                                          {filteredList.map(
                                            (airport, index) => (
                                              <li
                                                className="airportList_li"
                                                key={index}
                                                onClick={() => {
                                                  setFromInput(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredList([]);
                                                }}
                                              >
                                                {airport.City} (
                                                {airport.AirportCode}) -{" "}
                                                {airport.AirportName}
                                              </li>
                                            )
                                          )}

                                          {filteredList.length === 0 && (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No results found
                                            </li>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <input
                                        type="text"
                                        value={toInput}
                                        onChange={handleToInputChange}
                                        placeholder="Going To"
                                      />
                                      <span>Select Destination airport...</span>
                                      <div className="plan_icon_posation">
                                        <FaPlaneArrival
                                          size={30}
                                          style={{ color: "#143d69" }}
                                        />
                                      </div>
                                      <div className="range_plan">
                                        <i>
                                          <FaExchangeAlt />
                                        </i>
                                      </div>
                                      {toInput.length > 0 && (
                                        <ul className="airportList_ul">
                                          {filteredToList.map(
                                            (airport, index) => (
                                              <li
                                                className="airportList_li"
                                                key={index}
                                                onClick={() => {
                                                  setToInput(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredToList([]);
                                                }}
                                              >
                                                {airport.City} (
                                                {airport.AirportCode}) -{" "}
                                                {airport.AirportName}
                                              </li>
                                            )
                                          )}
                                          {filteredToList === 0 && (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No result found
                                            </li>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            value={journeyDate}
                                            onChange={handleDateChange}
                                            min={
                                              new Date()
                                                .toISOString()
                                                .split("T")[0]
                                            }
                                          />
                                          <span>
                                            {journeyDate &&
                                              new Date(
                                                journeyDate
                                              ).toLocaleDateString("en-US", {
                                                weekday: "long",
                                              })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class</p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          type="button"
                                          onClick={() =>
                                            setShowDropdown(!showDropdown)
                                          }
                                        >
                                          {totalPassengers} Passenger
                                          {totalPassengers !== 1 ? "s" : ""}
                                        </button>

                                        {showDropdown && (
                                          <div
                                            className="dropdown-menu dropdown_passenger_info show"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <div className="traveller-calulate-persons">
                                              <div className="passengers">
                                                <h6>Passengers</h6>
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
                                                        onClick={() =>
                                                          handleDecrement(
                                                            "adult"
                                                          )
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
                                                          handleIncrement(
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
                                                    <div className="text">
                                                      <div className="type-label">
                                                        <p className="fz14 mb-xs-0">
                                                          Children
                                                        </p>
                                                        <span>
                                                          2 - Less than 12 yrs
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="button-set">
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-in"
                                                        onClick={() =>
                                                          handleDecrement(
                                                            "child"
                                                          )
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
                                                          handleIncrement(
                                                            "child"
                                                          )
                                                        }
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
                                                  <div
                                                    key={index}
                                                    className="mb-2 mt-2"
                                                  >
                                                    <select
                                                      className="form-control"
                                                      value={
                                                        childAges[index] || ""
                                                      }
                                                      onChange={(e) =>
                                                        handleChildAgeChange(
                                                          index,
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      <option value="">
                                                        Select Age
                                                      </option>
                                                      {Array.from(
                                                        { length: 11 },
                                                        (_, i) => i + 2
                                                      ).map((age) => (
                                                        <option
                                                          key={age}
                                                          value={age}
                                                        >
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
                                                        <p className="fz14 mb-xs-0">
                                                          Infant
                                                        </p>
                                                        <span>
                                                          Less than 2 yrs
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="button-set">
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-in"
                                                        onClick={() =>
                                                          handleDecrement(
                                                            "infant"
                                                          )
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
                                                          handleIncrement(
                                                            "infant"
                                                          )
                                                        }
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
                                      <span onChange={handleClassChange}>
                                        {travelClass}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button
                                      type="submit"
                                      onClick={fetchAirportSearch}
                                      className="btn btn_theme btn_md"
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* RoundTrip  */}
                      <div
                        className="tab-pane fade"
                        id="roundtrip"
                        role="tabpanel"
                        aria-labelledby="roundtrip-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <input
                                        type="text"
                                        value={fromInput2}
                                        onChange={handleInputChange2}
                                        placeholder="Leaving From"
                                      />
                                      <span>
                                        Start typing to filter airports...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <FaPlaneDeparture
                                          size={30}
                                          style={{ color: "#143d69" }}
                                        />
                                      </div>
                                      {fromInput2.length > 0 && (
                                        <ul
                                          style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            right: 0,
                                            maxHeight: "350px",
                                            overflowY: "auto",
                                            backgroundColor: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                            padding: 0,
                                            margin: 0,
                                            listStyle: "none",
                                          }}
                                        >
                                          {filteredList2.map(
                                            (airport, index) => (
                                              <li
                                                key={index}
                                                onClick={() => {
                                                  setFromInput2(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredList2([]);
                                                }}
                                                style={{
                                                  padding: "8px 12px",
                                                  cursor: "pointer",
                                                  borderBottom:
                                                    "1px solid #eee",
                                                }}
                                              >
                                                {airport.City} (
                                                {airport.AirportCode}) -{" "}
                                                {airport.AirportName}
                                              </li>
                                            )
                                          )}
                                          {filteredList2.length === 0 && (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No result found
                                            </li>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <input
                                        type="text"
                                        value={toInput2}
                                        onChange={handleToInputChange2}
                                        placeholder="Going To"
                                      />
                                      <span>Select Destination airport...</span>
                                      <div className="plan_icon_posation">
                                        <FaPlaneArrival
                                          size={30}
                                          style={{ color: "#143d69" }}
                                        />
                                      </div>
                                      <div className="range_plan">
                                        <i>
                                          <FaExchangeAlt />
                                        </i>
                                      </div>
                                      {toInput2.length > 0 && (
                                        <ul
                                          style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            right: 0,
                                            maxHeight: "350px",
                                            overflow: "auto",
                                            backgroundColor: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                            padding: 0,
                                            margin: 0,
                                            listStyle: "none",
                                          }}
                                        >
                                          {filteredToList2.map(
                                            (airport, index) => (
                                              <li
                                                key={index}
                                                onClick={() => {
                                                  setToInput2(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredToList2([]);
                                                }}
                                                style={{
                                                  padding: "8px 12px",
                                                  cursor: "pointer",
                                                  borderBottom: "px solid #eee",
                                                }}
                                              >
                                                {airport.City} (
                                                {airport.AirportCode}) -{" "}
                                                {airport.AirportName}
                                              </li>
                                            )
                                          )}
                                          {filteredToList2 === 0 && (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No result found
                                            </li>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            value="2022-05-05"
                                          />
                                          <span>Thursday</span>
                                        </div>
                                        <div className="Journey_date">
                                          <p>Return date</p>
                                          <input
                                            type="date"
                                            value="2022-05-08"
                                          />
                                          <span>Saturday</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          0 Passenger
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      2
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                    >
                                                      <FaPlus />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                    >
                                                      <FaMinus />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                    >
                                                      <FaPlus />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                    >
                                                      <FaMinus />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      0
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                    >
                                                      <FaPlus />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                    >
                                                      <FaMinus />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection mt-0">
                                              <button className="btn commonBtn">
                                                Done
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span onChange={handleClassChange}>
                                        {travelClass}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <button className="btn btn_theme btn_md">
                                    Search
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Multi_City */}
                      <div
                        className="tab-pane fade"
                        id="multi_city"
                        role="tabpanel"
                        aria-labelledby="multi_city-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="multi_city_form_wrapper">
                                  <div className="multi_city_form">
                                    {multiCityData.map((segment, index) => (
                                      <div className="row mb-2" key={index}>
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <div className="multi_form_remove">
                                              {index > 1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeFlightSegment(index)
                                                  }
                                                >
                                                  Remove
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>From</p>
                                            <input
                                              type="text"
                                              placeholder="Leaving from..."
                                              value={segment.from}
                                              onChange={(e) =>
                                                handleMultiInputChange(
                                                  e,
                                                  index,
                                                  "from"
                                                )
                                              }
                                            />
                                            {multiFilteredList[index]?.length >
                                              0 && (
                                              <ul className="airportList_ul">
                                                {multiFilteredList[index].map(
                                                  (airport, i) => (
                                                    <li
                                                      className="airportList_li"
                                                      key={i}
                                                      onClick={() =>
                                                        handleSelectAirport(
                                                          airport,
                                                          index,
                                                          "from"
                                                        )
                                                      }
                                                    >
                                                      {airport.City} (
                                                      {airport.AirportCode}) -{" "}
                                                      {airport.AirportName}
                                                    </li>
                                                  )
                                                )}
                                                {multiFilteredList === 0 && (
                                                  <li
                                                    style={{
                                                      padding: "8px 12px",
                                                      color: "gray",
                                                    }}
                                                  >
                                                    No result found
                                                  </li>
                                                )}
                                              </ul>
                                            )}
                                            <span>Leaving from...</span>
                                            <div className="plan_icon_posation">
                                              <FaPlaneDeparture
                                                size={30}
                                                style={{ color: "#143d69" }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>To</p>
                                            <input
                                              type="text"
                                              placeholder="Going to..."
                                              value={segment.to}
                                              onChange={(e) =>
                                                handleMultiInputChange(
                                                  e,
                                                  index,
                                                  "to"
                                                )
                                              }
                                            />
                                            {multiFilteredToList[index]
                                              ?.length > 0 && (
                                              <ul className="airportList_ul">
                                                {multiFilteredToList[index].map(
                                                  (airport, i) => (
                                                    <li
                                                      className="airportList_li"
                                                      key={i}
                                                      onClick={() =>
                                                        handleSelectAirport(
                                                          airport,
                                                          index,
                                                          "to"
                                                        )
                                                      }
                                                    >
                                                      {airport.City} (
                                                      {airport.AirportCode}) -{" "}
                                                      {airport.AirportName}
                                                    </li>
                                                  )
                                                )}
                                                {multiFilteredToList == 0 && (
                                                  <li
                                                    style={{
                                                      padding: "8px 12px",
                                                      color: "gray",
                                                    }}
                                                  >
                                                    No result found
                                                  </li>
                                                )}
                                              </ul>
                                            )}
                                            <span>Going to...</span>
                                            <div className="plan_icon_posation">
                                              <FaPlaneArrival
                                                size={30}
                                                style={{ color: "#143d69" }}
                                              />
                                            </div>
                                            <div className="range_plan">
                                              <i>
                                                <FaExchangeAlt />
                                              </i>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="form_search_date">
                                            <div className="flight_Search_boxed date_flex_area">
                                              <div className="Journey_date">
                                                <p>Journey date</p>
                                                    <input
                                                      type="date"
                                                      value={segment.date}
                                                      min={getTodayDate()}
                                                      onChange={(e) =>
                                                        handleMultiDateChange(
                                                          e,
                                                          index
                                                        )
                                                      }
                                                    />
                                                <span>
                                                  {segment.date &&
                                                    new Date(
                                                      segment.date
                                                    ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        weekday: "long",
                                                      }
                                                    )}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          {index === 0 && (
                                            <div className="flight_Search_boxed dropdown_passenger_area">
                                              <p>Passenger, Class</p>
                                              <div className="dropdown">
                                                <button
                                                  className="dropdown-toggle final-count"
                                                  type="button"
                                                  onClick={() =>
                                                    setShowDropdown(
                                                      !showDropdown
                                                    )
                                                  }
                                                >
                                                  {totalPassengers} Passenger
                                                  {totalPassengers !== 1
                                                    ? "s"
                                                    : ""}
                                                </button>

                                                {showDropdown && (
                                                  <div
                                                    className="dropdown-menu dropdown_passenger_info show"
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                  >
                                                    <div className="traveller-calulate-persons">
                                                      <div className="passengers">
                                                        <h6>Passengers</h6>
                                                        {error && (
                                                          <div
                                                            style={{
                                                              color: "red",
                                                              fontSize: "14px",
                                                              marginBottom:
                                                                "10px",
                                                            }}
                                                          >
                                                            {error}
                                                          </div>
                                                        )}
                                                        <div className="passengers-types">
                                                          <div className="passengers-type">
                                                            <div className="text">
                                                              <div className="type-label">
                                                                <p>Adult</p>
                                                                <span>
                                                                  12+ yrs
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="button-set">
                                                              <button
                                                                type="button"
                                                                className="btn-subtract"
                                                                onClick={() =>
                                                                  handleDecrement(
                                                                    "adult"
                                                                  )
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
                                                                  handleIncrement(
                                                                    "adult"
                                                                  )
                                                                }
                                                              >
                                                                <FaPlus />
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="passengers-types">
                                                          <div className="passengers-type">
                                                            <div className="text">
                                                              <div className="type-label">
                                                                <p className="fz14 mb-xs-0">
                                                                  Children
                                                                </p>
                                                                <span>
                                                                  2 - Less than
                                                                  12 yrs
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="button-set">
                                                              <button
                                                                type="button"
                                                                className="btn-subtract-in"
                                                                onClick={() =>
                                                                  handleDecrement(
                                                                    "child"
                                                                  )
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
                                                                  handleIncrement(
                                                                    "child"
                                                                  )
                                                                }
                                                              >
                                                                <FaPlus />
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {Array.from({
                                                          length: children,
                                                        }).map((_, index) => (
                                                          <div
                                                            key={index}
                                                            className="mb-2 mt-2"
                                                          >
                                                            <select
                                                              className="form-control"
                                                              value={
                                                                childAges[
                                                                  index
                                                                ] || ""
                                                              }
                                                              onChange={(e) =>
                                                                handleChildAgeChange(
                                                                  index,
                                                                  e.target.value
                                                                )
                                                              }
                                                            >
                                                              <option value="">
                                                                Select Age
                                                              </option>
                                                              {Array.from(
                                                                { length: 11 },
                                                                (_, i) => i + 2
                                                              ).map((age) => (
                                                                <option
                                                                  key={age}
                                                                  value={age}
                                                                >
                                                                  {age}
                                                                </option>
                                                              ))}
                                                            </select>
                                                          </div>
                                                        ))}

                                                        <div className="passengers-types">
                                                          <div className="passengers-type">
                                                            <div className="text">
                                                              <div className="type-label">
                                                                <p className="fz14 mb-xs-0">
                                                                  Infant
                                                                </p>
                                                                <span>
                                                                  Less than 2
                                                                  yrs
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="button-set">
                                                              <button
                                                                type="button"
                                                                className="btn-subtract-in"
                                                                onClick={() =>
                                                                  handleDecrement(
                                                                    "infant"
                                                                  )
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
                                                                  handleIncrement(
                                                                    "infant"
                                                                  )
                                                                }
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
                                              <span
                                                onChange={handleClassChange}
                                              >
                                                {travelClass}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                    {/* <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input
                                            type="text"
                                            value={multiFromInput}
                                            onChange={handleMultiInputChange}
                                            placeholder="Leaving From..."
                                          />
                                          <span>
                                            Select your Departure Airports...
                                          </span>
                                          <div className="plan_icon_posation">
                                            <FaPlaneDeparture
                                              size={30}
                                              style={{ color: "#143d69" }}
                                            />
                                          </div>
                                          {multiFromInput.length > 0 && (
                                            <ul className="airportList_ul">
                                              {multiFilteredList.map(
                                                (airport, index) => (
                                                  <li
                                                    className="airportList_li"
                                                    key={index}
                                                    onClick={() => {
                                                      setMultiFromInput(
                                                        `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                      );
                                                      setMultiFilteredList([]);
                                                    }}
                                                  >
                                                    {airport.City} (
                                                    {airport.AirportCode}) -{" "}
                                                    {airport.AirportName}
                                                  </li>
                                                )
                                              )}
                                              {multiFilteredList.length ==
                                                0 && (
                                                <li
                                                  style={{
                                                    padding: "8px 12px",
                                                    color: "gray",
                                                  }}
                                                >
                                                  {" "}
                                                  No results found
                                                </li>
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>To</p>
                                          <input
                                            type="text"
                                            value={multiToInput}
                                            onChange={handleMultiToInputChange}
                                            placeholder="Going to..."
                                          />
                                          <span>
                                            Select Destination airport...{" "}
                                          </span>
                                          <div className="plan_icon_posation">
                                            <FaPlaneArrival
                                              size={30}
                                              style={{ color: "#143d69" }}
                                            />
                                          </div>
                                          <div className="range_plan">
                                            <i>
                                              <FaExchangeAlt />
                                            </i>
                                          </div>
                                          {multiToInput > 0 && (
                                            <ul className="airportList_ul">
                                              {multiFilteredToList.map(
                                                (airport, index) => (
                                                  <li
                                                    className="airportList_li"
                                                    key={index}
                                                    onClick={() => {
                                                      setMultiToInput(
                                                        `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                      );
                                                      setMultiFilteredToList(
                                                        []
                                                      );
                                                    }}
                                                  >
                                                    {airport.City} (
                                                    {airport.AirportCode}) -{" "}
                                                    {airport.AirportName}
                                                  </li>
                                                )
                                              )}
                                              {multiFilteredToList === 0 && (
                                                <li
                                                  style={{
                                                    padding: "8px 12px",
                                                    color: "gray",
                                                  }}
                                                >
                                                  {" "}
                                                  No result found
                                                </li>
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form_search_date">
                                          <div className="flight_Search_boxed date_flex_area">
                                            <div className="Journey_date">
                                              <p>Journey date</p>
                                              <input
                                                type="date"
                                                value={journeyDate}
                                                onChange={handleDateChange}
                                                min={
                                                  new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                                }
                                              />
                                              <span>
                                                {journeyDate &&
                                                  new Date(
                                                    journeyDate
                                                  ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                      weekday: "long",
                                                    }
                                                  )}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                          <p>Passenger, Class</p>
                                          <div className="dropdown">
                                            <button
                                              className="dropdown-toggle final-count"
                                              type="button"
                                              onClick={() =>
                                                setShowDropdown(!showDropdown)
                                              }
                                            >
                                              {totalPassengers} Passenger
                                              {totalPassengers !== 1 ? "s" : ""}
                                            </button>

                                            {showDropdown && (
                                              <div
                                                className="dropdown-menu dropdown_passenger_info show"
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                              >
                                                <div className="traveller-calulate-persons">
                                                  <div className="passengers">
                                                    <h6>Passengers</h6>
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
                                                            onClick={() =>
                                                              handleDecrement(
                                                                "adult"
                                                              )
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
                                                              handleIncrement(
                                                                "adult"
                                                              )
                                                            }
                                                          >
                                                            <FaPlus />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-types">
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Children
                                                            </p>
                                                            <span>
                                                              2 - Less than 12
                                                              yrs
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-in"
                                                            onClick={() =>
                                                              handleDecrement(
                                                                "child"
                                                              )
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
                                                              handleIncrement(
                                                                "child"
                                                              )
                                                            }
                                                          >
                                                            <FaPlus />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    {Array.from({
                                                      length: children,
                                                    }).map((_, index) => (
                                                      <div
                                                        key={index}
                                                        className="mb-2 mt-2"
                                                      >
                                                        <select
                                                          className="form-control"
                                                          value={
                                                            childAges[index] ||
                                                            ""
                                                          }
                                                          onChange={(e) =>
                                                            handleChildAgeChange(
                                                              index,
                                                              e.target.value
                                                            )
                                                          }
                                                        >
                                                          <option value="">
                                                            Select Age
                                                          </option>
                                                          {Array.from(
                                                            { length: 11 },
                                                            (_, i) => i + 2
                                                          ).map((age) => (
                                                            <option
                                                              key={age}
                                                              value={age}
                                                            >
                                                              {age}
                                                            </option>
                                                          ))}
                                                        </select>
                                                      </div>
                                                    ))}

                                                    <div className="passengers-types">
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Infant
                                                            </p>
                                                            <span>
                                                              Less than 2 yrs
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-in"
                                                            onClick={() =>
                                                              handleDecrement(
                                                                "infant"
                                                              )
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
                                                              handleIncrement(
                                                                "infant"
                                                              )
                                                            }
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
                                          <span onChange={handleClassChange}>
                                            {travelClass}
                                          </span>
                                        </div>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="add_multy_form">
                                      <button
                                        type="button"
                                        id="addMulticityRow"
                                        onClick={addFlightSegment}
                                      >
                                        + Add another flight
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <button className="btn btn_theme btn_md">
                                    Search
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <HotelForm />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="bus"
                    role="tabpanel"
                    aria-labelledby="bus-tab"
                  >
                    <CarForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormArea;
