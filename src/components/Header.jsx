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

const Header = () => {
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
                    <a href="#!">Help</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>

                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="lang-name"></span>
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        <a className="dropdown-item" href="#">
                          English
                        </a>
                        <a className="dropdown-item" href="#">
                          Arabic
                        </a>
                        <a className="dropdown-item" href="#">
                          French
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="lang-name"></span>
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        <a className="dropdown-item" href="#">
                          KES
                        </a>
                        <a className="dropdown-item" href="#">
                          USD
                        </a>
                        <a className="dropdown-item" href="#">
                          EUR
                        </a>
                        <a className="dropdown-item" href="#">
                          POUNDS
                        </a>
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
                              <a href="register.html">Create Acount</a>
                            </li>
                            <li>
                              <a href="profile.html">Profiles</a>
                            </li>
                            <li>
                              <a href="help.html">Help</a>
                            </li>
                            <li>
                              <a href="reset-password.html">Reset password</a>
                            </li>
                            <li>
                              <a href="#!">Logout</a>
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
    </>
  );
};

export default Header;