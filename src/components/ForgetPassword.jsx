import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "./BackToTop";

const ForgetPassword = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSendCode = () => {
    const isValid = /^[0-9]{10}$/.test(mobile);
    if (!isValid) {
      toast.error("Please enter a valid 10-digit mobile number!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Proceed to reset password page
    navigate("/reset_password");
  };
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
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          setMobile(value);
                        }
                      }}
                    />
                  </div>
                  <div className="common_form_submit">
                    <Link to="/reset_password">
                      <button
                        id="sendCodeBtn"
                        className="btn btn_theme btn_md"
                        onSubmit={handleSendCode}
                        type="submit"
                      >
                        Send code
                      </button>
                    </Link>
                  </div>
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

export default ForgetPassword;
