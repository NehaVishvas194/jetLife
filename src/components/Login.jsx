import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Newsletter from "./home/Newsletter";

const Login = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Login</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>{" "}
                    Login
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
            <div className="col-lg-6 offset-lg-3">
              <div className="common_author_boxed">
                <div className="common_author_heading">
                  <h3>Login your account</h3>
                  <h2>Logged in to stay in touch</h2>
                </div>
                <div className="common_author_form">
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
                      <form action="#" id="main_author_form">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter user name"
                            autocomplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            autocomplete="off"
                          />
                          <Link to="/forget_password">Forgot password?</Link>
                        </div>
                        <div className="common_form_submit">
                          <button className="btn btn_theme btn_md">Log in</button>
                        </div>
                        <div className="have_acount_area">
                          <p>
                            Dont have an account?{" "}
                            <Link to="/register">Register now</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="corporate-tab-pane"
                      role="tabpanel"
                      aria-labelledby="corporate-tab"
                      tabindex="0"
                    >
                      <form action="#" id="main_author_form">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter user name"
                            autocomplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            autocomplete="off"
                          />
                          <Link to="/forget_password">Forgot password?</Link>
                        </div>
                        <div className="common_form_submit">
                          <button className="btn btn_theme btn_md">Log in</button>
                        </div>
                        <div className="have_acount_area">
                          <p>
                            Dont have an account?{" "}
                            <Link to="/register">Register now</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
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

export default Login;