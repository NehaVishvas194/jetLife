import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import logo from "../assets/img/favicon.png";
import { Link } from "react-router-dom";
import Logo2 from "../assets/img/logo.png";
import image1 from "../assets/img/1.png";
import image2 from "../assets/img/2.png";
import image3 from "../assets/img/profile.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { API_IMAGE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  // const [profile, setProfile] = useState({});
  // const [fname, setFname] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleSearch = () => {
    setSearchActive(true);
  };

  const closeSearch = () => {
    setSearchActive(false);
  };

  const image = localStorage.getItem("Image");
  const fname = localStorage.getItem("FirstName");
  const lname = localStorage.getItem("LastName");

  const fetchFooterData = () => {
    axios
      .get(`${API_BASE_URL}/footer`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
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

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <header className="main_header_arae">
        {/* Top Bar */}
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-8">
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
                      <span>{data.number}</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@jetlifeglobal.com">
                      <span>{data.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <ul className="topbar-others-options">
                  <li>
                    <Link to="/notification">
                      <IoMdNotifications className="noti-icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className={`navbar-area ${isSticky ? "is-sticky" : ""}`}>
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
                  <ul className="navbar-nav">{/* nav items here */}</ul>
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item downloadappIcon">
                      <Link to="#!">
                        <img src={image1} />
                      </Link>{" "}
                      <Link to="#!">
                        <img src={image2} />
                      </Link>
                    </div>
                    <div className="dropdown">
                      <div className="profile">
                        <img
                          className="dropbtn m-1"
                          src={image ? image : image3}
                          alt="profile"
                        />
                        <span className="signInBtn">
                          {fname && lname ? (
                            `${fname} ${lname}`
                          ) : (
                            <Link
                              to="/login"
                              style={{
                                color: "#000",
                              }}
                            >
                              Sign in
                            </Link>
                          )}
                        </span>

                        {fname && lname && (
                          <div className="dropdown-content">
                            <ul>
                              <li>
                                <Link to="/account">My Account</Link>
                              </li>
                              <li>
                                <Link to="/my_booking">My Booking</Link>
                              </li>
                              <li>
                                <Link to="/notification">Notification</Link>
                              </li>
                              <li>
                                <Link to="/" onClick={handleLogout}>
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="others-option-for-responsive">
            <div
              className={`container container ${menuActive ? "active" : ""}`}
            >
              <div className="dot-menu" onClick={toggleMenu}>
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
                      <a href="#" className="search-box" onClick={toggleSearch}>
                        <FaSearch />
                      </a>
                    </div>
                    <div className="option-item">
                      <a href="#!" className="btn btn_navber">
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

      {/* Search Overlay */}
      <div
        className={`search-overlay ${
          searchActive ? "search-overlay-active" : ""
        }`}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-close" onClick={closeSearch}>
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
                  <FaSearch />
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
