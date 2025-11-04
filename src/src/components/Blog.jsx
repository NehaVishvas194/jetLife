import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
// import profile from "../assets/img/profile.png";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { FaAngleDoubleRight } from "react-icons/fa";

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
  }, []);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${bannerImage}/${bannerdata.image})`,
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
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            {blogData.map((curelm, e) => (
              <div className="col-xl-4 col-md-6" key={e}>
                <div className="blog-item mb-4">
                  <Link to={`/blog_details/${curelm.id}`} className="blog-img">
                    <img src={`${blogImage}/${curelm?.image}`} alt="img" />
                  </Link>
                  {/* <span className="badge">{curelm.heading}</span> */}
                  <div className="blog-info text-center">
                    <div className="blog-cnt">
                      <div className="d-inline-flex align-items-center border-end pe-3 me-3">
                        <Link
                          to={`/blog_details/${curelm.id}`}
                          className="pro-name"
                        >
                          <p>{curelm.title}</p>
                        </Link>
                      </div>
                      <p>
                        <i className="fas fa-calendar-alt me-2"></i>
                        {curelm.created_at}
                      </p>
                    </div>
                    <h5>
                      <Link to={`/blog_details/${curelm.id}`}
                          dangerouslySetInnerHTML={{
                            __html: curelm.content
                              ?.slice(0, 80)
                              .replace(/\r\n/g, "<br/>")
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                    </h5>
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

export default Blog;