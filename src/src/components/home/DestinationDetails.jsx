import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BackToTopButton from "../BackToTop";
import { Link, useParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import hotel1 from "../../assets/img/destination/destination-1.png";
import hotel2 from "../../assets/img/destination/destination-2.png";
import hotel3 from "../../assets/img/destination/destination-3.png";
import hotel4 from "../../assets/img/destination/destination-4.png";
// import hotel5 from "../../assets/img/destination/destination-5.png";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";

const DestinationDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [destination, setDestination] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const formData = new FormData();
        formData.append("destination_id", id);

        const response = await axios.post(
          `${API_BASE_URL}/destinetion/detail`,
          formData
        );

        if (response.data.success) {
          setDestination(response.data.data);
          setImagePath(response.data.image_path);
        } else {
          console.error("API returned error:", response.data.message);
        }
      } catch (error) {
        console.error("API fetch failed:", error);
      }
    };

    const fetchDestinationList = () => {
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

    if (id) {
      fetchDestination();
    }
    fetchDestinationList();
  }, [id]);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Destination Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      Destination Details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-blog --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <h2>{destination?.country_name}</h2>
                    </div>
                    <div className="d-flex align-items-center">
                      <IoLocation />
                      <span>{destination?.location}</span>
                    </div>
                    {/* <div className="price-hd">
                      <h2>
                        <span>{destination?.price}</span>
                      </h2>
                    </div> */}
                  </div>
                  <div className="rating-high mb-3">
                    <div className="d-flex align-items-center">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          style={{
                            color:
                              index < destination?.rating
                                ? "rgb(255, 202, 24)"
                                : "#ccc",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="gallery-wrapper">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="main-swiper"
                    >
                      {destination?.image.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={`${imagePath}/${img}`}
                            alt={`Slide ${index}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={20}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="thumb-swiper"
                    >
                      {destination?.image.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={`${imagePath}/${img}`}
                            alt={`Slide ${index}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="detail-dscrp">
                    <p>{destination?.content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="filter-hd mb-0">
                    <h6>Destination List</h6>
                  </div>
                  {data.slice(0, 4).map((curElm) => (
                    <div className="tour-list-card">
                      <ul class="tour-listing">
                        <li class="list">
                          <div class="package-img imgEffect4">
                            <a href="#">
                              <img
                                src={`${imageData}/${curElm.image}`}
                                alt="img1"
                              />
                            </a>
                          </div>
                          <div class="package-content">
                            <h4 class="area-name">
                              <a href="#">{curElm.name}</a>
                            </h4>
                            <div class="location">
                              <IoLocation />
                              <div class="name">{curElm.location}</div>
                            </div>
                            <div class="price-review">
                              {/* <div class="d-flex gap-2">
                                <p class="light-pera">From</p>
                                <p class="pera">$95</p>
                              </div> */}
                              <div class="rating">
                                <p class="pera">
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
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default DestinationDetails;
