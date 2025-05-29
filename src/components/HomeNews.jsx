import React from "react";
import image1 from "../assets/img/news/small1.png";
import image2 from "../assets/img/news/small2.png";
import image3 from "../assets/img/news/small3.png";
import image4 from "../assets/img/news/small4.png";
import image5 from "../assets/img/news/new-big.png";
import { FaAnglesRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
const HomeNews = () => {
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
            <div className="col-lg-6">
              <div className="home_news_left_wrapper">
                <div className="home_news_item">
                  <div className="home_news_img">
                    <a href="#!">
                      <img src={image1} alt="img1" />
                    </a>
                  </div>
                  <div className="home_news_content">
                    <h3>
                      <a href="#!">
                        Revolutionising the travel industry, one partnership at
                        a time
                      </a>
                    </h3>
                    <p>
                      <a href="#!">26 Oct 2021</a>{" "}
                      <span>
                        {" "}
                        <GoDotFill/> 5min read
                      </span>
                    </p>
                  </div>
                </div>
                <div className="home_news_item">
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
                        <GoDotFill/> 5min read
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
                        <GoDotFill/> 5min read
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
                        <GoDotFill/> 5min read
                      </span>
                    </p>
                  </div>
                </div>
                <div className="home_news_item">
                  <div className="seeall_link">
                    <a href="#!">
                      See all article <FaAnglesRight/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="home_news_big">
                <div className="news_home_bigest img_hover">
                  <a href="#!">
                    <img src={image5} alt="img" />
                  </a>
                </div>
                <h3>
                  <a href="#!">
                    There are many variations of passages available but
                  </a>{" "}
                </h3>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of. The point of using Lorem Ipsum is
                  that it has a more
                </p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable long established fact that a reader will be
                  distracted content of a page when looking at its layout.
                </p>
                <a href="#!">
                  Read full article <FaAnglesRight/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeNews;
