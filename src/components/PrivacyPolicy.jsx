import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTop";

const PrivacyPolicy = () => {
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
                 <h2>Privacy and Policy</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>
                    Privacy and Policy
                  </li>
                </ul>
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main section start here */}
      <section className="privacy_policy_data">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Privacy and Policy</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">
                Privacy Statement Summary
              </h3>
              <p className="privacy_section_para">
                Expedia, Inc., part of the Expedia Group, (“we” or “us”) values
                you as our customer and recognizes that privacy is important to
                all of us. This Privacy Statement explains how we collect, use,
                and disclose personal data when you use our platform and
                associated services, your rights in determining what we do with
                the data that we collect or hold about you and tells you how to
                contact us. This is a summary of our Privacy Statement. To
                review our Privacy Statement in full, please click here, or
                scroll down.
              </p>
            </div>
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">
                What does this Privacy Statement cover?
              </h3>
              <p className="privacy_section_para">
                This Privacy Statement is designed to describe:
              </p>
              <ul>
                <li>How and what type of personal data we collect and use</li>
                <li>When and with whom we share your personal data</li>
                <li>
                  What choices you can make about how we collect, use, and share
                  your personal data
                </li>
                <li>How you can access and update your personal data.</li>
              </ul>
            </div>
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">
                What personal data do we collect and use, and how do we collect
                it?
              </h3>
              <p className="privacy_section_para">
                We collect personal data when:
              </p>
              <ul>
                <li>You give us the personal data</li>
                <li>We collect it automatically</li>
                <li>We receive it from others</li>
                <li>How you can access and update your personal data.</li>
              </ul>
              <p className="privacy_section_para">
                When you create an account on one of our sites, sign up to
                receive offers or information, or make a booking using our
                platform, you give us your personal data. We also collect such
                personal data through automated technology such as cookies
                placed on your browser (with your consent where applicable) when
                you visit our sites or download and use our apps. We also
                receive personal data from affiliated companies within Expedia
                Group, as well as business partners and other third parties,
                which help us improve our platform and associated tools and
                services, update and maintain accurate records, potentially
                detect and investigate fraud, and more effectively market our
                services.
              </p>
            </div>
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">
                When is your personal data shared?
              </h3>
              <p className="privacy_section_para">
                Your personal data may be shared for several purposes, including
                to help you book your travel/vacation, assist with your travel
                and/or vacation stay, communicate with you (including when we
                send information to you on products and services or enable you
                to communicate with travel providers and/or property owners),
                and comply with the law. The full Privacy Statement below
                details how personal data is shared.
              </p>
            </div>
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">
                What are your rights and choices?
              </h3>
              <p className="privacy_section_para">
                You can exercise your data protection rights in various ways.
                For example, you can opt out of marketing by clicking the
                “unsubscribe” link in the emails, in your account as applicable,
                or contacting our customer service. Our Privacy Statement has
                more information about the options and data protection rights
                and choices available to you.
              </p>
            </div>
            <div className="col-lg-12">
              <h3 className="privacy_section_heading">How to contact us</h3>
              <p className="privacy_section_para">
                More information about our privacy practices is set out in our
                full Privacy Statement. You can also Contact Us to ask questions
                about how we handle your personal data or make requests about
                your personal data.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton/>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;