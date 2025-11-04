import React from "react";
import hotel1 from "../../assets/img/tab-img/hotel1.png";
import hotel2 from "../../assets/img/tab-img/hotel2.png";
import hotel3 from "../../assets/img/tab-img/hotel3.png";
import hotel4 from "../../assets/img/tab-img/hotel4.png";
import hotel5 from "../../assets/img/tab-img/hotel5.png";
import hotel8 from "../../assets/img/tab-img/hotel8.png";
import { IoLocationSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const HotelCard = ({
  imageUrl,
  location,
  title,
  rating,
  reviewCount,
  price,
  discount,
}) => {
  return (
    <div>
      <div className="theme_common_box_two img_hover">
        <div className="theme_two_box_img">
          <Link to="/travel_details">
            <img src={imageUrl} alt="img" />
          </Link>
          <p>
            <IoLocationSharp /> {location}
          </p>
          {discount && (
            <div className="discount_tab">
              <span>{discount}</span>
            </div>
          )}
        </div>
        <div className="theme_two_box_content">
          <p>
            <span className="review_rating">{rating} Excellent</span>{" "}
            <span className="review_count">({reviewCount} reviews)</span>
          </p>
          <h4>
            <a href="#!">{title}</a>
          </h4>

          <h3>
            ${price} <span>Price starts from</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

const Deals = () => {
  const hotelDeals = [
    {
      id: 1,
      imageUrl: hotel1,
      location: "New beach, Thailand",
      title: "Kantua hotel, Thailand",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 2,
      imageUrl: hotel2,
      location: "Indonesia",
      title: "Hotel paradise international",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: "50% discount",
    },
    {
      id: 3,
      imageUrl: hotel3,
      location: "Kualalampur",
      title: "Hotel kualalampur",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 4,
      imageUrl: hotel4,
      location: "Mariana island",
      title: "Hotel deluxe",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: "50% discount",
    },
    {
      id: 5,
      imageUrl: hotel5,
      location: "Mariana island",
      title: "Hotel deluxe",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: "50% discount",
    },
  ];

  const toursDeal = [
    {
      id: 1,
      imageUrl: hotel1,
      location: "New beach, Thailand",
      title: "Kantua hotel, Thailand",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 3,
      imageUrl: hotel3,
      location: "Kualalampur",
      title: "Hotel kualalampur",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 8,
      imageUrl: hotel8,
      location: "Philippine",
      title: "Manila international resort",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
  ];

  const spaceDeal = [
    {
      id: 1,
      imageUrl: hotel1,
      location: "New beach, Thailand",
      title: "Kantua hotel, Thailand",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 3,
      imageUrl: hotel3,
      location: "Kualalampur",
      title: "Hotel kualalampur",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
  ];

  const eventDeal = [
    {
      id: 1,
      imageUrl: hotel1,
      location: "New beach, Thailand",
      title: "Kantua hotel, Thailand",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 8,
      imageUrl: hotel8,
      location: "Philippine",
      title: "Manila international resort",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
  ];

  // const navigate = useNavigate();
  // const detailsPage = () => {
  //   navigate("/travel_details");
  // };

  return (
    <div>
      <section id="explore_area1" className="section_padding_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Our Best Services</h2>
                <p>
                  Choose from a wide range of travel services including flights,
                  luxury hotels, car rentals, guided tours, and even space
                  travel – all tailored to make your journey memorable.
                </p>
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
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Flights
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Hotels
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Cars
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-tour-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-tour"
                      type="button"
                      role="tab"
                      aria-controls="pills-tour"
                      aria-selected="false"
                    >
                      Tours
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-space-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-space"
                      type="button"
                      role="tab"
                      aria-controls="pills-space"
                      aria-selected="false"
                    >
                      Space
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-12">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={4}
                        loop={true}
                        navigation={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 4 },
                        }}
                      >
                        {hotelDeals?.map((deal) => (
                          <SwiperSlide>
                            <HotelCard
                              key={deal.id}
                              imageUrl={deal.imageUrl}
                              location={deal.location}
                              title={deal.title}
                              rating={deal.rating}
                              reviewCount={deal.reviewCount}
                              price={deal.price}
                              discount={deal.discount}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabindex="0"
                >
                  <div className="row">
                    <div className="col-12">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={4}
                        loop={true}
                        navigation={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 4 },
                        }}
                      >
                        {toursDeal?.map((tour) => (
                          <SwiperSlide>
                            <HotelCard
                              key={tour.id}
                              imageUrl={tour.imageUrl}
                              location={tour.location}
                              title={tour.title}
                              rating={tour.rating}
                              reviewCount={tour.reviewCount}
                              price={tour.price}
                              discount={tour.discount}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabindex="0"
                >
                  <div className="row">
                    <div className="col-12">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={4}
                        loop={true}
                        navigation={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 4 },
                        }}
                      >
                        {spaceDeal.map((deal) => (
                          <SwiperSlide>
                            <HotelCard
                              key={deal.id}
                              imageUrl={deal.imageUrl}
                              location={deal.location}
                              title={deal.title}
                              rating={deal.rating}
                              reviewCount={deal.reviewCount}
                              price={deal.price}
                              discount={deal.discount}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-tour"
                  role="tabpanel"
                  aria-labelledby="pills-tour-tab"
                  tabindex="0"
                >
                  <div className="row">
                    <div className="col-12">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={4}
                        loop={true}
                        navigation={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 4 },
                        }}
                      >
                        {eventDeal.map((deal) => (
                          <SwiperSlide>
                            <HotelCard
                              key={deal.id}
                              imageUrl={deal.imageUrl}
                              location={deal.location}
                              title={deal.title}
                              rating={deal.rating}
                              reviewCount={deal.reviewCount}
                              price={deal.price}
                              discount={deal.discount}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-space"
                  role="tabpanel"
                  aria-labelledby="pills-space-tab"
                  tabindex="0"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals;
