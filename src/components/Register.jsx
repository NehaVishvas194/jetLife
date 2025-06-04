import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Register = () => {
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
                            <button className="nav-link active" id="normalUsers-tab" data-bs-toggle="tab" data-bs-target="#normalUsers-tab-pane" type="button" role="tab" aria-controls="normalUsers-tab-pane" aria-selected="true">Normal Users</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="corporate-tab" data-bs-toggle="tab" data-bs-target="#corporate-tab-pane" type="button" role="tab" aria-controls="corporate-tab-pane" aria-selected="true">Corporate Users</button>
                        </li>
                    </ul>
                    <div className="tab-content pt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="normalUsers-tab-pane" role="tabpanel" aria-labelledby="normalUsers-tab" tabindex="0">
                            <form action="#" id="main_author_form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter first name*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter last name*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="your email address (Optional)" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="Password" className="form-control" placeholder="Confirm Password" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Mobile number*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="common_form_submit">
                                        <button className="btn btn_theme btn_md">Register</button>
                                    </div>
                                    <div className="have_acount_area other_author_option">
                                        <p>Already have an account? <a href="login.html">Log in now</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <!-- End off Normal User --> */}
                        <div className="tab-pane fade" id="corporate-tab-pane" role="tabpanel" aria-labelledby="corporate-tab" tabindex="0">
                            <form action="#" id="main_author_form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter first name*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter last name*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Company Name" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Employee Id" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                placeholder="your email address (Optional)" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="Password" className="form-control" placeholder="Confirm Password" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Mobile number*" autocomplete="off"/>
                                        </div>
                                    </div>
                                    <div className="common_form_submit">
                                        <button className="btn btn_theme btn_md">Register</button>
                                    </div>
                                    <div className="have_acount_area other_author_option">
                                        <p>Already have an account? <Link to="/login">Log in now</Link></p>
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
    </div>
  );
};

export default Register;