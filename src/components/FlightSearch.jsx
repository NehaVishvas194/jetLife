import React from "react";
import { FaHotel, FaHelicopter } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaExchangeAlt,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import flightImg from "../assets/img/common/filght.svg";
import rightArrow from "../assets/img/icon/right_arrow.png";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const FlightSearch = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
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
                                        <FaExchangeAlt />
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
                  <div
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
                  </div>
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
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
                  </div>
                  <div
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
                  </div>
                  <div
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
                  </div>
                  <div
                    className="tab-pane fade"
                    id="bus"
                    role="tabpanel"
                    aria-labelledby="bus-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="oneway_search_form">
                                  <form action="#!">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input type="text" value="Dhaka" />
                                          <span>Bus Trtminal</span>
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
                                            value="Cox’s Bazar"
                                          />
                                          <span>Bus Trtminal</span>
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
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Flight Search Areas --> */}
      <section id="explore_area" class="section_padding">
        <div class="container">
          {/* <!-- Section Heading --> */}
          {/* <!-- <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>42 tours found</h2>
                    </div>
                </div>
            </div> --> */}
          <div class="row">
            <div class="col-lg-3">
              <div class="left_side_search_area">
                {/* <!-- <div class="left_side_search_boxed">
                            <div class="left_side_search_heading">
                                <h5>Filter by price</h5>
                            </div>
                            <div class="filter-price">
                                <div id="price-slider"></div>
                            </div>
                            <button class="apply" type="button">Apply</button>
                        </div> --> */}
                <div class="left_side_search_boxed">
                  <div class="left_side_search_heading">
                    <h5>Number of stops</h5>
                  </div>
                  <div class="tour_search_type">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultf1"
                      />
                      <label class="form-check-label" for="flexCheckDefaultf1">
                        <span class="area_flex_one">
                          <span>1 stop</span>
                          <span>20</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultf2"
                      />
                      <label class="form-check-label" for="flexCheckDefaultf2">
                        <span class="area_flex_one">
                          <span>2 stop</span>
                          <span>16</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultf3"
                      />
                      <label class="form-check-label" for="flexCheckDefaultf3">
                        <span class="area_flex_one">
                          <span>3 stop</span>
                          <span>30</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultf4"
                      />
                      <label class="form-check-label" for="flexCheckDefaultf4">
                        <span class="area_flex_one">
                          <span>Non-stop</span>
                          <span>22</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="left_side_search_boxed">
                  <div class="left_side_search_heading">
                    <h5>Airlines</h5>
                  </div>
                  <div class="tour_search_type">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaults1"
                      />
                      <label class="form-check-label" for="flexCheckDefaults1">
                        <span class="area_flex_one">
                          <span>Quatar Airways</span>
                          <span>17</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaults2"
                      />
                      <label class="form-check-label" for="flexCheckDefaults2">
                        <span class="area_flex_one">
                          <span>Fly Amirates </span>
                          <span>14</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaults3"
                      />
                      <label class="form-check-label" for="flexCheckDefaults3">
                        <span class="area_flex_one">
                          <span>Novo Air </span>
                          <span>62</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaults4"
                      />
                      <label class="form-check-label" for="flexCheckDefaults4">
                        <span class="area_flex_one">
                          <span>Air Asia </span>
                          <span>08</span>
                        </span>
                      </label>
                    </div>
                    <div class="hide-part">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaults5"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefaults5"
                        >
                          <span class="area_flex_one">
                            <span>Singapore Airlines </span>
                            <span>12</span>
                          </span>
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaults5"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefaults5"
                        >
                          <span class="area_flex_one">
                            <span>Singapore Airlines </span>
                            <span>12</span>
                          </span>
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaults5"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefaults5"
                        >
                          <span class="area_flex_one">
                            <span>Singapore Airlines </span>
                            <span>12</span>
                          </span>
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaults5"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefaults5"
                        >
                          <span class="area_flex_one">
                            <span>Singapore Airlines </span>
                            <span>12</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <a href="#!" class="show-more">
                      Show More
                    </a>
                  </div>
                </div>
                <div class="left_side_search_boxed">
                  <div class="left_side_search_heading">
                    <h5>Refundable</h5>
                  </div>
                  <div class="tour_search_type">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultp1"
                      />
                      <label class="form-check-label" for="flexCheckDefaultp1">
                        <span class="area_flex_one">
                          <span>Yes</span>
                          <span>17</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultp2"
                      />
                      <label class="form-check-label" for="flexCheckDefaultp2">
                        <span class="area_flex_one">
                          <span>No</span>
                          <span>14</span>
                        </span>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefaultp3"
                      />
                      <label class="form-check-label" for="flexCheckDefaultp3">
                        <span class="area_flex_one">
                          <span>As per rules</span>
                          <span>62</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="row">
                <div class="col-lg-12">
                  <div class="choosedepartingflight">
                    <div class="chooseTitle">
                      <ul class="titleinline">
                        <li>
                          <strong>Choose departing flight</strong>
                        </li>
                        <li>
                          <i class="fas fa-angle-right"></i>
                        </li>
                        <li>Choose returning flight</li>
                        <li>
                          <i class="fas fa-angle-right"></i>
                        </li>
                        <li>Review your trip</li>
                      </ul>
                    </div>
                    <ul class="choosedepartList">
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                      <li>
                        <button class="btn chooseBtnFlt">
                          <span class="smalltext">Fri, May 16</span>
                          <span class="priceBigText">$1,102</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="flight_search_result_wrapper">
                    <div class="flight_search_item_wrappper">
                      <div
                        class="flight_search_items"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <div class="multi_city_flight_lists">
                          <div class="flight_multis_area_wrapper">
                            <div class="flight_search_left">
                              <div class="flight_logo">
                                <img src={flightImg} alt="img" />
                              </div>
                              <div class="flight_search_destination">
                                <p>From</p>
                                <h3>New York</h3>
                                <h6>JFK - John F. Kennedy International...</h6>
                              </div>
                            </div>
                            <div class="flight_search_middel">
                              <div class="flight_right_arrow">
                                <img src={rightArrow} alt="icon" />
                                <h6>Non-stop</h6>
                                <p>01h 05minute </p>
                              </div>
                              <div class="flight_search_destination">
                                <p>To</p>
                                <h3>London </h3>
                                <h6>LCY, London city airport </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flight_search_right">
                          {/* <!-- <h5><del>$9,560</del></h5> --> */}
                          <h2>
                            $7,560<sup>*20% OFF</sup>
                          </h2>
                          <p>*Discount applicable on some conditions</p>
                        </div>
                      </div>
                    </div>

                    {/* <!-- -------------------Explore packages Modal---------------------------- --> */}
                    <div
                      class="modal fade"
                      id="explorepackages"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="explorepackagesLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header modalHeader">
                            <h1
                              class="modal-title fs-5"
                              id="explorepackagesLabel"
                            >
                              Bundle & Save up to $974* with flight + hotel
                              package deals
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <ul class="comntitle">
                              <li>
                                <span class="greenicon material-icons">
                                  {" "}
                                  check_circle{" "}
                                </span>
                                Includes your selected flight
                              </li>
                            </ul>
                            <div class="">
                              <h1 class="modal-title fs-5 pb-3">
                                Las Vegas hotel dates
                              </h1>
                              <form>
                                <div class="row">
                                  <div class="col-lg-6 mb-3">
                                    <input
                                      type="date"
                                      class="form-control"
                                      id=""
                                    />
                                  </div>
                                  <div class="col-lg-6 mb-3">
                                    <input
                                      type="date"
                                      class="form-control"
                                      id=""
                                    />
                                  </div>
                                  <div class="col-lg-12 d-grid gap-2 ">
                                    <button
                                      class="sidebaarSelectBtn btn btn_theme"
                                      type="button"
                                    >
                                      Explore Packages
                                    </button>
                                    {/* <!-- <button class="nothakstextColor btn btn-light" type="button">No Thanks</button> --> */}
                                    <a
                                      href="review_your_trip.html"
                                      class="nothakstextColor btn btn-light"
                                    >
                                      Review Your Trip
                                    </a>
                                  </div>
                                  <div class="col-lg-12">
                                    <p class="savingsrewardsText">
                                      *Savings vary and are not available on all
                                      packages. Savings are compared to the
                                      price of the same components booked
                                      separately without any discounts or
                                      rewards.
                                    </p>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- -----------------End Explore Packages------------------------------ --> */}

                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="1"
                      id="offcanvasRight"
                      data-bs-backdrop="false"
                      data-bs-keyboard="true"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">
                          Select fare to New York
                        </h5>
                        <button
                          type="button"
                          class="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                        {/* <!-- data-bs-dismiss="offcanvas" aria-label="Close" --> */}
                      </div>
                      <div class="offcanvas-body pt-0">
                        <div class="empireRateSection">
                          <div class="empireList">
                            <div class="">
                              <h4>
                                10:00pm - 8:50am (20h 20m, 1 stop)
                                <small>+1</small>
                              </h4>
                              <div class="flightIcons">
                                <span>
                                  <img src={flightImg} alt="img" />
                                </span>
                                <span>Etihad Airways</span>
                                <span>
                                  <i class="fas fa-wifi"></i>
                                </span>
                                <span>
                                  <i class="fas fa-charging-station"></i>
                                </span>
                                <span>
                                  <i class="fas fa-tv"></i>
                                </span>
                                <span class="aboveBg">Above average CO₂</span>
                              </div>
                            </div>
                            <ul class="detailBox">
                              <li class="boxbordered">
                                <div class="priceAndDetails">
                                  <h3>$393</h3>
                                  <small>
                                    $2,357.54 one way for 6 travelers
                                  </small>
                                  <p class="listheading">Economy Basic</p>
                                  <p class="cabintitle">Cabin: Economy</p>
                                </div>
                                <div class="seatbagsFlexibility">
                                  <ul class="comntitle">
                                    <li class="listheading">Seat</li>
                                    <li>
                                      <span class="greenicon material-icons">
                                        {" "}
                                        check_circle
                                      </span>{" "}
                                      Seat choice for a fee
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Bags</li>
                                    <li>
                                      <span class="greenicon material-icons">
                                        {" "}
                                        check_circle
                                      </span>{" "}
                                      Carry-on bag included (15 lbs)
                                    </li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>{" "}
                                      2 checked bags included (50 lbs each)
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Flexibility</li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>
                                      Non-refundable
                                    </li>
                                    <li>
                                      <div class="addtothisflight">
                                        <label>
                                          <span class="greenicon material-icons">
                                            check_circle{" "}
                                          </span>{" "}
                                          Change fee:
                                        </label>
                                        <small>$639</small>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="priceDrop">
                                    <h6>
                                      <span></span>Price Drop Protection{" "}
                                      <a href="#!">
                                        <span class="material-icons">
                                          error_outline
                                        </span>
                                      </a>
                                    </h6>
                                    <p>
                                      We’ll refund the difference if the price
                                      drops before you fly.
                                    </p>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="checkDefault"
                                      />
                                      <div class="addtothisflight">
                                        <label
                                          class="form-check-label"
                                          for="checkDefault"
                                        >
                                          Add to this flight
                                        </label>
                                        <span>$39</span>
                                      </div>
                                    </div>
                                    <button
                                      class="sidebaarSelectBtn btn btn_theme btn_md"
                                      data-bs-toggle="modal"
                                      data-bs-target="#explorepackages"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </li>

                              <li class="boxbordered">
                                <div class="priceAndDetails">
                                  <h3>$393</h3>
                                  <small>
                                    $2,357.54 one way for 6 travelers
                                  </small>
                                  <p class="listheading">Economy Basic</p>
                                  <p class="cabintitle">Cabin: Economy</p>
                                </div>
                                <div class="seatbagsFlexibility">
                                  <ul class="comntitle">
                                    <li class="listheading">Seat</li>
                                    <li>
                                      <span class="material-icons"> paid </span>{" "}
                                      Seat choice for a fee
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Bags</li>
                                    <li>
                                      <span class="greenicon material-icons">
                                        {" "}
                                        check_circle
                                      </span>{" "}
                                      Carry-on bag included (15 lbs)
                                    </li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>{" "}
                                      2 checked bags included (50 lbs each)
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Flexibility</li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>
                                      Non-refundable
                                    </li>
                                    <li>
                                      <div class="addtothisflight">
                                        <label>
                                          <span class="greenicon material-icons">
                                            check_circle{" "}
                                          </span>{" "}
                                          Change fee:
                                        </label>
                                        <small>$639</small>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="priceDrop">
                                    <h6>
                                      <span></span>Price Drop Protection{" "}
                                      <a href="#!">
                                        <span class="material-icons">
                                          error_outline
                                        </span>
                                      </a>
                                    </h6>
                                    <p>
                                      We’ll refund the difference if the price
                                      drops before you fly.
                                    </p>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="checkDefault"
                                      />
                                      <div class="addtothisflight">
                                        <label
                                          class="form-check-label"
                                          for="checkDefault"
                                        >
                                          Add to this flight
                                        </label>
                                        <span>$39</span>
                                      </div>
                                    </div>
                                    <button class="sidebaarSelectBtn btn btn_theme btn_md">
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </li>

                              <li class="boxbordered">
                                <div class="priceAndDetails">
                                  <h3>$393</h3>
                                  <small>
                                    $2,357.54 one way for 6 travelers
                                  </small>
                                  <p class="listheading">Economy Basic</p>
                                  <p class="cabintitle">Cabin: Economy</p>
                                </div>
                                <div class="seatbagsFlexibility">
                                  <ul class="comntitle">
                                    <li class="listheading">Seat</li>
                                    <li>
                                      <span class="material-icons"> paid </span>{" "}
                                      Seat choice for a fee
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Bags</li>
                                    <li>
                                      <span class="greenicon material-icons">
                                        {" "}
                                        check_circle
                                      </span>{" "}
                                      Carry-on bag included (15 lbs)
                                    </li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>{" "}
                                      2 checked bags included (50 lbs each)
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Flexibility</li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>
                                      Non-refundable
                                    </li>
                                    <li>
                                      <div class="addtothisflight">
                                        <label>
                                          <span class="greenicon material-icons">
                                            check_circle{" "}
                                          </span>{" "}
                                          Change fee:
                                        </label>
                                        <small>$639</small>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="priceDrop">
                                    <h6>
                                      <span></span>Price Drop Protection{" "}
                                      <a href="#!">
                                        <span class="material-icons">
                                          error_outline
                                        </span>
                                      </a>
                                    </h6>
                                    <p>
                                      We’ll refund the difference if the price
                                      drops before you fly.
                                    </p>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="checkDefault"
                                      />
                                      <div class="addtothisflight">
                                        <label
                                          class="form-check-label"
                                          for="checkDefault"
                                        >
                                          Add to this flight
                                        </label>
                                        <span>$39</span>
                                      </div>
                                    </div>
                                    <button class="sidebaarSelectBtn btn btn_theme btn_md">
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </li>
                              <li class="boxbordered">
                                <div class="priceAndDetails">
                                  <h3>$393</h3>
                                  <small>
                                    $2,357.54 one way for 6 travelers
                                  </small>
                                  <p class="listheading">Economy Basic</p>
                                  <p class="cabintitle">Cabin: Economy</p>
                                </div>
                                <div class="seatbagsFlexibility">
                                  <ul class="comntitle">
                                    <li class="listheading">Seat</li>
                                    <li>
                                      <span class="material-icons"> paid </span>{" "}
                                      Seat choice for a fee
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Bags</li>
                                    <li>
                                      <span class="greenicon material-icons">
                                        {" "}
                                        check_circle
                                      </span>{" "}
                                      Carry-on bag included (15 lbs)
                                    </li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>{" "}
                                      2 checked bags included (50 lbs each)
                                    </li>
                                  </ul>
                                  <ul class="comntitle">
                                    <li class="listheading">Flexibility</li>
                                    <li>
                                      <span class="material-icons">
                                        {" "}
                                        close{" "}
                                      </span>
                                      Non-refundable
                                    </li>
                                    <li>
                                      <div class="addtothisflight">
                                        <label>
                                          <span class="greenicon material-icons">
                                            check_circle{" "}
                                          </span>{" "}
                                          Change fee:
                                        </label>
                                        <small>$639</small>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="priceDrop">
                                    <h6>
                                      <span></span>Price Drop Protection{" "}
                                      <a href="#!">
                                        <span class="material-icons">
                                          error_outline
                                        </span>
                                      </a>
                                    </h6>
                                    <p>
                                      We’ll refund the difference if the price
                                      drops before you fly.
                                    </p>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="checkDefault"
                                      />
                                      <div class="addtothisflight">
                                        <label
                                          class="form-check-label"
                                          for="checkDefault"
                                        >
                                          Add to this flight
                                        </label>
                                        <span>$39</span>
                                      </div>
                                    </div>
                                    <button class="sidebaarSelectBtn btn btn_theme btn_md">
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Flight Search Item --> */}
                    <div class="flight_search_item_wrappper">
                      <div class="flight_search_items">
                        <div class="multi_city_flight_lists">
                          <div class="flight_multis_area_wrapper">
                            <div class="flight_search_left">
                              <div class="flight_logo">
                                <img src={flightImg} alt="img" />
                              </div>
                              <div class="flight_search_destination">
                                <p>From</p>
                                <h3>New York</h3>
                                <h6>JFK - John F. Kennedy International...</h6>
                              </div>
                            </div>
                            <div class="flight_search_middel">
                              <div class="flight_right_arrow">
                                <img src={rightArrow} alt="icon" />
                                <h6>Non-stop</h6>
                                <p>01h 05minute </p>
                              </div>
                              <div class="flight_search_destination">
                                <p>To</p>
                                <h3>London </h3>
                                <h6>LCY, London city airport </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flight_search_right">
                          <h2>
                            $7,560<sup>*20% OFF</sup>
                          </h2>
                          <p>*Discount applicable on some conditions</p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Flight Search Item --> */}
                    <div class="flight_search_item_wrappper">
                      <div class="flight_search_items">
                        <div class="multi_city_flight_lists">
                          <div class="flight_multis_area_wrapper">
                            <div class="flight_search_left">
                              <div class="flight_logo">
                                <img src={flightImg} alt="img" />
                              </div>
                              <div class="flight_search_destination">
                                <p>From</p>
                                <h3>New York</h3>
                                <h6>JFK - John F. Kennedy International...</h6>
                              </div>
                            </div>
                            <div class="flight_search_middel">
                              <div class="flight_right_arrow">
                                <img src={rightArrow} alt="icon" />
                                <h6>Non-stop</h6>
                                <p>01h 05minute </p>
                              </div>
                              <div class="flight_search_destination">
                                <p>To</p>
                                <h3>London </h3>
                                <h6>LCY, London city airport </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flight_search_right">
                          <h2>
                            $7,560<sup>*20% OFF</sup>
                          </h2>
                          <p>*Discount applicable on some conditions</p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Flight Search Item --> */}
                    <div class="flight_search_item_wrappper">
                      <div class="flight_search_items">
                        <div class="multi_city_flight_lists">
                          <div class="flight_multis_area_wrapper">
                            <div class="flight_search_left">
                              <div class="flight_logo">
                                <img src={flightImg} alt="img" />
                              </div>
                              <div class="flight_search_destination">
                                <p>From</p>
                                <h3>New York</h3>
                                <h6>JFK - John F. Kennedy International...</h6>
                              </div>
                            </div>
                            <div class="flight_search_middel">
                              <div class="flight_right_arrow">
                                <img src={rightArrow} alt="icon" />
                                <h6>Non-stop</h6>
                                <p>01h 05minute </p>
                              </div>
                              <div class="flight_search_destination">
                                <p>To</p>
                                <h3>London </h3>
                                <h6>LCY, London city airport </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flight_search_right">
                          <h2>
                            $7,560<sup>*20% OFF</sup>
                          </h2>
                          <p>*Discount applicable on some conditions</p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Flight Search Item --> */}
                    <div class="flight_search_item_wrappper">
                      <div class="flight_search_items">
                        <div class="multi_city_flight_lists">
                          <div class="flight_multis_area_wrapper">
                            <div class="flight_search_left">
                              <div class="flight_logo">
                                <img src={flightImg} alt="img" />
                              </div>
                              <div class="flight_search_destination">
                                <p>From</p>
                                <h3>New York</h3>
                                <h6>JFK - John F. Kennedy International...</h6>
                              </div>
                            </div>
                            <div class="flight_search_middel">
                              <div class="flight_right_arrow">
                                <img src={rightArrow} alt="icon" />
                                <h6>Non-stop</h6>
                                <p>01h 05minute </p>
                              </div>
                              <div class="flight_search_destination">
                                <p>To</p>
                                <h3>London </h3>
                                <h6>LCY, London city airport </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flight_search_right">
                          <h2>
                            $7,560<sup>*20% OFF</sup>
                          </h2>
                          <p>*Discount applicable on some conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="load_more_flight">
                    <button class="btn btn_md">
                      <i class="fas fa-spinner fa-spin"></i> Load more..
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default FlightSearch;
