import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import BackToTopButton from "./BackToTop";

const Notification = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Notification</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-circle"></i>
                      </span>{" "}
                      Notification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-booking --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col-md-6">
              <h4>All Notification List</h4>
            </div>
            <div className="col-md-6 text-end">
              <button type="button" className="btn btn_theme btn_md">
                Delete All
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card booking-card">
                <div className="card-body">
                  <div className="notifi-content">
                    <div className="d-flex gap-3">
                      <div className="cross-noti">
                        <MdClear />
                      </div>
                      <div className="main-noti-cont">
                        <span>Booking Confirmed</span>
                        <h6>Booking Successful!!</h6>
                        <p>
                          Your flight from Delhi to Mumbai is confirmed for
                          20-Jun at 10:00 Am.
                        </p>
                      </div>
                    </div>
                    <div className="date-time-noti">
                      <FiClock />
                      <span>19 Jun 2025 at 10:10 Am</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <div className="card booking-card">
                <div className="card-body">
                  <div className="notifi-content">
                    <div className="d-flex gap-3">
                      <div className="cross-noti">
                        <MdClear />
                      </div>
                      <div className="main-noti-cont">
                        <span>Booking Confirmed</span>
                        <h6>Booking Successful!!</h6>
                        <p>
                          Your flight from Delhi to Mumbai is confirmed for
                          20-Jun at 10:00 Am.
                        </p>
                      </div>
                    </div>
                    <div className="date-time-noti">
                      <FiClock />
                      <span>19 Jun 2025 at 10:10 Am</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <div className="card booking-card">
                <div className="card-body">
                  <div className="notifi-content">
                    <div className="d-flex gap-3">
                      <div className="cross-noti">
                        <MdClear />
                      </div>
                      <div className="main-noti-cont">
                        <span>Booking Confirmed</span>
                        <h6>Booking Successful!!</h6>
                        <p>
                          Your flight from Delhi to Mumbai is confirmed for
                          20-Jun at 10:00 Am.
                        </p>
                      </div>
                    </div>
                    <div className="date-time-noti">
                      <FiClock />
                      <span>19 Jun 2025 at 10:10 Am</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton/>
      <Footer />
    </div>
  );
};

export default Notification;
