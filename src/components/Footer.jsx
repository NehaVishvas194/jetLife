import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import image1 from "../assets/img/payC1.png";
import image2 from "../assets/img/payC2.png";
import image3 from "../assets/img/payC3.png";
import image4 from "../assets/img/payC4.png";
import playStore from "../assets/img/1.png";
import appStore from "../assets/img/2.png";
import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Url/BaseUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [data, setData] = useState("");
  const [links, setLinks] = useState("");

  const fetchFooterData = () => {
    axios
      .get(`${API_BASE_URL}/footer`)
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
        setLinks(response.data.social_link[0]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  return (
    <div>
      <footer id="footer_area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Need any help?</h5>
              </div>
              <div className="footer_first_area">
                <div className="footer_inquery_area">
                  <h5>Call 24/7 for any help</h5>
                  <h3>
                    {" "}
                    <a href="#!">{data.number}</a>
                  </h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Mail to our support team</h5>
                  <h3>
                    {" "}
                    <a href="#!">{data.email}</a>
                  </h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Follow us on</h5>
                  <ul className="soical_icon_footer">
                    <li>
                      <a href={links.facebook_link}>
                        <FaFacebookSquare />
                      </a>
                    </li>
                    <li>
                      <a href={links.twitter_link}>
                        <FaTwitterSquare />
                      </a>
                    </li>
                    <li>
                      <a href={links.instagram_link}>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href={links.tiktok_link}>
                        <AiFillTikTok />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>About Company</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blogs</Link>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/news">Latest News</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Services</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="">Hotels</Link>
                  </li>
                  <li>
                    <Link to="">Flights Finder</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Support</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href="https://jetlifeglobal.com/jetlifeglobal.zohorecruit.com"
                      // className="nav-link"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                  {/* <li>
                    <Link to="/help">Help</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li> */}
                  <li>
                    <Link to="/privacy_policy">Privacy & Policy</Link>
                  </li>
                  <li>
                    <Link to="/term_condition">Term & Conditions </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Download App</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  {/* <li>
                    <a href="#!">Kantua hotel, Thailand</a>
                  </li>
                  <li>
                    <a href="#!">Hotel international</a>
                  </li>
                  <li>
                    <a href="#!">Hotel kualalampur</a>
                  </li>
                  <li>
                    <a href="#!">Hotel deluxe</a>
                  </li>
                  <li>
                    <a href="#!">Hotel rajavumi</a>
                  </li>
                  <li>
                    <a href="#!">Thailand grand suit</a>
                  </li> */}
                  <div className="option-item downloadappIcon">
                    <Link to="#!" className="mb-4">
                      <img src={playStore} />
                    </Link>{" "}
                    <Link to="#!">
                      <img src={appStore} />
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright © 2025 JetLife Travel All Rights Reserved</p>
              </div>
            </div>
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_right">
                <a href="#!">
                  <img src={image1} alt="img" />
                </a>
                <a href="#!">
                  <img src={image2} alt="img" />
                </a>
                <a href="#!">
                  <img src={image3} alt="img" />
                </a>
                <a href="#!">
                  <img src={image4} alt="img" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="go-top">
        <FaChevronUp />
        <FaChevronUp />
      </div>
    </div>
  );
};

export default Footer;
