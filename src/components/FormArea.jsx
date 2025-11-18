import { useEffect, useState } from "react";
import { FaHelicopter } from "react-icons/fa";
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
import PrivateCharter from "./formTabs/PrivateCharter";
import { MdOutlineFlight } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
// import { API_BASE_URL } from "../Url/BaseUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FLIGHT_API } from "../Url/BaseUrl";

const FormArea = () => {
  // const [selectedClass, setSelectedClass] = useState("Economy");
  // const [airportList, setAirPortList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [filteredToList, setFilteredToList] = useState([]);
  const [fromInput2, setFromInput2] = useState("");
  const [filteredList2, setFilteredList2] = useState([]);
  const [toInput2, setToInput2] = useState("");
  const [filteredToList2, setFilteredToList2] = useState([]);
  const [multiFilteredList, setMultiFilteredList] = useState([]);
  const [multiFilteredToList, setMultiFilteredToList] = useState([]);
  const [multiSelectedFrom, setMultiSelectedFrom] = useState([]);
  const [multiSelectedTo, setMultiSelectedTo] = useState([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [travelClass, setTravelClass] = useState("economy");
  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);
  const [fromSelected2, setFromSelected2] = useState(false);
  const [toSelected2, setToSelected2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);

  const navigate = useNavigate();
  const searchTab = () => {
    // navigate("/searchFlight");
  };

  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };

// Generate Flight Token 
  const getAuthToken = async () => {
    try {
      const response = await axios.post(
        `${FLIGHT_API}/auth/login`,
        {
          email: "shubhamkumar@mobappswebsolutions.com",
          password: "A@dGsZ&xJ",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Integr8t Token Response:", response.data.data.access_token);
      const flightToken = response.data.data.access_token;
      if (flightToken) {
        localStorage.setItem("flightToken", flightToken);
        return flightToken;
      } else {
        console.error("No token found in response:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error Getting Flight Token:", error);
    }
  };

// Generate Airpoirt List
  const fetchAirPort = async (query) => {
    try {
      let flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        // If missing, fetch a new one
        flightToken = await getAuthToken();
      }
      if (!flightToken) {
        console.error("No Flight token available, cannot fetch airports");
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
      console.error("Error fetching airports:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await getAuthToken();
      await fetchAirPort();
    })();
  }, []);

  // Flight OneWay SearchAbility Data
  const fetchAirportSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        flightToken = await getAuthToken();
      }
      if (!flightToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }
      const searchData = {
        legs: [
          {
          origin: fromInput,
          destination: toInput,
          departureDate: departureDate,
        }
      ],
      passengers: {
        adults:adults,
        children:children,
        infants:infants,
      },
        cabinClass: travelClass,
        tripType:"oneway",
        currencyCode:"USD",
        sort:"recommended",
        bookingSources:[
          "amadeus",
          "sabre"
        ]
      };

      const response = await axios.post(`${FLIGHT_API}/flights/search`, searchData, {
        headers: {
          Authorization: `Bearer ${flightToken}`,
          "Content-Type": "application/json",
        },
      });

      const sessionKey = response.data?.data?.searchSessionKey || {};
      localStorage.setItem("sessionKey", sessionKey);


      const Flights = response.data?.data?.flightOffers || [];
      console.log("One Way Flights found:", Flights);
      // navigate and pass data
      navigate("/searchFlight", { state: { Flights } });
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
      toast.error(
        error.response?.data?.error?.description || "Flight Searching Error",
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
      let flightToken = localStorage.getItem("flightToken");
      if (!flightToken) {
        flightToken = await getAuthToken();
      }

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
        }
      ],
      passengers: {
        adults:adults,
        children:children,
        infants:infants,
      },
        cabinClass: travelClass,
        tripType:"roundtrip",
        returnDate: endDate,
        currencyCode:"USD",
        sort:"recommended",
        bookingSources:[
          "amadeus",
          "sabre"
        ]
      };

      const response = await axios.post(`${FLIGHT_API}/flights/search`, searchData, {
        headers: {
          Authorization: `Bearer ${flightToken}`,
          "Content-Type": "application/json",
        },
      });

      const sessionKey2 = response.data?.data?.searchSessionKey || {};
      localStorage.setItem("sessionKey", sessionKey2);

      const FlightReturn = response.data?.data?.flightOffers || [];
      console.log("Return Flight Found:", FlightReturn);
      navigate("/searchFlight", {state: { FlightReturn,  activeUITab: "roundtrip" }}); //<< tell new page to open Return tab
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
       toast.error(
        error.response?.data?.error?.description || "Flight Searching Error",
      );
    } finally {
      setLoading(false);
    }
  };

  // Flight Multicity SearchAbility Data
  const fetchMultiAirportSearch = async (e) => {
  e.preventDefault();
   setLoading(true);

  try {
    const flightToken = localStorage.getItem("flightToken");
    if (!flightToken) {
      console.error("Flight Search:-No auth token available, cannot fetch airport data");
      return;
    }

    // Build legs dynamically from UI
    const legs = multiCityData.map((segment) => ({
      origin: segment.from,                   
      destination: segment.to,
      departureDate: segment.date                    
    }));

    // Full payload
    const payload = {
      legs: legs,
      passengers: {
        adults: adults,
        children: children,
        infants: infants,
      },
      cabinClass: travelClass || "economy",
      tripType: "multicity",
      currencyCode: "USD",
      sort: "recommended",
      bookingSources: ["amadeus", "sabre"],
    };

    console.log("MultiCity API Payload:", payload);

    // API call
    const response = await axios.post(
      `${FLIGHT_API}/flights/search`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${flightToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const sessionKey3 = response.data?.data?.searchSessionKey || {};
    localStorage.setItem("sessionKey", sessionKey3);

    const FlightMultiCity = response.data?.data?.flightOffers || [];
    // Navigate to results page
    navigate("/searchFlight", {
      state: { FlightMultiCity, activeUITab:"multi_city" },
    });
  } catch (error) {
    console.error("Error Fetching Multi-City Search Error:", error);
     toast.error(
        error.response?.data?.error?.description || "Flight Searching Error",
      );
  } finally{
    setLoading(false);
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
      const data = await fetchAirPort(value);
      setFilteredList(data);
    }, 200);
  };

  const handleAirport = (airport) => {
    setFromInput(
      `${airport.city_code}`
    );
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
      const data = await fetchAirPort(value);
      setFilteredToList(data);
    }, 200);
  };

  const handleSelectToAirport = (airport) => {
    setToInput(
      `${airport.city_code}`
    );
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
      const data = await fetchAirPort(value);
      setFilteredList2(data);
    }, 200);
  };

  const handleSelectAirport2 = (airport) => {
    setFromInput2(
      `${airport.city_code}`
    );
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
      const data = await fetchAirPort(value);
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
      const results = await fetchAirPort(value);

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
    const formatted = `${airport.city_code}`;

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

  // const handleChildAgeChange = (index, value) => {
  //   const updatedAges = [...childAges];
  //   updatedAges[index] = value;
  //   setChildAges(updatedAges);
  // };

  // const handleDone = () => {
  //   setShowDropdown(false);
  // };

  return (
    <>
      <ToastContainer />
      <section id="theme_search_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card home-card">
                <div className="card-header form-area-header">
                  <div className="theme_search_form_tabbtn">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active tab-btn"
                          id="flights-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#flights"
                          type="button"
                          role="tab"
                          aria-controls="flights"
                          aria-selected="true"
                        >
                          <span className="tab-icon">
                            <MdOutlineFlight />
                          </span>
                          Flights
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link tab-btn"
                          id="hotels-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#hotels"
                          type="button"
                          role="tab"
                          aria-controls="hotels"
                          aria-selected="false"
                        >
                          <span className="tab-icon">
                            <RiHotelFill />
                          </span>
                          Hotels
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link tab-btn"
                          id="bus-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bus"
                          type="button"
                          role="tab"
                          aria-controls="bus"
                          aria-selected="false"
                        >
                          <span className="tab-icon">
                            <FaCarSide />
                          </span>
                          Cars
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link tab-btn"
                          id="charter-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#charter"
                          type="button"
                          role="tab"
                          aria-controls="charter"
                          aria-selected="false"
                        >
                          {" "}
                          <span className="tab-icon">
                            <FaHelicopter />
                          </span>
                          Private Charters
                        </button>
                      </li>
                      {/* <li className="nav-item" role="presentation">
                        <button
                          className="nav-link tab-btn"
                          id="bus-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bus"
                          type="button"
                          role="tab"
                          aria-controls="bus"
                          aria-selected="false"
                        >
                          <span className="tab-icon">
                            <MdRestaurantMenu />
                          </span>
                          Concierge{" "}
                        </button>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="flights"
                      role="tabpanel"
                      aria-labelledby="flights-tab"
                    >
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
                            <div className="row mb-2">
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
                                            filteredList.map(
                                              (airport, index) => (
                                                <li
                                                  key={index}
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleAirport(airport)
                                                  }
                                                >
                                                  {airport.city_name} ({airport.city_code}) - {airport.country_code}
                                                </li>
                                              )
                                            )
                                          ) : !fromSelected ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                                border: "1px solid #ccc",
                                              }}
                                            >
                                              No results found
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
                                            filteredToList.map(
                                              (airport, index) => (
                                                <li
                                                  key={index}
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleSelectToAirport(
                                                      airport
                                                    )
                                                  }
                                                >
                                                  {airport.city_name} ({airport.city_code}) - {airport.country_code}
                                                </li>
                                              )
                                            )
                                          ) : !toSelected ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                                border: "1px solid #ccc",
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
                                                                (below 2yrs)
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
                                                      "business class",
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
                                                <div className="text-center mt-2">
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
                        {/* return */}
                        <div
                          className="tab-pane fade"
                          id="roundtrip"
                          role="tabpanel"
                          aria-labelledby="roundtrip-tab"
                        >
                          <form onSubmit={fetchReturnAirportSearch}>
                            <div className="row mb-2">
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
                                            filteredList2.map(
                                              (airport, index) => (
                                                <li
                                                  key={index}
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleSelectAirport2(
                                                      airport
                                                    )
                                                  }
                                                >
                                                  {airport.city_name} ({airport.city_code}) - {airport.country_code}
                                                </li>
                                              )
                                            )
                                          ) : !fromSelected2 ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                                border: "1px solid #ccc",
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
                                                  className="airportList_li"
                                                  onClick={() =>
                                                    handleSelectToAirport2(
                                                      airport
                                                    )
                                                  }
                                                >
                                                  {airport.city_name} ({airport.city_code}) - {airport.country_code}
                                                </li>
                                              )
                                            )
                                          ) : !toSelected2 ? (
                                            <li
                                              style={{
                                                padding: "8px 12px",
                                                color: "gray",
                                                border: "1px solid #ccc",
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
                                          dateFormat="dd-MM-yyyy"
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
                                                                (below 2yrs)
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
                                                <div className="text-center mt-2">
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
                                    onClick={searchTab}
                                    className="btn btn_theme btn_md"
                                  >
                                    {loading ? "Searching.." : "Search"}
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
                          <form onSubmit={fetchMultiAirportSearch}>
                            {multiCityData.map((segment, index) => (
                              <div key={index}>
                                <div className="row mb-2">
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
                                              {multiFilteredList[index]
                                                ?.length > 0 ? (
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
                                                    {airport.city_name} ({airport.city_code}) - {airport.country_code}
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
                                              {multiFilteredToList[index]
                                                ?.length > 0 ? (
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
                                                    {airport.city_name} ({airport.city_code}) - {airport.country_code}
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
                                            <span>
                                              Select Destination airport
                                            </span>
                                          </div>
                                          <div className="range_plan">
                                            <i>
                                              <FaExchangeAlt />
                                            </i>
                                          </div>
                                        </div>
                                        <div className="flight_Search_boxed date_flex_area">
                                          <div
                                            key={index}
                                            className="Journey_date"
                                          >
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
                                                handleMultiDateChange(
                                                  date,
                                                  index
                                                )
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
                                                  ).toLocaleDateString(
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
                                                                      (below
                                                                      2yrs)
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
                                                      <div className="text-center mt-2">
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

                                    {/* Show Search button only on last row */}
                                    {index === multiCityData.length - 1 && (
                                      <div className="top_form_search_button mt-3">
                                        <button
                                          type="submit"
                                          className="btn btn_theme btn_md"
                                        >
                                          {loading ? "Searching.." : "Search"}
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
                    <div
                      className="tab-pane fade"
                      id="charter"
                      role="tabpanel"
                      aria-labelledby="charter-tab"
                    >
                      <PrivateCharter />
                    </div>
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
