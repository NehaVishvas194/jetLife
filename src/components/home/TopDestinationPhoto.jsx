import React, { useEffect, useState } from "react";
// import image1 from "../../assets/img/amazing-place/am-place-1.png";
// import image2 from "../../assets/img/amazing-place/am-place-2.png";
// import image3 from "../../assets/img/amazing-place/am-place-3.png";
// import image4 from "../../assets/img/amazing-place/am-place-4.png";
// import image5 from "../../assets/img/amazing-place/am-place-5.png";
// import image6 from "../../assets/img/amazing-place/am-place-6.png";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
const TopDestinationPhoto = () => {
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState("");

  const fetchdestination = () => {
    axios
      .get(`${API_BASE_URL}/active/destination`)
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
        setImageData(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
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
                <h2>Top destinations</h2>
                <p> Explore the most popular destinations around the world, handpicked just for your next unforgettable journey.</p>
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
                  <div className="col-md-12" >
                    <div className="amazing_place_boxed">
                      <a href="#!">
                        <div className="amazing_place_img">
                          <img
                            src={`${imageData}/${curElm?.image}`}
                            alt="img1"
                          />
                        </div>
                        <div className="amazing_place_box_content">
                          <div className="amazing_place_inner_content">
                            <h3>China</h3>
                            <div className="rating_outof">
                              <FaStar style={{ color: "rgb(255, 202, 24)" }} />
                              <FaStar style={{ color: "rgb(255, 202, 24)" }} />
                              <FaStar style={{ color: "rgb(255, 202, 24)" }} />
                              <FaStar style={{ color: "rgb(255, 202, 24)" }} />
                              <FaStar style={{ color: "rgb(255, 202, 24)" }} />
                              <span>50 Reviews</span>
                            </div>
                            <p>{curElm.content}</p>
                          </div>
                        </div>
                      </a>
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

export default TopDestinationPhoto;


{/* Right Side Image or More Data */ }
{/* <div className="col-lg-7">
      <div className="amazing_place_boxed">
        <a href="#!">
          <div className="amazing_place_img padding_img">
            <img
              src={`${imageData}/${curElm?.image2}`}
              alt="img3"
            />
          </div>
          <div className="amazing_place_box_content">
            <div className="amazing_place_inner_content">
              <div className="rating_outof">
                <FaStar style={{ color: "#fff" }} />
                <FaStar style={{ color: "#fff" }} />
                <FaStar style={{ color: "#fff" }} />
                <FaStar style={{ color: "#fff" }} />
                <FaStar style={{ color: "#fff" }} />
                <h5>5 Out of 5</h5>
              </div>
              <h3>China | $6000</h3>
              <h4>8 days 7 nights</h4>
              <p>{curElm.content2}</p>
            </div>
          </div>
        </a>
      </div>
    </div> */}