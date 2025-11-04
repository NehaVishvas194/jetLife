import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";

const News = () => {
  const [data, setData] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const fetchNews = () => {
    axios
      .get(`${API_BASE_URL}/news`)
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    fetchNews();
    bannerData();
  }, []);

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
                  <h2>{banner.heading}</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      {banner.heading}
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
            {data.map((cur, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="post-item">
                  <div className="post-featured-image mb-0">
                    <Link to={`/news_details/${cur.id}`}>
                      <div className="image-anime">
                        <img src={`${imagePath}/${cur?.image}`} alt="" />
                      </div>
                    </Link>
                  </div>
                  <div className="post-item-body">
                    <div className="post-item-content">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="create-range">
                          <span>
                            <MdDateRange />
                          </span>
                          <p>{cur.created_at}</p>
                        </div>
                        <div className="create-range">
                          <span>
                            <LuAlarmClock />
                          </span>
                          <p>{cur.created_at_time}</p>
                        </div>
                      </div>
                      <div className="news-content">
                        <h5>{cur.heading}</h5>{" "}
                        <p
                          dangerouslySetInnerHTML={{
                            __html: cur.content
                              ?.slice(0, 60)
                              .replace(/\r\n/g, "<br/>")
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                      </div>
                    </div>
                    <div className="post-item-btn">
                      <Link
                        to={`/news_details/${cur.id}`}
                        className="btn btn_theme btn_md"
                      >
                        learn more
                        <span>
                          <i className="fa-solid fa-arrow-right ms-2"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;
