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
import { Link, useNavigate } from "react-router-dom";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import backgroundImage from "../assets/img/flight2.jpg";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../Url/BaseUrl";
import DatePicker from "react-datepicker";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const FlightSearch = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
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
  // const [journeyDate, setJourneyDate] = useState("");
  // const [journeyDate2, setJourneyDate2] = useState("");
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
  // const [isStarCollapsed, setIsStarCollapsed] = useState(true);
  const [apiFlights, setApiFlights] = useState([]);
  const [apiFlights2, setApiFlights2] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fareKey, setFareKey] = useState("");
  const [showAllAirlines, setShowAllAirlines] = useState(false);
  const [showAllFlightTimes, setShowAllFlightTimes] = useState(false);
  // null = any, 0 = direct, 1 = 1 stop
  const [selectedStops, setSelectedStops] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [selectedClass, setSelectedClass] = useState("Economy");
  const itemsPerPage = 10;
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  // const [multiCityData, setMultiCityData] = useState([
  //   { from: "", to: "", date: getTodayDate() },
  //   { from: "", to: "", date: getTodayDate() },
  // ]);
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);
  const [activeTab, setActiveTab] = useState("Best");

  const tabs = ["Best", "Cheapest", "Fastest"];
  const navigate = useNavigate();
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

  // const toggleStarCollapse = () => {
  //   setIsStarCollapsed(!isStarCollapsed);
  // };

  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0];
  //   setJourneyDate(today);
  //   setJourneyDate2(today);
  // }, []);

  // const handleDateChange = (e) => {
  //   setJourneyDate(e.target.value);
  // };
  // const handleDateChange2 = (e) => {
  //   setJourneyDate2(e.target.value);
  // };
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
        const response = await axios.post(
          `${API_BASE_URL}/airport/data`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
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
    setLoading(true);
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
        departure_date: departureDate,
        // return_date: journeyDate2,
        pax_list: [
          { type: "ADULT", count: adults },
          { type: "CHILD", count: children },
          { type: "INFANT", count: infants },
        ],
        accept_pending: true,
        cabin_type: travelClass,
      };
      const response = await axios.post(`${API_BASE_URL}/search`, searchData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      const flightsData = response.data?.result?.departure_flights || [];
      setApiFlights(flightsData);
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
      toast.error(
        error.response?.data?.error?.description || "Flight Searching Error",
        {
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Flight Return SearchAbility Data
  const fetchReturnAirportSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }
      const searchData = {
        from_destination: {
          city: true,
          code: fromInput2,
        },
        to_destination: {
          city: true,
          code: toInput2,
        },
        departure_date: startDate,
        return_date: endDate,
        pax_list: [
          { type: "ADULT", count: adults },
          { type: "CHILD", count: children },
          { type: "INFANT", count: infants },
        ],
        accept_pending: true,
        cabin_type: travelClass,
      };

      const response = await axios.post(`${API_BASE_URL}/search`, searchData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const flightsData = response.data?.result?.departure_flights || [];
      console.log("Flights found:", flightsData);
      setApiFlights2(flightsData);
      // navigate and pass data
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
    } finally {
      setLoading(false);
    }
  };

  // flight Booking Data
  const fetchfare = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const Token = localStorage.getItem("Token");

      if (!authToken || !Token) {
        const loginModal = new window.bootstrap.Modal(
          document.getElementById("exampleModal")
        );
        loginModal.show();
        return;
      }

      const fareData = {
        departure_fare_key: fareKey,
        pax_list: [
          { type: "ADULT", count: adults },
          // { type: "CHILD", count: children },
          // { type: "INFANT", count: infants },
        ],
      };

      const response = await axios.post(`${API_BASE_URL}/fare`, fareData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      const fareDetails = response.data?.result || {};
      console.log("search Page Fare", fareDetails);
      navigate("/booking_details", { state: { fareDetails } });
    } catch (error) {
      console.error(error);
    }
  };

  // OneWay filter data
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSelected(false);

    const filtered = airportList.filter((airport) =>
      `${airport.city_name} ${airport.city_code} ${airport.name} ${airport.country_code}`
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
      `${airport.city_name} ${airport.city_code} ${airport.name} ${airport.country_code}`
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
      `${airport.city_name} ${airport.city_code} ${airport.name} ${airport.country_code}`
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
      `${airport.city_name} ${airport.city_code} ${airport.name} ${airport.country_code}`
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
      `${airport.city_name} ${airport.city_code} ${airport.name} ${airport.country_code}`
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

  // const handleMultiDateChange = (e, index) => {
  //   const updatedData = [...multiCityData];
  //   updatedData[index].date = e.target.value;
  //   setMultiCityData(updatedData);
  // };

  const handleMultiDateChange = (date, index) => {
    const updatedData = [...multiCityData];
    updatedData[index].date = date;
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

  const location = useLocation();
  const locationFlights = location.state?.flights || [];
  const locationFlights2 = location.state?.flights2 || [];

  useEffect(() => {
    if (locationFlights.length > 0) {
      setApiFlights(locationFlights);
      setApiFlights2(locationFlights);
    }
  }, [locationFlights]);

  // ================= 09-09-25 =================
  useEffect(() => {
    if (locationFlights.length > 0) {
      setApiFlights(locationFlights);
    }
    if (locationFlights2.length > 0) {
      setApiFlights2(locationFlights2);
    }
  }, [locationFlights, locationFlights2]);

  useEffect(() => {
    const firstFlight = (
      apiFlights?.length > 0 ? apiFlights : apiFlights2
    )?.[0];
    if (firstFlight?.fares?.[0]?.fare_key) {
      setFareKey(firstFlight.fares[0].fare_key);
    }
  }, [apiFlights, apiFlights2]);

  // ================= 09-09-25 Helper =================
  const mapFlights = (flights) =>
    flights?.map((f) => {
      const leg = f.legs?.[0];
      const fare = f.fares?.[0]?.fare_info?.fare_detail;
      const baggage = leg?.baggages?.[0];
      const fareKey = f.fares?.[0]?.fare_key;

      return {
        airline: leg?.airline_info?.carrier_name || "Unknown Airline",
        flightNumber: leg?.flight_number,
        fromAirport: `${leg?.departure_info?.airport_code} (${leg?.departure_info?.city_name})`,
        fromCity: leg?.departure_info?.city_name,
        fromDetails: `${leg?.departure_info?.airport_code} - ${leg?.departure_info?.airport_name}, ${leg?.departure_info?.city_name}`,
        departureTime: leg?.departure_info?.date,
        toAirport: `${leg?.arrival_info?.airport_code} (${leg?.arrival_info?.city_name})`,
        toCity: leg?.arrival_info?.city_name,
        toDetails: `${leg?.arrival_info?.airport_code} - ${leg?.arrival_info?.airport_name}, ${leg?.arrival_info?.city_name}`,
        arrivalTime: leg?.arrival_info?.date,
        duration: `${leg?.time_info?.flight_time_hour}h ${leg?.time_info?.flight_time_minute}m`,
        baggerAmount: baggage?.amount,
        baggerType: baggage?.type,
        price: `${fare?.currency_code} ${fare?.price_info?.total_fare}`,
        flightFare: `${fare?.currency_code} ${fare?.price_info?.base_fare}`,
        serviceFare: `${fare?.currency_code} ${fare?.price_info?.service_fee}`,
        airlineTex: `${fare?.currency_code} ${fare?.price_info?.tax}`,
        airlineCommission: `${fare?.currency_code} ${fare?.price_info?.agency_commission}`,
        fareKey,
        legs: f.legs,
      };
    }) || [];

  const mappedFlights = mapFlights(apiFlights);
  const mappedFlightsReturn = mapFlights(apiFlights2);

  // ================= 09-09-25 =================
  // Merge flights for pagination
  const allFlights =
    mappedFlightsReturn.length > 0
      ? [...mappedFlights, ...mappedFlightsReturn] // round-trip
      : mappedFlights; // one-way

  // Pagination logic on merged data
  const totalPages = Math.ceil(allFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = allFlights.slice(startIndex, endIndex);

  // const mappedFlights = (
  //   apiFlights && apiFlights.length > 0 ? apiFlights : apiFlights2
  // )?.map((f) => {
  //   const leg = f.legs?.[0];
  //   const fare = f.fares?.[0]?.fare_info?.fare_detail;
  //   const baggage = leg?.baggages?.[0];
  //   const fareKey = f.fares?.[0]?.fare_key;

  //   return {
  //     airline: leg?.airline_info?.carrier_name || "Unknown Airline",
  //     flightNumber: leg?.flight_number,
  //     fromAirport: `${leg?.departure_info?.airport_name} (${leg?.departure_info?.city_name})`,
  //     fromCity: leg?.departure_info?.city_name,
  //     fromDetails: `${leg?.departure_info?.airport_code} - ${leg?.departure_info?.airport_name}, ${leg?.departure_info?.city_name}`,
  //     departureTime: leg?.departure_info?.date,
  //     toAirport: `${leg?.arrival_info?.airport_name} (${leg?.arrival_info?.city_name})`,
  //     toCity: leg?.arrival_info?.city_name,
  //     toDetails: `${leg?.arrival_info?.airport_code} - ${leg?.arrival_info?.airport_name}, ${leg?.arrival_info?.city_name}`,
  //     arrivalTime: leg?.arrival_info?.date,
  //     duration: `${leg?.time_info?.flight_time_hour}h ${leg?.time_info?.flight_time_minute}m`,
  //     baggerAmount: baggage?.amount,
  //     baggerType: baggage?.type,
  //     price: `${fare?.currency_code} ${fare?.price_info?.total_fare}`,
  //     flightFare: `${fare?.currency_code} ${fare?.price_info?.base_fare}`,
  //     serviceFare: `${fare?.currency_code} ${fare?.price_info?.service_fee}`,
  //     airlineTex: `${fare?.currency_code} ${fare?.price_info?.tax}`,
  //     airlineCommission: `${fare?.currency_code} ${fare?.price_info?.agency_commission}`,
  //     fareKey,
  //     legs: f.legs, // ✅ keep original legs
  //   };
  // });

  // 1. Count flights per airline
  const airlineCounts = mappedFlights.reduce((acc, flight) => {
    const airline = flight.airline;
    acc[airline] = (acc[airline] || 0) + 1;
    return acc;
  }, {});

  // 2. Convert to array of objects [{ airline, count }]
  const uniqueAirlines = Object.entries(airlineCounts).map(
    ([airline, count]) => ({
      airline,
      count,
    })
  );

  // 3. Apply "Show More" logic
  const visibleAirlines = showAllAirlines
    ? uniqueAirlines
    : uniqueAirlines.slice(0, 10);

  const uniqueFlightTimes = [
    ...new Map(
      mappedFlights.map((f) => [`${f.departureTime}-${f.arrivalTime}`, f])
    ).values(),
  ];

  // Show only 10 if not expanded
  const visibleFlightTimes = showAllFlightTimes
    ? uniqueFlightTimes
    : uniqueFlightTimes.slice(0, 10);

  // Example: apply airline + stops filter (expand as needed)
  const flightsWithStops = mappedFlights.map((f) => ({
    ...f,
    stops: (f.legs?.length ?? 1) - 1, // ✅ safe check
  }));

  const totalFlights = flightsWithStops.length;
  const directFlights = flightsWithStops.filter((f) => f.stops === 0).length;
  const oneStopFlights = flightsWithStops.filter((f) => f.stops === 1).length;
  const twoStopFlights = flightsWithStops.filter((f) => f.stops >= 2).length;
  const filteredFlights = flightsWithStops.filter((f) => {
    if (selectedStops === null) return true; // Any
    if (selectedStops === 0) return f.stops === 0; // Direct
    if (selectedStops === 1) return f.stops === 1; // 1 stop
    if (selectedStops === 2) return f.stops >= 2; // 2+ stops
    return true;
  });

  // const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = filteredFlights.slice(startIndex, endIndex);

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

  const handleSubmitNormalUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Please enter email!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!password) {
      toast.error("Please enter password!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
        user_type: 1,
      });
      console.log(response);
      if (response.data.success === true) {
        const fname = response.data.data.first_name;
        const lname = response.data.data.last_name;
        const email = response.data.data.email;
        const token = response.data.data.token;
        const id = response.data.data.user_id;
        const image = response.data.data.image;
        localStorage.setItem("FirstName", fname);
        localStorage.setItem("LastName", lname);
        localStorage.setItem("Email", email);
        localStorage.setItem("Token", token);
        localStorage.setItem("Id", id);
        localStorage.setItem("Image", image);
        toast.success(response.data.message);
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal.hide();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      console.error(errorMsg);
      toast.error(errorMsg, {
        autoClose: 1000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
    // console.log(email);
    // console.log(password);
  };

  const handleSubmitCorporateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email2) {
      toast.error("Please enter Email!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!password2) {
      toast.error("Please enter password!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email2,
        password: password2,
        user_type: 2,
      });
      if (response.data.success === true) {
        const fname = response.data.data.first_name;
        const lname = response.data.data.last_name;
        const email = response.data.data.email;
        const token = response.data.data.token;
        const id = response.data.data.user_id;
        localStorage.setItem("FirstName", fname);
        localStorage.setItem("LastName", lname);
        localStorage.setItem("Email", email);
        localStorage.setItem("Token", token);
        localStorage.setItem("Id", id);
        toast.success(response.data.message);
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal.hide();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      console.error(errorMsg);
      toast.error(errorMsg, {
        autoClose: 1000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
    // console.log(email2);
    // console.log(password2);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract user info
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;
      const email = decoded.email;
      const image = decoded.picture;
      const googleId = decoded.sub;

      // Store locally (optional)
      localStorage.setItem("FirstName", firstName);
      localStorage.setItem("LastName", lastName);
      localStorage.setItem("Email", email);
      localStorage.setItem("Image", image);
      // localStorage.setItem("Token", credentialResponse.credential);

      // Prepare payload for backend login
      const payload = {
        email: email,
        password: "",
        user_type: 1,
        provideBy: "google",
        provideID: googleId,
      };

      // Send login request to backend
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      if (res.data?.success) {
        const id = res.data.data.user_id;
        const token = res.data.data.token;
        localStorage.setItem("Id", id);
        localStorage.setItem("Token", token);
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        toast.success("Login successful!");
        console.log("Login response:", res.data);
        navigate("/");
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal?.hide();
      } else {
        toast.error(res.data?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Something went wrong during login!");
    }
  };

  const handleGoogleSuccess2 = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract user info
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;
      const email = decoded.email;
      const image = decoded.picture;
      const googleId = decoded.sub;

      // Store locally (optional)
      localStorage.setItem("FirstName", firstName);
      localStorage.setItem("LastName", lastName);
      localStorage.setItem("Email", email);
      localStorage.setItem("Image", image);
      // localStorage.setItem("Token", credentialResponse.credential);

      // Prepare payload for backend login
      const payload = {
        email: email,
        password: "",
        user_type: 2,
        provideBy: "google",
        provideID: googleId,
      };

      // Send login request to backend
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      if (res.data?.success) {
        const id = res.data.data.user_id;
        const token = res.data.data.token;
        localStorage.setItem("Id", id);
        localStorage.setItem("Token", token);
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        toast.success("Login successful!");
        console.log("Login response:", res.data);
        navigate("/");

        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal?.hide();
      } else {
        toast.error(res.data?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Something went wrong during login!");
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    toast.error("Google Login Failed!");
  };

  return (
    <>
      <Header />
      <ToastContainer />
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
                  <div className="card home-card">
                    <div className="card-body">
                      <form onSubmit={fetchAirportSearch}>
                        <div className="row mb-2 align-items-center">
                          <div className="col-md-12">
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
                                      placeholder="Origin Airport"
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
                                            {airport.city_name}(
                                            {airport.city_code}) -{" "}
                                            {airport.name} (
                                            {airport.country_code})
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
                                      placeholder="Destination Airport"
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
                                            {airport.city_name}(
                                            {airport.city_code}) -{" "}
                                            {airport.name} (
                                            {airport.country_code})
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
                                      <span>Departure</span>
                                    </div>
                                    <DatePicker
                                      selected={departureDate}
                                      onChange={(date) =>
                                        setDepartureDate(date)
                                      }
                                      monthsShown={2}
                                      minDate={new Date()}
                                      dateFormat="dd MMM yyyy"
                                      placeholderText="dd-mm-yyyy"
                                      className="rounded w-full cursor-pointer"
                                    />
                                    {departureDate && (
                                      <div className="mt-1 text-sm">
                                        <span className="block italic text-gray-500">
                                          {departureDate.toLocaleDateString(
                                            "en-US",
                                            {
                                              weekday: "long",
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            }
                                          )}
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
                                          <div>
                                            <span
                                              className="custom_button"
                                              onClick={() =>
                                                setShowDropdown(false)
                                              }
                                            >
                                              Save
                                            </span>
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
                          <div className="col-md-12">
                            <div className="top_form_search_button">
                              <button
                                type="submit"
                                // onClick={searchTab}
                                className="btn btn_theme btn_md"
                              >
                                {loading ? "Searching.." : "Search"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- Flight Search Areas --> */}
                  <section
                    section
                    id="explore_area"
                    className="section_padding pt-30"
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 mb-4 text-center">
                          <h4>Choose type of Flights you are interested</h4>
                        </div>
                        <Slider {...setting} className="row">
                          {uniqueAirlines.map((air, idx) => (
                            <div className="col-md-3 mb-4" key={idx}>
                              <div className="card booking-card pull-up">
                                <div className="card-body">
                                  <div className="card-contact">
                                    <div className="">
                                      <div className="clock-icon">
                                        <BiSolidPlane />
                                      </div>
                                    </div>
                                    <div className="info-contact">
                                      <h6>{air.airline}</h6>
                                      <p>{air.count} Flights</p>
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
                                  style={{
                                    display: isPriceCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === null}
                                      onChange={() => setSelectedStops(null)}
                                    />{" "}
                                    Any ({totalFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 0}
                                      onChange={() => setSelectedStops(0)}
                                    />
                                    Direct only ({directFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 1}
                                      onChange={() => setSelectedStops(1)}
                                    />{" "}
                                    1 stop max ({oneStopFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 2}
                                      onChange={() => setSelectedStops(2)}
                                    />{" "}
                                    2+ stops ({twoStopFlights})
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
                                  style={{
                                    display: isPopularCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleAirlines.map((air, index) => (
                                    <label
                                      key={index}
                                      style={{ display: "block" }}
                                    >
                                      <input type="checkbox" /> {air.airline} (
                                      {air.count})
                                    </label>
                                  ))}

                                  {uniqueAirlines.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllAirlines(!showAllAirlines)
                                      }
                                    >
                                      {showAllAirlines
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
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
                                    display: isPropertyCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleFlightTimes.map((flight, t) => (
                                    <label key={t} style={{ display: "block" }}>
                                      <input type="checkbox" />{" "}
                                      {new Date(
                                        flight.departureTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      –{" "}
                                      {new Date(
                                        flight.arrivalTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </label>
                                  ))}

                                  {/* Show More / Less button */}
                                  {uniqueFlightTimes.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllFlightTimes(
                                          !showAllFlightTimes
                                        )
                                      }
                                    >
                                      {showAllFlightTimes
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="flight-tabs">
                                <div className="tab-container">
                                  {tabs.map((tab) => (
                                    <div
                                      key={tab}
                                      className={`tab ${
                                        activeTab === tab ? "active" : ""
                                      }`}
                                      onClick={() => setActiveTab(tab)}
                                    >
                                      {tab}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="row">
                                  <div className="col-md-12 mb-4">
                                    <div className="flight-search">
                                      <h6>
                                        {totalFlights} Flights Found on Your
                                        Search
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <div className="card banner-card">
                                      <div className="card-body">
                                        <div className="text-cont">
                                          <h6>
                                            <AiOutlineInfoCircle /> Save an
                                            average of 15% on thousands of
                                            flights when you're signed in
                                          </h6>
                                          {/* <button
                                            type="button"
                                            class="btn btn_theme btn_md"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            Sign In
                                          </button> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
                                    {/* Each item becomes a slide */}
                                    {[...Array(7)].map((_, index) => (
                                      <div key={index} className="px-2">
                                        <button className="btn chooseBtnFlt w-100">
                                          <span className="smalltext">
                                            Jul 16
                                          </span>
                                          <div></div>
                                          <span className="priceBigText">
                                            $1,102
                                          </span>
                                        </button>
                                      </div>
                                    ))}
                                  </Slider>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="flight_search_result_wrapper">
                                      {/* ✅ If Return flights exist -> Show departure + return */}
                                      {paginatedData.map((flight, index) => (
                                        <div
                                          className="flight_search_item_wrappper"
                                          key={index}
                                        >
                                          <div className="card flight_search_items">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-9 flight-serach-main">
                                                  {/* Departure */}
                                                  <div className="">
                                                    <div className="d-flex align-items-center gap-5">
                                                      <div className="flight_logo">
                                                        <img
                                                          src={flightImg}
                                                          alt="img"
                                                        />
                                                        <p>{flight.airline}</p>
                                                      </div>
                                                      <div className="flight_search_destination">
                                                        <h3>
                                                          {new Date(
                                                            flight.departureTime
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                        <p>
                                                          {flight.legs?.length >
                                                          1
                                                            ? `${
                                                                flight.legs
                                                                  .length - 1
                                                              } Stop${
                                                                flight.legs
                                                                  .length -
                                                                  1 >
                                                                1
                                                                  ? "s"
                                                                  : ""
                                                              }`
                                                            : "Non-stop"}
                                                        </p>
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
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                  {/* return */}
                                                </div>
                                                {/* Price & Booking */}
                                                <div className="col-md-3 d-flex justify-content-end">
                                                  <div className="flight_search_right">
                                                    <div className="extra-dis">
                                                      <FaClipboardList />
                                                      <FaBagShopping />
                                                      <FaSuitcaseRolling />
                                                    </div>
                                                    <div
                                                      className="allsameheading"
                                                      style={{
                                                        position: "relative",
                                                      }}
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
                                                            <h5>
                                                              Price details
                                                            </h5>
                                                            <IoClose
                                                              className="cross-icon"
                                                              onClick={() =>
                                                                toggleDropdown(
                                                                  index
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <div className="item price-bdy">
                                                            <table className="w-100">
                                                              <tbody>
                                                                <tr>
                                                                  <td>
                                                                    <h6>
                                                                      Flights
                                                                    </h6>
                                                                  </td>
                                                                  <td className="text-end">
                                                                    <p>
                                                                      Includes
                                                                      taxes and
                                                                      fees
                                                                    </p>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Base Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.flightFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Service Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.serviceFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Airline
                                                                    taxes and
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineTex
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Agency
                                                                    Commission
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineCommission
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Total:
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.price
                                                                    }
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
                                                        onClick={fetchfare}
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
                                                    onClick={() =>
                                                      handleToggle(index)
                                                    }
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
                                                          Operated by{" "}
                                                          {flight.airline} |
                                                          Flight{" "}
                                                          {flight.flightNumber}
                                                        </p>
                                                        <p>
                                                          Adult(s):{" "}
                                                          {flight.baggerAmount}
                                                          {flight.baggerType ===
                                                          "KILO"
                                                            ? "kg"
                                                            : "pc"}{" "}
                                                          luggage free
                                                        </p>
                                                      </div>
                                                      <div className="detail-segment">
                                                        <strong>
                                                          {flight.toDetails}
                                                        </strong>
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
                                    {totalPages > 1 && (
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
                                        <span className="font-semibold text-[#123b67]">
                                          Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              prev < totalPages
                                                ? prev + 1
                                                : prev
                                            )
                                          }
                                          disabled={currentPage === totalPages}
                                        >
                                          Next
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/* return */}
                <div
                  className="tab-pane fade"
                  id="roundtrip"
                  role="tabpanel"
                  aria-labelledby="roundtrip-tab"
                >
                  <div className="card home-card">
                    <div className="card-body">
                      <form onSubmit={fetchReturnAirportSearch}>
                        <div className="row mb-2 align-items-center">
                          <div className="col-md-12">
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
                                      placeholder="Origin Airport"
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
                                            {airport.city_name}(
                                            {airport.city_code}) -{" "}
                                            {airport.name} (
                                            {airport.country_code})
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
                                      placeholder="Destination Airport"
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
                                              {airport.city_name}(
                                              {airport.city_code}) -{" "}
                                              {airport.name} (
                                              {airport.country_code})
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
                                    <span>Departure & Return</span>
                                    <DatePicker
                                      selectsRange
                                      startDate={startDate}
                                      endDate={endDate}
                                      onChange={(update) =>
                                        setDateRange(update)
                                      }
                                      monthsShown={2}
                                      minDate={new Date()}
                                      placeholderText="dd-mm-yyyy to dd-mm-yyyy"
                                      className="rounded w-full cursor-pointer Date_Input"
                                    />
                                    {(startDate || endDate) && (
                                      <div className="mt-1 text-sm">
                                        <span className="italic text-gray-500">
                                          {startDate &&
                                            startDate.toLocaleDateString(
                                              "en-GB",
                                              {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                              }
                                            )}
                                          {endDate &&
                                            " → " +
                                              endDate.toLocaleDateString(
                                                "en-GB",
                                                {
                                                  weekday: "long",
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                                }
                                              )}
                                        </span>
                                      </div>
                                    )}
                                    {/* {journeyDate && (
                                  <div className="mt-1 text-sm">
                                    <span className="block italic text-gray-500">
                                      {new Date(
                                        journeyDate
                                      ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                )} */}
                                  </div>
                                </div>
                                {/* <div className="flight_Search_boxed date_flex_area">
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
                                {journeyDate2 && (
                                  <div className="mt-1 text-sm">
                                    <span className="block italic text-gray-500">
                                      {new Date(
                                        journeyDate2
                                      ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div> */}
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
                                          <div>
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
                                    )}
                                  </div>
                                  <span onChange={handleClassChange}>
                                    {travelClass}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="top_form_search_button">
                              <button
                                type="submit"
                                // onClick={searchTab}
                                className="btn btn_theme btn_md"
                              >
                                {loading ? "Searching.." : "Search"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- Flight Search Areas --> */}
                  <section
                    section
                    id="explore_area"
                    className="section_padding pt-30"
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 mb-4 text-center">
                          <h4>Choose type of Flights you are interested</h4>
                        </div>
                        <Slider {...setting} className="row">
                          {uniqueAirlines.map((air, idx) => (
                            <div className="col-md-3 mb-4" key={idx}>
                              <div className="card booking-card pull-up">
                                <div className="card-body">
                                  <div className="card-contact">
                                    <div className="">
                                      <div className="clock-icon">
                                        <BiSolidPlane />
                                      </div>
                                    </div>
                                    <div className="info-contact">
                                      <h6>{air.airline}</h6>
                                      <p>{air.count} Flights</p>
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
                                  style={{
                                    display: isPriceCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === null}
                                      onChange={() => setSelectedStops(null)}
                                    />{" "}
                                    Any ({totalFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 0}
                                      onChange={() => setSelectedStops(0)}
                                    />
                                    Direct only ({directFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 1}
                                      onChange={() => setSelectedStops(1)}
                                    />{" "}
                                    1 stop max ({oneStopFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 2}
                                      onChange={() => setSelectedStops(2)}
                                    />{" "}
                                    2+ stops ({twoStopFlights})
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
                                  style={{
                                    display: isPopularCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleAirlines.map((air, index) => (
                                    <label
                                      key={index}
                                      style={{ display: "block" }}
                                    >
                                      <input type="checkbox" /> {air.airline} (
                                      {air.count})
                                    </label>
                                  ))}

                                  {uniqueAirlines.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllAirlines(!showAllAirlines)
                                      }
                                    >
                                      {showAllAirlines
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
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
                                    display: isPropertyCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleFlightTimes.map((flight, t) => (
                                    <label key={t} style={{ display: "block" }}>
                                      <input type="checkbox" />{" "}
                                      {new Date(
                                        flight.departureTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      –{" "}
                                      {new Date(
                                        flight.arrivalTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </label>
                                  ))}

                                  {/* Show More / Less button */}
                                  {uniqueFlightTimes.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllFlightTimes(
                                          !showAllFlightTimes
                                        )
                                      }
                                    >
                                      {showAllFlightTimes
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="flight-tabs">
                                <div className="tab-container">
                                  {tabs.map((tab) => (
                                    <div
                                      key={tab}
                                      className={`tab ${
                                        activeTab === tab ? "active" : ""
                                      }`}
                                      onClick={() => setActiveTab(tab)}
                                    >
                                      {tab}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="row">
                                  <div className="col-md-12 mb-4">
                                    <div className="flight-search">
                                      <h6>
                                        {totalFlights} Flights Found on Your
                                        Search
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <div className="card banner-card">
                                      <div className="card-body">
                                        <div className="text-cont">
                                          <h6>
                                            <AiOutlineInfoCircle /> Save an
                                            average of 15% on thousands of
                                            flights when you're signed in
                                          </h6>
                                          {/* <button
                                            type="button"
                                            class="btn btn_theme btn_md"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            Sign In
                                          </button> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
                                    {/* Each item becomes a slide */}
                                    {[...Array(7)].map((_, index) => (
                                      <div key={index} className="px-2">
                                        <button className="btn chooseBtnFlt w-100">
                                          <span className="smalltext">
                                            Jul 16
                                          </span>
                                          <div></div>
                                          <span className="priceBigText">
                                            $1,102
                                          </span>
                                        </button>
                                      </div>
                                    ))}
                                  </Slider>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="flight_search_result_wrapper">
                                      {/* ✅ If Return flights exist -> Show departure + return */}
                                      {paginatedData.map((flight, index) => (
                                        <div
                                          className="flight_search_item_wrappper"
                                          key={index}
                                        >
                                          <div className="card flight_search_items">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-9 flight-serach-main">
                                                  {/* Departure */}
                                                  <div className="">
                                                    <div className="d-flex align-items-center gap-5">
                                                      <div className="flight_logo">
                                                        <img
                                                          src={flightImg}
                                                          alt="img"
                                                        />
                                                        <p>{flight.airline}</p>
                                                      </div>
                                                      <div className="flight_search_destination">
                                                        <h3>
                                                          {new Date(
                                                            flight.departureTime
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                        <p>
                                                          {flight.legs?.length >
                                                          1
                                                            ? `${
                                                                flight.legs
                                                                  .length - 1
                                                              } Stop${
                                                                flight.legs
                                                                  .length -
                                                                  1 >
                                                                1
                                                                  ? "s"
                                                                  : ""
                                                              }`
                                                            : "Non-stop"}
                                                        </p>
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
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                  {/* return */}
                                                </div>
                                                {/* Price & Booking */}
                                                <div className="col-md-3 d-flex justify-content-end">
                                                  <div className="flight_search_right">
                                                    <div className="extra-dis">
                                                      <FaClipboardList />
                                                      <FaBagShopping />
                                                      <FaSuitcaseRolling />
                                                    </div>
                                                    <div
                                                      className="allsameheading"
                                                      style={{
                                                        position: "relative",
                                                      }}
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
                                                            <h5>
                                                              Price details
                                                            </h5>
                                                            <IoClose
                                                              className="cross-icon"
                                                              onClick={() =>
                                                                toggleDropdown(
                                                                  index
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <div className="item price-bdy">
                                                            <table className="w-100">
                                                              <tbody>
                                                                <tr>
                                                                  <td>
                                                                    <h6>
                                                                      Flights
                                                                    </h6>
                                                                  </td>
                                                                  <td className="text-end">
                                                                    <p>
                                                                      Includes
                                                                      taxes and
                                                                      fees
                                                                    </p>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Base Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.flightFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Service Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.serviceFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Airline
                                                                    taxes and
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineTex
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Agency
                                                                    Commission
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineCommission
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Total:
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.price
                                                                    }
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
                                                        onClick={fetchfare}
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
                                                    onClick={() =>
                                                      handleToggle(index)
                                                    }
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
                                                          Operated by{" "}
                                                          {flight.airline} |
                                                          Flight{" "}
                                                          {flight.flightNumber}
                                                        </p>
                                                        <p>
                                                          Adult(s):{" "}
                                                          {flight.baggerAmount}
                                                          {flight.baggerType ===
                                                          "KILO"
                                                            ? "kg"
                                                            : "pc"}{" "}
                                                          luggage free
                                                        </p>
                                                      </div>
                                                      <div className="detail-segment">
                                                        <strong>
                                                          {flight.toDetails}
                                                        </strong>
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
                                    {totalPages > 1 && (
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
                                        <span className="font-semibold text-[#123b67]">
                                          Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              prev < totalPages
                                                ? prev + 1
                                                : prev
                                            )
                                          }
                                          disabled={currentPage === totalPages}
                                        >
                                          Next
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/* multi-city */}
                <div
                  className="tab-pane fade"
                  id="multi_city"
                  role="tabpanel"
                  aria-labelledby="multi_city-tab"
                >
                  <div className="card home-card">
                    <div className="card-body">
                      <form action="#!">
                        {multiCityData.map((segment, index) => (
                          <div key={index}>
                            <div className="row mb-2 align-items-center">
                              <div className="col-lg-12">
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
                                          placeholder="Origin Airport"
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
                                                  {airport.city_name}(
                                                  {airport.city_code}) -{" "}
                                                  {airport.name} (
                                                  {airport.country_code})
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
                                        <span>
                                          Start typing to filter airports
                                        </span>
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
                                          placeholder="Destination Airport"
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
                                                  {airport.city_name}(
                                                  {airport.city_code}) -{" "}
                                                  {airport.name} (
                                                  {airport.country_code})
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
                                        <span>Select Destination airport</span>
                                      </div>
                                      <div className="range_plan">
                                        <i>
                                          <FaExchangeAlt />
                                        </i>
                                      </div>
                                    </div>

                                    <div className="flight_Search_boxed date_flex_area">
                                      <div key={index} className="Journey_date">
                                        <div className="">
                                          <span>Departure</span>
                                        </div>
                                        <DatePicker
                                          selected={
                                            segment.date
                                              ? new Date(segment.date)
                                              : null
                                          }
                                          onChange={(date) =>
                                            handleMultiDateChange(date, index)
                                          }
                                          monthsShown={2}
                                          minDate={new Date()}
                                          dateFormat="dd MMM yyyy"
                                          placeholderText="dd-mm-yyyy"
                                          className="rounded w-full cursor-pointer"
                                        />
                                        {segment.date && (
                                          <div className="mt-1 text-sm">
                                            <span className="block italic text-gray-500">
                                              {new Date(
                                                segment.date
                                              ).toLocaleDateString("en-US", {
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
                                                <div>
                                                  <span
                                                    className="custom_button"
                                                    onClick={() =>
                                                      setShowDropdown(
                                                        !showDropdown
                                                      )
                                                    }
                                                  >
                                                    Save
                                                  </span>
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
                              <div className="col-md-12">
                                <div className="multi_form_remove mt-2">
                                  {index > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeFlightSegment(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
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
                        ))}
                        {multiCityData.length < 5 && (
                          <div className="top_form_search_button mt-3">
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
                  {/* <!-- Flight Search Areas --> */}
                  <section
                    section
                    id="explore_area"
                    className="section_padding pt-30"
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 mb-4 text-center">
                          <h4>Choose type of Flights you are interested</h4>
                        </div>
                        <Slider {...setting} className="row">
                          {uniqueAirlines.map((air, idx) => (
                            <div className="col-md-3 mb-4" key={idx}>
                              <div className="card booking-card pull-up">
                                <div className="card-body">
                                  <div className="card-contact">
                                    <div className="">
                                      <div className="clock-icon">
                                        <BiSolidPlane />
                                      </div>
                                    </div>
                                    <div className="info-contact">
                                      <h6>{air.airline}</h6>
                                      <p>{air.count} Flights</p>
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
                          <div className="card booking-card m-0">
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
                                  style={{
                                    display: isPriceCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === null}
                                      onChange={() => setSelectedStops(null)}
                                    />{" "}
                                    Any ({totalFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 0}
                                      onChange={() => setSelectedStops(0)}
                                    />
                                    Direct only ({directFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 1}
                                      onChange={() => setSelectedStops(1)}
                                    />{" "}
                                    1 stop max ({oneStopFlights})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops === 2}
                                      onChange={() => setSelectedStops(2)}
                                    />{" "}
                                    2+ stops ({twoStopFlights})
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
                                  style={{
                                    display: isPopularCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleAirlines.map((air, index) => (
                                    <label
                                      key={index}
                                      style={{ display: "block" }}
                                    >
                                      <input type="checkbox" /> {air.airline} (
                                      {air.count})
                                    </label>
                                  ))}

                                  {uniqueAirlines.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllAirlines(!showAllAirlines)
                                      }
                                    >
                                      {showAllAirlines
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
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
                                    display: isPropertyCollapsed
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {visibleFlightTimes.map((flight, t) => (
                                    <label key={t} style={{ display: "block" }}>
                                      <input type="checkbox" />{" "}
                                      {new Date(
                                        flight.departureTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      –{" "}
                                      {new Date(
                                        flight.arrivalTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </label>
                                  ))}

                                  {/* Show More / Less button */}
                                  {uniqueFlightTimes.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllFlightTimes(
                                          !showAllFlightTimes
                                        )
                                      }
                                    >
                                      {showAllFlightTimes
                                        ? "Show Less..."
                                        : "Show More..."}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="flight-tabs">
                                <div className="tab-container">
                                  {tabs.map((tab) => (
                                    <div
                                      key={tab}
                                      className={`tab ${
                                        activeTab === tab ? "active" : ""
                                      }`}
                                      onClick={() => setActiveTab(tab)}
                                    >
                                      {tab}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="row">
                                  <div className="col-md-12 mb-4">
                                    <div className="flight-search">
                                      <h6>
                                        {totalFlights} Flights Found on Your
                                        Search
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col-md-12 mb-4">
                                    <div className="card banner-card">
                                      <div className="card-body">
                                        <div className="text-cont">
                                          <h6>
                                            <AiOutlineInfoCircle /> Save an
                                            average of 15% on thousands of
                                            flights when you're signed in
                                          </h6>
                                          {/* <button
                                            type="button"
                                            class="btn btn_theme btn_md"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            Sign In
                                          </button> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
                                    {/* Each item becomes a slide */}
                                    {[...Array(7)].map((_, index) => (
                                      <div key={index} className="px-2">
                                        <button className="btn chooseBtnFlt w-100">
                                          <span className="smalltext">
                                            Jul 16
                                          </span>
                                          <div></div>
                                          <span className="priceBigText">
                                            $1,102
                                          </span>
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
                                                <div className="col-md-9 flight-serach-main">
                                                  {/* Departure */}
                                                  <div className="">
                                                    <div className="d-flex align-items-center gap-5">
                                                      <div className="flight_logo">
                                                        <img
                                                          src={flightImg}
                                                          alt="img"
                                                        />
                                                        <p>{flight.airline}</p>
                                                      </div>
                                                      <div className="flight_search_destination">
                                                        <h3>
                                                          {new Date(
                                                            flight.departureTime
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                        <p>
                                                          {flight.legs?.length >
                                                          1
                                                            ? `${
                                                                flight.legs
                                                                  .length - 1
                                                              } Stop${
                                                                flight.legs
                                                                  .length -
                                                                  1 >
                                                                1
                                                                  ? "s"
                                                                  : ""
                                                              }`
                                                            : "Non-stop"}
                                                        </p>
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
                                                          ).toLocaleTimeString(
                                                            [],
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
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
                                                  {/* return */}
                                                </div>
                                                {/* Price & Booking */}
                                                <div className="col-md-3 d-flex justify-content-end">
                                                  <div className="flight_search_right">
                                                    <div className="extra-dis">
                                                      <FaClipboardList />
                                                      <FaBagShopping />
                                                      <FaSuitcaseRolling />
                                                    </div>
                                                    <div
                                                      className="allsameheading"
                                                      style={{
                                                        position: "relative",
                                                      }}
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
                                                            <h5>
                                                              Price details
                                                            </h5>
                                                            <IoClose
                                                              className="cross-icon"
                                                              onClick={() =>
                                                                toggleDropdown(
                                                                  index
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <div className="item price-bdy">
                                                            <table className="w-100">
                                                              <tbody>
                                                                <tr>
                                                                  <td>
                                                                    <h6>
                                                                      Flights
                                                                    </h6>
                                                                  </td>
                                                                  <td className="text-end">
                                                                    <p>
                                                                      Includes
                                                                      taxes and
                                                                      fees
                                                                    </p>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Base Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.flightFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Service Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.serviceFare
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Airline
                                                                    taxes and
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineTex
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Agency
                                                                    Commission
                                                                    fees
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.airlineCommission
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Total:
                                                                  </td>
                                                                  <td className="text-end">
                                                                    {
                                                                      flight.price
                                                                    }
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
                                                        onClick={fetchfare}
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
                                                    onClick={() =>
                                                      handleToggle(index)
                                                    }
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
                                                          Operated by{" "}
                                                          {flight.airline} |
                                                          Flight{" "}
                                                          {flight.flightNumber}
                                                        </p>
                                                        <p>
                                                          Adult(s):{" "}
                                                          {flight.baggerAmount}
                                                          {flight.baggerType ===
                                                          "KILO"
                                                            ? "kg"
                                                            : "pc"}{" "}
                                                          luggage free
                                                        </p>
                                                      </div>
                                                      <div className="detail-segment">
                                                        <strong>
                                                          {flight.toDetails}
                                                        </strong>
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
                                    {totalPages > 1 && (
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
                                        <span className="font-semibold text-[#123b67]">
                                          Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              prev < totalPages
                                                ? prev + 1
                                                : prev
                                            )
                                          }
                                          disabled={currentPage === totalPages}
                                        >
                                          Next
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sign-in modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login Now
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="common_author_form p-0">
                <ul
                  className="nav nav-tabs custom-tab-toggle mb-2"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="normalUsers-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#normalUsers-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="normalUsers-tab-pane"
                      aria-selected="true"
                    >
                      Individual User
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="corporate-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#corporate-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="corporate-tab-pane"
                      aria-selected="false"
                    >
                      Corporate User
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="normalUsers-tab-pane"
                    role="tabpanel"
                    aria-labelledby="normalUsers-tab"
                    tabindex="0"
                  >
                    <form
                      id="main_author_form"
                      onSubmit={handleSubmitNormalUser}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="field-set">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              placeholder="Enter your email"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field-set position-relative">
                            <label>
                              Password<span>*</span>
                            </label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              placeholder="Enter your password"
                            />
                          </div>
                        </div>
                      </div>
                      <Link to="/forget_password">Forgot password?</Link>
                      <div className="common_form_submit">
                        <button
                          type="button"
                          className="btn btn_theme btn_md w-100"
                          onClick={handleSubmitNormalUser}
                        >
                          {loading ? "Login..." : "Login"}
                        </button>
                      </div>
                      <div className="social-login-section">
                        <div className="divide">
                          <span>or login with</span>
                        </div>

                        <div className="social-buttons">
                          {/* <a href="#" className="social-btn google">
                            <img
                              src="https://www.svgrepo.com/show/355037/google.svg"
                              alt="Google"
                            />
                            Google
                          </a> */}
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            shape="pill"
                            width="250"
                          />

                          {/* <a href="#" className="social-btn facebook">
                            <img
                              src="https://www.svgrepo.com/show/157806/facebook.svg"
                              alt="Facebook"
                            />
                            Facebook
                          </a> */}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="corporate-tab-pane"
                    role="tabpanel"
                    aria-labelledby="corporate-tab"
                    tabindex="0"
                  >
                    <form
                      id="main_author_form"
                      onSubmit={handleSubmitCorporateUser}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="field-set">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              type="text"
                              value={email2}
                              onChange={(e) => setEmail2(e.target.value)}
                              className="form-control"
                              placeholder="Enter your email"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="field-set position-relative">
                            <label>
                              Password<span>*</span>
                            </label>
                            <input
                              type="password"
                              value={password2}
                              onChange={(e) => setPassword2(e.target.value)}
                              className="form-control"
                              placeholder="Enter your password"
                              autocomplete="off"
                            />
                            {/* <span
                              onClick={() => setShowPassword(!showPassword)}
                              style={iconStyle}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span> */}
                          </div>
                        </div>
                      </div>
                      <Link to="/forget_password">Forgot password?</Link>
                      <div className="common_form_submit">
                        <button
                          type="button"
                          className="btn btn_theme btn_md w-100"
                          onClick={handleSubmitCorporateUser}
                        >
                          {loading ? "Login..." : "Login"}
                        </button>
                      </div>
                      <div class="social-login-section">
                        <div class="divide">
                          <span>or login with</span>
                        </div>

                        <div class="social-buttons">
                          {/* <a href="#" class="social-btn google">
                            <img
                              src="https://www.svgrepo.com/show/355037/google.svg"
                              alt="Google"
                            />
                            Google
                          </a> */}
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess2}
                            onError={handleGoogleError}
                            shape="pill"
                            width="250"
                          />
                          {/* <a href="#" class="social-btn facebook">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                              alt="Facebook"
                            />
                            Facebook
                          </a> */}
                          {/* <FacebookLogin
                            appId={FB_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            width="250"
                          /> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </>
  );
};
export default FlightSearch;
