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

  const navigate = useNavigate();
  const searchTab = () => {
    navigate("/searchFlight");
  };

  useEffect(() => {
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

  // OneWay data
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

  // Roundtrip Data
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
                              <form action="#!">
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
                                          {filteredList.map(
                                            (airport, index) => (
                                              <li
                                                key={index}
                                                onClick={() => {
                                                  setFromInput(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredList([]);
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
                                          {filteredToList.map(
                                            (airport, index) => (
                                              <li
                                                key={index}
                                                onClick={() => {
                                                  setToInput(
                                                    `${airport.City} (${airport.AirportCode}) - ${airport.AirportName}`
                                                  );
                                                  setFilteredToList([]);
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
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                    >
                                                      <FaMinus />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                    >
                                                      <FaPlus />
                                                    </button>
                                                  </div>
                                                </div>

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
                                      <span>Business</span>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button
                                      onClick={searchTab}
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
                                      <input type="text" value={toInput2} 
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
                                        <FaExchangeAlt />
                                      </div>
                                      {toInput2.length> 0 && (
                                        <ul style={{
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
                                          }}>
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
                                      <span>Business</span>
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
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input type="text" value="New York" />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
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
                                          <input type="text" value="London " />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <FaPlaneArrival
                                              size={30}
                                              style={{ color: "#143d69" }}
                                            />
                                          </div>
                                          <div className="range_plan">
                                            <FaExchangeAlt />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
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
                                                value="2022-05-10"
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
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="multi_city_form">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input type="text" value="New York" />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
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
                                          <input type="text" value="London " />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <FaPlaneArrival
                                              size={30}
                                              style={{ color: "#143d69" }}
                                            />
                                          </div>
                                          <div className="range_plan">
                                            <FaExchangeAlt />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
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
                                                value="2022-05-12"
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
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="add_multy_form">
                                      <button
                                        type="button"
                                        id="addMulticityRow"
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
                  {/* <div
                    className="tab-pane fade"
                    id="tours"
                    role="tabpanel"
                    aria-labelledby="tours-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input type="date" value="2022-05-03" />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input type="date" value="2022-05-05" />
                                      <span>Thursday</span>
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
                                                  <span>Less than 2 yrs</span>
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
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button className="btn btn_theme btn_md">
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <HotelForm />
                  </div>
                  {/* <div
                    className="tab-pane fade"
                    id="visa-application"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Select country</p>
                                  <input type="text" value="United states" />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Your nationality</p>
                                  <input type="text" value="Bangladesh" />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Entry date</p>
                                      <input type="date" value="2022-05-03" />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Exit date</p>
                                      <input type="date" value="2022-05-05" />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Traveller, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Traveller
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Traveller</h6>
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
                                                  <span>Less than 2 yrs</span>
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
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button className="btn btn_theme btn_md">
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div
                    className="tab-pane fade"
                    id="apartments"
                    role="tabpanel"
                    aria-labelledby="apartments-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input type="date" value="2022-05-03" />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input type="date" value="2022-05-05" />
                                      <span>Thursday</span>
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
                                      0 Traveler
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
                                                  <span>Less than 2 yrs</span>
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
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button className="btn btn_theme btn_md">
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="tab-pane fade"
                    id="bus"
                    role="tabpanel"
                    aria-labelledby="bus-tab"
                  >
                    <CarForm />
                  </div>
                  {/* <div
                    className="tab-pane fade"
                    id="cruise"
                    role="tabpanel"
                    aria-labelledby="cruise-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Cruise line</p>
                                  <input
                                    type="text"
                                    placeholder="American line"
                                  />
                                  <span>Choose your cruise</span>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input type="date" value="2022-05-03" />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button className="btn btn_theme btn_md">
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
