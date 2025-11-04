import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "animate.css";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const HomeBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banner, setBanner] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBanner = () => {
    axios
      .get(`${API_BASE_URL}/banners`)
      .then((response) => {
        setBanner(response.data.data);
        setImagePath(response.data.image_path);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section id="home_six_banner">
      {loading ? (
        <>
          <Skeleton height="500px" />
          <Skeleton width="60%" height="40px" />
          <Skeleton width="40%" height="20px" />
        </>
      ) : banner.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          loop={true}
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
                loading="lazy"
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
                        <Link to="/contactUs" className="btn btn_theme btn_md">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p style={{ textAlign: "center", padding: "2rem", color: "black" }}>No Banner Data found</p>
      )}
    </section>
  );
};

export default HomeBanner;
