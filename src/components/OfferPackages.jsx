import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import offerbg from "../assets/img/offer/offer2.jpg";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import SpecialOffer from "./home/SpecialOffer";

const OfferPackages = () => {
  return (
    <>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${offerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Offer Packages</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Offer Packages
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SpecialOffer/>
      <Footer />
    </>
  );
};

export default OfferPackages;