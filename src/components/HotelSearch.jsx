import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";
import HotelForm from "./formTabs/HotelForm";
import Header from "./Header";
import Newsletter from "./home/Newsletter";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Footer from "./Footer";
import BackToTopButton from "./BackToTop";
import Img1 from "../assets/img/apartment/apartment-7.png";

const HotelSearch = () => {
  // const [multiFromInput, setMultiFromInput] = useState([]);
  // const [multiToInput, setMultiToInput] = useState([]);

  const [journeyDate, setJourneyDate] = useState("");
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isPopularCollapsed, setIsPopularCollapsed] = useState(true);
  const [isPropertyCollapsed, setIsPropertyCollapsed] = useState(true);
  const [isStarCollapsed, setIsStarCollapsed] = useState(true);
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

  return (
    <>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
                <div>
                  <h2>Hotel search result</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <GoDotFill />
                      </span>{" "}
                      Hotel search result
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Area section */}
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
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <HotelForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- main-section-booking --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
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
                        <h6>Price Range</h6>
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
                      <div className="price-main">
                        <div className="price-input">
                          <div className="field">
                            <span>Min</span>
                            <input
                              type="number"
                              className="input-min"
                              defaultValue={2500}
                            />
                          </div>
                          <div className="separator">-</div>
                          <div className="field">
                            <span>Max</span>
                            <input
                              type="number"
                              className="input-max"
                              defaultValue={7500}
                            />
                          </div>
                        </div>
                        <div className="slider">
                          <div className="progress"></div>
                        </div>
                        <div className="range-input">
                          <input
                            type="range"
                            className="range-min"
                            min="0"
                            max="10000"
                            defaultValue={2500}
                            step="100"
                          />
                          <input
                            type="range"
                            className="range-max"
                            min="0"
                            max="10000"
                            defaultValue={7500}
                            step="100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Popular Filters */}
                  <div className="filter-block">
                    <div
                      className="filter-header"
                      onClick={togglePopularCollapse}
                    >
                      <div className="adjust-text">
                        <h6>Popular filters for Mumbai</h6>
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
                        <input type="checkbox" /> Breakfast included
                      </label>
                      <label>
                        <input type="checkbox" /> Coffee/tea maker
                      </label>
                      <label>
                        <input type="checkbox" /> Refrigerator
                      </label>
                      <label>
                        <input type="checkbox" /> Ironing facilities
                      </label>
                      <label>
                        <input type="checkbox" /> Internet access
                      </label>
                      <label>
                        <input type="checkbox" /> Bathtub
                      </label>
                      <label>
                        <input type="checkbox" /> Pay now
                      </label>
                      <label>
                        <input type="checkbox" /> Guest rating: 8+ Excellent
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
                        <h6>Property type</h6>
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
                      <label>
                        <input type="checkbox" /> Hotel (2257)
                      </label>
                      <label>
                        <input type="checkbox" /> Resort (28)
                      </label>
                      <label>
                        <input type="checkbox" /> Guesthouse/bed and breakfast
                        (82)
                      </label>
                      <label>
                        <input type="checkbox" /> Motel (3)
                      </label>
                      <label>
                        <input type="checkbox" /> Hostel (50)
                      </label>
                      <label>
                        <input type="checkbox" /> Apartment/Flat (393)
                      </label>
                      <label>
                        <input type="checkbox" /> Serviced apartment (20)
                      </label>
                      <label>
                        <input type="checkbox" /> Homestay (26)
                      </label>
                      <label>
                        <input type="checkbox" /> Inn (24)
                      </label>
                      <label>
                        <input type="checkbox" /> Resort villa (4)
                      </label>
                      <label>
                        <input type="checkbox" /> Ryokan (3)
                      </label>
                      <label>
                        <input type="checkbox" /> Entire House (119)
                      </label>
                    </div>
                  </div>
                  {/* Star Rating Filter */}
                  <div className="filter-block">
                    <div className="filter-header" onClick={toggleStarCollapse}>
                      <div className="adjust-text">
                        <h6>Star rating</h6>
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
                      <label>
                        <input type="checkbox" />{" "}
                        <i className="far fa-star"></i>
                      </label>
                      <label>
                        <input type="checkbox" />{" "}
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </label>
                      <label>
                        <input type="checkbox" />{" "}
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </label>
                      <label>
                        <input type="checkbox" />{" "}
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </label>
                      <label>
                        <input type="checkbox" />{" "}
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="filter-bar">
                        <div className="filter-left">
                          <div className="dropdown-wrapper" id="filterDropdown">
                            <div className="dropdown-btn" id="filterBtn">
                              Nightly total-including taxes and fees
                            </div>
                            <ul className="dropdown-menu">
                              <li className="active">
                                Nightly total-including taxes and fees
                              </li>
                              <li>Base price only</li>
                            </ul>
                          </div>
                        </div>
                        <div className="filter-right">
                          <div className="results-text">
                            <span>488 results</span>
                          </div>
                          <div className="label">
                            <p>
                              Sort by<span>*</span>
                            </p>
                          </div>
                          <div className="dropdown-wrapper" id="sortDropdown">
                            <div className="dropdown-btn" id="sortBtn">
                              Price (low to high)
                            </div>
                            <ul className="dropdown-menu">
                              <li>Recommended</li>
                              <li className="active">Price (low to high)</li>
                              <li>Price (high to low)</li>
                              <li>Hotel class (highest first)</li>
                              <li>Review score</li>
                              <li>Distance</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="hotel-img">
                            <img src={Img1} alt="hotel" />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="hotel-det">
                            <div className="top-part">
                              <h2>Krishna Avtar Services Apartment</h2>
                              <div className="">
                                <i className="far fa-heart"></i>
                              </div>
                            </div>
                            <p>
                              1.83 km from St. George Orthodox Syrian Church,
                              Kalamboli
                            </p>
                            <div className="d-flex gap-3 align-items-center mb-2">
                              <div className="rating-box">
                                <div className="rating-score">4.6</div>
                                <div className="rating-info">
                                  <div className="rating-title">Wonderful</div>
                                  <div className="rating-count">2 reviews</div>
                                </div>
                              </div>
                              <div className="star-main">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </div>
                            </div>
                            <div className="price-section">
                              <div className="original-price">
                                <span className="strike">₹2,349</span>
                                <span className="discount">· 26% off</span>
                              </div>
                              <div className="final-price">
                                ₹1,729{" "}
                                <span className="night-text">a night</span>
                              </div>
                            </div>
                            <div className="price-comparison">
                              <div className="price-box">
                                <div className="price-title">
                                  Trip.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹2,478</div>
                              </div>
                              <div className="price-box">
                                <div className="price-title">
                                  Vio.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹1,691</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="hotel-img">
                            <img src={Img1} alt="hotel" />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="hotel-det">
                            <div className="top-part">
                              <h2>Krishna Avtar Services Apartment</h2>
                              <div className="">
                                <i className="far fa-heart"></i>
                              </div>
                            </div>
                            <p>
                              1.83 km from St. George Orthodox Syrian Church,
                              Kalamboli
                            </p>
                            <div className="d-flex gap-3 align-items-center mb-2">
                              <div className="rating-box">
                                <div className="rating-score">4.6</div>
                                <div className="rating-info">
                                  <div className="rating-title">Wonderful</div>
                                  <div className="rating-count">2 reviews</div>
                                </div>
                              </div>
                              <div className="star-main">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </div>
                            </div>
                            <div className="price-section">
                              <div className="original-price">
                                <span className="strike">₹2,349</span>
                                <span className="discount">· 26% off</span>
                              </div>
                              <div className="final-price">
                                ₹1,729{" "}
                                <span className="night-text">a night</span>
                              </div>
                            </div>
                            <div className="price-comparison">
                              <div className="price-box">
                                <div className="price-title">
                                  Trip.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹2,478</div>
                              </div>
                              <div className="price-box">
                                <div className="price-title">
                                  Vio.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹1,691</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="hotel-img">
                            <img src={Img1} alt="hotel" />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="hotel-det">
                            <div className="top-part">
                              <h2>Krishna Avtar Services Apartment</h2>
                              <div className="">
                                <i className="far fa-heart"></i>
                              </div>
                            </div>
                            <p>
                              1.83 km from St. George Orthodox Syrian Church,
                              Kalamboli
                            </p>
                            <div className="d-flex gap-3 align-items-center mb-2">
                              <div className="rating-box">
                                <div className="rating-score">4.6</div>
                                <div className="rating-info">
                                  <div className="rating-title">Wonderful</div>
                                  <div className="rating-count">2 reviews</div>
                                </div>
                              </div>
                              <div className="star-main">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </div>
                            </div>
                            <div className="price-section">
                              <div className="original-price">
                                <span className="strike">₹2,349</span>
                                <span className="discount">· 26% off</span>
                              </div>
                              <div className="final-price">
                                ₹1,729{" "}
                                <span className="night-text">a night</span>
                              </div>
                            </div>
                            <div className="price-comparison">
                              <div className="price-box">
                                <div className="price-title">
                                  Trip.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹2,478</div>
                              </div>
                              <div className="price-box">
                                <div className="price-title">
                                  Vio.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹1,691</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="hotel-img">
                            <img src={Img1} alt="hotel" />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="hotel-det">
                            <div className="top-part">
                              <h2>Krishna Avtar Services Apartment</h2>
                              <div className="">
                                <i className="far fa-heart"></i>
                              </div>
                            </div>
                            <p>
                              1.83 km from St. George Orthodox Syrian Church,
                              Kalamboli
                            </p>
                            <div className="d-flex gap-3 align-items-center mb-2">
                              <div className="rating-box">
                                <div className="rating-score">4.6</div>
                                <div className="rating-info">
                                  <div className="rating-title">Wonderful</div>
                                  <div className="rating-count">2 reviews</div>
                                </div>
                              </div>
                              <div className="star-main">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </div>
                            </div>
                            <div className="price-section">
                              <div className="original-price">
                                <span className="strike">₹2,349</span>
                                <span className="discount">· 26% off</span>
                              </div>
                              <div className="final-price">
                                ₹1,729{" "}
                                <span className="night-text">a night</span>
                              </div>
                            </div>
                            <div className="price-comparison">
                              <div className="price-box">
                                <div className="price-title">
                                  Trip.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹2,478</div>
                              </div>
                              <div className="price-box">
                                <div className="price-title">
                                  Vio.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹1,691</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card booking-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="hotel-img">
                            <img src={Img1} alt="hotel" />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="hotel-det">
                            <div className="top-part">
                              <h2>Krishna Avtar Services Apartment</h2>
                              <div className="">
                                <i className="far fa-heart"></i>
                              </div>
                            </div>
                            <p>
                              1.83 km from St. George Orthodox Syrian Church,
                              Kalamboli
                            </p>
                            <div className="d-flex gap-3 align-items-center mb-2">
                              <div className="rating-box">
                                <div className="rating-score">4.6</div>
                                <div className="rating-info">
                                  <div className="rating-title">Wonderful</div>
                                  <div className="rating-count">2 reviews</div>
                                </div>
                              </div>
                              <div className="star-main">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </div>
                            </div>
                            <div className="price-section">
                              <div className="original-price">
                                <span className="strike">₹2,349</span>
                                <span className="discount">· 26% off</span>
                              </div>
                              <div className="final-price">
                                ₹1,729{" "}
                                <span className="night-text">a night</span>
                              </div>
                            </div>
                            <div className="price-comparison">
                              <div className="price-box">
                                <div className="price-title">
                                  Trip.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹2,478</div>
                              </div>
                              <div className="price-box">
                                <div className="price-title">
                                  Vio.com{" "}
                                  <i className="fas fa-external-link-alt"></i>
                                </div>
                                <div className="price-amount">₹1,691</div>
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
        </div>
      </section>
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </>
  );
};

export default HotelSearch;
