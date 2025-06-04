import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Forgot password</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>{" "}
                    Forgot password
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
                  <h3>Forgot password</h3>
                  <h2>Reset you password</h2>
                </div>
                <div className="common_author_form">
                  <form action="#" id="main_author_form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div className="common_form_submit">
                      <Link to="/reset_password">
                        <button
                          id="sendCodeBtn"
                          className="btn btn_theme btn_md"
                        >
                          Send code
                        </button>
                      </Link>
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

export default ForgetPassword;
