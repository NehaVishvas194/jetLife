import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import image1 from "../../assets/img/common/abour_right.png";
import image2 from "../../assets/img/common/small_banner.png";
import image3 from "../../assets/img/common/big_banner.png";
import serviceImg1 from "../../assets/img/icon/world.png";
import serviceImg2 from "../../assets/img/icon/walte.png";
import serviceImg3 from "../../assets/img/icon/star.png";
import serviceImg4 from "../../assets/img/icon/persentis.png";
import counter1 from "../../assets/img/icon/user.png";
import counter2 from "../../assets/img/icon/bank.png";
import counter3 from "../../assets/img/icon/world-map.png";
import counter4 from "../../assets/img/icon/calander.png";
import review1 from "../../assets/img/review/review6.png";
import review2 from "../../assets/img/review/review7.png";
import { FaStar } from "react-icons/fa6";
import Newsletter from "../home/Newsletter";
import BackToTopButton from "../BackToTop";

const About = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
                <h2>About us</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>{" "}
                    About
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Us --> */}
      <section id="about_us_top" class="section_padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="about_us_left">
                <h5>About us</h5>
                <h2>We Are The World Best Travel Agency Company Since 2000</h2>
                <p>
                  At vero eos et accusam et justo duo dolores et ea rebum. Stet
                  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr{" "}
                </p>
                <p>
                  At vero eos et accusam et justo duo dolores et ea rebum. Stet
                  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr{" "}
                </p>
                <a href="#!" class="btn btn_theme btn_md">
                  Contact Us
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="about_us_right">
                <img src={image1} alt="img1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Banner --> */}
      <section id="about_offer_banner" class="section_padding_bottom">
        <div class="container-fluid">
          <div class="row">
            <h2 class="d-none">Heading</h2>
            <div class="col-lg-4">
              <div class="about_offer_banner">
                <a href="#!">
                  <img src={image2} alt="img2" />
                </a>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="about_offer_banner">
                <img src={image3} alt="img3" />
                <div class="about_offer_text">
                  <h3>
                    Enjoy <span>20%</span> discount
                  </h3>
                  <h2>Thailand couple tour</h2>
                  <a href="#!">Find tours</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Service Area --> */}
      <section id="about_service_offer" class="section_padding_bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="about_service_boxed">
                <img src={serviceImg1} alt="serviceImg1" />
                <h5>
                  <a href="#!">Best services</a>
                </h5>
                <p>
                  Phaseus site amet tristique ligua donec iaculis leo sus cipit.
                  Consec tetur adipiscing elit. Incididunt ut dolore.
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="about_service_boxed">
                <img src={serviceImg2} alt="serviceImg2" />
                <h5>
                  <a href="#!">Trusted payment</a>
                </h5>
                <p>
                  Phaseus site amet tristique ligua donec iaculis leo sus cipit.
                  Consec tetur adipiscing elit. Incididunt ut dolore.
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="about_service_boxed">
                <img src={serviceImg3} alt="serviceImg3" />
                <h5>
                  <a href="#!">Top facility</a>
                </h5>
                <p>
                  Phaseus site amet tristique ligua donec iaculis leo sus cipit.
                  Consec tetur adipiscing elit. Incididunt ut dolore.
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="about_service_boxed">
                <img src={serviceImg4} alt="serviceImg4" />
                <h5>
                  <a href="#!">Awesome deals</a>
                </h5>
                <p>
                  Phaseus site amet tristique ligua donec iaculis leo sus cipit.
                  Consec tetur adipiscing elit. Incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- consultation Area --> */}
      <section id="consultation_area" class="section_padding_bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="consultation_area_text">
                <h2>Have you any question? Get A Consultation</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Counter Area --> */}
      <section id="counter_area" class="section_padding_bottom">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 ">
              <div class="counter_area_wrapper">
                <div class="row">
                  <div class="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div class="counter_item">
                      <img src={counter1} alt="icon1" />
                      <h3 class="counter">2348</h3>
                      <h6>Partners</h6>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div class="counter_item">
                      <img src={counter2} alt="icon2" />
                      <h3 class="counter">1748</h3>
                      <h6>Listed property</h6>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div class="counter_item">
                      <img src={counter3} alt="icon3" />
                      <h3 class="counter">4287</h3>
                      <h6>Destinations</h6>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div class="counter_item">
                      <img src={counter4} alt="icon4" />
                      <h3 class="counter">40</h3>
                      <h6>Booking</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Customer Area --> */}
      <section id="customer_reviews" class="section_padding_bottom">
        <div class="container">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="section_heading_center">
              <h2>Customer review</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="all_review_box">
                <div class="all_review_date_area">
                  <div class="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div>
                  <div class="all_review_star">
                    <h5>Excellent</h5>
                    <div class="review_star_all">
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                    </div>
                  </div>
                </div>
                <div class="all_review_text">
                  <img src={review1} alt="review1" />
                  <h4>Jesica simpsn</h4>
                  <span>Tourist</span>
                  <p>
                    " Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="all_review_box">
                <div class="all_review_date_area">
                  <div class="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div>
                  <div class="all_review_star">
                    <h5>Excellent</h5>
                    <div class="review_star_all">
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                    </div>
                  </div>
                </div>
                <div class="all_review_text">
                  <img src={review2} alt="review2" />
                  <h4>Santa mariam</h4>
                  <span>traveler</span>
                  <p>
                    " Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="all_review_box">
                <div class="all_review_date_area">
                  <div class="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div>
                  <div class="all_review_star">
                    <h5>Excellent</h5>
                    <div class="review_star_all">
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                      <i>
                        {" "}
                        <FaStar />
                      </i>
                    </div>
                  </div>
                </div>
                <div class="all_review_text">
                  <img src={review1} alt="review3" />
                  <h4>Jack cremer</h4>
                  <span>Manager</span>
                  <p>
                    " Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton/>
      <Footer />
    </div>
  );
};

export default About;