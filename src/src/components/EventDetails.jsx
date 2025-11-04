import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTop";
import { Link, useParams } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";

const EventDetails = () => {
  const [bannerdata, setBannerData] = useState([]);
  const [bannerImage, setBannerImage] = useState("");
  const { id } = useParams();
  console.log("Event ID from URL:", id);
  const [details, setDetails] = useState("");
  const [detailImage, setDetailsImage] = useState("");
  const [eventList, setEventList] = useState([]);
  const [eventListImage, setEventListImage] = useState("");

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

  const fetchEventDetails = async (id) => {
    try {
      const formData = new FormData();
      formData.append("event_id", id);

      const response = await axios.post(
        `${API_BASE_URL}/event/detail`,
        formData
      );
      if (response.data.data) {
        setDetails(response.data.data);
        setDetailsImage(response.data.image_path);
      }
    } catch (error) {
      console.error("Error fetching Blog Data:", error);
    }
  };

  const fetchEventList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/list`);
      if (response.data.data) {
        // console.log(response.data.data);
        setEventList(response.data.data);
        setEventListImage(response.data.image_path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortedEventList = [...eventList].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  useEffect(() => {
    fetchBanner();
    fetchEventList();
    if (id) {
      fetchEventDetails(id);
    }
  }, [id]);

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
                  <h2>Event Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      <Link to="/events">{bannerdata.heading}</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      Event Details
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
            <div className="col-lg-8 col-md-8">
              <div className="card blog-details detail-card">
                <div className="card-body">
                  <div className="blog-content">
                    <div className="blog-image mb-3">
                      <img
                        src={`${detailImage}/${details?.image}`}
                        alt="image"
                      />
                    </div>
                    <div className="d-flex align-items-center mb-3d-flex align-items-center justify-content-between mb-2">
                      {/* <div className="me-2">
                        <span className="travel-badge">Travels</span>
                      </div> */}
                      {/* <div className="date-range">
                        <span className="d-flex align-items-center">
                          <FaLocationDot /> Noida
                        </span>
                      </div> */}
                      <div className="date-range">
                        <span className="d-flex align-items-center">
                          <MdDateRange /> {details.date}
                        </span>
                      </div>
                      <div className="date-range pe-0">
                        <span className="d-flex align-items-center">
                          <FaClock /> {details.time}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h2>{details.heading}</h2>
                    </div>
                    <div className="mb-3">
                      {details ? (
                        <p
                          className="text-gray-6"
                          dangerouslySetInnerHTML={{
                            __html: details.content
                              .replace(/\r\n/g, "<br/>")
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                      ) : (
                        <p>Loading Api Data...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="filter-hd mb-0">
                    <h6>Event List</h6>
                  </div>
                  {sortedEventList.slice(0, 4).map((eventList) => (
                    <div className="tour-list-card" key={eventList.event_id}>
                      <ul class="tour-listing">
                        <li class="list">
                          <div class="package-img imgEffect4">
                            <a href="#">
                              <img
                                src={`${eventListImage}/${eventList?.image}`}
                                alt="travello"
                              />
                            </a>
                          </div>
                          <div class="package-content">
                            <h4 class="area-name">
                              <a href="#">{eventList.heading}</a>
                            </h4>
                            <div class="blog-user">
                              <div class="d-flex gap-2 align-items-center">
                                <BsCalendar2DateFill className="user" />
                                <p class="pera">{eventList.date}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}

                  {/* <div className="tour-list-card">
                    <ul class="tour-listing">
                      <li class="list">
                        <div class="package-img imgEffect4">
                          <a href="#">
                            <img src={hotel2} alt="travello" />
                          </a>
                        </div>
                        <div class="package-content">
                          <h4 class="area-name">
                            <a href="#">Dusitd2 Samyan Bangkok</a>
                          </h4>
                          <div class="blog-user">
                            <div class="d-flex gap-2 align-items-center">
                              <FaLocationDot className="user" />
                              <p class="pera">Mumbai</p>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                              <BsCalendar2DateFill className="user" />
                              <p class="pera">14th July 2025</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div> */}
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

export default EventDetails;
