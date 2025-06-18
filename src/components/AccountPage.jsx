import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTop";
import image1 from "../assets/img/common/small_banner.png";
import { IoCamera } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AccountPage = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const token = localStorage.getItem("Token");
  const id = localStorage.getItem("Id");

  const fetchUserDetails = () => {
    axios
      .post(`${API_BASE_URL}/userDetails`, {
        token: token,
        user_id: id,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          console.log(response);
          const userData = response.data.data;
          setFname(`${userData.first_name} ${userData.last_name}`);
          setEmail(userData.email);
          setMobile(userData.phone_number);
          setCompany(userData.company_name || "");
          setEmployee(userData.employee_id || "");
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || "Something went wrong!";
        console.error(errorMsg);
        toast.error(errorMsg, {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdateProfile = () => {
    const [firstName, lastName] = fname.split(" ");

    axios
      .post(`${API_BASE_URL}/user_update_profile`, {
        token: token,
        user_id: id,
        email: email,
        phone: String(mobile),
        first_name: firstName,
        last_name: lastName || "",
        company_name: company,
        employee_id: employee,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Profile updated successfully!", {
            autoClose: 1000,
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Something went wrong!";
        toast.error(msg, { autoClose: 1000, theme: "colored" });
      });
  };

  const handleChangePassword = () => {
    axios
      .post(`${API_BASE_URL}/changepassword`, {
        token: token,
        user_id: id,
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Password changed successfully!", { autoClose: 1000 });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Something went wrong!";
        toast.error(msg, { autoClose: 1000, theme: "colored" });
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const iconStyle = {
    position: "absolute",
    right: "10px",
    top: "60%",
    transform: "translateY(-30%)",
    cursor: "pointer",
    color: "#666",
  };

  return (
    <>
      <Header />
      {/* Common Banner */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Account</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <GoDotFill />
                      </span>
                      Account
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Account Section */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card profile-card-main">
                <div className="card-body">
                  <div class="profile-sidebar">
                    <div class="top">
                      <div class="image-wrap">
                        <div class="part-img">
                          <img
                            src={image1}
                            alt="Profile Picture"
                            class="img2"
                            id="item_image"
                            height="100"
                          />
                        </div>
                        <button
                          className="image-change"
                          type="button"
                          onClick={() =>
                            document.getElementById("profile_image").click()
                          }
                        >
                          <IoCamera />
                        </button>
                        <input
                          type="file"
                          id="profile_image"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                      </div>
                      <div class="part-txt">
                        <h6>Hi,{fname}</h6>
                        <p>{mobile}</p>
                        <p>{email}</p>
                      </div>
                    </div>
                  </div>
                  <div class="tab-profile">
                    <div
                      class="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        class="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Profile
                      </button>
                      <button
                        class="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="card profile-card-main2">
                    <div className="card-body">
                      <div className="section-header">
                        <h6>Basic information</h6>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>
                              Name<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              value={fname}
                              type="text"
                              onChange={(e) => setFname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>
                              Mobile number<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              value={mobile}
                              type="text"
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              value={email}
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>
                              Company<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              value={company}
                              type="text"
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>
                              Employee Id<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              value={employee}
                              type="text"
                              onChange={(e) => setEmployee(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn_theme btn_md"
                      onClick={handleUpdateProfile}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="card profile-card-main2">
                    <div className="card-body">
                      <div className="section-header">
                        <h6>Reset Password</h6>
                      </div>
                      <div className="row">
                        {/* Old Password */}
                        <div className="col-md-6">
                          <div className="field-set position-relative">
                            <label>
                              Old Password<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              type={showPassword ? "text" : "password"}
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              placeholder="Enter Old Password"
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              style={iconStyle}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="col-md-6">
                          <div className="field-set position-relative">
                            <label>
                              New Password<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              type={showNew ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter New Password"
                            />
                            <span
                              onClick={() => setShowNew(!showNew)}
                              style={iconStyle}
                            >
                              {showNew ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-md-6">
                          <div className="field-set position-relative">
                            <label>
                              Confirm Password<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              type={showConfirm ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="Enter Confirm Password"
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
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn_theme btn_md"
                      onClick={handleChangePassword}
                    >
                      Submit
                    </button>
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
    </>
  );
};

export default AccountPage;
