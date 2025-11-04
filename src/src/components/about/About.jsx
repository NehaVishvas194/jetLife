import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import counter1 from "../../assets/img/icon/user.png";
import counter2 from "../../assets/img/icon/bank.png";
import counter3 from "../../assets/img/icon/world-map.png";
import counter4 from "../../assets/img/icon/calander.png";
import review1 from "../../assets/img/review/review6.png";
import review2 from "../../assets/img/review/review7.png";
import { FaStar } from "react-icons/fa6";
import Newsletter from "../home/Newsletter";
import BackToTopButton from "../BackToTop";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import { toast } from "react-toastify";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
// import flightImg from "../../assets/img/flight1.jpg";
const About = () => {
  const [data, setData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [data2, setData2] = useState("");
  const [imagePath2, setImagePath2] = useState("");
  const [data3, setData3] = useState("");
  const [imagePath3, setImagePath3] = useState("");
  const [data4, setData4] = useState([]);
  const [imagePath4, setImagePath4] = useState("");
  const [data5, setData5] = useState("");
  const [imagePath5, setImagePath5] = useState("");

  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/aboutus1`)
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
        });
      });
  };

  const fetchData2 = () => {
    axios
      .get(`${API_BASE_URL}/aboutus2`)
      .then((response) => {
        // console.log(response.data.data);
        setData2(response.data.data);
        setImagePath2(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
        });
      });
  };

  const fetchData3 = () => {
    axios
      .get(`${API_BASE_URL}/aboutus3`)
      .then((response) => {
        // console.log(response.data.data);
        setData3(response.data.data);
        setImagePath3(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
        });
      });
  };

  const fetchCard = () => {
    axios
      .get(`${API_BASE_URL}/aboutus7`)
      .then((response) => {
        // console.log(response.data.data);
        setData4(response.data.data);
        setImagePath4(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCard2 = () => {
    axios
      .get(`${API_BASE_URL}/aboutus8`)
      .then((response) => {
        // console.log(response.data.data);
        setData5(response.data.data);
        setImagePath5(response.data.image_path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    fetchCard();
    fetchCard2();
  }, []);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${imagePath}/${data?.image})`,
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
                  <h2>{data.heading}</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      {data.heading}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Us --> */}
      <section id="about_us_top" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about_us_left">
                <h5>{data2.heading}</h5>
                <h2>{data2.subheading}</h2>
                <p>{data2.content}</p>
                <Link to="/contactUs" className="btn btn_theme btn_md">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about_us_right">
                <img src={`${imagePath2}/${data2?.image}`} alt="img1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Banner --> */}
      {/* <section id="about_offer_banner" className="section_padding_bottom">
        <div className="container-fluid">
          <div className="row">
            <h2 className="d-none">Heading</h2>
            <div className="col-lg-4">
              <div className="about_offer_banner">
                <a href="#!">
                  <img src={`${imagePath3}/${data3?.image}`} alt="img2" />
                </a>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="about_offer_banner">
                <img src={`${imagePath3}/${data3?.image2}`} alt="img3" />
                <div className="about_offer_text">
                  {data3 ? (
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: data3.content,
                      }}
                    />
                  ) : (
                    <p></p>
                  )}
                  <a href="#!">Find tours</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section
        className="find-tour-bg"
        style={{
          backgroundImage: `url(${imagePath3}/${data3?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "170px 0px",
          backgroundBlendMode: "overlay",
          backgroundColor: "#1b10018c",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="banner-cont">
                <h1>Explore the World with Us</h1>
                {data3 ? (
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: data3.content,
                    }}
                  />
                ) : (
                  <h1></h1>
                )}
                <div className="">
                  <a href="" className="btn btn_theme btn_md">
                    Find Tours
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Service Area --> */}
      <section className="why-choose-section section_padding_bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="section_heading_center">
                <h2 className="title">Why Choose Us?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {data4.map((cur, i) => (
              <div className="col-md-6 col-lg-3 mb-4" key={i}>
                <div className="feature-card text-center">
                  <div className="icon-wrapper">
                    <img
                      src={`${imagePath4}/${cur?.image}`}
                      alt={`Icon ${i + 1}`}
                      className="feature-icon"
                    />
                  </div>
                  <h5 className="feature-title">{cur.heading}</h5>
                  <p className="feature-description">{cur.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- consultation Area --> */}
      <section
        id="consultation_area"
        className="section_padding_bottom"
        style={{
          backgroundImage: `url(${imagePath5}/${data5?.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "150px 0 220px 0",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "#00000057",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="consultation_area_text">
                <h2>{data5.heading}</h2>
                <p>{data5.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Counter Area --> */}
      <section id="counter_area" className="section_padding_bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="counter_area_wrapper">
                <div className="row">
                  <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div className="counter_item">
                      <img src={counter1} alt="icon1" />
                      <h3 className="counter">2348</h3>
                      <h6>Partners</h6>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div className="counter_item">
                      <img src={counter2} alt="icon2" />
                      <h3 className="counter">1748</h3>
                      <h6>Listed property</h6>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div className="counter_item">
                      <img src={counter3} alt="icon3" />
                      <h3 className="counter">4287</h3>
                      <h6>Destinations</h6>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 clo-sm-12 col-12">
                    <div className="counter_item">
                      <img src={counter4} alt="icon4" />
                      <h3 className="counter">40</h3>
                      <h6>Booking</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Customer Area --> */}
      <section id="customer_reviews" className="section_padding_bottom">
        <div className="container">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Customer review</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="all_review_box">
                <div className="all_review_text">
                  <div className="d-flex align-items-center gap-3">
                    <div classname="">
                      <img src={review1} alt="review1" />
                    </div>
                    <div className="">
                      <h4>Jesica simpsn</h4>
                      <span>Tourist</span>
                      <div className="all_review_date_area">
                        <div className="all_review_star">
                          <div className="review_star_all">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                          </div>
                          {/* <h5>Excellent</h5> */}
                        </div>
                        {/* <div className="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div> */}
                      </div>
                    </div>
                  </div>
                  <p>
                    "Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="all_review_box">
                <div className="all_review_text">
                  <div className="d-flex align-items-center gap-3">
                    <div classname="">
                      <img src={review2} alt="review2" />
                    </div>
                    <div className="">
                      <h4>Santa mariam</h4>
                      <span>Traveler</span>
                      <div className="all_review_date_area">
                        <div className="all_review_star">
                          <div className="review_star_all">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                          </div>
                          {/* <h5>Excellent</h5> */}
                        </div>
                        {/* <div className="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div> */}
                      </div>
                    </div>
                  </div>
                  <p>
                    "Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="all_review_box">
                <div className="all_review_text">
                  <div className="d-flex align-items-center gap-3">
                    <div classname="">
                      <img src={review1} alt="review3" />
                    </div>
                    <div className="">
                      <h4>Jack cremer</h4>
                      <span>Manager</span>
                      <div className="all_review_date_area">
                        <div className="all_review_star">
                          <div className="review_star_all">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                          </div>
                          {/* <h5>Excellent</h5> */}
                        </div>
                        {/* <div className="all_review_date">
                    <h5>08 Dec, 2021</h5>
                  </div> */}
                      </div>
                    </div>
                  </div>
                  <p>
                    "Loved the overall tour for all 6 days covering jaipur
                    jodhpur and jaisalmer. worth ur money for sure. thanks.
                    Driver was very good and polite and safe driving for all 6
                    days. on time pickup and drop overall. Thanks for it. "
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default About;
