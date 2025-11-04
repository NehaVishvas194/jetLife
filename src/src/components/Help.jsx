import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
// import Img1 from "..//img/currency.png";
import {
  MdFlight,
  MdOutlineAccountCircle,
  MdOutlinePrivacyTip,
  MdOutlineSecurity,
} from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { TbPackages } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCarSport } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import BackToTopButton from "./BackToTop";
import { FaAngleDoubleRight } from "react-icons/fa";

const Help = () => {
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
                  <h2>Help Center</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Help Center
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Help section start --> */}
      <section className="help_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Help Center</h2>
              </div>
            </div>
            <div className="col-md-7">
              <div className="Search_support">
                <form action="">
                  <input
                    type="search"
                    placeholder="How can be Help..."
                    className="form-control"
                  />
                  <i>
                    <IoSearch />
                  </i>
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="style1 pt-60 pb-100 bg-whisper">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="section_heading_center">
                    <h2>Explore Jet Life Help Articles</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <MdFlight />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="/">Flights</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <RiRefund2Line />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Refunds and Charges</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <TbPackages />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Packages</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <HiOutlineBuildingOffice2 />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Stays</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <IoCarSport />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Cars</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <RiHotelLine />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Hotels</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <MdOutlineAccountCircle />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Account</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <MdOutlinePrivacyTip />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Privacy</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 articles_sections"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <div className="support_sec_inner">
                  <div className="support_sec_icon">
                    <MdOutlineSecurity />
                  </div>
                  <div className="support_sec_info">
                    <h3>
                      <Link to="#">Security</Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Help section end  --> */}
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Help;
