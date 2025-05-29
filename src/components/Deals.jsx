import React from "react";
import hotel1 from "../assets/img/tab-img/hotel1.png";
import hotel2 from "../assets/img/tab-img/hotel2.png";
import hotel3 from "../assets/img/tab-img/hotel3.png";
import hotel4 from "../assets/img/tab-img/hotel4.png";
import hotel5 from "../assets/img/tab-img/hotel5.png";
import hotel6 from "../assets/img/tab-img/hotel6.png";
import hotel7 from "../assets/img/tab-img/hotel7.png";
import hotel8 from "../assets/img/tab-img/hotel8.png";
import { IoLocationSharp } from "react-icons/io5";

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
    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
      <div className="theme_common_box_two img_hover">
        <div className="theme_two_box_img">
          <a href="#!">
            <img src={imageUrl} alt="img" />
          </a>
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
          <h4>
            <a href="#!">{title}</a>
          </h4>
          <p>
            <span className="review_rating">{rating} Excellent</span>{" "}
            <span className="review_count">({reviewCount} reviews)</span>
          </p>
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
      discount: "50%",
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
      discount: "50%",
    },
    {
      id: 5,
      imageUrl: hotel5,
      location: "Kathmandu, Nepal",
      title: "Hotel rajavumi",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 6,
      imageUrl: hotel6,
      location: "Beach view",
      title: "Thailand grand suit",
      rating: "4.8/5",
      reviewCount: 1214,
      price: "99.00",
      discount: null,
    },
    {
      id: 7,
      imageUrl: hotel7,
      location: "Long island",
      title: "Zefi resort and spa",
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

  return (
    <div>
      <section id="explore_area" className="section_padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Explore our hot deals</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="theme_nav_tab">
                <nav className="theme_nav_tab_item">
                  <div className="nav nav-tabs" id="nav-tab1" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-hotels-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-hotels"
                      type="button"
                      role="tab"
                      aria-controls="nav-hotels"
                      aria-selected="true"
                    >
                      Hotels
                    </button>
                    <button
                      className="nav-link"
                      id="nav-tours-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-tours"
                      type="button"
                      role="tab"
                      aria-controls="nav-tours"
                      aria-selected="false"
                    >
                      Tours
                    </button>
                    <button
                      className="nav-link"
                      id="nav-space-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-space"
                      type="button"
                      role="tab"
                      aria-controls="nav-space"
                      aria-selected="false"
                    >
                      Space
                    </button>
                    <button
                      className="nav-link"
                      id="nav-events-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-events"
                      type="button"
                      role="tab"
                      aria-controls="nav-events"
                      aria-selected="false"
                    >
                      Events
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-hotels"
                  role="tabpanel"
                  aria-labelledby="nav-hotels-tab"
                >
                  <div className="row">
                    {hotelDeals.map((deal) => (
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
                    ))}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-tours"
                  role="tabpanel"
                  aria-labelledby="nav-tours-tab"
                >
                  <div className="row">
                    {toursDeal.map((tour) => (
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
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-space"
                  role="tabpanel"
                  aria-labelledby="nav-space-tab"
                >
                  <div className="row">
                    {spaceDeal.map((deal) => (
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
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-events"
                  role="tabpanel"
                  aria-labelledby="nav-events-tab"
                >
                  <div className="row">
                    {eventDeal.map((deal) => (
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
                    ))}
                  </div>
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
