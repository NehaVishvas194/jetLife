import React, { useState } from "react";
// import image1 from "../../assets/img/news/small1.png";
// import image2 from "../../assets/img/news/small2.png";
// import image3 from "../../assets/img/news/small3.png";
// import image4 from "../../assets/img/news/small4.png";
// import image5 from "../../assets/img/news/new-big.png";
import { FaAnglesRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { Link } from "react-router-dom";

const HomeNews = () => {
  const [activeNews, setActiveNews] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  const fetchActiveNews = () => {
    axios
      .get(`${API_BASE_URL}/news/status`)
      .then((response) => {
        console.log(response.data.data);
        setActiveNews(response.data.data);
        setActiveImage(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useState(() => {
    fetchActiveNews();
  }, []);

  return (
    <div>
      <section id="home_news" className="section_padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Latest travel news</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="home_news_left_wrapper">
                {activeNews.map((news, e) => (
                  <div className="home_news_item" key={e}>
                    <div className="home_news_img">
                      <a href="#!">
                        <img src={`${activeImage}/${news?.image}`} alt="img1" />
                      </a>
                    </div>
                    <div className="home_news_content">
                      <h3>
                        <a href="#!">
                         {news.content}
                        </a>
                      </h3>
                      <p>
                        <a href="#!">{news.created_at}</a>{" "}
                        <span>
                          {" "}
                          <GoDotFill /> 5min read
                        </span>
                      </p>
                    </div>
                  </div>
                ))} */}
            {activeNews.map((news, e) => (
              <div className="col-lg-3 col-md-6">
                <div className="post-item" key={e}>
                  <div className="post-featured-image">
                    <Link to="/news">
                      <div className="image-anime">
                        <img src={`${activeImage}/${news?.image}`} alt="" />
                      </div>
                    </Link>
                  </div>
                  <div className="post-item-body">
                    <div className="post-item-content">
                      <div className="d-flex align-items-center mb-2">
                        <h6 style={{ color: "#123b67", marginRight: "5px" }}>
                          Agency
                        </h6>{" "}
                        |<h6 className="mx-2">{news.created_at}</h6> |
                        <h6 className="ms-2">07:30 AM</h6>
                      </div>
                      <h2>
                        <Link to="/news">{news.content}</Link>
                      </h2>
                    </div>
                    {/* <div className="post-item-btn">
                      <a href="#" className="btn btn_theme btn_md">
                        learn more
                        <span>
                          <i className="fa-solid fa-arrow-right ms-2"></i>
                        </span>
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="home_news_item">
                  <div className="home_news_img">
                    <a href="#!">
                      <img src={image2} alt="img2" />
                    </a>
                  </div>
                  <div className="home_news_content">
                    <h3>
                      <a href="#!">
                        t is a long established fact that a reader will be
                        distracted.
                      </a>
                    </h3>
                    <p>
                      <a href="#!">26 Oct 2021</a>{" "}
                      <span>
                        {" "}
                        <GoDotFill /> 5min read
                      </span>
                    </p>
                  </div>
                </div>
                <div className="home_news_item">
                  <div className="home_news_img">
                    <a href="#!">
                      <img src={image3} alt="img" />
                    </a>
                  </div>
                  <div className="home_news_content">
                    <h3>
                      <a href="#!">
                        There are many variations of passages of sum available
                      </a>
                    </h3>
                    <p>
                      <a href="#!">26 Oct 2021</a>{" "}
                      <span>
                        {" "}
                        <GoDotFill /> 5min read
                      </span>
                    </p>
                  </div>
                </div>
                <div className="home_news_item">
                  <div className="home_news_img">
                    <a href="#!">
                      <img src={image4} alt="img" />
                    </a>
                  </div>
                  <div className="home_news_content">
                    <h3>
                      <a href="#!">
                        Contrary to popular belief, Lorem Ipsum is not simply.
                      </a>
                    </h3>
                    <p>
                      <a href="#!">26 Oct 2021</a>{" "}
                      <span>
                        {" "}
                        <GoDotFill /> 5min read
                      </span>
                    </p>
                  </div>
                </div>
                <div className="home_news_item">
                  <div className="seeall_link">
                    <a href="#!">
                      See all article <FaAnglesRight />
                    </a>
                  </div>
                </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeNews;
