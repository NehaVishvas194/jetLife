import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BackToTopButton from "../BackToTop";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import hotel1 from "../../assets/img/destination/destination-1.png";
import hotel2 from "../../assets/img/destination/destination-2.png";
import hotel3 from "../../assets/img/destination/destination-3.png";
import hotel4 from "../../assets/img/destination/destination-4.png";
import hotel5 from "../../assets/img/destination/destination-5.png";
import { FaAngleDoubleRight } from "react-icons/fa";

const DestinationDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [hotel1, hotel2, hotel3, hotel4, hotel5];
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Destination Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      Destination Details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-blog --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <h2>Kathmundu tour</h2>
                    </div>
                    <div className="price-hd">
                      <h2>
                        <span>From</span>$451
                      </h2>
                    </div>
                  </div>
                  <div className="rating-high mb-3">
                    <div className="d-flex align-items-center">
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <span>4.8 (24 Review)</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <IoLocation />
                      <span>Paris, France</span>
                    </div>
                  </div>

                  <div className="gallery-wrapper">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="main-swiper"
                    >
                      {images.map((src, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={src}
                            alt={`Slide ${index}`}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/600x400?text=Not+Found";
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={20}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="thumb-swiper"
                    >
                      {images.map((src, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={src}
                            alt={`Slide ${index}`}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/600x400?text=Not+Found";
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="detail-dscrp">
                    <h6>About</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                  <div className="detail-dscrp d-flex gap-3">
                    <div className="include">
                      <h6>Included</h6>
                      <ul className="list">
                        <li>Welcome Breakfast</li>
                        <li>Lunch Platter</li>
                        <li>Evening Snacks</li>
                        <li>First Aid Kit (In case of emergency)</li>
                        <li>All Entry Tickets of Hopping Destinations</li>
                      </ul>
                    </div>
                    <div className="exclude">
                      <h6>Excluded</h6>
                      <ul className="list">
                        <li>Welcome Breakfast</li>
                        <li>Lunch Platter</li>
                        <li>Evening Snacks</li>
                        <li>First Aid Kit (In case of emergency)</li>
                        <li>All Entry Tickets of Hopping Destinations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="detail-dscrp">
                    <h6>Tour Plan</h6>
                    <div class="custom-accordion" id="tourAccordion">
                      {/* <!-- Day 1 --> */}
                      <div class="custom-accordion-item">
                        <button
                          class="custom-accordion-header active"
                          data-bs-toggle="collapse"
                          data-bs-target="#day1"
                          aria-expanded="true"
                          aria-controls="day1"
                        >
                          Day 1 – Samyan Bangkok
                          <span class="arrow">
                            <IoIosArrowDown />
                          </span>
                        </button>
                        <div
                          id="day1"
                          class="collapse show"
                          data-bs-parent="#tourAccordion"
                        >
                          <div class="custom-accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua{" "}
                            </p>
                            <ul>
                              <li>
                                “Life is either a daring adventure or nothing at
                                all.”
                              </li>
                              <li>“Travel far enough, you meet yourself.”</li>
                              <li>
                                “Wherever you go becomes a part of you somehow.”
                              </li>
                              <li>
                                “Once a year, go someplace you've never been
                                before.”
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Day 2 --> */}
                      <div class="custom-accordion-item">
                        <button
                          class="custom-accordion-header collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#day2"
                          aria-expanded="false"
                          aria-controls="day2"
                        >
                          Day 2 – Samyan Bangkok
                          <span class="arrow">
                            <IoIosArrowDown />
                          </span>
                        </button>
                        <div
                          id="day2"
                          class="collapse"
                          data-bs-parent="#tourAccordion"
                        >
                          <div class="custom-accordion-body">
                            <p>This is day 2 content...</p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Day 3 --> */}
                      <div class="custom-accordion-item">
                        <button
                          class="custom-accordion-header collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#day3"
                          aria-expanded="false"
                          aria-controls="day3"
                        >
                          Day 3 – Samyan Bangkok
                          <span class="arrow">
                            <IoIosArrowDown />
                          </span>
                        </button>
                        <div
                          id="day3"
                          class="collapse"
                          data-bs-parent="#tourAccordion"
                        >
                          <div class="custom-accordion-body">
                            <p>This is day 3 content...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="detail-dscrp">
                    <h6>Policy</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="filter-hd mb-0">
                    <h6>Destination List</h6>
                  </div>
                  <div className="tour-list-card">
                    <ul class="tour-listing">
                      <li class="list">
                        <div class="package-img imgEffect4">
                          <a href="#">
                            <img src={hotel1} alt="travello" />
                          </a>
                        </div>
                        <div class="package-content">
                          <h4 class="area-name">
                            <a href="#">Dusitd2 Samyan Bangkok</a>
                          </h4>
                          <div class="location">
                            <IoLocation />
                            <div class="name">Bangkok, Thailand</div>
                          </div>
                          <div class="price-review">
                            <div class="d-flex gap-2">
                              <p class="light-pera">From</p>
                              <p class="pera">$95</p>
                            </div>
                            <div class="rating">
                              <IoStar className="star" />
                              <p class="pera">4.7 (20 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="tour-list-card">
                    <ul class="tour-listing">
                      <li class="list">
                        <div class="package-img imgEffect4">
                          <a href="#">
                            <img src={hotel2} alt="travello" />
                          </a>
                        </div>
                        <div class="package-content">
                          <h4 class="area-name">
                            <a href="#">Dusitd2 Samyan Bangkok</a>
                          </h4>
                          <div class="location">
                            <IoLocation />
                            <div class="name">Bangkok, Thailand</div>
                          </div>
                          <div class="price-review">
                            <div class="d-flex gap-2">
                              <p class="light-pera">From</p>
                              <p class="pera">$95</p>
                            </div>
                            <div class="rating">
                              <IoStar className="star" />
                              <p class="pera">4.7 (20 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="tour-list-card">
                    <ul class="tour-listing">
                      <li class="list">
                        <div class="package-img imgEffect4">
                          <a href="#">
                            <img src={hotel3} alt="travello" />
                          </a>
                        </div>
                        <div class="package-content">
                          <h4 class="area-name">
                            <a href="#">Dusitd2 Samyan Bangkok</a>
                          </h4>
                          <div class="location">
                            <IoLocation />
                            <div class="name">Bangkok, Thailand</div>
                          </div>
                          <div class="price-review">
                            <div class="d-flex gap-2">
                              <p class="light-pera">From</p>
                              <p class="pera">$95</p>
                            </div>
                            <div class="rating">
                              <IoStar className="star" />
                              <p class="pera">4.7 (20 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="tour-list-card">
                    <ul class="tour-listing">
                      <li class="list">
                        <div class="package-img imgEffect4">
                          <a href="#">
                            <img src={hotel4} alt="travello" />
                          </a>
                        </div>
                        <div class="package-content">
                          <h4 class="area-name">
                            <a href="#">Dusitd2 Samyan Bangkok</a>
                          </h4>
                          <div class="location">
                            <IoLocation />
                            <div class="name">Bangkok, Thailand</div>
                          </div>
                          <div class="price-review">
                            <div class="d-flex gap-2">
                              <p class="light-pera">From</p>
                              <p class="pera">$95</p>
                            </div>
                            <div class="rating">
                              <IoStar className="star" />
                              <p class="pera">4.7 (20 Reviews)</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default DestinationDetails;
