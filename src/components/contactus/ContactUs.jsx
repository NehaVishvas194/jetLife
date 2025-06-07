import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Newsletter from "../home/Newsletter";
import { ToastContainer, toast } from "react-toastify";
import BackToTopButton from "../BackToTop";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!firstName) {
      toast.error("Please enter firstName!");
      return;
    }
    if (!lastName) {
      toast.error("Please enter lastName!");
      return;
    }
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email!");
      return;
    }
    const isValid = /^[0-9]{10}$/.test(number);
    if (!isValid) {
      toast.error("Please enter a valid 10-digit number!");
      return;
    }
    if (!message) {
      toast.error("Please enter message!");
      return;
    }
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(number);
    console.log(message);
  };
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
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
      <section id="contact_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Contact with us</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="phone_tuch_area">
                <h3>Stay in touch</h3>
                <h3>
                  <a href="tel:+00-123-456-789">+00 123 456 789</a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="contact_boxed">
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
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="contact_boxed">
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
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="contact_boxed">
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
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="contact_boxed">
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
          <div className="contact_main_form_area">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="section_heading_center">
                  <h2>Leave us a message</h2>
                </div>
                <div className="contact_form">
                  <form id="contact_form_content">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control bg_input"
                            placeholder="First name*"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control bg_input"
                            placeholder="Last name*"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control bg_input"
                            placeholder="Email address (Optional)"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control bg_input"
                            placeholder="Mobile number*"
                            value={number}
                            onChange={(e) => {
                              if (/^\d{0,10}$/.test(e.target.value)) {
                                setNumber(e.target.value);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-control bg_input"
                            rows="5"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn btn_theme btn_md"
                            onClick={handleSubmit}
                          >
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
      <BackToTopButton />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
