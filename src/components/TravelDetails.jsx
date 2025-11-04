import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { MdCollectionsBookmark } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { PiShootingStar } from "react-icons/pi";
import { FaUserShield } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { BiCategory } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import hotel1 from "../assets/img/hotel/hotel-big-1.png";
import hotel2 from "../assets/img/hotel/hotel-list-1.png";
import hotel3 from "../assets/img/hotel/hotel-list-5.png";
import hotel4 from "../assets/img/hotel/hotel-list-3.png";
import hotel5 from "../assets/img/hotel/hotel-list-4.png";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HOTEL_API } from "../Url/BaseUrl";
import { useNavigate } from "react-router-dom";

const TravelsDetails = () => {
  const location = useLocation();
  const selectedHotel = location.state?.selectedHotel;
  console.log("Selected hotel:", selectedHotel);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [hotel1, hotel2, hotel3, hotel4, hotel5];
  const navigate = useNavigate();
  // const [counts, setCounts] = useState({
  //   adults: 0,
  //   infants: 0,
  //   children: 0,
  // });

  // const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  // const increase = (type) => {
  //   setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  // };

  // const decrease = (type) => {
  //   setCounts((prev) => ({
  //     ...prev,
  //     [type]: prev[type] > 0 ? prev[type] - 1 : 0,
  //   }));
  // };

  const handleBookHotel = async () => {
    if (!selectedHotel) return;
    // const phone = localStorage.getItem("phone");
    // const email = localStorage.getItem("email");

    const payload = {
      requestId: "R1000001",
      hotelId: selectedHotel.hotelId,
      checkIn: "2025-11-16",
      checkOut: "2025-11-19",
      price: selectedHotel.price,
      currency: "USD",
      email: "admin123@gmail.com",
      gsm: "76547865567",
      rooms: [
        {
          roomId: selectedHotel.roomId,
          people: [
            {
              name: "John",
              surname: "Doe",
              personType: "ADT",
              birthDate: "1990-05-01",
              gender: "M",
            },
          ],
        },
      ],
      version: 2,
      nationality: "IN",
      hasChild: false,
    };
    try {
      const res = await axios.post(`${HOTEL_API}/book/hotel`, payload);
      console.log("Booking success:", res.data);
      const result = res.data;
      navigate("/hotel_payment", { state: { result } });
    } catch (error) {
      console.error("Booking Failed:", error);
    }
  };
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
                  <h2>Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      View Details
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
              <div className="mb-2">
                <h2>{selectedHotel.roomName}</h2>
              </div>
              <div className="verfiy-hd">
                <div className="d-flex align-items-center">
                  <IoCheckmarkCircleSharp />
                  <span>Fully refundable</span>
                </div>
                <div className="d-flex align-items-center">
                  <IoCheckmarkCircleSharp />
                  <span>Express check-in/out available</span>
                </div>
                <div className="d-flex align-items-center">
                  <IoCheckmarkCircleSharp />
                  <span>{selectedHotel.bedType}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <div className="rating-high">
                  <div className="d-flex align-items-center">
                    <IoStar className="star" />
                    <IoStar className="star" />
                    <IoStar className="star" />
                    <IoStar className="star" />
                    <IoStar className="star" />
                    <span>4.8 (24)</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <IoLocation />
                    <span>Paris, France</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <MdCollectionsBookmark />
                    <span>30K+ booked</span>
                  </div>
                </div>
                <div className="rating-high">
                  <div className="d-flex align-items-center">
                    <RiShareBoxLine />
                    <span>Share</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaRegHeart />
                    <span>Wishlist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              {/* images-slider */}
              <div className="gallery-wrapper">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="main-swiper"
                >
                  {images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={src}
                        alt={`Slide ${index}`}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Not+Found";
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="thumb-swiper"
                >
                  {images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={src}
                        alt={`Slide ${index}`}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Not+Found";
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="detail-dscrp">
                <h6>Description</h6>
                <p>
                  Hotel Plaza Athenee is an excellent choice for travellers
                  visiting Coimbatore, offering a budget friendly environment
                  alongside many helpful amenities designed to enhance your
                  stay. The rooms offer a flat screen TV and air conditioning
                  and getting online is possible, as free internet access is
                  available, allowing you to rest and refresh with ease.
                </p>
              </div>
              <div className="detail-dscrp">
                <h6>Highlights</h6>
                <div className="highlight-main">
                  <div className="d-flex align-items-center">
                    <PiShootingStar />
                    <span>
                      Spacious Rooms: Comfortable accommodations with
                      contemporary furnishings and high-quality bedding.
                    </span>
                  </div>
                </div>
                <div className="highlight-main">
                  <div className="d-flex align-items-center">
                    <PiShootingStar />
                    <span>
                      Destination Unlocked: Programs that encourage exploration
                      of local culture and attractions.
                    </span>
                  </div>
                </div>
                <div className="highlight-main">
                  <div className="d-flex align-items-center">
                    <PiShootingStar />
                    <span>
                      Sophisticated Décor: Modern and artistic interiors with a
                      touch of elegance.
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="detail-dscrp">
                <h6>Rating & Review</h6>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div class="review-main">
                      <h5>Customer Reviews & Ratings</h5>
                      <div class="rating-value">
                        <p>
                          4.9<span class="rating-sub">/ 5.0</span>
                        </p>
                      </div>
                      <div className="rating-high1">
                        <div className="d-flex align-items-center justify-content-center">
                          <IoStar className="star" />
                          <IoStar className="star" />
                          <IoStar className="star" />
                          <IoStar className="star" />
                          <IoStar className="star" />
                        </div>
                      </div>
                      <p class="review-count">Based On 2,459 Reviews</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-md-3">
              <div className="card detail-card mb-4">
                <div className="card-body">
                  <div className="start-form">
                    <h6>Price</h6>
                    <p>
                      ${selectedHotel.price}
                      <span>/ Night</span>
                    </p>
                  </div>
                  {/* <div className="check-in-detail">
                    <div className="field-set">
                      <label>Check In</label>
                      <input type="date" className="form-control" />
                      <span>Monday</span>
                    </div>
                  </div> */}
                  {/* <div className="check-in-detail">
                    <div className="field-set">
                      <label>Check Out</label>
                      <input type="date" className="form-control" />
                      <span>Monday</span>
                    </div>
                  </div> */}
                  {/* <div className="check-in-detail pb-0">
                    <h6>Details</h6>
                    <div className="passenger-selector">
                      <div className="icre-main">
                        <span className="label">Adults</span>
                        <div className="counter">
                          <button onClick={() => decrease("adults")}>-</button>
                          <span>{formatNumber(counts.adults)}</span>
                          <button onClick={() => increase("adults")}>+</button>
                        </div>
                      </div>
                      <div className="icre-main">
                        <span className="label">
                          Infants <span className="age"></span>
                        </span>
                        <div className="counter">
                          <button onClick={() => decrease("infants")}>-</button>
                          <span>{formatNumber(counts.infants)}</span>
                          <button onClick={() => increase("infants")}>+</button>
                        </div>
                      </div>
                      <div className="icre-main">
                        <span className="label">
                          Children <span className="age"></span>
                        </span>
                        <div className="counter">
                          <button onClick={() => decrease("children")}>
                            -
                          </button>
                          <span>{formatNumber(counts.children)}</span>
                          <button onClick={() => increase("children")}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="">
                    {/* <Link to="/hotel_booking_details"> */}
                    <button
                      type="button"
                      className="btn btn_theme btn_md w-100"
                      onClick={handleBookHotel}
                    >
                      Book Now
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
              <div className="card detail-card">
                <div className="card-body">
                  <div className="book-with">
                    <h6>Why Book With Us</h6>
                    <div className="d-flex align-items-center mb-1">
                      <SlBadge />
                      <span>Expertise and Experience</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <BiCategory />
                      <span>Tailored Services</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <FiMessageSquare />
                      <span>Comprehensive Planning</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <FaUserShield />
                      <span>Client Satisfaction</span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <FaClockRotateLeft />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TravelsDetails;
