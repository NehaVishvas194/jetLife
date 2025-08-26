import React from "react";
import { useState, useEffect } from "react";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import flightImg from "../assets/img/common/filght.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import BackToTopButton from "./BackToTop";
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import routeImg from "../assets/img/route-flight.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidPlane } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleRight } from "react-icons/fa";
import backgroundImage from "../assets/img/flight2.jpg";
import { useLocation } from "react-router-dom";

const FlightSearch = () => {
  const [airportList, setAirPortList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [filteredToList, setFilteredToList] = useState([]);
  const [fromInput2, setFromInput2] = useState("");
  const [filteredList2, setFilteredList2] = useState([]);
  const [toInput2, setToInput2] = useState("");
  const [filteredToList2, setFilteredToList2] = useState([]);
  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);
  const [fromSelected2, setFromSelected2] = useState(false);
  const [toSelected2, setToSelected2] = useState(false);
  const [multiFilteredList, setMultiFilteredList] = useState([]);
  const [multiFilteredToList, setMultiFilteredToList] = useState([]);
  const [multiSelectedFrom, setMultiSelectedFrom] = useState([]);
  const [multiSelectedTo, setMultiSelectedTo] = useState([]);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyDate2, setJourneyDate2] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isPopularCollapsed, setIsPopularCollapsed] = useState(true);
  const [isPropertyCollapsed, setIsPropertyCollapsed] = useState(true);
  const [isStarCollapsed, setIsStarCollapsed] = useState(true);
  const [apiFlights, setApiFlights] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedClass, setSelectedClass] = useState("Economy");
  const itemsPerPage = 5;
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: getTodayDate() },
    { from: "", to: "", date: getTodayDate() },
  ]);
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
    setJourneyDate2(today);
  }, []);

  const handleDateChange = (e) => {
    setJourneyDate(e.target.value);
  };
  const handleDateChange2 = (e) => {
    setJourneyDate2(e.target.value);
  };
  // const handleChange = (e) => {
  //   setSelectedClass(e.target.value);
  // };

  // Flight airportList api
  useEffect(() => {
    const fetchAirportList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token available, cannot fetch airports");
          return;
        }
        const data = {
          language_code: "EN",
        };
        const response = await axios.post("/api/rest/flight/v2/airport", data, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Flight Airport Response:", response.data);
        setAirPortList(response.data.result || []);
      } catch (error) {
        console.log("Error Fetching Flight Airport:", error);
      }
    };
    fetchAirportList();
  }, []);

  // OneWay SearchAbility Data
  const fetchAirportSearch = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error(
          "Flight Search:-No auth token available, cannot fetch airport data"
        );
        return;
      }
      const searchData = {
        from_destination: {
          city: true,
          code: fromInput,
        },
        to_destination: {
          city: true,
          code: toInput,
        },
        departure_date: journeyDate,
        pax_list: [{ type: "ADULT", count: adults }],
        accept_pending: true,
        cabin_type: travelClass,
      };
      const response = await axios.post(
        "/api/rest/flight/v2/search",
        searchData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const flightsData = response.data?.result?.departure_flights || [];
      setApiFlights(flightsData);
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
    }
  };

  // OneWay filter data
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSelected(false);

    const filtered = airportList.filter((airport) =>
      `${airport.city_code} ${airport.city_name} ${airport.country_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleAirport = (airport) => {
    setFromInput(
      `${airport.city_code} (${airport.city_name}) - ${airport.country_name}`
    );
    setFilteredList([]);
    setFromSelected(true);
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInput(value);
    setToSelected(false);

    const filtered = airportList.filter((airport) =>
      `${airport.city_code} ${airport.city_name} ${airport.country_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredToList(filtered);
  };

  const handleSelectToAirport = (airport) => {
    setToInput(
      `${airport.city_code} (${airport.city_name}) - ${airport.country_name}`
    );
    setFilteredToList([]);
    setToSelected(true);
  };

  // Roundtrip filter data
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setFromInput2(value);
    setFromSelected2(false);

    const filtered = airportList.filter((airport) =>
      `${airport.city_code} ${airport.city_name} ${airport.country_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredList2(filtered);
  };

  const handleSelectAirport2 = (airport) => {
    setFromInput2(
      `${airport.city_code} (${airport.city_name}) - ${airport.country_name}`
    );
    setFilteredList2([]);
    setFromSelected2(true);
  };

  const handleToInputChange2 = (e) => {
    const value = e.target.value;
    setToInput2(value);
    setToSelected2(false);

    const filtered = airportList.filter((airport) =>
      `${airport.city_code} ${airport.city_name} ${airport.country_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredToList2(filtered);
  };

  const handleSelectToAirport2 = (airport) => {
    setToInput2(
      `${airport.city_code} (${airport.city_name}) - ${airport.country_name}`
    );
    setFilteredToList2([]);
    setToSelected2(true);
  };

  // Multi filter data
  const handleMultiInputChange = (e, index, type) => {
    const value = e.target.value;
    const updatedData = [...multiCityData];
    updatedData[index][type] = value;
    setMultiCityData(updatedData);

    const filtered = airportList.filter((airport) =>
      `${airport.city_code} ${airport.city_name} ${airport.country_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    if (type === "from") {
      const updatedFiltered = [...multiFilteredList];
      updatedFiltered[index] = filtered;
      setMultiFilteredList(updatedFiltered);

      const updatedSelected = [...multiSelectedFrom];
      updatedSelected[index] = false;
      setMultiSelectedFrom(updatedSelected);
    } else if (type === "to") {
      const updatedFiltered = [...multiFilteredToList];
      updatedFiltered[index] = filtered;
      setMultiFilteredToList(updatedFiltered);

      const updatedSelected = [...multiSelectedTo];
      updatedSelected[index] = false;
      setMultiSelectedTo(updatedSelected);
    }
  };

  const handleSelectAirport = (airport, index, type) => {
    const formatted = `${airport.city_code} (${airport.city_name}) - ${airport.country_name}`;
    const updatedData = [...multiCityData];
    updatedData[index][type] = formatted;
    setMultiCityData(updatedData);

    if (type === "from") {
      const updatedFiltered = [...multiFilteredList];
      updatedFiltered[index] = [];
      setMultiFilteredList(updatedFiltered);

      const updatedSelected = [...multiSelectedFrom];
      updatedSelected[index] = true;
      setMultiSelectedFrom(updatedSelected);
    } else {
      const updatedFiltered = [...multiFilteredToList];
      updatedFiltered[index] = [];
      setMultiFilteredToList(updatedFiltered);

      const updatedSelected = [...multiSelectedTo];
      updatedSelected[index] = true;
      setMultiSelectedTo(updatedSelected);
    }
  };

  const handleMultiDateChange = (e, index) => {
    const updatedData = [...multiCityData];
    updatedData[index].date = e.target.value;
    setMultiCityData(updatedData);
  };

  const addFlightSegment = () => {
    setMultiCityData([
      ...multiCityData,
      { from: "", to: "", date: getTodayDate() },
    ]);
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

  // const handleChildAgeChange = (index, value) => {
  //   const updatedAges = [...childAges];
  //   updatedAges[index] = value;
  //   setChildAges(updatedAges);
  // };

  // const handleDone = () => {
  //   setShowDropdown(false);
  // };

  // tab-section
  // const tabs = document.querySelectorAll(".tab");

  // function tabify(tab) {
  //   const tabList = tab.querySelector(".tab__list");

  //   if (tabList) {
  //     const tabItems = [...tabList.children];
  //     const tabContent = tab.querySelector(".tab__content");
  //     const tabContentItems = [...tabContent.children];
  //     let tabIndex = 0;

  //     tabIndex = tabItems.findIndex((item, index) => {
  //       return [...item.classList].indexOf("is--active") > -1;
  //     });

  //     tabIndex > -1 ? (tabIndex = tabIndex) : (tabIndex = 0);

  //     function setTab(index) {
  //       tabItems.forEach((x, index) => x.classList.remove("is--active"));
  //       tabContentItems.forEach((x, index) => x.classList.remove("is--active"));

  //       tabItems[index].classList.add("is--active");
  //       tabContentItems[index].classList.add("is--active");
  //     }

  //     tabItems.forEach((x, index) =>
  //       x.addEventListener("click", () => setTab(index))
  //     );
  //     setTab(tabIndex);
  //     tab.querySelectorAll(".tab").forEach((tabContent) => tabify(tabContent));
  //   }
  // }
  // tabs.forEach(tabify);

  const location = useLocation();
  const locationFlights = location.state?.flights || [];

  useEffect(() => {
    if (locationFlights.length > 0) {
      setApiFlights(locationFlights);
    }
  }, [locationFlights]);

  const mappedFlights = apiFlights.map((f) => {
    const leg = f.legs[0];
    const fare = f.fares[0]?.fare_info?.fare_detail;
    const baggage = leg?.baggages[0];

    return {
      airline: leg.airline_info?.carrier_name || "Unknown Airline",
      flightNumber: leg.flight_number,
      fromAirport: `${leg.departure_info?.airport_name} (${leg.departure_info?.city_name})`,
      fromCity: leg.departure_info?.city_name,
      fromDetails: `${leg.departure_info?.airport_code} - ${leg.departure_info?.airport_name}, ${leg.departure_info?.city_name}`,
      departureTime: leg.departure_info?.date,
      toAirport: `${leg.arrival_info?.airport_name} (${leg.arrival_info?.city_name})`,
      toCity: leg.arrival_info?.city_name,
      toDetails: `${leg.arrival_info?.airport_code} - ${leg.arrival_info?.airport_name}, ${leg.arrival_info?.city_name}`,
      arrivalTime: leg.arrival_info?.date,
      duration: `${leg.time_info?.flight_time_hour}h ${leg.time_info?.flight_time_minute}m`,
      baggerAmount: baggage?.amount,
      baggerType: baggage?.type,
      price: `${fare?.currency_code} ${fare?.price_info?.total_fare}`,
      flightFare: `${fare?.currency_code} ${fare?.price_info?.base_fare}`,
      serviceFare: `${fare?.currency_code} ${fare?.price_info?.service_fee}`,
      airlineTex: `${fare?.currency_code} ${fare?.price_info?.tax}`,
      airlineCommission: `${fare?.currency_code} ${fare?.price_info?.agency_commission}`,
    };
  });
  const totalFlights = mappedFlights.length;

  const totalPages = Math.ceil(mappedFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = mappedFlights.slice(startIndex, endIndex);

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

  const setting2 = {
    dots: false,
    arrows: true,
    infinite: true,
    autoHeight: true,
    speed: 500,
    slidesToShow: 6,
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
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Flight</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Flight List
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Form Area --> */}
      <section id="theme_search_form" className="flight-form">
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
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card home-card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
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
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="myTabContent1">
                    {/* one-way */}
                    <div
                      className="tab-pane fade show active"
                      id="oneway_flight"
                      role="tabpanel"
                      aria-labelledby="oneway-tab"
                    >
                      <form onSubmit={fetchAirportSearch}>
                        <div className="row mb-2 align-items-center">
                          <div className="col-md-11">
                            <div className="oneway_search_form">
                              <div className="d-flex">
                                <div className="flight_Search_boxed">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span>From</span>
                                    <div className="plan_icon_posation">
                                      <FaPlaneDeparture />
                                    </div>
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      value={fromInput}
                                      onChange={handleInputChange}
                                      placeholder="Leaving From"
                                    />
                                  </div>
                                  {fromInput.length > 0 && (
                                    <ul className="airportList_ul">
                                      {filteredList.length > 0 ? (
                                        filteredList.map((airport, index) => (
                                          <li
                                            key={index}
                                            className="airportList_li"
                                            onClick={() =>
                                              handleAirport(airport)
                                            }
                                          >
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_name}
                                          </li>
                                        ))
                                      ) : !fromSelected ? (
                                        <li
                                          style={{
                                            padding: "8px 12px",
                                            color: "gray",
                                          }}
                                        >
                                          No results found
                                        </li>
                                      ) : null}
                                    </ul>
                                  )}

                                  <div className="">
                                    <span>Start typing to filter airports</span>
                                  </div>
                                </div>
                                <div className="flight_Search_boxed">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span>To</span>
                                    <div className="plan_icon_posation">
                                      <FaPlaneArrival />
                                    </div>
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      value={toInput}
                                      onChange={handleToInputChange}
                                      placeholder="Going To"
                                    />
                                  </div>
                                  <div className="range_plan">
                                    <i>
                                      <FaExchangeAlt />
                                    </i>
                                  </div>
                                  {toInput.length > 0 && (
                                    <ul className="airportList_ul">
                                      {filteredToList.length > 0 ? (
                                        filteredToList.map((airport, index) => (
                                          <li
                                            key={index}
                                            className="airportList_li"
                                            onClick={() =>
                                              handleSelectToAirport(airport)
                                            }
                                          >
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_name}
                                          </li>
                                        ))
                                      ) : !toSelected ? (
                                        <li
                                          style={{
                                            padding: "8px 12px",
                                            color: "gray",
                                          }}
                                        >
                                          No results found
                                        </li>
                                      ) : null}
                                    </ul>
                                  )}
                                  <div className="">
                                    <span>Select Destination airport</span>
                                  </div>
                                </div>
                                <div className="flight_Search_boxed date_flex_area">
                                  <div className="Journey_date">
                                    <div className="">
                                      <span>Journey date</span>
                                    </div>
                                    <input
                                      type="date"
                                      value={journeyDate}
                                      onChange={handleDateChange}
                                      min={
                                        new Date().toISOString().split("T")[0]
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
                                <div
                                  className="flight_Search_boxed dropdown_passenger_area"
                                  onClick={() => setShowDropdown(!showDropdown)}
                                >
                                  <div className="">
                                    <span>Travellers and class</span>
                                  </div>
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
                                        <div className="dropdown-header hdr-drop">
                                          <h6>Select Travelers & Class</h6>
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
                                                          Adult{" "}
                                                          <span>(12+ yrs)</span>
                                                        </p>
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
                                                        <p>
                                                          Children{" "}
                                                          <span>
                                                            (2-12 yrs)
                                                          </span>
                                                        </p>
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
                                                {/* Infant */}
                                                <div className="passengers-types">
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <div className="type-label">
                                                        <p>
                                                          Infant{" "}
                                                          <span>
                                                            (0-12 yrs)
                                                          </span>
                                                        </p>
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
                                            </div>
                                            <div className="">
                                              <h6 className="mb-2">Classes</h6>
                                              <div className="class-options">
                                                {[
                                                  "ECONOMY",
                                                  "PREMIUM ECONOMY",
                                                  "BUSINESS",
                                                  "FIRST CLASS",
                                                ].map((cls) => (
                                                  <label
                                                    className="class-radio"
                                                    key={cls}
                                                  >
                                                    <input
                                                      type="radio"
                                                      name="cabin"
                                                      value={cls}
                                                      checked={
                                                        travelClass === cls
                                                      }
                                                      onChange={
                                                        handleClassChange
                                                      }
                                                    />
                                                    <span className="custom-circle"></span>
                                                    <span>{cls}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            </div>
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
                            </div>
                          </div>
                          <div className="col-md-1">
                            <div className="top_form_search_button">
                              <button
                                type="submit"
                                // onClick={searchTab}
                                className="btn btn_theme btn_md"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* return */}
                    <div
                      className="tab-pane fade"
                      id="roundtrip"
                      role="tabpanel"
                      aria-labelledby="roundtrip-tab"
                    >
                      <form action="#!">
                        <div className="row mb-2 align-items-center">
                          <div className="col-md-11">
                            <div className="oneway_search_form">
                              <div className="d-flex">
                                <div className="flight_Search_boxed">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span>From</span>
                                    <div className="plan_icon_posation">
                                      <FaPlaneDeparture />
                                    </div>
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      value={fromInput2}
                                      onChange={handleInputChange2}
                                      placeholder="Leaving From"
                                    />
                                  </div>
                                  {fromInput2.length > 0 && (
                                    <ul className="airportList_ul">
                                      {filteredList2.length > 0 ? (
                                        filteredList2.map((airport, index) => (
                                          <li
                                            key={index}
                                            onClick={() =>
                                              handleSelectAirport2(airport)
                                            }
                                            style={{
                                              padding: "8px 12px",
                                              cursor: "pointer",
                                              borderBottom: "1px solid #eee",
                                            }}
                                          >
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_name}
                                          </li>
                                        ))
                                      ) : !fromSelected2 ? (
                                        <li
                                          style={{
                                            padding: "8px 12px",
                                            color: "gray",
                                          }}
                                        >
                                          No result found
                                        </li>
                                      ) : null}
                                    </ul>
                                  )}

                                  <div className="">
                                    <span>Start typing to filter airports</span>
                                  </div>
                                </div>
                                <div className="flight_Search_boxed">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span>To</span>
                                    <div className="plan_icon_posation">
                                      <FaPlaneArrival />
                                    </div>
                                  </div>
                                  <div className="">
                                    <input
                                      type="text"
                                      value={toInput2}
                                      onChange={handleToInputChange2}
                                      placeholder="Going To"
                                    />
                                  </div>
                                  <div className="range_plan">
                                    <i>
                                      <FaExchangeAlt />
                                    </i>
                                  </div>
                                  {toInput2.length > 0 && (
                                    <ul className="airportList_ul">
                                      {filteredToList2.length > 0 ? (
                                        filteredToList2.map(
                                          (airport, index) => (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                handleSelectToAirport2(airport)
                                              }
                                              style={{
                                                padding: "8px 12px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #eee",
                                              }}
                                            >
                                              {airport.city_name} (
                                              {airport.city_code}) -{" "}
                                              {airport.country_name}
                                            </li>
                                          )
                                        )
                                      ) : !toSelected2 ? (
                                        <li
                                          style={{
                                            padding: "8px 12px",
                                            color: "gray",
                                          }}
                                        >
                                          No result found
                                        </li>
                                      ) : null}
                                    </ul>
                                  )}

                                  <div className="">
                                    <span>Select Destination airport</span>
                                  </div>
                                </div>
                                <div className="flight_Search_boxed date_flex_area">
                                  <div className="Journey_date">
                                    <span>Journey date</span>
                                    <input
                                      type="date"
                                      value={journeyDate}
                                      onChange={handleDateChange}
                                      min={
                                        new Date().toISOString().split("T")[0]
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
                                <div className="flight_Search_boxed date_flex_area">
                                  <div className="Journey_date">
                                    <span>Return date</span>
                                    <input
                                      type="date"
                                      value={journeyDate2}
                                      onChange={handleDateChange2}
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />
                                    <span>
                                      {journeyDate2 &&
                                        new Date(
                                          journeyDate2
                                        ).toLocaleDateString("en-US", {
                                          weekday: "long",
                                        })}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="flight_Search_boxed dropdown_passenger_area"
                                  onClick={() => setShowDropdown(!showDropdown)}
                                >
                                  <div className="">
                                    <span>Travellers and class</span>
                                  </div>
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
                                        <div className="dropdown-header hdr-drop">
                                          <h6>Select Travelers & Class</h6>
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
                                                          Adult{" "}
                                                          <span>(12+ yrs)</span>
                                                        </p>
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
                                                        <p>
                                                          Children{" "}
                                                          <span>
                                                            (2-12 yrs)
                                                          </span>
                                                        </p>
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
                                                {/* Infant */}
                                                <div className="passengers-types">
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <div className="type-label">
                                                        <p>
                                                          Infant{" "}
                                                          <span>
                                                            (0-12 yrs)
                                                          </span>
                                                        </p>
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
                                            </div>
                                            <div className="">
                                              <h6 className="mb-2">Classes</h6>
                                              <div className="class-options">
                                                {[
                                                  "ECONOMY",
                                                  "PREMIUM ECONOMY",
                                                  "BUSINESS",
                                                  "FIRST CLASS",
                                                ].map((cls) => (
                                                  <label
                                                    className="class-radio"
                                                    key={cls}
                                                  >
                                                    <input
                                                      type="radio"
                                                      name="cabin"
                                                      value={cls}
                                                      checked={
                                                        travelClass === cls
                                                      }
                                                      onChange={
                                                        handleClassChange
                                                      }
                                                    />
                                                    <span className="custom-circle"></span>
                                                    <span>{cls}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            </div>
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
                            </div>
                          </div>
                          <div className="col-md-1">
                            <div className="top_form_search_button">
                              <button
                                type="submit"
                                // onClick={searchTab}
                                className="btn btn_theme btn_md"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* multi-city */}
                    <div
                      className="tab-pane fade"
                      id="multi_city"
                      role="tabpanel"
                      aria-labelledby="multi_city-tab"
                    >
                      <form action="#!">
                        {multiCityData.map((segment, index) => (
                          <div key={index}>
                            <div className="row mb-2 align-items-center">
                              <div className="col-lg-11">
                                <div className="oneway_search_form">
                                  <div className="d-flex">
                                    <div className="flight_Search_boxed">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span>From</span>
                                        <div className="plan_icon_posation">
                                          <FaPlaneDeparture />
                                        </div>
                                      </div>
                                      <div className="">
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
                                      </div>
                                      {segment.from.length > 0 && (
                                        <ul className="airportList_ul">
                                          {multiFilteredList[index]?.length >
                                          0 ? (
                                            multiFilteredList[index].map(
                                              (airport, i) => (
                                                <li
                                                  key={i}
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleSelectAirport(
                                                      airport,
                                                      index,
                                                      "from"
                                                    )
                                                  }
                                                >
                                                  {airport.city_name} (
                                                  {airport.city_code}) -{" "}
                                                  {airport.country_name}
                                                </li>
                                              )
                                            )
                                          ) : !multiSelectedFrom[index] ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No result found
                                            </li>
                                          ) : null}
                                        </ul>
                                      )}

                                      <div className="">
                                        <span>Leaving from</span>
                                      </div>
                                    </div>
                                    <div className="flight_Search_boxed">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span>To</span>
                                        <div className="plan_icon_posation">
                                          <FaPlaneArrival />
                                        </div>
                                      </div>
                                      <div className="">
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
                                      </div>
                                      {segment.to.length > 0 && (
                                        <ul className="airportList_ul">
                                          {multiFilteredToList[index]?.length >
                                          0 ? (
                                            multiFilteredToList[index].map(
                                              (airport, i) => (
                                                <li
                                                  key={i}
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleSelectAirport(
                                                      airport,
                                                      index,
                                                      "to"
                                                    )
                                                  }
                                                >
                                                  {airport.city_name} (
                                                  {airport.city_code}) -{" "}
                                                  {airport.country_name}
                                                </li>
                                              )
                                            )
                                          ) : !multiSelectedTo[index] ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                              }}
                                            >
                                              No result found
                                            </li>
                                          ) : null}
                                        </ul>
                                      )}

                                      <div className="">
                                        <span>Going to</span>
                                      </div>
                                      <div className="range_plan">
                                        <i>
                                          <FaExchangeAlt />
                                        </i>
                                      </div>
                                    </div>

                                    <div className="flight_Search_boxed date_flex_area">
                                      <div className="Journey_date">
                                        <span>Journey date</span>
                                        <input
                                          type="date"
                                          value={segment.date}
                                          min={getTodayDate()}
                                          onChange={(e) =>
                                            handleMultiDateChange(e, index)
                                          }
                                        />
                                        <span>
                                          {segment.date &&
                                            new Date(
                                              segment.date
                                            ).toLocaleDateString("en-US", {
                                              weekday: "long",
                                            })}
                                        </span>
                                      </div>
                                    </div>
                                    {index === 0 && (
                                      <div
                                        className="flight_Search_boxed dropdown_passenger_area"
                                        onClick={() =>
                                          setShowDropdown(!showDropdown)
                                        }
                                      >
                                        <div className="">
                                          <span>Travellers and class</span>
                                        </div>
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
                                              <div className="dropdown-header hdr-drop">
                                                <h6>
                                                  Select Travelers & Class
                                                </h6>
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
                                                                Adult{" "}
                                                                <span>
                                                                  (12+ yrs)
                                                                </span>
                                                              </p>
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
                                                              <p>
                                                                Children{" "}
                                                                <span>
                                                                  (2-12 yrs)
                                                                </span>
                                                              </p>
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
                                                      {/* Infant */}
                                                      <div className="passengers-types">
                                                        <div className="passengers-type">
                                                          <div className="text">
                                                            <div className="type-label">
                                                              <p>
                                                                Infant{" "}
                                                                <span>
                                                                  (0-12 yrs)
                                                                </span>
                                                              </p>
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
                                                  </div>
                                                  <div className="">
                                                    <h6 className="mb-2">
                                                      Classes
                                                    </h6>
                                                    <div className="class-options">
                                                      {[
                                                        "ECONOMY",
                                                        "PREMIUM ECONOMY",
                                                        "BUSINESS",
                                                        "FIRST CLASS",
                                                      ].map((cls) => (
                                                        <label
                                                          className="class-radio"
                                                          key={cls}
                                                        >
                                                          <input
                                                            type="radio"
                                                            name="cabin"
                                                            value={cls}
                                                            checked={
                                                              travelClass ===
                                                              cls
                                                            }
                                                            onChange={
                                                              handleClassChange
                                                            }
                                                          />
                                                          <span className="custom-circle"></span>
                                                          <span>{cls}</span>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <span onChange={handleClassChange}>
                                          {travelClass}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-1">
                                <div className="multi_form_remove">
                                  {index > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeFlightSegment(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>

                                {/* Show Search button only on last row */}
                                {index === multiCityData.length - 1 && (
                                  <div className="top_form_search_button mt-2">
                                    <button
                                      type="submit"
                                      className="btn btn_theme btn_md"
                                    >
                                      Search
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {multiCityData.length < 5 && (
                          <div className="top_form_search_button mb-2">
                            <button
                              type="button"
                              id="addMulticityRow"
                              onClick={addFlightSegment}
                              className="btn btn_theme btn_md"
                            >
                              + Add Another Flight
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Flight Search Areas --> */}
      <section id="explore_area" className="section_padding pt-30">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h4>Choose type of Flights you are interested</h4>
            </div>
            <Slider {...setting} className="row">
              {mappedFlights.map((airLine, a) => (
                <div className="col-md-3 mb-4" key={a}>
                  <div className="card booking-card pull-up">
                    <div className="card-body">
                      <div className="card-contact">
                        <div className="">
                          <div className="clock-icon">
                            <BiSolidPlane />
                          </div>
                        </div>
                        <div className="info-contact">
                          <h6>{airLine.airline}</h6>
                          <p>216 Flights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
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
                      {mappedFlights.map((line, e) => (
                        <label key={e}>
                          <input type="checkbox" /> {line.airline}
                        </label>
                      ))}
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
                      {mappedFlights.map((time, t) => (
                        <label key={t}>
                          <input type="checkbox" />{" "}
                          {new Date(time.departureTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          –{" "}
                          {new Date(time.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </label>
                      ))}
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
                      style={{ display: isPopularCollapsed ? "block" : "none" }}
                    >
                      {mappedFlights.map((duration, e) => (
                        <label key={e}>
                          <input type="checkbox" /> {duration.duration}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="flight-search">
                          <h6>{totalFlights} Flights Found on Your Search</h6>
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
                                <AiOutlineInfoCircle /> Save an average of 15%
                                on thousands of flights when you're signed in
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
                      <Slider {...setting2} className="choosedepartList">
                        {/* Each item becomes a slide */}
                        {[...Array(7)].map((_, index) => (
                          <div key={index} className="px-2">
                            <button className="btn chooseBtnFlt w-100">
                              <span className="smalltext">Jul 16</span>
                              <div></div>
                              <span className="priceBigText">$1,102</span>
                            </button>
                          </div>
                        ))}
                      </Slider>
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
                                            <img src={flightImg} alt="img" />
                                            <p>{flight.airline}</p>
                                          </div>
                                          {/* Departure */}
                                          <div className="flight_search_destination">
                                            <h3>
                                              {new Date(
                                                flight.departureTime
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </h3>
                                            <p>
                                              {flight.fromAirport} -{" "}
                                              {new Date(
                                                flight.departureTime
                                              ).toLocaleDateString()}
                                            </p>
                                          </div>
                                          {/* Duration */}
                                          <div className="flight_right_arrow">
                                            <p>Non-stop</p>
                                            <div className="flightLine">
                                              <div></div>
                                              <div></div>
                                            </div>
                                            <p>{flight.duration}</p>
                                          </div>
                                          {/* Arrival */}
                                          <div className="flight_search_destination">
                                            <h3>
                                              {new Date(
                                                flight.arrivalTime
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </h3>
                                            <p>
                                              {flight.toAirport} -{" "}
                                              {new Date(
                                                flight.arrivalTime
                                              ).toLocaleDateString()}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Price & Booking */}
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
                                                    {/* <tr>
                                                          <td>Adult (1)</td>
                                                          <td className="text-end">
                                                            INR5,499.30
                                                          </td>
                                                        </tr> */}
                                                    <tr>
                                                      <td>Base Fee</td>
                                                      <td className="text-end">
                                                        {flight.flightFare}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>Service Fee</td>
                                                      <td className="text-end">
                                                        {flight.serviceFare}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        Airline taxes and fees
                                                      </td>
                                                      <td className="text-end">
                                                        {flight.airlineTex}
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        Agency Commission fees
                                                      </td>
                                                      <td className="text-end">
                                                        {
                                                          flight.airlineCommission
                                                        }
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
                                              {flight.fromDetails}
                                            </strong>
                                            <p>
                                              {new Date(
                                                flight.departureTime
                                              ).toLocaleString()}{" "}
                                              -{" "}
                                              {new Date(
                                                flight.arrivalTime
                                              ).toLocaleString()}{" "}
                                              ({flight.duration})
                                            </p>
                                            <p>
                                              Operated by {flight.airline} |
                                              Flight {flight.flightNumber}
                                            </p>
                                            <p>
                                              Adult(s): {flight.baggerAmount}
                                              {flight.baggerType === "KILO"
                                                ? "kg"
                                                : "pc"}{" "}
                                              luggage free
                                            </p>
                                          </div>
                                          <div className="detail-segment">
                                            <strong>{flight.toDetails}</strong>
                                            <p>
                                              {new Date(
                                                flight.departureTime
                                              ).toLocaleString()}{" "}
                                              -{" "}
                                              {new Date(
                                                flight.arrivalTime
                                              ).toLocaleString()}
                                            </p>
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
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                          {/* Page Numbers */}
                          <span className="font-semibold text-[#123b67]">
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            onClick={() =>
                              setCurrentPage((prev) =>
                                prev < totalPages ? prev + 1 : prev
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="tab">
                    <div className="tab__list">
                      <div className="tab__item">Best</div>
                      <div className="tab__item">Cheapest</div>
                      <div className="tab__item">Fastest</div>
                    </div>
                    <div className="tab__content">
                      <div className="tab__content-item tab"></div>
                      <div className="tab__content-item"></div>
                      <div className="tab__content-item tab"></div>
                    </div>
                  </div> */}
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
