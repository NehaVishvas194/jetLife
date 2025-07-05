import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BackToTopButton from "../BackToTop";
import { Link } from "react-router-dom";
import desti1 from "../../assets/img/destination/destination-1.png";
const DestinationDetails = () => {
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
                  <h2>Destination Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-circle"></i>
                      </span>{" "}
                      Destination Details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-blog --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h2>Kathmundu tour</h2>
                </div>
                <div className="">
                  <div className="">
                    <h2>
                      <span>From</span>$451
                    </h2>
                  </div>
                  <div className="rating-high">
                    <div className="">
                      <i className="fi fi-ss-star"></i>
                      <i className="fi fi-ss-star"></i>
                      <i className="fi fi-ss-star"></i>
                      <i className="fi fi-ss-star"></i>
                      <i className="fi fi-ss-star"></i>
                      <span>4.8 (24 Review)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <i className="fi fi-rr-marker"></i>
                <span>Paris, France</span>
              </div>
            </div>
            <div className="">
              <img src={desti1}/>
              
              <h6>About</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default DestinationDetails;
