import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Newsletter from "./home/Newsletter";
import BackToTopButton from "./BackToTop";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";

const FAQPage = () => {
  return (
    <>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Faq</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Faq
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Help section start --> */}
      <section className="faq-wrap style1 pt-50 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Frequently Asked Question</h2>
              </div>
            </div>
          </div>
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-9">
              <div className="faq-content">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span>
                          <i className="plus">
                            <FaPlus />
                          </i>
                          <i className="minus">
                            <FaMinus />
                          </i>
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sapiente, laboriosam.
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="single-product-text">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nostrum minima eligendi qui non illum?
                            Temporibus voluptatibus tempore quod rem alias!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span>
                          <i className="plus">
                            <FaPlus />
                          </i>
                          <i className="minus">
                            <FaMinus />
                          </i>
                        </span>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse "
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Voluptatibus beatae hic, expedita explicabo
                          commodi minima reiciendis at vitae, dolore enim
                          voluptates dignissimos a, nihil cumque.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span>
                          <i className="plus">
                            <FaPlus />
                          </i>
                          <i className="minus">
                            <FaMinus />
                          </i>
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quaerat hic unde illum.
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Totam voluptatum ipsa dolorem reprehenderit
                          beatae cum veniam quos odio, tempore molestiae
                          exercitationem officiis est?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingfour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsefour"
                        aria-expanded="true"
                        aria-controls="collapsefour"
                      >
                        <span>
                          <i className="plus">
                            <FaPlus />
                          </i>
                          <i className="minus">
                            <FaMinus />
                          </i>
                        </span>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Enim assumenda delectus laborum. Dicta, a
                        voluptatum.
                      </button>
                    </h2>
                    <div
                      id="collapsefour"
                      className="accordion-collapse collapse "
                      aria-labelledby="headingfour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="single-product-text">
                          <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Vitae, ipsum optio. Cumque deserunt fuga quas
                            animi amet facere, quis soluta, iure temporibus sit
                            cupiditate, porro numquam iste!
                          </p>
                        </div>
                      </div>
                    </div>
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

export default FAQPage;