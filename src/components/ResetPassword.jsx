import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../Url/BaseUrl";
import axios from "axios";
import image1 from "../assets/img/white-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const iconStyle = {
    position: "absolute",
    right: "10px",
    top: "60%",
    transform: "translateY(-30%)",
    cursor: "pointer",
    color: "#666",
  };

  const navigate = useNavigate();
  // const id = localStorage.getItem("Id");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter your new password", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    if (!confirmPassword) {
      toast.error("Please enter your confirm password", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    if (confirmPassword.length < 6) {
      toast.error("New password must be at least 6 characters", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password should be same", {
        position: "top-right",
        autoClose: 1000,
      });
    }

  // Get token from URL
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  if (!token) {
    toast.error("Invalid or missing reset token");
    return;
  }
    axios
      .post(`${API_BASE_URL}/reset_password`, {
        token: token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Password reset successfully!", { autoClose: 1000 });
          navigate("/login");
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Something went wrong!";
        toast.error(msg, { autoClose: 1000, theme: "colored" });
      });
  };

  return (
    <div>
      {/* <!-- Common Banner Area --> */}
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
                  <h6>Reset password</h6>
                  <p>Reset you password</p>
                </div>
                <div className="common_author_form p-0">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-set position-relative">
                          <label>
                            New Password<span>*</span>
                          </label>
                          <input
                            type={showNew ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <span
                            onClick={() => setShowNew(!showNew)}
                            style={iconStyle}
                          >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="field-set position-relative">
                          <label>
                            Confirm Password<span>*</span>
                          </label>
                          <input
                            type={showConfirm ? "text" : "password"}
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            style={iconStyle}
                          >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="common_form_submit">
                      <button className="btn btn_theme btn_md" type="submit">
                        Reset password
                      </button>
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

export default ResetPassword;