import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import { RiHotelFill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import routeImg from "../assets/img/aerospace.png";
import { FaRegCircleCheck } from "react-icons/fa6";
import hotelImg from "../assets/img/hotel.png";
import { RxCrossCircled } from "react-icons/rx";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// const tabs = document.querySelectorAll(".tab");
const MyBooking = () => {
  const [activeTab, setActiveTab] = useState("flight");
  const [activeFlightTab, setActiveFlightTab] = useState("upcoming");
  const [activeHotelTab, setActiveHotelTab] = useState("upcoming");
  // const [activeHotelTab, setActiveHotelTab] = useState("upcoming");
  // const [data, setData] = useState("");
  const [myBooking, setMyBooking] = useState([]);
  const [upCommingBooking, setUpCommingBooking] = useState([]);
  const location = useLocation();
  const details = location.state?.bookingResult;
  console.log("Booking All Details:-", details);
  const orderId = details?.books[0]?.order_id;
  console.log("Order ID:-", orderId);

  // const fetchOrderId = async () => {
  //   try {
  //     const authToken = localStorage.getItem("authToken");
  //     if (!authToken) {
  //       console.error("No auth token available");
  //       return;
  //     }

  //     const response = await axios.get(`/api/rest/flight/v2/order/${orderId}`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("ALL Data:-", response.data.result);
  //     setData(response.data.result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const MyBooking = async (bookingType = "0") => {
    try {
      const token = localStorage.getItem("Token");
      const id = localStorage.getItem("Id");

      const response = await axios.post(`${API_BASE_URL}/show/mybooking`, {
        token: token,
        user_id: id,
        booking_type: bookingType,
      });

      console.log("My Booking Data", response.data.data);
      setMyBooking(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const UpBooking = async (bookingType = "0") => {
    try {
      const token = localStorage.getItem("Token");
      const id = localStorage.getItem("Id");

      const response = await axios.post(`${API_BASE_URL}/upcoming/booking`, {
        token: token,
        user_id: id,
        booking_type: bookingType,
      });

      console.log("My Upcomming Booking Data:-", response.data.data);
      setUpCommingBooking(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCancel = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token available, cannot fetch airports");
        return;
      }

      const response = await axios.get(
        `/api/rest/flight/v2/book/${orderId}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error?.description || "Flight is not cancellable",
        {
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    // fetchOrderId();
    MyBooking();
    UpBooking();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>My Booking</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      My Booking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* main-section-booking */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section_heading_center">
                <h2>All booking list</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tab-profile">
                <div
                  className="nav nav-pills mb-4 justify-content-center"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    All Bookings
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Flights
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Hotels
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                  tabindex="0"
                >
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="tab">
                        <div className="tab__list">
                          <div
                            className={`tab__item flight-tab ${activeTab === "flight" ? "is--active" : ""
                              }`}
                            onClick={() => {
                              setActiveTab("flight");
                              MyBooking("0");
                            }}
                          >
                            <IoIosAirplane /> Flight Booking
                          </div>
                          <div
                            className={`tab__item flight-tab ${activeTab === "hotel" ? "is--active" : ""
                              }`}
                            onClick={() => {
                              setActiveTab("hotel");
                              MyBooking("1");
                            }}
                          >
                            <RiHotelFill /> Hotel Booking
                          </div>
                        </div>

                        <div className="tab__content">
                          <div
                            className={`tab__content-item ${activeTab === "flight" ? "is--active" : ""
                              }`}
                          >
                            {/* FLIGHT CONTENT */}
                            {myBooking?.length > 0 ? (
                              myBooking.map((booking, index) => (
                                <div className="card mb-4" key={index}>
                                  <div className="card-body">
                                    <div className="notifi-content">
                                      <div className="d-flex gap-3">
                                        <div className="book-img">
                                          <img
                                            src={routeImg}
                                            alt="Flight Route"
                                          />
                                        </div>
                                        <div className="main-noti-cont">
                                          <h6>
                                            {booking.flight_name ||
                                              booking.flight_number}
                                          </h6>
                                          <p>PNR:- {booking.pnr_number}</p>
                                        </div>
                                      </div>
                                      <div className="date-time-noti">
                                        <FiClock />
                                        <span>
                                          {booking.departure_time ||
                                            "Not Available"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="det-data">
                                      <div className="other">
                                        <p>
                                          <strong>From:</strong>{" "}
                                          {booking.from_city || "N/A"}
                                        </p>
                                        <div className="flightLine">
                                          <div></div>
                                          <div></div>
                                        </div>
                                        <p>
                                          <strong>To:</strong>{" "}
                                          {booking.to_city || "N/A"}
                                        </p>
                                      </div>
                                      <p>
                                        Baggage Info | e-Ticket | Invoice |{" "}
                                        <span>
                                          <FaRegCircleCheck />{" "}
                                          {booking.status || "Booked"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="cancel_flight">
                                      <p onClick={fetchCancel}>Cancel Ticket</p>{" "}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No Flight Booking Found</p>
                            )}
                          </div>
                          <div
                            className={`tab__content-item ${activeTab === "hotel" ? "is--active" : ""
                              }`}
                          >
                            {/* hotel-content */}
                            <div className="card p-0">
                              <div className="card-body">
                                <div className="notifi-content">
                                  <div className="d-flex gap-3">
                                    <div className="book-img">
                                      <img src={hotelImg} alt="Flight Route" />
                                    </div>
                                    <div className="main-noti-cont">
                                      <h6>The Grand Residency, Goa</h6>
                                      <p>Booking ID: 78349-H</p>
                                    </div>
                                  </div>
                                  <div className="date-time-noti">
                                    <FiClock />
                                    <span>19 Jun 2025 at 10:10 AM</span>
                                  </div>
                                </div>
                                <div className="det-data">
                                  <div className="other">
                                    <p>
                                      <strong>Check-in:</strong> 24 Jun 2025
                                    </p>
                                    <div className="flightLine">
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <p>
                                      <strong>Check-out:</strong> 25 Jun 2025
                                    </p>
                                  </div>
                                  <p>
                                    Booking Details | Room Type: Deluxe Sea View
                                    | Guests: 2 Adults, 1 Child |{" "}
                                    <span className="unverify">
                                      <RxCrossCircled /> Cancelled
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                  tabindex="0"
                >
                  <div className="card booking-card mb-4">
                    <div className="card-body">
                      <div className="tab">
                        <div className="tab__list">
                          <div
                            className={`tab__item ${activeFlightTab === "upcoming" ? "is--active" : ""
                              }`}
                            onClick={() => setActiveFlightTab("upcoming")}
                          >
                            Upcoming
                          </div>
                          <div
                            className={`tab__item ${activeFlightTab === "cancelled"
                              ? "is--active"
                              : ""
                              }`}
                            onClick={() => setActiveFlightTab("cancelled")}
                          >
                            Cancelled
                          </div>
                          <div
                            className={`tab__item ${activeFlightTab === "completed"
                              ? "is--active"
                              : ""
                              }`}
                            onClick={() => setActiveFlightTab("completed")}
                          >
                            Completed
                          </div>
                        </div>
                        <div className="tab__content">
                          <div
                            className={`tab__content-item ${activeFlightTab === "upcoming" ? "is--active" : ""
                              }`}
                          >
                            {upCommingBooking.length > 0 ? (
                              upCommingBooking.map((upBooking, e) => (
                                <div className="card mb-4" key={e}>
                                  <div className="card-body">
                                    <div className="notifi-content">
                                      <div className="d-flex gap-3">
                                        <div className="book-img">
                                          <img
                                            src={routeImg}
                                            alt="Flight Route"
                                          />
                                        </div>
                                        <div className="main-noti-cont">
                                          <h6>
                                            {upBooking.flight_number ||
                                              upBooking.flight_number}
                                          </h6>
                                          <p>PNR:- {upBooking.pnr_number}</p>
                                        </div>
                                      </div>
                                      <div className="date-time-noti">
                                        <FiClock />
                                        <span>
                                          {upBooking.departure_time ||
                                            "Not Available"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="det-data">
                                      <div className="other">
                                        <p>
                                          <strong>From:</strong>
                                          {upBooking.from_city}
                                        </p>
                                        <div className="flightLine">
                                          <div></div>
                                          <div></div>
                                        </div>
                                        <p>
                                          <strong>To:</strong>{" "}
                                          {upBooking.to_city}
                                        </p>
                                      </div>
                                      <p>
                                        Baggage Info | e-Ticket | Invoice |{" "}
                                        <span>
                                          <FaRegCircleCheck />{" "}
                                          {upBooking.user_booking_status}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="cancel_flight">
                                      <p onClick={fetchCancel}>Cancel Ticket</p>{" "}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No Upcoming Booking Found...</p>
                            )}
                          </div>

                          <div
                            className={`tab__content-item ${activeFlightTab === "cancelled"
                              ? "is--active"
                              : ""
                              }`}
                          >
                            <p>
                              <div className="card mb-4">
                                <div className="card-body">
                                  <div className="notifi-content">
                                    <div className="d-flex gap-3">
                                      <div className="book-img">
                                        <img
                                          src={routeImg}
                                          alt="Flight Route"
                                        />
                                      </div>
                                      <div className="main-noti-cont">
                                        <h6>IndiGo Airlines 6E-785</h6>
                                        <p>PNR:- 85421211</p>
                                      </div>
                                    </div>
                                    <div className="date-time-noti">
                                      <FiClock />
                                      <span>19 Jun 2025 at 10:10 AM</span>
                                    </div>
                                  </div>
                                  <div className="det-data">
                                    <div className="other">
                                      <p>
                                        <strong>From:</strong> New Delhi (DEL)
                                      </p>
                                      <div className="flightLine">
                                        <div></div>
                                        <div></div>
                                      </div>
                                      <p>
                                        <strong>To:</strong> Mumbai (Mum)
                                      </p>
                                    </div>
                                    <p>
                                      Baggage Info | e-Ticket | Invoice |{" "}
                                      <span>
                                        <FaRegCircleCheck /> Cancelled
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </p>
                          </div>
                          {activeFlightTab === "completed" && (
                            <div
                              className={`tab__content-item ${activeFlightTab === "completed"
                                ? "is--active"
                                : ""
                                }`}
                            >
                              <p>no content</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-disabled"
                  role="tabpanel"
                  aria-labelledby="v-pills-disabled-tab"
                  tabIndex="0"
                >
                  <div className="card booking-card mb-4">
                    <div className="card-body">
                      <div className="tab">
                        {/* Hotel Sub Tabs */}
                        <div className="tab__list">
                          <div
                            className={`tab__item ${activeHotelTab === "upcoming" ? "is--active" : ""
                              }`}
                            onClick={() => setActiveHotelTab("upcoming")}
                          >
                            Upcoming
                          </div>
                          <div
                            className={`tab__item ${activeHotelTab === "cancelled" ? "is--active" : ""
                              }`}
                            onClick={() => setActiveHotelTab("cancelled")}
                          >
                            Cancelled
                          </div>
                          <div
                            className={`tab__item ${activeHotelTab === "completed" ? "is--active" : ""
                              }`}
                            onClick={() => setActiveHotelTab("completed")}
                          >
                            Completed
                          </div>
                        </div>

                        {/* Hotel Tab Content */}
                        <div className="tab__content">
                          {/* Upcoming */}
                          <div
                            className={`tab__content-item ${activeHotelTab === "upcoming" ? "is--active" : ""
                              }`}
                          >
                            <p>No Upcoming Hotel Booking Found...</p>
                          </div>

                          {/* Cancelled */}
                          <div
                            className={`tab__content-item ${activeHotelTab === "cancelled" ? "is--active" : ""
                              }`}
                          >
                            <p>No Cancelled Hotel Booking Found...</p>
                          </div>

                          {/* Completed */}
                          <div
                            className={`tab__content-item ${activeHotelTab === "completed" ? "is--active" : ""
                              }`}
                          >
                            <p>No Completed Hotel Booking Found...</p>
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
      <Footer />
    </>
  );
};

export default MyBooking;
