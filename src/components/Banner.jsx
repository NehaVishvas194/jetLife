import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "animate.css";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";

const HomeBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banner, setBanner] = useState([]);
  const [imagePath, setImagePath] = useState("");

  const fetchBanner = () => {
    axios
      .get(`${API_BASE_URL}/banners`)
      .then((response) => {
        console.log(response.data.data);
        setBanner(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section id="home_six_banner">
      <Swiper
        // modules={[Navigation, Autoplay]}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        // slidesPerView={1}
        // loop={true}
        // navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="home_six_banner_slider_wrapper"
      >
        {banner.map((bann, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner_six_slider_item"
              style={{
                backgroundImage: `url(${imagePath}/${bann?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className={`banner_six_text ${
                        activeIndex === index
                          ? "animate__animated animate__fadeInUp"
                          : ""
                      }`}
                    >
                      <h1 className="slider-sttle">{bann.heading}</h1>
                      <p className="slider-pararp">{bann.content}</p>
                      <a href="" className="btn btn_theme btn_md">Contact Us</a>
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
