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
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineFlight } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../Url/BaseUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { getAuthToken } from "../api/auth";

const FormArea = () => {
  // const [selectedClass, setSelectedClass] = useState("Economy");
  const [airportList, setAirPortList] = useState([]);
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
  // const [journeyDate, setJourneyDate] = useState("");
  // const [journeyDate2, setJourneyDate2] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [fromSelected, setFromSelected] = useState(false);
  const [toSelected, setToSelected] = useState(false);
  const [fromSelected2, setFromSelected2] = useState(false);
  const [toSelected2, setToSelected2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  // const [returnDate, setReturnDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  // const [multiCityData, setMultiCityData] = useState([
  //   { from: "", to: "", date: getTodayDate() },
  //   { from: "", to: "", date: getTodayDate() },
  // ]);
  const [multiCityData, setMultiCityData] = useState([
    { from: "", to: "", date: "" },
    { from: "", to: "", date: "" },
  ]);

  const navigate = useNavigate();
  const searchTab = () => {
    // navigate("/searchFlight");
  };

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
  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };
  // const handleChange = (e) => {
  //   setSelectedClass(e.target.value);
  // };

  const getAuthToken = async () => {
    try {
      const authcode = "D6F4E8ADB1B3FFC8BC8BCCC811EF7645AEA21EBE";
      const secret = "Jetlife@2025";
      // Base64 encode
      const credentials = btoa(`${authcode}:${secret}`);
      const response = await axios.get(
        //  "https://testapi.iati.com/rest/auth/token",
        `${API_BASE_URL}/genrate/token`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      const authToken = response.data?.result?.token;
      console.log("Auth API Response:", authToken);

      if (authToken) {
        // Save in localStorage with consistent key
        localStorage.setItem("authToken", authToken);
        return authToken;
      } else {
        console.error("No token found in response:", response.data);
        return null;
      }
    } catch (error) {
      console.error(
        "Error getting token:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  const fetchAirPort = async () => {
    try {
      // Try localStorage first
      let authToken = localStorage.getItem("authToken");
      if (!authToken) {
        // If missing, fetch a new one
        authToken = await getAuthToken();
      }
      if (!authToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }

      const data = { language_code: "EN" };
      const response = await axios.post(
        // "https://testapi.iati.com/rest/flight/v2/airport",
        `${API_BASE_URL}/airport/data`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Airport Response:", response.data);
      setAirPortList(response.data.result || []);
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
      let authToken = localStorage.getItem("authToken");
      if (!authToken) {
        // If missing, fetch a new one
        authToken = await getAuthToken();
      }
      if (!authToken) {
        console.error("No auth token available, cannot fetch airports");
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

      const flights = response.data?.result?.departure_flights || [];
      console.log("Flights found:", flights);
      // navigate and pass data
      navigate("/searchFlight", { state: { flights } });
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
      let authToken = localStorage.getItem("authToken");
      if (!authToken) {
        authToken = await getAuthToken();
      }

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

      const flights = response.data?.result?.departure_flights || [];
      const flights2 = response.data?.result?.return_flights || [];

      console.log("Departure flights:", flights);
      console.log("Return flights:", flights2);

      navigate("/searchFlight", {
        state: {
          flights,
          flights2,
        },
      });
    } catch (error) {
      console.log("Error Fetching Search List Data:", error);
    } finally {
      setLoading(false);
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
      // `${airport.city_name}(${airport.city_code}) - ${airport.name} (${airport.country_code})`
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
      //  `${airport.city_name}(${airport.city_code}) - ${airport.name} (${airport.country_code})`
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
      //  `${airport.city_name}(${airport.city_code}) - ${airport.name} (${airport.country_code})`
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
      //  `${airport.city_name}(${airport.city_code}) - ${airport.name} (${airport.country_code})`
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
                                                  {airport.city_name}(
                                                  {airport.city_code}) -{" "}
                                                  {airport.name} (
                                                  {airport.country_code})
                                                </li>
                                              )
                                            )
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
                                                  {airport.city_name}(
                                                  {airport.city_code}) -{" "}
                                                  {airport.name} (
                                                  {airport.country_code})
                                                </li>
                                              )
                                            )
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
                                        {/* <input
                                          type="date"
                                          value={journeyDate}
                                          onChange={handleDateChange}
                                          min={
                                            new Date()
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        /> */}
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
                                                  onClick={() =>
                                                    handleSelectAirport2(
                                                      airport
                                                    )
                                                  }
                                                  style={{
                                                    padding: "8px 12px",
                                                    cursor: "pointer",
                                                    borderBottom:
                                                      "1px solid #eee",
                                                  }}
                                                >
                                                  {airport.city_name}(
                                                  {airport.city_code}) -{" "}
                                                  {airport.name} (
                                                  {airport.country_code})
                                                </li>
                                              )
                                            )
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
                                                  onClick={() =>
                                                    handleSelectToAirport2(
                                                      airport
                                                    )
                                                  }
                                                  style={{
                                                    padding: "8px 12px",
                                                    cursor: "pointer",
                                                    borderBottom:
                                                      "1px solid #eee",
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
                          <form action="#!">
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
