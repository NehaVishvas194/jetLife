import React, { useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const HomeNews = () => {
  const [activeNews, setActiveNews] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  const fetchActiveNews = () => {
    axios
      .get(`${API_BASE_URL}/news/status`)
      .then((response) => {
        // console.log(response.data.data);
        setActiveNews(response.data.data);
        setActiveImage(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useState(() => {
    fetchActiveNews();
  }, []);

  return (
    <div>
      <section id="home_news" className="section_padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Latest Travel News</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              loop={true}
              navigation={true}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {activeNews.map((news, e) => (
                <SwiperSlide key={e}>
                  <div className="col-md-12">
                    <div className="post-item">
                      <div className="post-featured-image">
                        <Link to="/news">
                          <div className="image-anime">
                            <img src={`${activeImage}/${news?.image}`} alt="" />
                          </div>
                        </Link>
                      </div>
                      <div className="post-item-body">
                        <div className="post-item-content">
                          <div className="d-flex align-items-center mb-2">
                            <h6
                              style={{ color: "#123b67", marginRight: "5px" }}
                            >
                              Agency
                            </h6>{" "}
                            |<h6 className="mx-2">{news.created_at}</h6> |
                            <h6 className="ms-2">07:30 AM</h6>
                          </div>
                          <h2>
                            <Link
                              to="/news"
                              dangerouslySetInnerHTML={{
                                __html: news.content
                                  ?.slice(0, 60)
                                  .replace(/\r\n/g, "<br/>")
                                  .replace(/\n/g, "<br/>"),
                              }}
                            />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeNews;
