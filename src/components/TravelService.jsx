import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IoLocationSharp } from "react-icons/io5";

import image1 from "../assets/img/tab-img/hotel1.png";
import image2 from "../assets/img/tab-img/hotel2.png";
import image3 from "../assets/img/tab-img/hotel3.png";
import image4 from "../assets/img/tab-img/hotel4.png";
import image6 from "../assets/img/tab-img/hotel6.png";
import image7 from "../assets/img/tab-img/hotel7.png";

const travelServices = [
  {
    image: image1,
    location: "New beach, Thailand",
    title: "Kantua hotel, Thailand",
    discount: null,
  },
  {
    image: image2,
    location: "Indonesia",
    title: "Hotel paradise international",
    discount: "50%",
  },
  {
    image: image3,
    location: "Kualalampur",
    title: "Hotel kualalampur",
    discount: null,
  },
  {
    image: image4,
    location: "Mariana island",
    title: "Hotel deluxe",
    discount: "50%",
  },
  {
    image: image6,
    location: "Beach view",
    title: "Thailand grand suit",
    discount: null,
  },
  {
    image: image7,
    location: "Long island",
    title: "Zefi resort and spa",
    discount: null,
  },
];

const TravelService = () => {
  return (
    <section id="promotional_tours" className="section_padding_top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Our best Travel Services</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {travelServices.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="theme_common_box_two img_hover">
                    <div className="theme_two_box_img">
                      <a href="#!">
                        <img src={item.image} alt={`img${index + 1}`} />
                      </a>
                      <p>
                        <IoLocationSharp /> {item.location}
                      </p>
                      {item.discount && (
                        <div className="discount_tab">
                          <span>{item.discount}</span>
                        </div>
                      )}
                    </div>
                    <div className="theme_two_box_content">
                      <h4>
                        <a href="#!">{item.title}</a>
                      </h4>
                      <p>
                        <span className="review_rating">4.8/5 Excellent</span>{" "}
                        <span className="review_count">(1214 reviews)</span>
                      </p>
                      <h3>
                        $99.00 <span>Price starts from</span>
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelService;
