import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img/white-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const Register = () => {
  // Normal User
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const [fullPhone, setFullPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // Corporate User
  const [C_firstName, setCFirstName] = useState("");
  const [C_lastName, setCLastName] = useState("");
  const [C_email, setCEmail] = useState("");
  const [C_password, setCPassword] = useState("");
  const [C_confirmPassword, setCConfirmPassword] = useState("");
  const [C_fullPhone, setCFullPhone] = useState("");
  const [C_company, setCCompany] = useState("");
  const [C_employeeId, setCEmployeeId] = useState("");
  const [C_phoneCode, setCPhoneCode] = useState("");

  const navigate = useNavigate();
  const handleNormalUser = (e) => {
    e.preventDefault();

    if (!firstName) {
      toast.error("Please enter first name!");
      return;
    }
    if (!lastName) {
      toast.error("Please enter last name!");
      return;
    }
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email!");
      return;
    }
    if (!fullPhone || !phoneCode) {
      toast.error("Please enter a valid phone number");
      return;
    }
    const phoneNumber = fullPhone.slice(phoneCode.replace("+", "").length);
    if (!password) {
      toast.error("Please enter password!");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please enter confirm password!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be the same!");
      return;
    }

    axios
      .post(`${API_BASE_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        password_confirmation: confirmPassword,
        phoneNumber,
        phone_code: phoneCode,
        userType: 1,
      })
      .then((response) => {
        if (response.data.success === true) {
          toast.success("User Registered successfully");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFullPhone("");
          setPhoneCode("");
          navigate("/login");
        } else {
          toast.error(response.data.message, { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong", {
          autoClose: 1000,
        });
      });
  };
  const handleCorporateUser = (e) => {
    e.preventDefault();

    if (!C_firstName) return toast.error("Please enter first name!");
    if (!C_lastName) return toast.error("Please enter last name!");

    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      C_email
    );
    if (!isEmailValid) return toast.error("Please enter a valid email!");

    if (!C_fullPhone || !C_phoneCode)
      return toast.error("Please enter a valid phone number");

    const phoneNumber = C_fullPhone.slice(C_phoneCode.replace("+", "").length);

    if (!phoneNumber) return toast.error("Please enter a valid phone number!");
    if (!C_password) return toast.error("Please enter password!");
    if (!C_confirmPassword)
      return toast.error("Please enter confirm password!");
    if (C_password !== C_confirmPassword)
      return toast.error("Password and Confirm Password should be the same!");
    if (!C_company) return toast.error("Please enter Company Name!");
    if (!C_employeeId) return toast.error("Please enter Company Emp. Id!");

    axios
      .post(`${API_BASE_URL}/register`, {
        firstName: C_firstName,
        lastName: C_lastName,
        email: C_email,
        password: C_password,
        password_confirmation: C_confirmPassword,
        phoneNumber,
        companyName: C_company,
        phone_code: C_phoneCode,
        employeeId: C_employeeId,
        userType: 2,
      })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
          setCFirstName("");
          setCLastName("");
          setCEmail("");
          setCPassword("");
          setCConfirmPassword("");
          setCFullPhone("");
          setCPhoneCode("");
          setCCompany("");
          setCEmployeeId("");
          navigate("/login");
        } else {
          toast.error(response.data.message, {
            autoClose: 1000,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Something went wrong", {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE_URL}/country/code`)
  //     .then((response) => {
  //       if (response.data.success) {
  //         setCountryCodes(response.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching country codes:", err);
  //     });
  // }, []);

  const iconStyle = {
    position: "absolute",
    right: "10px",
    top: "60%",
    transform: "translateY(-30%)",
    cursor: "pointer",
    color: "#666",
  };

  return (
    // new-registertation page
    <>
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
                              <Link to="/login">Log in now</Link>
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
                  <h6>Sign Up</h6>
                  <p>Register your account</p>
                </div>
                <div className="common_author_form p-0">
                  <ul
                    className="nav nav-tabs custom-tab-toggle"
                    id="myTab"
                    role="tablist"
                  >
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
                        Individual User
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
                        aria-selected="false"
                      >
                        Corporate User
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="normalUsers-tab-pane"
                      role="tabpanel"
                      aria-labelledby="normalUsers-tab"
                      tabindex="0"
                    >
                      <form id="main_author_form" onSubmit={handleNormalUser}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                First Name<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-control"
                                placeholder="Enter first name"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Last Name<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                placeholder="Enter last name"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Email<span>*</span>
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Enter Email address"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Phone Number <span>*</span>
                              </label>
                              <PhoneInput
                                country={"in"}
                                value={fullPhone}
                                onChange={(value, data) => {
                                  setFullPhone(value);
                                  setPhoneCode(`+${data.dialCode}`);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set position-relative">
                              <label>
                                Password<span>*</span>
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={iconStyle}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set position-relative">
                              <label>
                                Confirm Password<span>*</span>
                              </label>
                              <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                className="form-control"
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
                          <div className="common_form_submit">
                            <button
                              type="submit"
                              className="btn btn_theme btn_md w-100"
                              // onClick={handleNormalUser}
                            >
                              Register
                            </button>
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
                      <form
                        id="main_author_form"
                        onSubmit={handleCorporateUser}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                First Name<span>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter first name"
                                autocomplete="off"
                                value={C_firstName}
                                onChange={(e) => setCFirstName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Last Name<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={C_lastName}
                                onChange={(e) => setCLastName(e.target.value)}
                                className="form-control"
                                placeholder="Enter last name"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Company Name<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={C_company}
                                onChange={(e) => setCCompany(e.target.value)}
                                className="form-control"
                                placeholder="Enter Company Name"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Employee Id<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={C_employeeId}
                                onChange={(e) => setCEmployeeId(e.target.value)}
                                className="form-control"
                                placeholder="Enter Employee Id"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Email<span>*</span>
                              </label>
                              <input
                                type="email"
                                value={C_email}
                                onChange={(e) => setCEmail(e.target.value)}
                                className="form-control"
                                placeholder="Enter Email address"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>
                                Phone Number<span>*</span>
                              </label>
                              <PhoneInput
                                country={"in"}
                                value={C_fullPhone}
                                onChange={(value, data) => {
                                  setCFullPhone(value);
                                  setCPhoneCode(`+${data.dialCode}`);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set position-relative">
                              <label>
                                Password<span>*</span>
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={C_password}
                                onChange={(e) => setCPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={iconStyle}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="field-set position-relative">
                              <label>
                                Confirm Password<span>*</span>
                              </label>
                              <input
                                type={showConfirm ? "text" : "password"}
                                value={C_confirmPassword}
                                onChange={(e) =>
                                  setCConfirmPassword(e.target.value)
                                }
                                className="form-control"
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
                          <div className="common_form_submit">
                            <button
                              type="submit"
                              className="btn btn_theme btn_md w-100"
                              // onClick={handleCorporateUser}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!-- End off Carporate User --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
