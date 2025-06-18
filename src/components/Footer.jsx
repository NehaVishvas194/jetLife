import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import image1 from "../assets/img/payC1.png";
import image2 from "../assets/img/payC2.png";
import image3 from "../assets/img/payC3.png";
import image4 from "../assets/img/payC4.png";
import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
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
                    <a href="#!">+00 123 456 789</a>
                  </h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Mail to our support team</h5>
                  <h3>
                    {" "}
                    <a href="#!">support@domain.com</a>
                  </h3>
                </div>
                <div className="footer_inquery_area">
                  <h5>Follow us on</h5>
                  <ul className="soical_icon_footer">
                    <li>
                      <a href="#!">
                        <FaFacebookSquare />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <FaTwitterSquare />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <FaLinkedin />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>About Company</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <a href="#!">Loyalty program</a>
                  </li>
                  <li>
                    <a href="#!">Latest News</a>
                  </li>
                  <li>
                    <a href="#!">Work with Us</a>
                  </li>
                  <li>
                    <a href="#!">Meet the Team </a>
                  </li>
                  <li>
                    <a href="#!">Blog</a>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Explore</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="/account">Account</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li>
                  <li>
                    <a href="#!">Legal</a>
                  </li>
                  <li>
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                  <li>
                    <a href="#!">Affiliate Program</a>
                  </li>
                  <li>
                    <Link to="/privacy_policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Policies</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
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
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Quick Links</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
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
