import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img/white-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const FB_APP_ID = "1355211332723870";

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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract user info
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;
      const email = decoded.email;
      const image = decoded.picture;
      const googleId = decoded.sub;

      // Store locally (optional)
      localStorage.setItem("FirstName", firstName);
      localStorage.setItem("LastName", lastName);
      localStorage.setItem("Email", email);
      localStorage.setItem("Image", image);
      // localStorage.setItem("Token", credentialResponse.credential);

      // Prepare payload for backend login
      const payload = {
        email: email,
        password: "",
        user_type: 1,
        provideBy: "google",
        provideID: googleId,
      };

      // Send login request to backend
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      if (res.data?.success) {
        const id = res.data.data.user_id;
        const token = res.data.data.token;
        localStorage.setItem("Id", id);
        localStorage.setItem("Token", token);
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        toast.success("Login successful!");
        console.log("Login response:", res.data);
        navigate("/");
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal?.hide();
      } else {
        toast.error(res.data?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Something went wrong during login!");
    }
  };

  const handleGoogleSuccess2 = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract user info
      const firstName = decoded.given_name;
      const lastName = decoded.family_name;
      const email = decoded.email;
      const image = decoded.picture;
      const googleId = decoded.sub;

      // Store locally (optional)
      localStorage.setItem("FirstName", firstName);
      localStorage.setItem("LastName", lastName);
      localStorage.setItem("Email", email);
      localStorage.setItem("Image", image);
      // localStorage.setItem("Token", credentialResponse.credential);

      // Prepare payload for backend login
      const payload = {
        email: email,
        password: "",
        user_type: 2,
        provideBy: "google",
        provideID: googleId,
      };

      // Send login request to backend
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      if (res.data?.success) {
        const id = res.data.data.user_id;
        const token = res.data.data.token;
        localStorage.setItem("Id", id);
        localStorage.setItem("Token", token);
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        toast.success("Login successful!");
        console.log("Login response:", res.data);
        navigate("/");

        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal?.hide();
      } else {
        toast.error(res.data?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Something went wrong during login!");
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    toast.error("Google Login Failed!");
  };

  const responseFacebook = async (resp) => {
    console.log("FB response:", resp);

    // If login was cancelled or failed
    if (!resp.accessToken) {
      console.error("Facebook login failed or cancelled.");
      return;
    }

    try {
      const loginData = {
        email: resp.email,
        password: "",
        user_type: 1,
        provideBy: "facebook",
        provideID: resp.userID,
      };

      // Send to backend login API
      const backendRes = await axios.post(`${API_BASE_URL}/login`, loginData);

      console.log("Backend login result:", backendRes.data);

      // Save token if login was successful
      if (backendRes.data?.success) {
        const id = backendRes.data.data.user_id;
        const token = backendRes.data.data.token;
        localStorage.setItem("Id", id);
        localStorage.setItem("Token", token);
        if (backendRes.data.token) {
          localStorage.setItem("token", backendRes.data.token);
        }
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
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
                        <div class="social-login-section">
                          <div class="divide">
                            <span>or login with</span>
                          </div>

                          <div class="social-buttons">
                            {/* <a href="/auth/google" className="social-btn google">
                              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
                              Google
                            </a> */}
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess}
                              onError={handleGoogleError}
                              shape="pill"
                              width="250"
                            />
                            {/* <a
                              href="/auth/facebook"
                              className="social-btn facebook"
                            >
                              <img
                                src="https://www.svgrepo.com/show/157806/facebook.svg"
                                alt="Facebook"
                              />
                              Facebook
                            </a> */}
                            <FacebookLogin
                              appId={FB_APP_ID}
                              autoLoad={false}
                              fields="name,email,picture"
                              callback={responseFacebook}
                              width="250"
                              // icon="fa-facebook"
                            />
                          </div>
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
                        <div class="social-login-section">
                          <div class="divide">
                            <span>or login with</span>
                          </div>

                          <div class="social-buttons">
                            {/* <a href="/auth/google" class="social-btn google">
                              <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google"
                              />
                              Google
                            </a> */}
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess2}
                              onError={handleGoogleError}
                              shape="pill"
                              width="250"
                            />
                            {/* <a
                              href="/auth/facebook"
                              class="social-btn facebook"
                            >
                              <img
                                src="https://www.svgrepo.com/show/157806/facebook.svg"
                                alt="Facebook"
                              />
                              Facebook
                            </a> */}
                             <FacebookLogin
                              appId={FB_APP_ID}
                              autoLoad={false}
                              fields="name,email,picture"
                              callback={responseFacebook}
                              width="250"
                              // icon="fa-facebook"
                            />
                          </div>
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
