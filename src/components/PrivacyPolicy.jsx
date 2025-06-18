import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTop";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { ToastContainer, toast } from "react-toastify";

const PrivacyPolicy = () => {
  const [data, setData] = useState("");

  const fetchPrivacyData = () => {
    axios
      .get(`${API_BASE_URL}/privacy_policy`)
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong!", {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };
  useEffect(() => {
    fetchPrivacyData();
  }, []);

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
                  <h2>{data.title}</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <GoDotFill />
                      </span>
                      {data.title}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main section start here */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="term-para">
                {data ? (
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: data.content
                        .replace(/\r\n/g, "<br/>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <p>Loading Api Data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;