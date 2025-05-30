import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Newsletter from "../Newsletter";

const ContactUs = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
                <h2>Contact</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>
                    Contact
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Contact Area --> */}
      <section id="contact_main_arae" class="section_padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="section_heading_center">
                <h2>Contact with us</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="phone_tuch_area">
                <h3>Stay in touch</h3>
                <h3>
                  <a href="tel:+00-123-456-789">+00 123 456 789</a>
                </h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="contact_boxed">
                <h6>Head office</h6>
                <h3>New Mexico</h3>
                <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
                <a
                  href="#!"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View on map
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="contact_boxed">
                <h6>Washington office</h6>
                <h3>Washington</h3>
                <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                <a
                  href="#!"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View on map
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="contact_boxed">
                <h6>California office</h6>
                <h3>California</h3>
                <p>3891 Ranchview Dr. Richardson, California 62639</p>
                <a
                  href="#!"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View on map
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-12">
              <div class="contact_boxed">
                <h6>Office schedule</h6>
                <h3>Working hours</h3>
                <p>
                  Monday to Friday <br /> 9 am to 10pm
                </p>
                <a
                  href="#!"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View on map
                </a>
              </div>
            </div>
          </div>
          <div class="contact_main_form_area">
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <div class="section_heading_center">
                  <h2>Leave us a message</h2>
                </div>
                <div class="contact_form">
                  <form action="#!" id="contact_form_content">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control bg_input"
                            placeholder="First name*"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control bg_input"
                            placeholder="Last name*"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control bg_input"
                            placeholder="Email address (Optional)"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control bg_input"
                            placeholder="Mobile number*"
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <textarea
                            class="form-control bg_input"
                            rows="5"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <button type="button" class="btn btn_theme btn_md">
                            Send message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ContactUs;