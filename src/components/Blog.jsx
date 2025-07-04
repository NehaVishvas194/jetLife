import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import profile from "../assets/img/profile.png";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";

const Blog = () => {
  const [bannerdata, setBannerData] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [blogImage, setBlogImage] = useState("");

  const fetchBanner = () => {
    axios
      .get(`${API_BASE_URL}/blog/banner`)
      .then((response) => {
        // console.log(response.data.data);
        setBannerData(response.data.data);
        setBannerImage(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBlogData = () => {
    axios
      .get(`${API_BASE_URL}/blogs`)
      .then((response) => {
        // console.log(response.data.data);
        setBlogData(response.data.data);
        setBlogImage(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBanner();
    fetchBlogData();
  });

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
                        <i className="fas fa-circle"></i>
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
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            {blogData.map((curelm, e) => (
              <div className="col-xl-4 col-md-6" key={e}>
                <div className="blog-item mb-4">
                  <Link to="#" className="blog-img">
                    <img src={`${blogImage}/${curelm?.image}`} alt="img" />
                  </Link>
                  <span className="badge">{curelm.heading}</span>
                  <div className="blog-info text-center">
                    <div className="blog-cnt">
                      <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                        <a href="javascript:void(0);" className="pro-name">
                          {/* <span className="avtr-profile">
                            <img
                              src={profile}
                              className="rounded-circle"
                              alt="img"
                            />
                          </span> */}
                          <p>{curelm.title}</p>
                        </a>
                      </div>
                      <p>
                        <i className="fas fa-calendar-alt me-2"></i>
                        {curelm.created_at}
                      </p>
                    </div>
                    <h5>
                      <a href="#">{curelm?.content}</a>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <Link to="#" className="blog-img">
                  <img src={image1} alt="img" />
                </Link>
                <span className="badge">Travel</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <a href="#" className="blog-img">
                  <img src={image2} alt="img" />
                </a>
                <span className="badge">Guide</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <a href="#" className="blog-img">
                  <img src={image3} alt="img" />
                </a>
                <span className="badge">Rental</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <a href="#" className="blog-img">
                  <img src={image4} alt="img" />
                </a>
                <span className="badge">Adventure</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <a href="#" className="blog-img">
                  <img src={image5} alt="img" />
                </a>
                <span className="badge">Flight Tour</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item mb-4">
                <a href="#" className="blog-img">
                  <img src={image6} alt="img" />
                </a>
                <span className="badge">Vacation</span>
                <div className="blog-info text-center">
                  <div className="blog-cnt">
                    <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                      <a href="javascript:void(0);" className="pro-name">
                        <span className="avtr-profile">
                          <img
                            src={profile}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <p>Bryan Bradfield</p>
                      </a>
                    </div>
                    <p>
                      <i className="fas fa-calendar-alt me-2"></i>14 May 2025
                    </p>
                  </div>
                  <h5>
                    <a href="#">
                      Top 10 Hidden Gems places in Central Europe in 2025
                    </a>
                  </h5>
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

export default Blog;
