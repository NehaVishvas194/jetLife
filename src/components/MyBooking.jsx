import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import { RiHotelFill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import routeImg from "../assets/img/aerospace.png";
import { FaRegCircleCheck } from "react-icons/fa6";
import hotelImg from "../assets/img/hotel.png";
import { RxCrossCircled } from "react-icons/rx";
import { FaAngleDoubleRight } from "react-icons/fa";

const tabs = document.querySelectorAll(".tab");
const MyBooking = () => {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <>
      <Header />
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
            <div className="col-md-3">
              <div className="card booking-card">
                <div className="card-body">
                  <div className="tab-profile">
                    <div
                      className="nav flex-column nav-pills"
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
              </div>
            </div>
            <div className="col-md-9">
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
                            className={`tab__item flight-tab ${
                              activeTab === "flight" ? "is--active" : ""
                            }`}
                            onClick={() => setActiveTab("flight")}
                          >
                            <IoIosAirplane /> Flight Booking
                          </div>
                          <div
                            className={`tab__item flight-tab ${
                              activeTab === "hotel" ? "is--active" : ""
                            }`}
                            onClick={() => setActiveTab("hotel")}
                          >
                            <RiHotelFill /> Hotel Booking
                          </div>
                        </div>

                        <div className="tab__content">
                          <div
                            className={`tab__content-item ${
                              activeTab === "flight" ? "is--active" : ""
                            }`}
                          >
                            {/* FLIGHT CONTENT */}
                            <div className="card p-0">
                              <div className="card-body">
                                <div className="notifi-content">
                                  <div className="d-flex gap-3">
                                    <div className="book-img">
                                      <img src={routeImg} alt="Flight Route" />
                                    </div>
                                    <div className="main-noti-cont">
                                      <h6>IndiGo Airlines 6E-785</h6>
                                      <p>Passenger John | PNR XYZ123</p>
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
                                      <FaRegCircleCheck /> Confirmed
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`tab__content-item ${
                              activeTab === "hotel" ? "is--active" : ""
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
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="tab">
                        <div className="tab__list">
                          <div className="tab__item is--active">Upcoming</div>
                          <div className="tab__item">Cancelled</div>
                          <div className="tab__item">Completed</div>
                        </div>
                        <div className="tab__content">
                          <div className="tab__content-item is--active">
                            <p>Upcoming content goes here.</p>
                          </div>
                          <div className="tab__content-item">
                            <p>Cancelled content goes here.</p>
                          </div>
                          <div className="tab__content-item">
                            <p>Completed content goes here.</p>
                          </div>
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
                  tabindex="0"
                >
                  ...
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
