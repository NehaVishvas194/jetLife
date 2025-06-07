import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTop";

const AccountPage = () => {
  return (
    <>
      <Header />
      {/* Common Banner */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Account</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>
                    Account
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Account Section */}
      <section>
        <div className="container">
          <div className="row account-page">
            {/* Sidebar */}
            <div className="col-lg-4 col-md-6">
              <aside className="sidebar">
                <h2>Hi, Neha</h2>
                <p className="email">mobappsolution194@gmail.com</p>
                <div className="points-box">
                  <p>Points value</p>
                  <h3>₹0.00</h3>
                  <a href="#">View rewards activity</a>
                </div>
                <nav className="nav-links">
                  {[
                    "Profile",
                    "Communications",
                    "Coupons",
                    "Credits",
                    "Reviews",
                    "Security and settings",
                    "Help and feedback",
                  ].map((item) => (
                    <a key={item} href="#" className="nav-item points-box">
                      {item}
                    </a>
                  ))}
                </nav>
                <button className="btn btn_theme btn_md">Sign out</button>
              </aside>
            </div>

            {/* Main Content */}
            <div className="col-lg-8 col-md-6">
              <main className="main-content">
                <h2>Neha Vishvas</h2>

                <section className="section">
                  <div className="section-header">
                    <h3>Basic information</h3>
                    <a href="#">Edit</a>
                  </div>
                  <div className="info-grid">
                    <div>
                      <strong>Name:</strong> Neha Vishvas
                    </div>
                    <div>
                      <strong>Bio:</strong> Not provided
                    </div>
                    <div>
                      <strong>Date of Birth:</strong> Not provided
                    </div>
                    <div>
                      <strong>Gender:</strong> Not provided
                    </div>
                    <div>
                      <strong>Accessibility needs:</strong> Not provided
                    </div>
                  </div>
                </section>

                <section className="section">
                  <div className="section-header">
                    <h3>Contact</h3>
                    <a href="#">Edit</a>
                  </div>
                  <div className="info-grid">
                    <div>
                      <strong>Mobile number:</strong> Not provided
                    </div>
                    <div>
                      <strong>Email:</strong> mobappsolution194@gmail.com
                    </div>
                    <div>
                      <strong>Emergency contact:</strong> Not provided
                    </div>
                    <div>
                      <strong>Address:</strong> Not provided
                    </div>
                  </div>
                </section>

                <section className="section">
                  <h3>More details</h3>
                  <div className="card-list">
                    {[
                      "Airport security",
                      "Travel documents",
                      "Flight preferences",
                      "Reward programmes",
                    ].map((label) => (
                      <div key={label} className="card">
                        {label}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="section">
                  <h3>Additional travellers</h3>
                  <p className="additional_para">
                    Make booking a breeze by saving profiles of family, friends,
                    or teammates who often travel with you.
                  </p>
                  <button className="btn btn_theme btn_md mt-2">
                    Add additional traveller
                  </button>
                </section>
              </main>
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

export default AccountPage;