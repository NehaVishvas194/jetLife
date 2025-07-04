import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { useState } from "react";

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
      <section id="common_banner_img"
      style={{
        backgroundImage:`url(${bannerImage}/${banner?.image})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        height:"100%"
      }}>
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
                        <i className="fas fa-circle"></i>
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
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="post-item">
                  <div className="post-featured-image">
                    <Link to="#">
                      <div className="image-anime">
                        <img src={`${imagePath}/${cur?.image}`} alt="" />
                      </div>
                    </Link>
                  </div>
                  <div className="post-item-body">
                    <div className="post-item-content">
                      <div className="d-flex align-items-center mb-2">
                        <h6 style={{ color: "#123b67" }} className="me-2">
                          {cur.heading}
                        </h6>{" "}
                        |<h6 className="mx-2">{cur.created_at}</h6> |
                        <h6 className="ms-2">{cur.created_at_time}</h6>
                      </div>
                      <h2>
                        <a href="">{cur.content}</a>
                      </h2>
                    </div>
                    <div className="post-item-btn">
                      <a href="#" className="btn btn_theme btn_md">
                        learn more
                        <span>
                          <i className="fa-solid fa-arrow-right ms-2"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <Link to="#">
                    <div className="image-anime">
                      <img src={news1} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <a href="#">
                    <div className="image-anime">
                      <img src={news2} alt="" />
                    </div>
                  </a>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <a href="#">
                    <div className="image-anime">
                      <img src={news3} alt="" />
                    </div>
                  </a>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <a href="#">
                    <div className="image-anime">
                      <img src={news4} alt="" />
                    </div>
                  </a>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <a href="#">
                    <div className="image-anime">
                      <img src={news5} alt="" />
                    </div>
                  </a>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="post-item">
                <div className="post-featured-image">
                  <a href="#">
                    <div className="image-anime">
                      <img src={news6} alt="" />
                    </div>
                  </a>
                </div>
                <div className="post-item-body">
                  <div className="post-item-content">
                    <div className="d-flex align-items-center mb-2">
                      <h6 style={{ color: "#123b67" }} className="me-2">
                        Agency
                      </h6>{" "}
                      |<h6 className="mx-2">14th May 2025</h6> |
                      <h6 className="ms-2">07:30 AM</h6>
                    </div>
                    <h2>
                      <a href="">
                        The Role of Environmental Labs in Climate Change
                        Monitoring
                      </a>
                    </h2>
                  </div>
                  <div className="post-item-btn">
                    <a href="#" className="btn btn_theme btn_md">
                      learn more
                      <span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;