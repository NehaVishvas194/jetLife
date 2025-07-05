import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IoLocationSharp } from "react-icons/io5";
import image1 from "../../assets/img/offer/offer-1.png";
import image2 from "../../assets/img/offer/offer-2.png";
import image3 from "../../assets/img/offer/offer-3.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";

const SpecialOffer = () => {
  const [offers, setOffers] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [activeTab, setActiveTab] = useState("flights");

  const fetchOffers = () => {
    axios
      .get(`${API_BASE_URL}/special/offer`)
      .then((response) => {
        console.log(response.data.data);
        setOffers(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.error("Error fetching Special Offers:", error);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <section id="promotional_tours" className="section_padding_top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Special Offers</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="our-service-tab">
              <ul
                className="nav nav-pills mb-3 justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "flights" ? "active" : ""
                    }`}
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={() => setActiveTab("flights")}
                  >
                    Flights
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "hotels" ? "active" : ""
                    }`}
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    onClick={() => setActiveTab("hotels")}
                  >
                    Hotels
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "cars" ? "active" : ""
                    }`}
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    onClick={() => setActiveTab("cars")}
                  >
                    Cars
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              {activeTab === "flights" && (
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  <div className="row mb-5">
                    <Swiper
                      modules={[Autoplay]}
                      spaceBetween={20}
                      slidesPerView={4}
                      loop={true}
                      autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                      }}
                    >
                      {/* {offers.map((offer) => (
                        <SwiperSlide key={offer.id}>
                          <div className="col-xl-12 col-lg-6 col-md-6">
                            <div class="specialCard">
                              <div class="specialCard__image">
                                <img
                                  src={`${imagePath}/${offer?.image}`}
                                  alt="offer_image"
                                ></img>
                              </div>
                              <div class="specialCard__content">
                                <div class="specialCard__subtitle">
                                  {offer.content}
                                </div>
                                <h3 class="specialCard__title">60 % OFF</h3>
                                <div class="specialCard__text">
                                  on Your Booking
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))} */}

                      <SwiperSlide>
                        <div className="col-xl-12 col-lg-6 col-md-6">
                          <div class="specialCard">
                            <div class="specialCard__image">
                              <img src={image2}></img>
                            </div>
                            <div class="specialCard__content">
                              <div class="specialCard__subtitle">
                                Enjoy Upto
                              </div>
                              <h3 class="specialCard__title">80 % OFF</h3>
                              <div class="specialCard__text">
                                Are You Ready To Turkey Tour
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="col-xl-12 col-lg-6 col-md-6">
                          <div class="specialCard">
                            <div class="specialCard__image">
                              <img src={image3}></img>
                            </div>
                            <div class="specialCard__content">
                              <h3 class="specialCard__title">
                                Discover the wow <br></br>of europe
                              </h3>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="col-xl-12 col-lg-6 col-md-6">
                          <div class="specialCard">
                            <div class="specialCard__image">
                              <img src={image1}></img>
                            </div>
                            <div class="specialCard__content">
                              <div class="specialCard__subtitle">
                                Enjoy Upto
                              </div>
                              <h3 class="specialCard__title">60 % OFF</h3>
                              <div class="specialCard__text">
                                on Your Booking
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="col-xl-12 col-lg-6 col-md-6">
                          <div class="specialCard">
                            <div class="specialCard__image">
                              <img src={image2}></img>
                            </div>
                            <div class="specialCard__content">
                              <div class="specialCard__subtitle">
                                Enjoy Upto
                              </div>
                              <h3 class="specialCard__title">80 % OFF</h3>
                              <div class="specialCard__text">
                                Are You Ready To Turkey Tour
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="col-xl-12 col-lg-6 col-md-6">
                          <div class="specialCard">
                            <div class="specialCard__image">
                              <img src={image3}></img>
                            </div>
                            <div class="specialCard__content">
                              <h3 class="specialCard__title">
                                Discover the wow <br></br>of europe
                              </h3>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              )}
              {activeTab === "hotels" && (
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabindex="0"
                >
                  <div className="row mb-5">
                    ........
                  </div>
                </div>
              )}
              {activeTab === "cars" && (
                <div
                  class="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabindex="0"
                >
                  <div className="row mb-5">
                   ........
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;