import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTop";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import Blog from "./Blog";
import { FaClock } from "react-icons/fa6";

const Events = () => {
  const [bannerdata, setBannerData] = useState([]);
  const [bannerImage, setBannerImage] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventImage, setEventImage] = useState("");

  const fetchBanner = () => {
    axios
      .get(`${API_BASE_URL}/event/banner`)
      .then((response) => {
        const bannerArray = response.data.data;
        if (bannerArray.length > 0) {
          setBannerData(bannerArray[0]);
          setBannerImage(response.data.image_path);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchEventData = () => {
    axios
      .get(`${API_BASE_URL}/events/list`)
      .then((response) => {
        // console.log(response.data.data);
        setEventData(response.data.data);
        setEventImage(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBanner();
    fetchEventData();
  }, []);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${bannerImage}/${bannerdata?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>{bannerdata.heading}</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      {bannerdata.heading}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- main-section-blog --> */}
      <section className="section_padding event-main" id="common_author_area">
        <div className="container">
          <div className="row">
            {eventData.map((event) => (
              <div className="col-lg-3 col-md-6 mb-4" key={event.id}>
                <div className="card detail-card">
                  <div className="card-body">
                    <div className="">
                      <div className="post-featured-image">
                        <Link to={`/event_details/${event.event_id}`}>
                          <div className="image-anime event-img">
                            <img
                              src={`${eventImage}/${event?.image}`}
                              alt={event.id}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="post-item-content mb-0">
                        {/* <div className="discount_tab">
                        <span>Agency</span>
                      </div> */}
                        <div className="event-loc">
                          <p>
                            <span>
                              <i class="fa-solid fa-calendar"></i>
                            </span>
                            {event.date}
                          </p>
                          {/* <p>
                            <span>
                              <i class="fa-solid fa-calendar"></i>
                            </span>
                            {event.time}
                          </p> */}
                        </div>
                        <div className="event-cont">
                          <h2>{event.heading}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Events;
