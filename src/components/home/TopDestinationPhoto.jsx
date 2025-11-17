import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Skeleton from "../Skeleton";

const TopDestinationPhoto = () => {
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchdestination = () => {
    axios
      .get(`${API_BASE_URL}/active/destination`)
      .then((response) => {
        setData(response.data.data);
        setImageData(response.data.image_path);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchdestination();
  }, []);

  return (
    <div>
      <section id="amazing_tour_place" className="section_padding">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Top Destinations</h2>
                <p>
                  {" "}
                  Explore the most popular destinations around the world,
                  handpicked just for your next unforgettable journey.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                loop={true} 
                navigation={true}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <Skeleton width="100%" height="250px" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
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
                {data.map((curElm, i) => (
                  <SwiperSlide key={i}>
                    <div className="col-md-12">
                      <div className="amazing_place_boxed">
                        <a href="#!">
                          <div className="amazing_place_img">
                            <img
                              src={`${imageData}/${curElm.image}`}
                              alt="img1"
                            />
                          </div>
                          <div className="amazing_place_box_content">
                            <div className="amazing_place_inner_content">
                              <h3>{curElm.name}</h3>
                              <div className="rating_outof">
                                {[...Array(5)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    style={{
                                      color:
                                        index < curElm.rating
                                          ? "rgb(255, 202, 24)"
                                          : "#ccc",
                                    }}
                                  />
                                ))}
                              </div>
                              <p>{curElm.content?.slice(0, 100)}...</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopDestinationPhoto;
