import React from "react";
// import profileImg from "../assets/img/"
import image1 from "../assets/img/common/small_banner.png";
import Header from "./Header";
import Footer from "./Footer";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Newsletter from "./home/Newsletter";
import BackToTopButton from "./BackToTop";

const ProfilePage = () => {
  return (
    <>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>My Profile</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>
                    My Profile
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Profile section code */}
      <section className="profile_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>My Profile</h2>
              </div>
            </div>
          </div>
          <div className="profile-container">
            <div className="profile-card">
              <img src={image1} alt="Profile" className="profile-image" />
              <h2 className="profile-name">Amit Kumar</h2>
              <p className="profile-email">neha@example.com</p>
              <p className="profile-bio">
                Passionate developer. Loves React, UI design and building cool
                stuff.
              </p>
              {/* <button className="edit-button">Edit Profile</button> */}
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton/>
      <Footer />
    </>
  );
};

export default ProfilePage;