import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";

const Partners = () => {
  const [partner, setPartner] = useState([]);
  const [imagePath, setImagePath] = useState("");

  const fetchPartnerData = () => {
    axios
      .get(`${API_BASE_URL}/our/partner`)
      .then((response) => {
        // console.log(response.data.data);
        setPartner(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  return (
    <section id="our_partners" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Our Partners</h2>
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
              {partner.map((logo, index) => (
                <SwiperSlide key={index}>
                  <div className="partner_slider_area">
                    <div className="partner_logo">
                      <a href="#!">
                        <img src={`${imagePath}/${logo?.image}`} alt={`logo${index + 1}`} />
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