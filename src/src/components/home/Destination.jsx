import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const DestinationItem = ({ image, alt, location, rating, id }) => (
  <div className="col-sm-12 col-md-6 col-lg-4 col-12 mb-4">
    <div className="card desti-card">
      <div className="card-body">
        <Link
          to={`/destination_details/${id}`}
          className="tab_destinations_boxed"
        >
          <div className="tab_destinations_img">
            <img src={image} alt={alt} />
          </div>
          <div className="tab_destinations_conntent">
            <p>
              <span>{location}</span>
            </p>
            {/* <p>{content}</p> */}
            <p>
              Rating:- <span>{rating}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

const Destination = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [destinationsData, setDestinationsData] = useState([]);
  const [destinationImagePath, setDestinationImagePath] = useState("");

  // Fetch country list on mount and set default country
  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/country/list`);
        if (response.data.data) {
          setCountryList(response.data.data);

          const defaultCountry = response.data.data[0];
          // console.log(response.data.data);
          setActiveTab(defaultCountry.nicename);
          fetchDestination(defaultCountry.id);
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    init();
  }, []);

  // Fetch destinations for selected country
  const fetchDestination = async (countryId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/destination_list`, {
        country_id: countryId,
      });

      if (response.data.data) {
        setDestinationsData(response.data.data);
        setDestinationImagePath(response.data.image_path);
      } else {
        setDestinationsData([]);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  return (
    <>
      <section id="destinations_area" className="section_padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Destinations for you</h2>
              </div>
            </div>
          </div>

          {/* Country Swiper Tabs */}
          <div className="row">
            <div className="col-lg-12">
              <div className="our-service-tab">
                <ul
                  className="nav nav-pills mb-3 justify-content-center"
                  id="pills-tab"
                  role="tablist"
                >
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    breakpoints={{
                      576: { slidesPerView: 3 },
                      768: { slidesPerView: 4 },
                      992: { slidesPerView: 5 },
                    }}
                    loop={true}
                    // autoplay={{ delay: 3000 }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="tab-menu"
                  >
                    {countryList.map((country) => (
                      <SwiperSlide
                        key={country.id}
                        className={`nav-item ${
                          activeTab === country.nicename ? "active" : ""
                        }`}
                      >
                        <button
                          className={`nav-link ${
                            activeTab === country.nicename ? "active" : ""
                          }`}
                          onClick={() => {
                            setActiveTab(country.nicename);
                            fetchDestination(country.id);
                          }}
                        >
                          {country.nicename}
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </ul>
              </div>
            </div>
          </div>

          {/* Destination Cards */}
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active">
              <div className="row">
                {destinationsData ? (
                  destinationsData.map((destination, index) => (
                    <DestinationItem
                      key={destination.id || index}
                      image={`${destinationImagePath}/${destination.image}`}
                      alt={destination.name || "destination"}
                      location={destination.name}
                      content={destination.content}
                      id={destination.id}
                      rating={[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          style={{
                            color:
                              index < destination.rating
                                ? "rgb(255, 202, 24)"
                                : "#ccc",
                          }}
                        />
                      ))}
                    />
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No destinations found for this country.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destination;
