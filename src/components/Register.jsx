import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleNormalUser = () => {
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
    const isValid = /^[0-9]{10}$/.test(mobile);
    if (!isValid) {
      toast.error("Please enter a valid 10-digit number!");
      return;
    }
    if (!password) {
      toast.error("Please enter password!");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please enter confirm password!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is should be same");
    }
    return;
  };

  const handleCorporateUser = () => {
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
    const isValid = /^[0-9]{10}$/.test(mobile);
    if (!isValid) {
      toast.error("Please enter a valid 10-digit number!");
      return;
    }
    if (!password) {
      toast.error("Please enter password!");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please enter confirm password!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is should be same");
    }
    if (!company) {
      toast.error("Please Enter company name!");
      return;
    }
    if (!employeeId) {
      toast.error("Please Enter Employee Id!");
    }
    return;
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
                <h2>Register</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>
                    Register
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--  Common Author Area --> */}
      <section id="common_author_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="common_author_boxed">
                <div className="common_author_heading">
                  <h3>Register account</h3>
                  <h2>Register your account</h2>
                </div>
                <div className="common_author_form">
                  {/* <!-- Tab --> */}
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="normalUsers-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#normalUsers-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="normalUsers-tab-pane"
                        aria-selected="true"
                      >
                        Normal Users
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="corporate-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#corporate-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="corporate-tab-pane"
                        aria-selected="true"
                      >
                        Corporate Users
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-3" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="normalUsers-tab-pane"
                      role="tabpanel"
                      aria-labelledby="normalUsers-tab"
                      tabindex="0"
                    >
                      <form id="main_author_form">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-control"
                                placeholder="Enter first name*"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                placeholder="Enter last name*"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="your email address (Optional)"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                className="form-control"
                                placeholder="Confirm Password"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="number"
                                value={mobile}
                                onChange={(e) => {
                                  if (/^\d{0,10}$/.test(e.target.value)) {
                                    setMobile(e.target.value);
                                  }
                                }}
                                className="form-control"
                                placeholder="Mobile number*"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="common_form_submit">
                            <button
                              className="btn btn_theme btn_md"
                              onClick={handleNormalUser}
                            >
                              Register
                            </button>
                          </div>
                          <div className="have_acount_area other_author_option">
                            <p>
                              Already have an account?{" "}
                              <Link to="/login">Log in now</Link>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!-- End off Normal User --> */}
                    <div
                      className="tab-pane fade"
                      id="corporate-tab-pane"
                      role="tabpanel"
                      aria-labelledby="corporate-tab"
                      tabindex="0"
                    >
                      <form id="main_author_form">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter first name*"
                                autocomplete="off"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                placeholder="Enter last name*"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="form-control"
                                placeholder="Company Name"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-control"
                                placeholder="Employee Id"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="your email address (Optional)"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                className="form-control"
                                placeholder="Confirm Password"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                value={mobile}
                                onChange={(e) => {
                                  if (/^\d{0,10}$/.test(e.target.value)) {
                                    setMobile(e.target.value);
                                  }
                                }}
                                className="form-control"
                                placeholder="Mobile number*"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="common_form_submit">
                            <button
                              className="btn btn_theme btn_md"
                              onClick={handleCorporateUser}
                            >
                              Register
                            </button>
                          </div>
                          <div className="have_acount_area other_author_option">
                            <p>
                              Already have an account?{" "}
                              <Link to="/login">Log in now</Link>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!-- End off Carporate User --> */}
                  </div>
                  {/* <!-- Tab --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Register;
