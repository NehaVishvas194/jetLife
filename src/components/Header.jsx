import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../assets/img/favicon.png";
import { Link } from "react-router-dom";
import Logo2 from "../assets/img/logo.png";
import image1 from "../assets/img/1.png";
import image2 from "../assets/img/2.png";
import image3 from "../assets/img/profile.png";
import { useState } from "react";

const Header = () => {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  return (
    <>
      <header className="main_header_arae">
        {/* <!-- Top Bar --> */}
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <a href="#!">
                      <FaFacebookSquare />
                    </a>
                    <a href="#!">
                      <FaTwitterSquare />
                    </a>
                    <a href="#!">
                      <FaInstagram />
                    </a>
                    <a href="#!">
                      <FaLinkedin />
                    </a>
                    <a href="#!">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="white"
                          d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+254725206598">
                      <span>+254 725 206 598</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@jetlifeglobal.com">
                      <span>info@jetlifeglobal.com</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-others-options ">
                  <li>
                    <Link to="/help">Help</Link>
                  </li>
                  <li>
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="lang-name">{language}</span>
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        {["English", "Arabic", "French"].map((lang) => (
                          <a
                            className="dropdown-item"
                            href=""
                            key={lang}
                            onClick={(e) => {
                              e.preventDefault();
                              setLanguage(lang);
                            }}
                          >
                            {lang}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="lang-name">{currency}</span>
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        {["KES", "USD", "EUR", "POUNDS"].map((curr) => (
                          <a
                            className="dropdown-item"
                            href=""
                            key={curr}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrency(curr);
                            }}
                          >
                            {curr}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Navbar Bar --> */}
        <div className="navbar-area">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navbar">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">
                  <img src={Logo2} alt="logo" />
                </Link>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    {/* <!-- <li class="nav-item"><a href="#!" class="nav-link active"> Home </a></li>
                                <li class="nav-item"><a href="#!" class="nav-link">About Us </a></li>
                                <li class="nav-item"><a href="#!" class="nav-link">Book A JetLife</a></li>
                                <li class="nav-item"><a href="#!" class="nav-link">Latest News </a></li>
                                <li class="nav-item"><a href="#!" class="nav-link">Contact Us</a></li> --> */}
                  </ul>
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item downloadappIcon">
                      <a href="#!" className="">
                        <img src={image1} />
                      </a>{" "}
                      <a href="#!" className="">
                        <img src={image2} />
                      </a>
                    </div>
                    <div className="dropdown">
                      <div className="profile">
                        <img className="dropbtn" src={image3} />{" "}
                        <span className="signInBtn">Sign Up</span>
                        <div className="dropdown-content">
                          <ul>
                            <li>
                              <Link to="/register">Create Acount</Link>
                            </li>
                            <li>
                              <a href="/profile">Profiles</a>
                            </li>
                            <li>
                              <Link to="/help">Help</Link>
                            </li>
                            <li>
                              <Link to="/reset_password">Reset password</Link>
                            </li>
                            <li>
                              <Link to="/">Logout</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="others-option-for-responsive">
            <div className="container">
              <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one"></div>
                  <div className="circle circle-two"></div>
                  <div className="circle circle-three"></div>
                </div>
              </div>
              <div className="container">
                <div className="option-inner">
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <a href="#" className="search-box">
                        <i className="fas fa-search"></i>
                      </a>
                    </div>
                    <div className="option-item">
                      <a href="#!" className="btn  btn_navber">
                        Get free quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- search --> */}
      <div className="search-overlay">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-close">
              <span className="search-overlay-close-line"></span>
              <span className="search-overlay-close-line"></span>
            </div>
            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search here..."
                />
                <button type="button">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
