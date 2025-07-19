import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { useNavigate } from "react-router-dom";

const SpecialOffer = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerImagePath, setOfferImagePath] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  // Fetch category list
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/list`);
      if (response.data.success) {
        setCategoryList(response.data.data);
        if (response.data.data.length > 0) {
          const defaultTab = response.data.data[0];
          setActiveTab(defaultTab.id);
          fetchOffers(defaultTab.id);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch offers for given category ID
  const fetchOffers = async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/special/offer?category_id=${categoryId}`
      );
      if (response.data.success) {
        setOffers(response.data.data);
        setOfferImagePath(response.data.image_path);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section id="promotional_tours" className="section_padding_top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
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
                {categoryList.map((category) => (
                  <li
                    className="nav-item"
                    role="presentation"
                    key={category.id}
                  >
                    <button
                      className={`nav-link ${
                        activeTab === category.id ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        setActiveTab(category.id);
                        fetchOffers(category.id);
                      }}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active">
                <div className="row mb-5">
                  {offers.length > 0 ? (
                    <Swiper
                      key={activeTab}
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
                      {offers.map((offer) => (
                        <SwiperSlide key={offer.id}>
                          <div className="col-xl-12 col-lg-6 col-md-6">
                            <div className="specialCard">
                              <div className="specialCard__image">
                                <img
                                  src={`${offerImagePath}/${offer.image}`}
                                  alt="offer"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => navigate("/offer_details")}
                                />
                              </div>
                              <div className="specialCard__content">
                                <div className="specialCard__subtitle">
                                  {offer.content}
                                </div>
                                <h3 className="specialCard__title">
                                  Special Offer
                                </h3>
                                <div className="specialCard__text">
                                  On Your Booking
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="col-12 text-center">
                      <p>No offers available for this category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
