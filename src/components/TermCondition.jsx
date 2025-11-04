import { useEffect, useState } from "react";
import Header from "./Header";
import BackToTopButton from "./BackToTop";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { toast } from "react-toastify";
import { FaAngleDoubleRight } from "react-icons/fa";

const TermCondition = () => {
  const [data, setData] = useState("");

  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/term_condition`)
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
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${data?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
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
                        <FaAngleDoubleRight />
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
      {/* <!-- main-section-booking --> */}
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
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default TermCondition;
