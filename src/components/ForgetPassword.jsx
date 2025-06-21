import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import image1 from "../assets/img/white-logo.png";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  if (!isEmailValid) {
    toast.error("Please enter a valid email!");
    return;
  }
    try{
      const response = await axios.post(`${API_BASE_URL}/send_link`,{
        email:email,
      });
      if(response.data.success) {
        toast.success(response.data.message);
      }else{
        toast.error("Something went wrong!");
      }
    } catch(error) {
      toast.error("Failed to send link. Please try again later.");
      console.error("Forget password API error:", error);
    }
  };

  return (
    <div>
      {/* <!--  Forget Password Page--> */}
      <section className="login-page-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-0">
              <div className="img-cont1">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card login-card" data-aos="fade-left">
                      <div className="card-body">
                        <div className="main-flexbox">
                          <div
                            className=""
                            data-aos="fade-left"
                            data-aos-duration="2000"
                          >
                            <img src={image1} alt="imgIND" />
                          </div>
                          <div
                            className=""
                            data-aos="fade-left"
                            data-aos-duration="2000"
                          >
                            <h2>Welcome to Jetlife</h2>
                            <p>
                              We are glad to see you again! Get access to your
                              Orders, Wishlist and Recommendations.
                            </p>
                          </div>
                          <div
                            className="not-acc"
                            data-aos="fade-left"
                            data-aos-duration="2000"
                          >
                            <p>
                              Already have an account?{" "}
                              <Link to="/login">Login now</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="main-box-cont">
                <div className="hd-part">
                  <h6>Forgot password</h6>
                  <p>Reset you password</p>
                </div>
                <div className="common_author_form p-0">
                  <form onSubmit={handleSendCode}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-set">
                          <label>
                            Email<span>*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Email Address"
                          />
                        </div>
                      </div>
                      <div className="common_form_submit">
                        <button
                          type="submit"
                          className="btn btn_theme btn_md w-100"
                        >
                          Send Code
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
