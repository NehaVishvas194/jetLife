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
import { FLIGHT_API } from "../Url/BaseUrl";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const FlightSearch = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
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
  const [travelClass, setTravelClass] = useState("economy");
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
  const location = useLocation();
  const { activeUITab } = location.state || {};
  const [rowFlights, setRowFlights] = useState(location.state?.Flights || []);
  const [rowFlightsReturn, setRowFlightsReturn] = useState(
    location.state?.FlightReturn || []
  );
  const [rowFlightMulti, setRowFlightMulti] = useState(
    location.state?.FlightMultiCity || []
  );
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [fareKey, setFareKey] = useState("");
  const [showAllAirlines, setShowAllAirlines] = useState(false);
  const [showAllAirlines2, setShowAllAirlines2] = useState(false);
  const [showAllAirlines3, setShowAllAirlines3] = useState(false);
  const [showAllFlightTimes, setShowAllFlightTimes] = useState(false);
  const [showAllFlightTimes2, setShowAllFlightTimes2] = useState(false);
  const [showAllFlightTimes3, setShowAllFlightTimes3] = useState(false);
  const [selectedStops, setSelectedStops] = useState(null);
  const [selectedStops2, setSelectedStops2] = useState(null);
  const [selectedStops3, setSelectedStops3] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const itemsPerPage = 10;

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);
  const [activeTab, setActiveTab] = useState("Best");
  const [activeTab2, setActiveTab2] = useState("Best");
  const [activeTab3, setActiveTab3] = useState("Best");

  const tabs = ["Best", "Cheapest", "Fastest"];
  const tabs2 = ["Best", "Cheapest", "Fastest"];
  const tabs3 = ["Best", "Cheapest", "Fastest"];

  const navigate = useNavigate();
  useEffect(() => {
    if (activeUITab) {
      const tabTrigger = document.querySelector(`#${activeUITab}-tab`);
      if (tabTrigger) {
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
      }
    }
  }, [activeUITab]);

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

  // Flight airportList api
  const fetchAirportList = async (query) => {
    try {
      const flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }

      const response = await axios.get(
        `${FLIGHT_API}/airports/search?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${flightToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Airport Response:", response.data);
      const original = response.data?.data?.original || [];
      const mapped = original.map((item) => ({
        city_name: item.city,
        city_code: item.code,
        name: item.name,
        country_code: item.country,
      }));
      return mapped;
    } catch (error) {
      console.log("Error Fetching Flight Airport:", error);
    }
  };

  useEffect(() => {
    fetchAirportList();
  }, []);

  // OneWay SearchAbility Data
  const fetchAirportSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        console.error(
          "Flight Search:-No auth token available, cannot fetch airport data"
        );
        return;
      }

      const searchData = {
        legs: [
          {
            origin: fromInput,
            destination: toInput,
            departureDate: departureDate,
          },
        ],
        passengers: {
          adults,
          children,
          infants,
        },
        cabinClass: travelClass,
        tripType: "oneway",
        currencyCode: "USD",
        sort: "recommended",
        bookingSources: ["amadeus", "sabre"],
      };

      const response = await axios.post(
        `${FLIGHT_API}/flights/search`,
        searchData,
        {
          headers: {
            Authorization: `Bearer ${flightToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const sessionKey = response.data?.data?.searchSessionKey || {};
      localStorage.setItem("sessionKey", sessionKey);

      // *** Extract flights ***
      const flightsData = response.data?.data?.flightOffers || [];

      console.log("One Way Flights found:", flightsData);

      setRowFlights(flightsData);
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
      toast.error(error.response?.data?.message || "Flight Searching Error");
    } finally {
      setLoading(false);
    }
  };

  // Flight Return SearchAbility Data
  const fetchReturnAirportSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }
      const searchData = {
        legs: [
          {
            origin: fromInput2,
            destination: toInput2,
            departureDate: startDate,
          },
        ],
        passengers: {
          adults: adults,
          children: children,
          infants: infants,
        },
        cabinClass: travelClass,
        tripType: "roundtrip",
        returnDate: endDate,
        currencyCode: "USD",
        sort: "recommended",
        bookingSources: ["amadeus", "sabre"],
      };

      const response = await axios.post(
        `${FLIGHT_API}/flights/search`,
        searchData,
        {
          headers: {
            Authorization: `Bearer ${flightToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // *** Extract session key ***
      const sessionKey2 = response.data?.data?.searchSessionKey || {};
      localStorage.setItem("sessionKey", sessionKey2);

      const flightsReturnsData = response.data?.data?.flightOffers || [];
      console.log("Flights found:", flightsReturnsData);
      setRowFlightsReturn(flightsReturnsData);
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
    } finally {
      setLoading(false);
    }
  };

  // flight Booking Data
const FlightSelection = async (flight) => {
  try {
    const flightToken = localStorage.getItem("flightToken");
    const Token = localStorage.getItem("Token");
    const sessionKey = localStorage.getItem("sessionKey");

    if (!flightToken || !Token) {
      const loginModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      loginModal.show();
      return;
    }

    const response = await axios.get(`${FLIGHT_API}/flights/select`, {
      headers: {
        Authorization: `Bearer ${flightToken}`,
        "Content-Type": "application/json",
      },
      params: {
        searchSessionKey: sessionKey,
        itemNumber: flight.itemNumber,  // This MUST exist in your formattedFlights
        source: "amadeus",
      },
    });

    const selectionKey = response.data?.data?.selectionKey || {};
    localStorage.setItem("selectionKey", selectionKey);

    const KeyData = response.data.data || {};
    console.log("search Page Fare", KeyData);

    navigate("/booking_details", { state: { KeyData } });

  } catch (error) {
    console.error("Select Flight Error:", error);
  }
};


  // OneWay filter data
  let timeoutId;
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSelected(false);
    clearTimeout(timeoutId);
    if (value.length < 1) {
      setFilteredList([]);
      return;
    }
    timeoutId = setTimeout(async () => {
      const data = await fetchAirportList(value);
      setFilteredList(data);
    }, 200);
  };

  const handleAirport = (airport) => {
    setFromInput(`${airport.city_code}`);
    setFilteredList([]);
    setFromSelected(true);
  };

  let toTimeoutId;
  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInput(value);
    setToSelected(false);

    clearTimeout(toTimeoutId);
    if (value.length < 1) {
      setFilteredToList([]);
      return;
    }
    toTimeoutId = setTimeout(async () => {
      const data = await fetchAirportList(value);
      setFilteredToList(data);
    }, 200);
  };

  const handleSelectToAirport = (airport) => {
    setToInput(`${airport.city_code}`);
    setFilteredToList([]);
    setToSelected(true);
  };

  // Roundtrip filter data
  let fromTimeoutId2;
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setFromInput2(value);
    setFromSelected2(false);

    clearTimeout(fromTimeoutId2);
    if (value.length < 1) {
      setFilteredList2([]);
      return;
    }
    fromTimeoutId2 = setTimeout(async () => {
      const data = await fetchAirportList(value);
      setFilteredList2(data);
    }, 200);
  };

  const handleSelectAirport2 = (airport) => {
    setFromInput2(`${airport.city_code}`);
    setFilteredList2([]);
    setFromSelected2(true);
  };

  let toTimeoutId2;
  const handleToInputChange2 = (e) => {
    const value = e.target.value;
    setToInput2(value);
    setToSelected2(false);

    clearTimeout(toTimeoutId2);

    if (value.length < 1) {
      setFilteredToList2([]);
      return;
    }

    toTimeoutId2 = setTimeout(async () => {
      const data = await fetchAirportList(value);
      setFilteredToList2(data);
    }, 200);
  };

  const handleSelectToAirport2 = (airport) => {
    setToInput2(
      // `${airport.city_code} ${airport.city_name} - ${airport.country_code}`
      `${airport.city_code}`
    );
    setFilteredToList2([]);
    setToSelected2(true);
  };

  // Multi filter data
  let multiTimeoutIds = {};
  const handleMultiInputChange = (e, index, type) => {
    const value = e.target.value;

    const updated = [...multiCityData];
    updated[index][type] = value;
    setMultiCityData(updated);

    // clear previous debounce
    clearTimeout(multiTimeoutIds[index + type]);

    if (value.length < 1) {
      if (type === "from") {
        const temp = [...multiFilteredList];
        temp[index] = [];
        setMultiFilteredList(temp);
      } else {
        const temp = [...multiFilteredToList];
        temp[index] = [];
        setMultiFilteredToList(temp);
      }
      return;
    }

    // set new debounce
    multiTimeoutIds[index + type] = setTimeout(async () => {
      const results = await fetchAirportList(value);

      if (type === "from") {
        const temp = [...multiFilteredList];
        temp[index] = results;
        setMultiFilteredList(temp);

        const sel = [...multiSelectedFrom];
        sel[index] = false;
        setMultiSelectedFrom(sel);
      } else {
        const temp = [...multiFilteredToList];
        temp[index] = results;
        setMultiFilteredToList(temp);

        const sel = [...multiSelectedTo];
        sel[index] = false;
        setMultiSelectedTo(sel);
      }
    }, 100);
  };

  const handleSelectAirport = (airport, index, type) => {
    const formatted = `${airport.city_code} (${airport.city_name}) - ${airport.country_code}`;

    const updated = [...multiCityData];
    updated[index][type] = formatted;
    setMultiCityData(updated);

    if (type === "from") {
      const temp = [...multiFilteredList];
      temp[index] = [];
      setMultiFilteredList(temp);

      const sel = [...multiSelectedFrom];
      sel[index] = true;
      setMultiSelectedFrom(sel);
    } else {
      const temp = [...multiFilteredToList];
      temp[index] = [];
      setMultiFilteredToList(temp);

      const sel = [...multiSelectedTo];
      sel[index] = true;
      setMultiSelectedTo(sel);
    }
  };

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

  // One Way Flight Data
  const formattedFlights = rowFlights.map((offer) => {
    const segments = offer["itinerary.segments"] || [];
    if (segments.length === 0) return null;

    const firstSegment = segments[0];
    const lastSagment = segments[segments.length - 1];
    const fees = offer["offer.priceBreakdown"]?.["priceBreakdown.fees"] || [];
    const taxes = offer["offer.priceBreakdown"]?.["priceBreakdown.taxes"] || [];

    const formatDuration = (isoDuation) => {
      if (!isoDuation) return "N/A";
      const hours = isoDuation.match(/(\d+)H/)?.[1] || "0";
      const minutes = isoDuation.match(/(\d+)M/)?.[1] || "00";
      return `${hours}h ${minutes}m`;
    };

    const safeGet = (obj, key) => obj?.[key] || "";
    return {
      itemNumber: offer["offer.itemNumber"],
      airline: safeGet(firstSegment, "segment.carrier.marketingCode") || "N/A",
      fromAirport: `${safeGet(firstSegment, "segment.departure.airportCode")}`,
      toAirport: `${safeGet(lastSagment, "segment.arrival.airportCode")}`,
      departureTime: safeGet(firstSegment, "segment.departure.datetime"),
      arrivalTime: safeGet(lastSagment, "segment.arrival.datetime"),
      duration: formatDuration(offer["itinerary.duration"]),
      price:
        offer["offer.priceBreakdown"]?.["priceBreakdown.total"] ||
        offer["pricing.total"] ||
        "",
      basePrice: offer["offer.priceBreakdown"]?.["priceBreakdown.base"] || "",
      serviceFee:
        fees.find((f) => f["fee.type"] === "SERVICE_FEE")?.["fee.amount"] ?? 0,
      commissionFee:
        fees.find((f) => f["fee.type"] === "COMMISSION")?.["fee.amount"] ?? 0,

      airlineTex:
        taxes.find((f) => f["tax.type"] === "TOTAL_TAX")?.["tax.amount"] ?? 0,
      currency:
        offer["offer.priceBreakdown"]?.["priceBreakdown.currency"] ||
        offer["pricing.currency"] ||
        "USD",

      stops: Math.max(segments.length - 1, 0),
      legs: segments,
    };
  });
  console.log("Formatted Flights:", formattedFlights);

  // 1. Count flights per airline
  const airlineCounts = formattedFlights.reduce((acc, flight) => {
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
      formattedFlights.map((f) => [`${f.departureTime}-${f.arrivalTime}`, f])
    ).values(),
  ];

  // Show only 10 if not expanded
  const visibleFlightTimes = showAllFlightTimes
    ? uniqueFlightTimes
    : uniqueFlightTimes.slice(0, 10);

  // Example: apply airline + stops filter (expand as needed)
  const flightsWithStops = formattedFlights.map((f) => ({
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

  let sortedFlights = [...filteredFlights];
  if (activeTab === "Cheapest") {
    sortedFlights.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (activeTab === "Fastest") {
    const getMinutes = (durationStr) => {
      const [h, m] = durationStr
        .replace("h", "")
        .replace("m", "")
        .split(" ")
        .map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    sortedFlights.sort(
      (a, b) => getMinutes(a.duration) - getMinutes(b.duration)
    );
  } else if (activeTab === "Best") {
    sortedFlights = filteredFlights;
  }

  // One Way Pagination logic
  const totalPages = Math.ceil(sortedFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedFlights.slice(startIndex, endIndex);

  //Round Trip Flight Data
  const formattedRoundTripFlights = rowFlightsReturn.map((offer) => {
    const segments = offer["itinerary.segments"] || [];
    if (segments.length === 0) return null;

    const fees = offer["offer.priceBreakdown"]?.["priceBreakdown.fees"] || [];
    const taxes = offer["offer.priceBreakdown"]?.["priceBreakdown.taxes"] || [];

    const safeGet = (obj, key) => obj?.[key] || "";

    const formatDuration = (isoDuration) => {
      if (!isoDuration) return "N/A";
      const hours = isoDuration.match(/(\d+)H/)?.[1] || "0";
      const minutes = isoDuration.match(/(\d+)M/)?.[1] || "00";
      return `${hours}h ${minutes}m`;
    };

    //------------------------------------------
    // 1. Detect outbound and return using airport logic
    //------------------------------------------

    const firstOrigin = segments[0]["segment.departure.airportCode"];

    // Find FIRST airport that is not the origin → this is the destination
    let firstDestination = null;
    for (const seg of segments) {
      const arr = seg["segment.arrival.airportCode"];
      if (arr !== firstOrigin) {
        firstDestination = arr;
        break;
      }
    }

    // fallback (rare)
    if (!firstDestination)
      firstDestination =
        segments[segments.length - 1]["segment.arrival.airportCode"];

    //------------------------------------------
    // 2. Split outbound/return
    //------------------------------------------
    const outbound = [];
    const ret = [];

    let outboundDone = false;

    for (const seg of segments) {
      if (!outboundDone) {
        outbound.push(seg);
        // outbound ends when arrival = firstDestination
        if (seg["segment.arrival.airportCode"] === firstDestination) {
          outboundDone = true;
        }
      } else {
        ret.push(seg);
      }
    }

    //------------------------------------------
    // 3. Helper to format flight details
    //------------------------------------------
    const getFlightInfo = (flightSegments) => {
      if (flightSegments.length === 0) return null;

      return {
        fromAirport: `${safeGet(
          flightSegments[0],
          "segment.departure.airportCode"
        )}`,
        toAirport: `${safeGet(
          flightSegments[flightSegments.length - 1],
          "segment.arrival.airportCode"
        )}`,
        departureTime: safeGet(flightSegments[0], "segment.departure.date"),
        arrivalTime: safeGet(
          flightSegments[flightSegments.length - 1],
          "segment.arrival.date"
        ),
        stops: Math.max(flightSegments.length - 1, 0),
        legs: flightSegments,
      };
    };

    //------------------------------------------
    // 4. Final response
    //------------------------------------------
    return {
      airline: safeGet(segments[0], "segment.carrier.marketingCode") || "N/A",
      price:
        offer["offer.priceBreakdown"]?.["priceBreakdown.total"] ||
        offer["pricing.total"] ||
        "",
      basePrice: offer["offer.priceBreakdown"]?.["priceBreakdown.base"] || "",
      serviceFee:
        fees.find((f) => f["fee.type"] === "SERVICE_FEE")?.["fee.amount"] ?? 0,
      commissionFee:
        fees.find((f) => f["fee.type"] === "COMMISSION")?.["fee.amount"] ?? 0,
      airlineTax:
        taxes.find((f) => f["tax.type"] === "TOTAL_TAX")?.["tax.amount"] ?? 0,
      currency:
        offer["offer.priceBreakdown"]?.["priceBreakdown.currency"] ||
        offer["pricing.currency"] ||
        "USD",
      duration: formatDuration(offer["itinerary.duration"]),
      outbound: getFlightInfo(outbound),
      return: getFlightInfo(ret),
    };
  });

  console.log("Formatted Round Trip Flights:", formattedRoundTripFlights);

  // 1. Round Trip Count flights per airline
  const airlineCounts2 = formattedRoundTripFlights.reduce((acc, flight) => {
    const airline = flight.airline;
    acc[airline] = (acc[airline] || 0) + 1;
    return acc;
  }, {});

  // 2. Round Trip Convert to array for display
  const uniqueAirlines2 = Object.entries(airlineCounts2).map(
    ([airline, count]) => ({ airline, count })
  );

  // 3. Round Trip Apply show-more logic
  const visibleAirlines2 = showAllAirlines2
    ? uniqueAirlines2
    : uniqueAirlines2.slice(0, 10);

  // 4. Round Trip Unique timing logic for round-trip
  const uniqueFlightTimes2 = [
    ...new Map(
      formattedRoundTripFlights.map((f) => [
        `${f.outbound.departureTime}-${f.outbound.arrivalTime}-${f.return.departureTime}-${f.return.arrivalTime}`,
        f,
      ])
    ).values(),
  ];

  // 5. Round Trip Apply show-more logic for flight timings
  const visibleFlightTimes2 = showAllFlightTimes2
    ? uniqueFlightTimes2
    : uniqueFlightTimes2.slice(0, 10);

  // Example: apply airline + stops filter (expand as needed)
  const flightsWithStops2 = formattedRoundTripFlights.map((f) => {
    const outboundStops = (f.outbound?.legs?.length ?? 1) - 1;
    const returnStops = (f.return?.legs?.length ?? 1) - 1;

    const outboundDuration = f.outbound?.duration || "0h 0m";
    const returnDuration = f.return?.duration || "0h 0m";

    const parseMinutes = (str) => {
      const [h, m] = str
        .replace("h", "")
        .replace("m", "")
        .split(" ")
        .map(Number);
      return (h || 0) * 60 + (m || 0);
    };

    const totalDurationMinutes =
      parseMinutes(outboundDuration) + parseMinutes(returnDuration);

    return {
      ...f,
      outboundStops,
      returnStops,
      totalStops: outboundStops + returnStops,
      totalDurationMinutes,
    };
  });
  const totalFlights2 = flightsWithStops2.length;
  const directFlights2 = flightsWithStops2.filter(
    (f) => f.totalStops === 0
  ).length;
  const oneStopFlights2 = flightsWithStops2.filter(
    (f) => f.totalStops === 1
  ).length;
  const twoStopFlights2 = flightsWithStops2.filter(
    (f) => f.totalStops >= 2
  ).length;
  const filteredFlights2 = flightsWithStops2.filter((f) => {
    if (selectedStops2 === null) return true;
    if (selectedStops2 === 0) return f.totalStops === 0;
    if (selectedStops2 === 1) return f.totalStops === 1;
    if (selectedStops2 === 2) return f.totalStops >= 2;
    return true;
  });

  // --- SORT ---
  let sortedFlights2 = [...filteredFlights2];

  if (activeTab2 === "Cheapest") {
    sortedFlights2.sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (activeTab2 === "Fastest") {
    sortedFlights2.sort(
      (a, b) => a.totalDurationMinutes - b.totalDurationMinutes
    );
  }
  // Roundtrip Pagination logic
  const totalPages2 = Math.ceil(sortedFlights2.length / itemsPerPage);
  const startIndex2 = (currentPage2 - 1) * itemsPerPage;
  const endDate2 = startIndex2 + itemsPerPage;
  const paginatedData2 = sortedFlights2.slice(startIndex2, endDate2);

  // Multicity Flight Data
  // Call this when you build formattedMultiTripFlight
  const formattedMultiTripFlight = rowFlightMulti.map((data) => {
    const segments = data["itinerary.segments"] || [];
    const legs = data.searchRequest?.legs || []; // important: use API's searchRequest.legs

    // If no segments, still return an object so UI can render safely
    if (!segments.length || !legs.length) {
      return {
        ...data,
        groupedSegments: [],
        // keep minimal fallback fields so UI won't blow up
        price:
          data["offer.priceBreakdown"]?.["priceBreakdown.totalPrice"]?.amount ||
          "",
      };
    }

    // Group segments by the actual requested legs (origin/destination)
    const groupedSegments = legs.map((leg) => {
      // find all segments that match this leg's origin+destination
      const matches = segments.filter(
        (seg) =>
          seg["segment.departure.airportCode"] === leg.origin &&
          seg["segment.arrival.airportCode"] === leg.destination
      );

      // Map to your UI-friendly object
      return matches.map((seg) => {
        const depDate = seg["segment.departure.date"];
        const depTime = seg["segment.departure.time"];
        const arrDate = seg["segment.arrival.date"];
        const arrTime = seg["segment.arrival.time"];

        // Build ISO-like datetime strings (no timezone). Keep them as local datetimes.
        const departureDateTime = `${depDate}T${depTime}`;
        const arrivalDateTime = `${arrDate}T${arrTime}`;

        return {
          // raw fields
          raw: seg,
          fromAirport: seg["segment.departure.airportCode"],
          fromCity: seg["segment.departure.cityName"],
          fromDate: depDate,
          fromTime: depTime,
          departureDateTime, // string
          toAirport: seg["segment.arrival.airportCode"],
          toCity: seg["segment.arrival.cityName"],
          toDate: arrDate,
          toTime: arrTime,
          arrivalDateTime, // string

          terminalFrom: seg["segment.departure.terminal"],
          terminalTo: seg["segment.arrival.terminal"],

          marketingAirline: seg["segment.carrier.marketingCode"],
          flightNumber: seg["segment.flight.number"],
          duration: seg["segment.flight.duration"],
          stops: seg["segment.stops"],
        };
      });
    });

    // compute some top-level fields for the card (use first option of first leg etc)
    const firstLegFirstOption =
      (groupedSegments[0] && groupedSegments[0][0]) || null;
    const lastLegs = groupedSegments[groupedSegments.length - 1] || [];
    const lastLegLastOption = lastLegs[lastLegs.length - 1] || null;

    return {
      ...data,
      groupedSegments, // array of legs; each leg is array of options
      airline: firstLegFirstOption?.marketingAirline || "",
      flightNumber: firstLegFirstOption?.flightNumber || "",
      departureTime: firstLegFirstOption?.departureDateTime || "",
      arrivalTime: lastLegLastOption?.arrivalDateTime || "",
      fromDetails: firstLegFirstOption
        ? `${firstLegFirstOption.fromCity} (${firstLegFirstOption.fromAirport})`
        : "",
      toDetails: lastLegLastOption
        ? `${lastLegLastOption.toCity} (${lastLegLastOption.toAirport})`
        : "",
      price:
        data["offer.priceBreakdown"]?.["priceBreakdown.totalPrice"]?.amount ||
        "",
    };
  });

  // Roundtrip Pagination logic
  const totalPages3 = Math.ceil(formattedMultiTripFlight.length / itemsPerPage);
  const startIndex3 = (currentPage3 - 1) * itemsPerPage;
  const endDate3 = startIndex2 + itemsPerPage;
  const paginatedData3 = formattedMultiTripFlight.slice(startIndex3, endDate3);

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

  const checkLogin = () => {
    const Token = localStorage.getItem("Token");
    if (!Token) {
      const loginModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      loginModal.show();
      return;
    }
    navigate("/booking_details");
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
        // navigate("/");
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
        // navigate("/");

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
    // console.log("Google Login Failed");
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
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_code}
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
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_code}
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
                                                  "economy",
                                                  "premium economy",
                                                  "business",
                                                  "first class",
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
                      {/* <div className="row">
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
                      </div> */}
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
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
                                  </Slider> */}
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
                                                  <div className="">
                                                    <div className="d-flex align-items-center gap-5">
                                                      <div className="flight_logo">
                                                        <img
                                                          src={flightImg}
                                                          alt="img"
                                                        />
                                                        <p>{flight.airline}</p>
                                                      </div>
                                                      {/* Departure */}
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
                                                        $ {flight.price}{" "}
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
                                                                    ${" "}
                                                                    {
                                                                      flight.basePrice
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Service Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    ${" "}
                                                                    {
                                                                      flight.serviceFee
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
                                                                    ${" "}
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
                                                                    ${" "}
                                                                    {
                                                                      flight.commissionFee
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Total:
                                                                  </td>
                                                                  <td className="text-end">
                                                                    ${" "}
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
                                                         onClick={() => FlightSelection(flight)}
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
                                                    View Detail{" "}
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
                                            {airport.city_name} (
                                            {airport.city_code}) -{" "}
                                            {airport.country_code}
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
                                              {airport.city_name} (
                                              {airport.city_code}) -{" "}
                                              {airport.country_code}
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
                                                  "economy",
                                                  "premium economy",
                                                  "business",
                                                  "first class",
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
                      {/* <div className="row">
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
                      </div> */}
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card booking-card">
                            <div className="card-body">
                              <div className="filter-hd">
                                <h6>Filter</h6>
                                <a href="#">Clear All</a>
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
                                      checked={selectedStops2 === null}
                                      onChange={() => setSelectedStops2(null)}
                                    />{" "}
                                    Any ({totalFlights2})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops2 === 0}
                                      onChange={() => setSelectedStops2(0)}
                                    />
                                    Direct only ({directFlights2})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops2 === 1}
                                      onChange={() => setSelectedStops2(1)}
                                    />{" "}
                                    1 stop max ({oneStopFlights2})
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="stops"
                                      checked={selectedStops2 === 2}
                                      onChange={() => setSelectedStops2(2)}
                                    />{" "}
                                    2+ stops ({twoStopFlights2})
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
                                  {visibleAirlines2.map((air, index) => (
                                    <label
                                      key={index}
                                      style={{ display: "block" }}
                                    >
                                      <input type="checkbox" /> {air.airline} (
                                      {air.count})
                                    </label>
                                  ))}

                                  {uniqueAirlines2.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllAirlines2(!showAllAirlines2)
                                      }
                                    >
                                      {showAllAirlines2
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
                                  {visibleFlightTimes2.map((flight, t) => (
                                    <label key={t} style={{ display: "block" }}>
                                      <input type="checkbox" />{" "}
                                      {/* Outbound Time */}
                                      <b>Departure:</b>
                                      {new Date(
                                        flight.outbound.departureTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                      –
                                      {new Date(
                                        flight.outbound.arrivalTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                      {"  "} | {"  "}
                                      {/* Return Time */}
                                      <b>Return:</b>
                                      {new Date(
                                        flight.return.departureTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                      –
                                      {new Date(
                                        flight.return.arrivalTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </label>
                                  ))}

                                  {/* Show More / Less button */}
                                  {uniqueFlightTimes2.length > 10 && (
                                    <button
                                      className="filterBtn p-0 mt-2"
                                      onClick={() =>
                                        setShowAllFlightTimes2(
                                          !showAllFlightTimes2
                                        )
                                      }
                                    >
                                      {showAllFlightTimes2
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
                                  {tabs2.map((tab2) => (
                                    <div
                                      key={tab2}
                                      className={`tab ${
                                        activeTab2 === tab2 ? "active" : ""
                                      }`}
                                      onClick={() => setActiveTab2(tab2)}
                                    >
                                      {tab2}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="row">
                                  <div className="col-md-12 mb-4">
                                    <div className="flight-search">
                                      <h6>
                                        {totalFlights2} Flights Found on Your
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
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
                                  </Slider> */}
                                </div>

                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="flight_search_result_wrapper">
                                      {/* ✅ If Return flights exist -> Show departure + return */}
                                      {paginatedData2.map((flight, index) => (
                                        <div
                                          className="flight_search_item_wrappper"
                                          key={index}
                                        >
                                          <div className="card flight_search_items">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-9 flight-serach-main">
                                                  {/* Outbound Segment */}
                                                  {flight.outbound && (
                                                    <div className="">
                                                      <div className="d-flex align-items-center gap-5">
                                                        <div className="flight_logo">
                                                          <img
                                                            src={flightImg}
                                                            alt="img"
                                                          />
                                                          <p>
                                                            {flight.airline}
                                                          </p>
                                                        </div>
                                                        <div className="flight_search_destination">
                                                          <h3>
                                                            {new Date(
                                                              flight.outbound.departureTime
                                                            ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                hour: "2-digit",
                                                                minute:
                                                                  "2-digit",
                                                              }
                                                            )}
                                                          </h3>
                                                          <p>
                                                            {
                                                              flight.outbound
                                                                .fromAirport
                                                            }{" "}
                                                            -{" "}
                                                            {new Date(
                                                              flight.outbound.departureTime
                                                            ).toLocaleDateString()}
                                                          </p>
                                                        </div>
                                                        {/* Duration & Stops */}
                                                        <div className="flight_right_arrow">
                                                          <p>
                                                            {flight.outbound
                                                              .legs?.length > 1
                                                              ? `${
                                                                  flight
                                                                    .outbound
                                                                    .legs
                                                                    .length - 1
                                                                } Stop${
                                                                  flight
                                                                    .outbound
                                                                    .legs
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
                                                          <p>
                                                            {flight.duration}
                                                          </p>
                                                        </div>
                                                        {/* Arrival */}
                                                        <div className="flight_search_destination">
                                                          <h3>
                                                            {new Date(
                                                              flight.outbound.arrivalTime
                                                            ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                hour: "2-digit",
                                                                minute:
                                                                  "2-digit",
                                                              }
                                                            )}
                                                          </h3>
                                                          <p>
                                                            {
                                                              flight.outbound
                                                                .toAirport
                                                            }{" "}
                                                            -{" "}
                                                            {new Date(
                                                              flight.outbound.arrivalTime
                                                            ).toLocaleDateString()}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                  {/* Return Segment */}
                                                  {flight.return && (
                                                    <div className="">
                                                      <div className="d-flex align-items-center gap-5">
                                                        <div className="flight_logo">
                                                          <img
                                                            src={flightImg}
                                                            alt="img"
                                                          />
                                                          <p>
                                                            {flight.airline}
                                                          </p>
                                                        </div>
                                                        <div className="flight_search_destination">
                                                          <h3>
                                                            {new Date(
                                                              flight.return.departureTime
                                                            ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                hour: "2-digit",
                                                                minute:
                                                                  "2-digit",
                                                              }
                                                            )}
                                                          </h3>
                                                          <p>
                                                            {
                                                              flight.return
                                                                .fromAirport
                                                            }{" "}
                                                            -{" "}
                                                            {new Date(
                                                              flight.return.departureTime
                                                            ).toLocaleDateString()}
                                                          </p>
                                                        </div>
                                                        {/* Duration & Stops */}
                                                        <div className="flight_right_arrow">
                                                          <p>
                                                            {flight.return.legs
                                                              ?.length > 1
                                                              ? `${
                                                                  flight.return
                                                                    .legs
                                                                    .length - 1
                                                                } Stop${
                                                                  flight.return
                                                                    .legs
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
                                                          <p>
                                                            {flight.duration}
                                                          </p>
                                                        </div>
                                                        {/* Arrival */}
                                                        <div className="flight_search_destination">
                                                          <h3>
                                                            {new Date(
                                                              flight.return.arrivalTime
                                                            ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                hour: "2-digit",
                                                                minute:
                                                                  "2-digit",
                                                              }
                                                            )}
                                                          </h3>
                                                          <p>
                                                            {
                                                              flight.return
                                                                .toAirport
                                                            }{" "}
                                                            -{" "}
                                                            {new Date(
                                                              flight.return.arrivalTime
                                                            ).toLocaleDateString()}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
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
                                                                    ${" "}
                                                                    {
                                                                      flight.basePrice
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Service Fee
                                                                  </td>
                                                                  <td className="text-end">
                                                                    ${" "}
                                                                    {
                                                                      flight.serviceFee
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
                                                                    ${" "}
                                                                    {
                                                                      flight.airlineTax
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
                                                                    ${" "}
                                                                    {
                                                                      flight.commissionFee
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Total:
                                                                  </td>
                                                                  <td className="text-end">
                                                                    ${" "}
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
                                                        onClick={checkLogin}
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
                                                    View Detail{" "}
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
                                                          {
                                                            flight.outbound
                                                              .fromAirport
                                                          }{" "}
                                                          -{" "}
                                                          {
                                                            flight.outbound
                                                              .toAirport
                                                          }
                                                        </strong>
                                                        <p>
                                                          {new Date(
                                                            flight.outbound.departureTime
                                                          ).toLocaleString()}{" "}
                                                          -{" "}
                                                          {new Date(
                                                            flight.outbound.arrivalTime
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
                                                          {
                                                            flight.return
                                                              .fromAirport
                                                          }{" "}
                                                          -
                                                          {
                                                            flight.return
                                                              .toAirport
                                                          }
                                                        </strong>
                                                        <p>
                                                          {new Date(
                                                            flight.return.departureTime
                                                          ).toLocaleString()}{" "}
                                                          -{" "}
                                                          {new Date(
                                                            flight.return.arrivalTime
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
                                    {totalPages2 > 1 && (
                                      <div className="pagination-controls">
                                        <button
                                          onClick={() =>
                                            setCurrentPage2((prev) =>
                                              Math.max(prev - 1, 1)
                                            )
                                          }
                                          disabled={currentPage2 === 1}
                                        >
                                          Prev
                                        </button>
                                        <span className="font-semibold text-[#123b67]">
                                          Page {currentPage2} of {totalPages2}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setCurrentPage2((prev) =>
                                              prev < totalPages2
                                                ? prev + 1
                                                : prev
                                            )
                                          }
                                          disabled={
                                            currentPage2 === totalPages2
                                          }
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
                                                  {airport.city_name} (
                                                  {airport.city_code}) -{" "}
                                                  {airport.country_code}
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
                                                  {airport.city_name} (
                                                  {airport.city_code}) -{" "}
                                                  {airport.country_code}
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
                                                        "economy",
                                                        "premium economy",
                                                        "business",
                                                        "first class",
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
                      {/* <div className="row">
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
                      </div> */}
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
                                  {tabs3.map((tab3) => (
                                    <div
                                      key={tab3}
                                      className={`tab ${
                                        activeTab3 === tab3 ? "active" : ""
                                      }`}
                                      onClick={() => setActiveTab3(tab3)}
                                    >
                                      {tab3}
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <Slider
                                    {...setting2}
                                    className="choosedepartList"
                                  >
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
                                  </Slider> */}
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="flight_search_result_wrapper">
                                      {paginatedData3.map((flight, index) => (
                                        <div
                                          className="flight_search_item_wrappper"
                                          key={index}
                                        >
                                          <div className="card flight_search_items">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-9 flight-serach-main">
                                                  {/* Departure */}

                                                  {Array.isArray(
                                                    flight.groupedSegments
                                                  ) &&
                                                    flight.groupedSegments
                                                      .length > 0 &&
                                                    flight.groupedSegments.map(
                                                      (legOptions, legIdx) => {
                                                        // legOptions is an array of options for this leg (can be length 0,1,2...)
                                                        if (
                                                          !legOptions ||
                                                          legOptions.length ===
                                                            0
                                                        )
                                                          return null;

                                                        const primary =
                                                          legOptions[0]; // summary row shows first option
                                                        // parse datetimes safely (they are strings like "2025-12-10T19:50:00")
                                                        const departDT =
                                                          primary.departureDateTime
                                                            ? new Date(
                                                                primary.departureDateTime
                                                              )
                                                            : null;
                                                        const arriveDT =
                                                          primary.arrivalDateTime
                                                            ? new Date(
                                                                primary.arrivalDateTime
                                                              )
                                                            : null;

                                                        return (
                                                          <div
                                                            className="mb-3"
                                                            key={legIdx}
                                                          >
                                                            <div className="d-flex align-items-center gap-5">
                                                              <div className="flight_logo">
                                                                <img
                                                                  src={
                                                                    flightImg
                                                                  }
                                                                  alt="img"
                                                                />
                                                                <p>
                                                                  {
                                                                    primary.marketingAirline
                                                                  }
                                                                </p>
                                                              </div>

                                                              <div className="flight_search_destination">
                                                                <h3>
                                                                  {departDT
                                                                    ? departDT.toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                          hour: "2-digit",
                                                                          minute:
                                                                            "2-digit",
                                                                        }
                                                                      )
                                                                    : primary.fromTime}
                                                                </h3>
                                                                <p>
                                                                  {
                                                                    primary.fromAirport
                                                                  }{" "}
                                                                  -{" "}
                                                                  {departDT
                                                                    ? departDT.toLocaleDateString()
                                                                    : primary.fromDate}
                                                                </p>
                                                              </div>

                                                              <div className="flight_right_arrow">
                                                                <p>
                                                                  {primary.stops &&
                                                                  primary.stops
                                                                    .toLowerCase()
                                                                    .includes(
                                                                      "stop"
                                                                    )
                                                                    ? primary.stops
                                                                    : legOptions.length >
                                                                      1
                                                                    ? `${
                                                                        legOptions.length -
                                                                        1
                                                                      } Stop${
                                                                        legOptions.length -
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
                                                                <p>
                                                                  {
                                                                    primary.duration
                                                                  }
                                                                </p>
                                                              </div>

                                                              <div className="flight_search_destination">
                                                                <h3>
                                                                  {arriveDT
                                                                    ? arriveDT.toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                          hour: "2-digit",
                                                                          minute:
                                                                            "2-digit",
                                                                        }
                                                                      )
                                                                    : primary.toTime}
                                                                </h3>
                                                                <p>
                                                                  {
                                                                    primary.toAirport
                                                                  }{" "}
                                                                  -{" "}
                                                                  {arriveDT
                                                                    ? arriveDT.toLocaleDateString()
                                                                    : primary.toDate}
                                                                </p>
                                                              </div>
                                                            </div>

                                                            {/* — show other options for this leg inside details (optional) — */}
                                                            {legOptions.length >
                                                              1 && (
                                                              <div
                                                                style={{
                                                                  marginTop: 8,
                                                                  marginLeft: 64,
                                                                }}
                                                              >
                                                                <small
                                                                  style={{
                                                                    color:
                                                                      "#666",
                                                                  }}
                                                                >
                                                                  {
                                                                    legOptions.length
                                                                  }{" "}
                                                                  options for
                                                                  this leg —
                                                                  click to
                                                                  expand for
                                                                  details
                                                                </small>

                                                                {/* Example: list other options (you can change to radio/select) */}
                                                                <div
                                                                  style={{
                                                                    marginTop: 6,
                                                                  }}
                                                                >
                                                                  {legOptions.map(
                                                                    (
                                                                      opt,
                                                                      i
                                                                    ) => {
                                                                      const oDepart =
                                                                        opt.departureDateTime
                                                                          ? new Date(
                                                                              opt.departureDateTime
                                                                            )
                                                                          : null;
                                                                      const oArrive =
                                                                        opt.arrivalDateTime
                                                                          ? new Date(
                                                                              opt.arrivalDateTime
                                                                            )
                                                                          : null;
                                                                      return (
                                                                        <div
                                                                          key={
                                                                            i
                                                                          }
                                                                          className="d-flex align-items-center"
                                                                          style={{
                                                                            gap: 12,
                                                                            marginTop: 6,
                                                                          }}
                                                                        >
                                                                          <div
                                                                            style={{
                                                                              width: 40,
                                                                            }}
                                                                          >
                                                                            <img
                                                                              src={
                                                                                flightImg
                                                                              }
                                                                              alt="air"
                                                                              style={{
                                                                                width: 32,
                                                                              }}
                                                                            />
                                                                          </div>
                                                                          <div
                                                                            style={{
                                                                              flex: 1,
                                                                            }}
                                                                          >
                                                                            <div
                                                                              style={{
                                                                                fontWeight:
                                                                                  i ===
                                                                                  0
                                                                                    ? 600
                                                                                    : 500,
                                                                              }}
                                                                            >
                                                                              {oDepart
                                                                                ? oDepart.toLocaleTimeString(
                                                                                    [],
                                                                                    {
                                                                                      hour: "2-digit",
                                                                                      minute:
                                                                                        "2-digit",
                                                                                    }
                                                                                  )
                                                                                : opt.fromTime}{" "}
                                                                              -{" "}
                                                                              {oArrive
                                                                                ? oArrive.toLocaleTimeString(
                                                                                    [],
                                                                                    {
                                                                                      hour: "2-digit",
                                                                                      minute:
                                                                                        "2-digit",
                                                                                    }
                                                                                  )
                                                                                : opt.toTime}
                                                                            </div>
                                                                            <div
                                                                              style={{
                                                                                color:
                                                                                  "#666",
                                                                                fontSize: 13,
                                                                              }}
                                                                            >
                                                                              {
                                                                                opt.fromAirport
                                                                              }{" "}
                                                                              →{" "}
                                                                              {
                                                                                opt.toAirport
                                                                              }{" "}
                                                                              •{" "}
                                                                              {
                                                                                opt.duration
                                                                              }
                                                                            </div>
                                                                          </div>
                                                                          <div>
                                                                            <button className="btn btn-sm">
                                                                              Select
                                                                            </button>
                                                                          </div>
                                                                        </div>
                                                                      );
                                                                    }
                                                                  )}
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        );
                                                      }
                                                    )}
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
                                                        //onClick={fetchfare}
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
                                    {totalPages3 > 1 && (
                                      <div className="pagination-controls">
                                        <button
                                          onClick={() =>
                                            setCurrentPage3((prev) =>
                                              Math.max(prev - 1, 1)
                                            )
                                          }
                                          disabled={currentPage3 === 1}
                                        >
                                          Prev
                                        </button>
                                        <span className="font-semibold text-[#123b67]">
                                          Page {currentPage3} of {totalPages3}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setCurrentPage3((prev) =>
                                              prev < totalPages3
                                                ? prev + 1
                                                : prev
                                            )
                                          }
                                          disabled={
                                            currentPage3 === totalPages3
                                          }
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
