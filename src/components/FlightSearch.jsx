import { useState, useEffect } from "react";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaMinus, FaPlus, FaAngleRight } from "react-icons/fa6";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import flightImg from "../assets/img/common/filght.svg";
// import rightArrow from "../assets/img/icon/right_arrow.png";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import BackToTopButton from "./BackToTop";
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
// import { styled } from '@mui/material/styles';
import routeImg from "../assets/img/route-flight.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidPlane } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const FlightSearch = () => {
  const [airportList, setAirPortList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [filteredToList, setFilteredToList] = useState([]);
  const [travelClass, setTravelClass] = useState("Economy");
  const [journeyDate, setJourneyDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // const location = useLocation();
  // const searchResults = location.state?.searchResults || [];
  // const [selectedFlight, setSelectedFlight] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  // const [open, setOpen] = useState(false);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isPopularCollapsed, setIsPopularCollapsed] = useState(true);
  const [isPropertyCollapsed, setIsPropertyCollapsed] = useState(true);
  const [isStarCollapsed, setIsStarCollapsed] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const handleClassChange = (event) => {
    setTravelClass(event.target.value);
  };
  const togglePriceCollapse = () => {
    setIsPriceCollapsed(!isPriceCollapsed);
  };

  const togglePopularCollapse = () => {
    setIsPopularCollapsed(!isPopularCollapsed);
  };

  const togglePropertyCollapse = () => {
    setIsPropertyCollapsed(!isPropertyCollapsed);
  };

  const toggleStarCollapse = () => {
    setIsStarCollapsed(!isStarCollapsed);
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setJourneyDate(today);
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };

  const handleDone = () => {
    setShowDropdown(false);
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

  const flightData = [
    {
      fromCity: "New York",
      fromAirport: "JFK",
      toCity: "London",
      toAirport: "LCY",
      duration: "01h 05m",
      price: "$7,560",
      discount: "*20% OFF",
      note: "*Eco value",
      time: "05:20pm",
      date: "Jun 17",
    },
    {
      fromCity: "New York",
      fromAirport: "JFK",
      toCity: "London",
      toAirport: "LCY",
      duration: "01h 05m",
      price: "$7,560",
      discount: "*20% OFF",
      note: "*Eco value",
      time: "05:20pm",
      date: "Jun 17",
    },
    {
      fromCity: "New York",
      fromAirport: "JFK",
      toCity: "London",
      toAirport: "LCY",
      duration: "01h 05m",
      price: "$7,560",
      discount: "*20% OFF",
      note: "*Eco value",
      time: "05:20pm",
      date: "Jun 17",
    },
    {
      fromCity: "New York",
      fromAirport: "JFK",
      toCity: "London",
      toAirport: "LCY",
      duration: "01h 05m",
      price: "$7,560",
      discount: "*20% OFF",
      note: "*Eco value",
      time: "05:20pm",
      date: "Jun 17",
    },
    {
      fromCity: "New York",
      fromAirport: "JFK",
      toCity: "London",
      toAirport: "LCY",
      duration: "01h 05m",
      price: "$7,560",
      discount: "*20% OFF",
      note: "*Eco value",
      time: "05:20pm",
      date: "Jun 17",
    },
  ];

  // tab-section
  const tabs = document.querySelectorAll(".tab");

  function tabify(tab) {
    const tabList = tab.querySelector(".tab__list");

    if (tabList) {
      const tabItems = [...tabList.children];
      const tabContent = tab.querySelector(".tab__content");
      const tabContentItems = [...tabContent.children];
      let tabIndex = 0;

      tabIndex = tabItems.findIndex((item, index) => {
        return [...item.classList].indexOf("is--active") > -1;
      });

      tabIndex > -1 ? (tabIndex = tabIndex) : (tabIndex = 0);

      function setTab(index) {
        tabItems.forEach((x, index) => x.classList.remove("is--active"));
        tabContentItems.forEach((x, index) => x.classList.remove("is--active"));

        tabItems[index].classList.add("is--active");
        tabContentItems[index].classList.add("is--active");
      }

      tabItems.forEach((x, index) =>
        x.addEventListener("click", () => setTab(index))
      );
      setTab(tabIndex);
      tab.querySelectorAll(".tab").forEach((tabContent) => tabify(tabContent));
    }
  }

  tabs.forEach(tabify);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = flightData.slice(startIndex, endIndex);

  const setting = {
    dots: false,
    arrows: true,
    infinite: true,
    autoHeight: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    spaceBetween: 30,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const bookingDetails = () => {
    navigate("/booking_details");
  };
  return (
    <>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <div>
                  <h2>Flight search result</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <GoDotFill />
                      </span>{" "}
                      Flight search result
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Form Area --> */}
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
                                Return
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
                      {/* One Way Data Start here  */}
                      <div
                        className="tab-pane fade show active"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form>
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
                                      // onClick={searchTab}
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
                      {/* Roundtrip Data start Here */}
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
                                      <input type="text" value="New York" />
                                      <span>
                                        JFK - John F. Kennedy International...
                                      </span>
                                      <div className="plan_icon_posation">
                                        <FaPlaneDeparture
                                          size={30}
                                          style={{ color: "#143d69" }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
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
                                        <i>
                                          <FaExchangeAlt />
                                        </i>
                                      </div>
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
                      {/* Multicity Data start here */}
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
                                            <i>
                                              <FaExchangeAlt />
                                            </i>
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
                                            <i>
                                              <FaExchangeAlt />
                                            </i>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Flight Search Areas --> */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section_heading_center">
                <h2>Flight Search</h2>
              </div>
              <div className="bestflight">
                <div className="">
                  <img src={routeImg} alt="img" />
                </div>
                <div className="">
                  <h6>
                    You're lucky! There are no better prices on nearby dates.
                  </h6>
                  <p>
                    Latest prices found for your search – actual prices shown in
                    next step
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-4 text-center">
                  <h4>Choose type of Flights you are interested</h4>
                </div>
                <Slider {...setting} className="row">
                  <div className="col-md-3 mb-4">
                    <div className="card booking-card pull-up">
                      <div className="card-body">
                        <div className="card-contact">
                          <div className="">
                            <div className="clock-icon">
                              <BiSolidPlane />
                            </div>
                          </div>
                          <div className="info-contact">
                            <h6>American Airline</h6>
                            <p>216 Flights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card booking-card pull-up">
                      <div className="card-body">
                        <div className="card-contact">
                          <div className="">
                            <div className="clock-icon">
                              <BiSolidPlane />
                            </div>
                          </div>
                          <div className="info-contact">
                            <h6>Delta Airlines</h6>
                            <p>569 Flights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card booking-card pull-up">
                      <div className="card-body">
                        <div className="card-contact">
                          <div className="">
                            <div className="clock-icon">
                              <BiSolidPlane />
                            </div>
                          </div>
                          <div className="info-contact">
                            <h6>Emirates</h6>
                            <p>129 Flights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card booking-card pull-up">
                      <div className="card-body">
                        <div className="card-contact">
                          <div className="">
                            <div className="clock-icon">
                              <BiSolidPlane />
                            </div>
                          </div>
                          <div className="info-contact">
                            <h6>Qatar Airways</h6>
                            <p>200 Flights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card booking-card">
                <div className="card-body">
                  <div className="filter-hd">
                    <h6>Filter</h6>
                    <a href="">Clear All</a>
                  </div>
                  {/* Price Filters */}
                  <div className="filter-block">
                    <div
                      className="filter-header"
                      onClick={togglePriceCollapse}
                    >
                      <div className="adjust-text">
                        <h6>Number of stops</h6>
                        <i
                          className={`fas fa-chevron-${
                            isPriceCollapsed ? "up" : "down"
                          } toggle-icon`}
                        ></i>
                      </div>
                    </div>
                    <div
                      className="filter-content"
                      style={{ display: isPriceCollapsed ? "block" : "none" }}
                    >
                      <label>
                        <input type="checkbox" /> Any (23)
                      </label>
                      <label>
                        <input type="checkbox" /> Direct only (56)
                      </label>
                      <label>
                        <input type="checkbox" /> 1 stop max (38)
                      </label>
                    </div>
                  </div>
                  {/* Popular Filters */}
                  <div className="filter-block">
                    <div
                      className="filter-header"
                      onClick={togglePopularCollapse}
                    >
                      <div className="adjust-text">
                        <h6>Airlines</h6>
                        <i
                          className={`fas fa-chevron-${
                            isPopularCollapsed ? "up" : "down"
                          } toggle-icon`}
                        ></i>
                      </div>
                    </div>
                    <div
                      className="filter-content"
                      style={{ display: isPopularCollapsed ? "block" : "none" }}
                    >
                      <label>
                        <input type="checkbox" /> Quatar Airways
                      </label>
                      <label>
                        <input type="checkbox" /> Lufthansa
                      </label>
                      <label>
                        <input type="checkbox" /> Swiss
                      </label>
                      <label>
                        <input type="checkbox" /> Qatar Airways
                      </label>
                      <label>
                        <input type="checkbox" /> Emirates Airlines
                      </label>
                    </div>
                  </div>
                  {/* Property Type Filter */}
                  <div className="filter-block">
                    <div
                      className="filter-header"
                      onClick={togglePropertyCollapse}
                    >
                      <div className="adjust-text">
                        <h6>Flight times</h6>
                        <i
                          className={`fas fa-chevron-${
                            isPropertyCollapsed ? "up" : "down"
                          } toggle-icon`}
                        ></i>
                      </div>
                    </div>
                    <div
                      className="filter-content"
                      style={{
                        display: isPropertyCollapsed ? "block" : "none",
                      }}
                    >
                      <h6>Departs Delhi International Airport</h6>
                      <label>
                        <input type="checkbox" /> 12:00 AM–5:59 AM
                      </label>
                      <label>
                        <input type="checkbox" /> 6:00 AM–11:59 AM
                      </label>
                      <label>
                        <input type="checkbox" /> 12:00 PM–5:59 PM
                      </label>
                      <label>
                        <input type="checkbox" /> 6:00 PM–11:59 PM
                      </label>
                      <h6>Arrives to Munich Airport</h6>
                      <label>
                        <input type="checkbox" /> 12:00 AM–5:59 AM
                      </label>
                      <label>
                        <input type="checkbox" /> 6:00 AM–11:59 AM
                      </label>
                      <label>
                        <input type="checkbox" /> 12:00 PM–5:59 PM
                      </label>
                      <label>
                        <input type="checkbox" /> 6:00 PM–11:59 PM
                      </label>
                    </div>
                  </div>
                  {/* Duration Filter */}
                  <div className="filter-block">
                    <div className="filter-header" onClick={toggleStarCollapse}>
                      <div className="adjust-text">
                        <h6>Duration</h6>
                        <i
                          className={`fas fa-chevron-${
                            isStarCollapsed ? "up" : "down"
                          } toggle-icon`}
                        ></i>
                      </div>
                    </div>
                    <div
                      className="filter-content"
                      style={{ display: isStarCollapsed ? "block" : "none" }}
                    >
                      <h6>Maximum travel time</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab">
                    <div className="tab__list">
                      <div className="tab__item">Best</div>
                      <div className="tab__item">Cheapest</div>
                      <div className="tab__item">Fastest</div>
                    </div>
                    <div className="tab__content">
                      <div className="tab__content-item tab">
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="flight-search">
                              <h6>1920 Flights Found on Your Search</h6>
                              <div className="field-set">
                                <label>Sort By:</label>
                                <select
                                  style={{
                                    border: "1px dashed #d7e04e !important",
                                  }}
                                >
                                  <option>Recommended</option>
                                  <option>Lowest</option>
                                  <option>Review</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="card banner-card">
                              <div className="card-body">
                                <div className="text-cont">
                                  <h6>
                                    <AiOutlineInfoCircle /> Save an average of
                                    15% on thousands of flights when you're
                                    signed in
                                  </h6>
                                  <button
                                    type="button"
                                    className="btn btn_theme btn_md"
                                  >
                                    Sign in
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="">
                              <ul className="choosedepartList">
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn chooseBtnFlt">
                                    <span className="smalltext">Jul 16</span>
                                    <span className="priceBigText">$1,102</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="flight_search_result_wrapper">
                              {paginatedData.map((flight, index) => (
                                <div
                                  className="flight_search_item_wrappper"
                                  key={index}
                                >
                                  <div className="card flight_search_items">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="badge-main">
                                            <span className="">Best</span>
                                            <span className="">
                                              Flexible ticket upgrade available
                                            </span>
                                            <span className="">Cheapest</span>
                                            <span className="">
                                              Cheapest direct
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-9 flight-serach-main">
                                          <div className="">
                                            <div className="d-flex align-items-center gap-5">
                                              <div className="flight_logo">
                                                <img
                                                  src={flightImg}
                                                  alt="img"
                                                />
                                                <p>Air India</p>
                                              </div>
                                              <div className="flight_search_destination">
                                                <h3>{flight.time}</h3>
                                                <p>
                                                  {flight.fromAirport} -{" "}
                                                  {flight.date}
                                                </p>
                                              </div>
                                              <div className="flight_right_arrow">
                                                <p>Non-stop</p>
                                                <div className="flightLine">
                                                  <div></div>
                                                  <div></div>
                                                </div>
                                                <p>{flight.duration}</p>
                                              </div>
                                              <div className="flight_search_destination">
                                                <h3>{flight.time}</h3>
                                                <p>
                                                  {flight.toAirport} -{" "}
                                                  {flight.date}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-end">
                                          <div className="flight_search_right">
                                            {/* <p>{flight.note}</p> */}
                                            <div className="extra-dis">
                                              <FaClipboardList />
                                              <FaBagShopping />
                                              <FaSuitcaseRolling />
                                            </div>
                                            <div
                                              className="allsameheading"
                                              style={{ position: "relative" }}
                                            >
                                              <h3
                                                onClick={() =>
                                                  toggleDropdown(index)
                                                }
                                              >
                                                {flight.price}{" "}
                                                <BsFillInfoCircleFill />
                                              </h3>
                                              <div
                                                className={`dropdown-list ${
                                                  openDropdown === index
                                                    ? "show"
                                                    : ""
                                                }`}
                                              >
                                                <div className="list list-1">
                                                  <div className="price-hdr">
                                                    <h5>Price details</h5>
                                                    <IoClose
                                                      className="cross-icon"
                                                      onClick={() =>
                                                        toggleDropdown(index)
                                                      }
                                                    />
                                                  </div>
                                                  <div className="item price-bdy">
                                                    <table className="w-100">
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <h6>Flights</h6>
                                                          </td>
                                                          <td className="text-end">
                                                            <p>
                                                              Includes taxes and
                                                              fees
                                                            </p>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>Adult (1)</td>
                                                          <td className="text-end">
                                                            INR5,499.30
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>Flight fare</td>
                                                          <td className="text-end">
                                                            INR4,458.00
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            Third-party fee
                                                          </td>
                                                          <td className="text-end">
                                                            INR162.30
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            Airline taxes and
                                                            fees
                                                          </td>
                                                          <td className="text-end">
                                                            INR879.00
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>Total:</td>
                                                          <td className="text-end">
                                                            {flight.price}
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="load_more_flight">
                                              <button
                                                className="btn btn_md"
                                                onClick={bookingDetails}
                                              >
                                                Book Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="">
                                        <div className="flight-card">
                                          <div
                                            className="flight-detail-toggle"
                                            onClick={() => handleToggle(index)}
                                          >
                                            Flight Detail{" "}
                                            {openIndex === index ? (
                                              <IoIosArrowUp />
                                            ) : (
                                              <IoIosArrowDown />
                                            )}
                                          </div>

                                          {openIndex === index && (
                                            <div className="flight-detail">
                                              <div className="detail-segment">
                                                <strong>
                                                  IST - Istanbul Airport,
                                                  Turkish
                                                </strong>
                                                <p>
                                                  Thu, Jun 16 – 23:20 (22h 50m)
                                                </p>
                                                <p>
                                                  Operated by Airlines | Flight
                                                  EK585 | Boeing 777-300ER
                                                </p>
                                                <p>
                                                  Adult(s): 25kg luggage free
                                                </p>
                                              </div>
                                              <div className="detail-segment">
                                                <strong>
                                                  DXB - Dubai, UAE
                                                </strong>
                                                <p>Fri, Jun 17 – 03:20</p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="pagination-controls">
                              <button
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                  )
                                }
                                disabled={currentPage === 1}
                              >
                                Prev
                              </button>

                              <span>Page {currentPage}</span>

                              <button
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    prev <
                                    Math.ceil(flightData.length / itemsPerPage)
                                      ? prev + 1
                                      : prev
                                  )
                                }
                                disabled={
                                  currentPage ===
                                  Math.ceil(flightData.length / itemsPerPage)
                                }
                              >
                                Next
                              </button>
                            </div>

                            {/* <div className="load_more_flight">
                                    <button className="btn btn_md">
                                      <i className="fas fa-spinner fa-spin"></i> Load more..
                                    </button>
                                  </div> */}
                            {/* <Stack spacing={2}>
                                    <Pagination count={10} shape="rounded" />
                                    <Pagination count={10} variant="outlined" shape="rounded" />
                                  </Stack> */}
                          </div>
                        </div>
                      </div>
                      <div className="tab__content-item"></div>
                      <div className="tab__content-item tab"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </>
  );
};

export default FlightSearch;
