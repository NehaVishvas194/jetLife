import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTop";
import { Link, useParams } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
// import { FaLocationDot } from "react-icons/fa6";
// import blog1 from "../assets/img/blog/blog-01.jpg";

const NewsDetails = () => {
  const [banner, setBanner] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const { id } = useParams();
  console.log("News ID from URL:", id);
  const [details, setDetails] = useState("");
  const [detailImage, setDetailsImage] = useState("");
  const [newsList, seNewsList] = useState([]);
  const [newsListImage, setNewsListImage] = useState("");

  const bannerData = () => {
    axios
      .get(`${API_BASE_URL}/news/banner`)
      .then((response) => {
        // console.log(response.data.data);
        setBanner(response.data.data);
        setBannerImage(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNewsDetails = async (id) => {
    try {
      const formData = new FormData();
      formData.append("news_id", id);

      const response = await axios.post(
        `${API_BASE_URL}/news/detail`,
        formData
      );
      if (response.data.data) {
        // console.log(response.data.data);
        setDetails(response.data.data);
        setDetailsImage(response.data.image_path);
      }
    } catch (error) {
      console.error("Error fetching Blog Data:", error);
    }
  };

  const fetchNewsList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`);
      if (response.data.data) {
        // console.log(response.data.data);
        seNewsList(response.data.data);
        setNewsListImage(response.data.image_path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortedNewsList = [...newsList].sort(
    (a,b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    bannerData();
    fetchNewsList();
    if (id) {
      fetchNewsDetails(id);
    }
  }, [id]);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${bannerImage}/${banner?.image})`,
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
                  <h2>News Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      <Link to="/news">News</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      News Details
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
                        src={`${detailImage}/${details.image}`}
                        alt={`image${details.id}`}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          {/* <span className="travel-badge">Travels</span> */}
                        </div>
                        <div className="date-range">
                          {/* <span className="d-flex align-items-center">
                            <FaLocationDot /> Noida
                          </span> */}
                        </div>
                        <div className="date-range">
                          <span className="d-flex align-items-center">
                            <MdDateRange /> {details.date}
                          </span>
                        </div>
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
                    <h6>News List</h6>
                  </div>
                  {sortedNewsList.slice(0, 4).map((news) => (
                    <div className="tour-list-card">
                      <ul class="tour-listing">
                        <li class="list">
                          <div class="package-img imgEffect4">
                            <a href="#">
                              <img src={`${newsListImage}/${news.image}`} alt="travello" />
                            </a>
                          </div>
                          <div class="package-content">
                            <h4 class="area-name">
                              <a href="#">{news.heading}</a>
                            </h4>
                            <p
                              className="area-name"
                              dangerouslySetInnerHTML={{
                                __html: news.content
                                  ?.slice(0, 50)
                                  .replace(/\r\n/g, "<br/>")
                                  .replace(/\n/g, "<br/>"),
                              }}
                            />
                            <div class="blog-user">
                              <div class="d-flex gap-2 align-items-center">
                                <BsCalendar2DateFill className="user" />
                                <p class="pera">{news.created_at}</p>
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

export default NewsDetails;