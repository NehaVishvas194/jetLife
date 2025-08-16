import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img/white-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitNormalUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      toast.error("Please enter name!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!password) {
      toast.error("Please enter password!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: name,
        password: password,
        user_type: 1,
      });
      console.log(response);
      if (response.data.success === true) {
        const fname = response.data.data.first_name;
        const lname = response.data.data.last_name;
        const email = response.data.data.email;
        const token = response.data.data.token;
        const id = response.data.data.user_id;
        const image = response.data.data.image;
        localStorage.setItem("FirstName", fname);
        localStorage.setItem("LastName", lname);
        localStorage.setItem("Email", email);
        localStorage.setItem("Token", token);
        localStorage.setItem("Id", id);
        localStorage.setItem("Image", image);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      console.error(errorMsg);
      toast.error(errorMsg, {
        autoClose: 1000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
    console.log(name);
    console.log(password);
  };

  const handleSubmitCorporateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name) {
      toast.error("Please enter name!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!password) {
      toast.error("Please enter password!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: name,
        password: password,
        user_type: 2,
      });
      if (response.data.success === true) {
        const fname = response.data.data.first_name;
        const lname = response.data.data.last_name;
        const email = response.data.data.email;
        const token = response.data.data.token;
        const id = response.data.data.user_id;
        localStorage.setItem("FirstName", fname);
        localStorage.setItem("LastName", lname);
        localStorage.setItem("Email", email);
        localStorage.setItem("Token", token);
        localStorage.setItem("Id", id);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      console.error(errorMsg);
      toast.error(errorMsg, {
        autoClose: 1000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
    console.log(name);
    console.log(password);
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
      {/* new-login page */}
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
                              Don't have an account?{" "}
                              <Link to="/register">Register now</Link>
                            </p>
                            <p>
                              Back To Home Page? <Link to="/">Home</Link>
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
                  <h6>Log In</h6>
                  <p>Logged in to stay in touch</p>
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
                      <form
                        onSubmit={handleSubmitNormalUser}
                        id="main_author_form"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field-set">
                              <label>
                                Email<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                placeholder="Enter your email"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="field-set position-relative">
                              <label>
                                Password<span>*</span>
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter your password"
                              />
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={iconStyle}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link to="/forget_password">Forgot password?</Link>
                        <div className="common_form_submit">
                          <button
                            type="button"
                            className="btn btn_theme btn_md w-100"
                            onClick={handleSubmitNormalUser}
                          >
                            {loading ? "Login..." : "Login"}
                          </button>
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
                      <form
                        onSubmit={handleSubmitCorporateUser}
                        id="main_author_form"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field-set">
                              <label>
                                Email<span>*</span>
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                placeholder="Enter your email"
                                autocomplete="off"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="field-set position-relative">
                              <label>
                                Password<span>*</span>
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter your password"
                                autocomplete="off"
                              />
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={iconStyle}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link to="/forget_password">Forgot password?</Link>
                        <div className="common_form_submit">
                          <button
                            type="button"
                            className="btn btn_theme btn_md w-100"
                            onClick={handleSubmitCorporateUser}
                          >
                            {loading ? "Login..." : "Login"}
                          </button>
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
    </>
  );
};
export default Login;
