import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Newsletter from "../home/Newsletter";
import { toast } from "react-toastify";
import BackToTopButton from "../BackToTop";
import { FaClock } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { API_IMAGE_URL } from "../../Url/BaseUrl";
import { FaAngleDoubleRight } from "react-icons/fa";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

    axios
      .post(`${API_BASE_URL}/user_contactus`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phoneNumber: number,
        message: message,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          toast.success(response.data.message, {
            autoClose: 1000,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setNumber("");
          setMessage("");
        }
      })
      .catch((error) => {
        console.log(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  const fetchContactData = () => {
    axios
      .get(`${API_BASE_URL}/our_contactus`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong!", {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${imagePath}/${data?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height:"100%"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Contact</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Contact
                    </li>
                  </ul>
                </div>
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
                <h2>Let's Discuss Your Needs</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-contact">
                    <div className="">
                      <div className="clock-icon">
                        <IoMail />
                      </div>
                    </div>
                    <div className="info-contact">
                      <h6>Email</h6>
                      <p>{data.contact_email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-contact">
                    <div className="">
                      <div className="clock-icon">
                        <MdLocalPhone />
                      </div>
                    </div>
                    <div className="info-contact">
                      <h6>Phone</h6>
                      <p>{data.contact_phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-contact">
                    <div className="">
                      <div className="clock-icon">
                        <FaClock />
                      </div>
                    </div>
                    <div className="info-contact">
                      <h6>Schedule</h6>
                      <p>{data.contact_schedule}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact_main_form_area">
            <div className="section_heading_center">
              <h2>Leave us a message</h2>
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-body">
                    <form id="contact_form_content" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="field-set">
                            <label>
                              First Name<span>*</span>
                            </label>
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="form-control bg_input"
                              placeholder="Enter First name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="field-set">
                            <label>
                              Last Name<span>*</span>
                            </label>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="form-control bg_input"
                              placeholder="Enter Last name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="field-set">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control bg_input"
                              placeholder="Enter Email address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="field-set">
                            <label>
                              Mobile Number<span>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control bg_input"
                              placeholder="Enter Mobile number"
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
                          <div className="field-set">
                            <label>
                              Message<span>*</span>
                            </label>
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
                              type="submit"
                              className="btn btn_theme btn_md"
                              // onClick={handleSubmit}
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
              <div className="col-md-5">
                <div className="com-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28022.590388918914!2d77.367603!3d28.605062349999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736137249848!5m2!1sen!2sin"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default ContactUs;
