import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import banner1 from "../assets/img/banner1.png";
import banner2 from "../assets/img/banner2.png";
import banner3 from "../assets/img/banner3.png";
import "animate.css";

const HomeBanner = () => {
  const slides = [banner1, banner2, banner3];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="home_six_banner">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="home_six_banner_slider_wrapper"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner_six_slider_item"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div
                      className={`banner_six_text ${
                        activeIndex === index
                          ? "animate__animated animate__fadeInUp"
                          : ""
                      }`}
                    >
                      <h1 className="slider-sttle">
                        Explore the world together
                      </h1>
                      <p className="slider-pararp">
                        Tours & Travel Agency, VIP Handling, Campsites &
                        Lodgings, Air Ticketing & Hotel Reservc, Cargo Clearing
                        & Forwarding
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;
