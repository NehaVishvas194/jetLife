import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import partner1 from "../assets/img/partner/1.png";
import partner2 from "../assets/img/partner/2.png";
import partner3 from "../assets/img/partner/3.png";
import partner4 from "../assets/img/partner/4.png";
import partner5 from "../assets/img/partner/5.png";
import partner6 from "../assets/img/partner/6.png";
import partner7 from "../assets/img/partner/7.png";
import partner8 from "../assets/img/partner/8.png";

const partnerLogos = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner5,
  partner3,
  partner2,
];

const Partners = () => {
  return (
    <section id="our_partners" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Our partners</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={8}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 8 },
              }}
            >
              {partnerLogos.map((logo, index) => (
                <SwiperSlide key={index}>
                  <div className="partner_slider_area">
                    <div className="partner_logo">
                      <a href="#!">
                        <img src={logo} alt={`logo${index + 1}`} />
                      </a>
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

export default Partners;
