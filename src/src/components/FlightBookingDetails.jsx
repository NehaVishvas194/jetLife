import React from "react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../Url/BaseUrl";

const FlightBookingDetails = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationFare = location.state?.fareDetails || {};
  const fare_detail_key = locationFare.fare_detail_key;
  console.log("Full Fare Response:", locationFare);
  console.log("fare details key:-", fare_detail_key);
  const flights = locationFare.departure_selected_flights || [];
  const firstFlight = flights[0]?.flight || {};
  const lastFlight = flights[flights.length - 1]?.flight || {};
  const fareDetail = locationFare.fare_detail || {};
  const paxFare = fareDetail.pax_fares?.[0] || {};

  const [formData, setFormData] = useState({
    fare_detail_key: fare_detail_key,
    contact: {
      email: "",
      phone: { area_code: "", country_code: "", phone_number: "" },
    },
    pax_list: [
      {
        name: "",
        lastname: "",
        birthdate: "",
        type: "ADULT",
        gender: "MALE",
        identity_info: {
          cnic: { no: "" },
          foid: { citizenship_country: "", no: "" },
          passport: { citizenship_country: "", end_date: "", no: "" },
          tc: { no: "", hes_code: "" },
          type: "PASSPORT",
          not_turkish_citizen: true,
          not_pakistan_citizen: true,
        },
      },
    ],
    offers: [],
    notes: "",
  });

  const handleChange = (path, value) => {
    const keys = path.split(".");
    const newForm = { ...formData };
    let obj = newForm;
    while (keys.length > 1) {
      obj = obj[keys.shift()];
    }
    obj[keys[0]] = value;
    setFormData(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Flight Booking:- No auth token available");
        return;
      }

      // ---- First API ----
      const response1 = await axios.post(`${API_BASE_URL}/book`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const bookingResult = response1.data?.result || {};
      console.log("Booking Result:", bookingResult);

      // Extract fields from 1st API response
      const firstBooking = bookingResult.books?.[0] || {};
      const orderId = firstBooking.order_id
        ? firstBooking.order_id.toString()
        : "";
      const pnr = firstBooking.pnr || {};
      const bookingStatus = firstBooking.book_status || {};
      // const passenger = firstBooking.pax_list?.[0] || {};

      const token = localStorage.getItem("Token");
      const id = localStorage.getItem("Id");

      const response2 = await axios.post(`${API_BASE_URL}/my/booking`, {
        token: token,
        user_id: id,
        order_id: orderId,
        pnr_number: pnr,
        user_booking_status: bookingStatus,
        type: formData.pax_list[0]?.type,
        email: formData.contact.email,
        country_code: formData.contact.phone.country_code,
        area_code: formData.contact.phone.area_code,
        phone_number: formData.contact.phone.phone_number,
        first_name: formData.pax_list[0]?.name,
        last_name: formData.pax_list[0]?.lastname,
        birthdate: formData.pax_list[0]?.birthdate,
        passenger_type: formData.pax_list[0]?.type,
        gender: formData.pax_list[0]?.gender,
        passport_no: formData.pax_list[0]?.identity_info.passport.no,
        passport_expiry_date:
          formData.pax_list[0]?.identity_info.passport.end_date,
        citizenship_country:
          formData.pax_list[0]?.identity_info.passport.citizenship_country,
        note: formData.notes,
        booking_type: "Flight",
        flight_name: firstFlight.marketing_airline_code || "",
        flight_number: firstFlight.flight_number,
        from_city: firstFlight.from,
        to_city: lastFlight.to,
        price: fareDetail.price_info?.total_fare,
        class: firstFlight.cabin_type,
        departure_time: firstFlight.departure_time,
        arrival_time: lastFlight.arrival_time,
        passenger_count: paxFare.number_of_pax,
        journey_date: firstFlight.departure_time?.split(" ")[0] || "",
        return_date: lastFlight.arrival_time?.split(" ")[0] || "",
      });
      console.log("Second API Response:", response2.data);

      toast.success("Flight Booked Successfully", { autoClose: 3000 });
      navigate("/my_booking", { state: { bookingResult } });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error?.description || "Flight Booking Error",
        {
          autoClose: 3000,
        }
      );
    }
  };

  if (!locationFare) {
    return <p>No fare details available.</p>;
  }

  // const totalPrice = locationFare.fare_detail.price_info.total_fare;
  // const currency = locationFare.fare_detail.currency_code;
  // const steps = [
  //   "Ticket type",
  //   "Your details",
  //   "Extras",
  //   "Select your seat",
  //   "Check and pay",
  // ];

  // const totalSteps = 5;
  // const nextStep = () => {
  //   if (currentStep < totalSteps - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     // Submit logic here
  //     console.log("Form Submitted");
  //   }
  // };

  // const prevStep = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  return (
    <div>
      <Header />
      <ToastContainer />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Flight Booking</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Booking details
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
            {/* <div className="col-md-12 mb-5">
              <div className="stepper1">
                {steps.map((label, index) => (
                  <div className="stepper" id="stepper">
                    <div
                      className={`step ${
                        index === currentStep
                          ? "active"
                          : index < currentStep
                          ? "completed"
                          : ""
                      }`}
                    >
                      <div className="circle">
                        {index < currentStep ? <FaCheck /> : index + 1}
                      </div>
                      <div className="label">{label}</div>
                    </div>
                    {index !== steps.length - 1 && <div className="line"></div>}
                  </div>
                ))}
              </div>
            </div> */}
            {/* Flight Info */}
            <div className="col-md-12">
              {locationFare.departure_selected_flights &&
                locationFare.departure_selected_flights.length > 0 && (
                  <div className="from-to-main">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                      {locationFare.departure_selected_flights.map(
                        (item, index) => {
                          const flight = item.flight;
                          return (
                            <React.Fragment key={index}>
                              {/* Show first "from" only at the start */}
                              {index === 0 && <h6>{flight.from}</h6>}

                              {/* Line between stops */}
                              <div
                                className="flightLine"
                                style={{ width: "10%" }}
                              >
                                <div></div>
                                <div></div>
                              </div>

                              {/* Always show the "to" point */}
                              <h6>{flight.to}</h6>
                            </React.Fragment>
                          );
                        }
                      )}
                    </div>

                    {/* Extra flight details (if you want them for each leg) */}
                    <div>
                      {locationFare.departure_selected_flights.map(
                        (item, index) => {
                          const flight = item.flight;
                          return (
                            <p key={index}>
                              {flight.flight_number} (
                              {flight.operator_airline_code}) |{" "}
                              {flight.class_code} ({flight.cabin_type}) |{" "}
                              {new Date(flight.departure_time).toLocaleString()}{" "}
                              - {new Date(flight.arrival_time).toLocaleString()}
                            </p>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="col-md-12">
              {/* <div className="step-content" id="step-content">
                {currentStep === 0 && (
                  <div className="step-pane active">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card booking-card">
                          <div className="card-body">
                            <h3>Standard ticket</h3>
                            <div className="price">
                              Total price <strong> {currency} {totalPrice}</strong>
                            </div>
                            <div className="features">
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Cheapest price
                              </p>
                              <p>
                                <span style={{ color: "red" }}>
                                  <MdOutlineCancel />
                                </span>
                                No need for flexibility – you're sure about your
                                plans
                              </p>
                            </div>
                            <button className="btn btn_theme btn_md w-100">
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card booking-card ">
                          <div className="card-body">
                            <h3>Flexible ticket</h3>
                            <div className="price">
                              Total price <strong> {currency} {totalPrice + 50}</strong>
                            </div>
                            <div className="features">
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Change your flight time or date once, up to 24
                                hours before departure time
                              </p>
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Travel with the same airline and route as
                                originally booked
                              </p>
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                No change fees – pay only the fare difference,
                                if any
                              </p>
                            </div>
                            <div className="how-to">
                              <h6>How to make a change</h6>
                              <ul>
                                <li>
                                  Contact Customer Service 24 hours before
                                  departure
                                </li>
                                <li>
                                  We'll share available flights that match your
                                  change request
                                </li>
                                <li>
                                  We'll assist with any fare difference and
                                  confirm your new flight
                                </li>
                              </ul>
                            </div>
                            <button className="btn btn_theme btn_md w-100">
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card booking-card">
                          <div className="card-body">
                            <h3>Cancel for Any Reason ticket</h3>
                            <div className="price">
                              Total price <strong>{currency} {totalPrice - 50 }</strong>
                            </div>
                            <div className="features">
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Cancel up to 24 hours before departure – no
                                questions asked
                              </p>
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Refund processed within 48 hours
                              </p>
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Refund includes ticket + extras
                              </p>
                              <p>
                                <span>
                                  <FaRegCheckCircle />
                                </span>
                                Refund up to INR 210,000.00 per person
                              </p>
                            </div>
                            <button className="btn btn_theme btn_md w-100">
                              Continue
                            </button>
                            <div className="info-text">
                              Cancel for Any Reason is an add-on, applies to all
                              passengers. No refund on the Cancel for Any Reason
                              amount.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="step-pane">
                    <div className="card booking-card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="enter-detail">
                            <h6>Enter your details</h6>
                            <p>
                              Add traveler details and review baggage options
                            </p>
                          </div>
                          <div className="">
                            <button
                              className="btn btn_theme btn_md"
                              onClick={() => setShowModal(true)}
                            >
                              Add this traveler’s details
                            </button>
                          </div>
                          {showModal && (
                            <div
                              className="custom-modal-overlay"
                              onClick={() => setShowModal(false)}
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1050,
                              }}
                            >
                              <div
                                className="modal-dialog modal-lg"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="modal-content">
                                  <div className="modal-header hrd-modal">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Traveler Details
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={() => setShowModal(false)}
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            First Name<span>*</span>
                                          </label>
                                          <input
                                            defaultValue=""
                                            className="form-control mb-0"
                                            type="text"
                                          />

                                          <p>
                                            *Enter exactly what's written on
                                            this traveler's travel document
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            Last Name<span>*</span>
                                          </label>
                                          <input
                                            defaultValue=""
                                            className="form-control mb-0"
                                            type="text"
                                          />

                                          <p>
                                            *Enter exactly what's written on
                                            this traveler's travel document
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            Gender specified on your travel
                                            document
                                            <span>*</span>
                                          </label>
                                          <select className="form-control">
                                            <option selected>
                                              Select Your Gender
                                            </option>
                                            <option>Male</option>
                                            <option>Female</option>
                                          </select>
                                          <p>
                                            *We're currently required by
                                            airlines and providers to ask for
                                            this information
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            Date of birth<span>*</span>
                                          </label>
                                          <input
                                            defaultValue=""
                                            className="form-control mb-0"
                                            type="date"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn_theme btn_md"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-12 mb-4">
                                <div className="card p-0">
                                  <div className="card-header hdr-card">
                                    <h6>Contact Details</h6>
                                  </div>
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            Email<span>*</span>
                                          </label>
                                          <input
                                            defaultValue=""
                                            className="form-control mb-0"
                                            type="email"
                                            placeholder=""
                                          />
                                          <p>
                                            We'll send your flight confirmation
                                            here
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="field-set">
                                          <label>
                                            Phone Number<span>*</span>
                                          </label>
                                          <input
                                            defaultValue=""
                                            className="form-control"
                                            type="number"
                                            placeholder=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="card p-0">
                                  <div className="card-header hdr-card">
                                    <h6>Flight Details</h6>
                                  </div>
                                  <div className="card-body">
                                    <table className="w-100">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <strong>Departure:</strong>
                                          </td>
                                          <td>15 Sep 2025 at 10:10 AM</td>
                                          <td>
                                            <strong>Adults:</strong>
                                          </td>
                                          <td>2</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>Arrival:</strong>
                                          </td>
                                          <td>16 Sep 2025 at 09:15 AM</td>
                                          <td>
                                            <strong>Children:</strong>
                                          </td>
                                          <td>2</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>No of Seats:</strong>
                                          </td>
                                          <td>4</td>
                                          <td>
                                            <strong>Travel Time:</strong>
                                          </td>
                                          <td>2hrs 30min</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>
                                              Preferred className:
                                            </strong>
                                          </td>
                                          <td>Economy</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card p-0">
                              <div className="card-header hdr-card">
                                <h6>Baggage Details</h6>
                              </div>
                              <div className="card-body">
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>1 personal item</p>
                                      <p className="included">Included</p>
                                      <p>Fits under the seat in front of you</p>
                                    </div>
                                  </div>
                                </div>
                                <hr className="bag-hr" />
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>1 carry-on bag</p>
                                      <p className="included">Included</p>
                                      <p>23 x 40 x 55 cm · 7 kg</p>
                                    </div>
                                  </div>
                                </div>
                                <hr className="bag-hr" />
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>2 checked bags</p>
                                      <p className="included">Included</p>
                                      <p>23 kg each</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="step-pane">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card booking-card">
                          <div className="card-body">
                            <div className="enter-detail">
                              <h6>Meal choice</h6>
                              <p>Request dietary preferences</p>
                            </div>
                            <div className="row">
                              <div className="col-md-8">
                                <div className="field-set">
                                  <label>Traveler Name</label>
                                  <select className="form-control">
                                    <option selected>No preference</option>
                                    <option>Vegetarian · Free</option>
                                    <option>Vegan · Free</option>
                                    <option>Lactose-free · Free</option>
                                    <option>Gluten-free · Free</option>
                                    <option>Kosher · Free</option>
                                    <option>Halal · Free</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="step-pane">
                    <div className="card booking-card">
                      <div className="card-body">
                        <div className="enter-detail">
                          <h6>Select your seat</h6>
                        </div>
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                              <button
                                className="accordion-button accor-btn"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <div className="">
                                  <h6>New Delhi - Addis Ababa</h6>
                                  <p>6h 30m · Ethiopian Airlines</p>
                                  <p>1 seat selected . Total INR0.00</p>
                                  <a href="">Change seat selection</a>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <div className="seat-grid">
                                  <div className="empty"></div>
                                  <div className="header">A</div>
                                  <div className="header">B</div>
                                  <div className="header">C</div>
                                  <div className="empty"></div>
                                  <div className="header">D</div>
                                  <div className="header">F</div>
                                  <div className="empty"></div>
                                  <div className="header">J</div>
                                  <div className="header">K</div>
                                  <div className="header">L</div>

                                  <div className="row-number">21</div>
                                  <button className="seat booked"></button>
                                  <button className="seat booked"></button>
                                  <button className="seat booked"></button>
                                  <div className="empty"></div>
                                  <button className="seat booked"></button>
                                  <button className="seat booked"></button>
                                  <div className="empty"></div>
                                  <button className="seat booked"></button>
                                  <button className="seat booked"></button>
                                  <button className="seat booked"></button>

                                  <div className="row-number">22</div>
                                  <button className="seat booked"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>

                                  <div className="row-number">23</div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>

                                  <div className="row-number">24</div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat my-seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>

                                  <div className="row-number">25</div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <div className="empty"></div>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                  <button className="seat"></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button
                                className="accordion-button collapsed accor-btn"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                <div className="">
                                  <h6>Addis Ababa - Maun</h6>
                                  <p>5h 10m · Ethiopian Airlines</p>
                                  <p>No seat selected</p>
                                  <a href="">Select a seat from INR0.00</a>
                                </div>
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <strong>
                                  This is the second item's accordion body.
                                </strong>{" "}
                                It is hidden by default, until the collapse
                                plugin adds the appropriate classNamees that we
                                use to style each element. These classNamees
                                control the overall appearance, as well as the
                                showing and hiding via CSS transitions. You can
                                modify any of this with custom CSS or overriding
                                our default variables. It's also worth noting
                                that just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="step-pane">
                    <div className="card booking-card">
                      <div className="card-body">
                        <div className="enter-detail">
                          <h6>Check and pay</h6>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="card p-0">
                              <div className="card-header hdr-card d-flex justify-content-between align-items-center">
                                <h6>Flight Details</h6>
                                <a href="">View Details</a>
                              </div>
                              <div className="card-body">
                                <div className="d-flex gap-3">
                                  <div className="flight_logo">
                                    <img
                                      src="/assets/img/common/filght.svg"
                                      alt="img"
                                    />
                                    <p>Air India</p>
                                  </div>
                                  <div className="fli-del">
                                    <h6>New Delhi (DEL) to Mumbai (BOM)</h6>
                                    <p>
                                      Sat, Jul 26 · 11:40 AM - Sat, Jul 26 ·
                                      1:55 PM
                                    </p>
                                    <p>Direct · 2h 15m · Economy</p>
                                    <p>Flight · AI2945</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <p>
                                You selected the Eco Value fare for all flights
                                in this trip.{" "}
                                <a href="">Check what’s included</a>
                              </p>
                            </div>
                            <div className="my-3">
                              <div className="card p-0">
                                <div className="card-header hdr-card">
                                  <h6>Contact Details</h6>
                                </div>
                                <div className="card-body">
                                  <p>+919876543211</p>
                                  <p>mobappssolutions165@gmail.com</p>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <div className="card p-0">
                                <div className="card-header hdr-card">
                                  <h6>Traveler details</h6>
                                </div>
                                <div className="card-body">
                                  <h6 className="tra-name">Surbhi Rathee</h6>
                                  <p>Adult | Female</p>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <div className="card p-0">
                                <div className="card-header hdr-card">
                                  <h6>Flexibility and protection</h6>
                                </div>
                                <div className="card-body">
                                  <h6 className="tra-name">Flexible ticket</h6>
                                  <p>
                                    Flexible ticket Change your time or date up
                                    to 24 hours before departure and only pay
                                    the difference, if any{" "}
                                    <a href="">View Details</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <div className="card p-0">
                                <div className="card-header hdr-card">
                                  <div className="">
                                    <h6>Your payment</h6>
                                    <p>Simple, safe, and secure.</p>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h6 className="tra-name">
                                    How do you want to pay?
                                  </h6>
                                  <p>payment-card images</p>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="field-set">
                                        <label>
                                          Cardholder's name<span>*</span>
                                        </label>
                                        <input
                                          defaultValue=""
                                          className="form-control"
                                          type="text"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="field-set">
                                        <label>
                                          Card number<span>*</span>
                                        </label>
                                        <input
                                          defaultValue=""
                                          className="form-control"
                                          type="number"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="field-set">
                                        <label>
                                          Expiration date<span>*</span>
                                        </label>
                                        <input
                                          defaultValue=""
                                          className="form-control"
                                          type="date"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="field-set">
                                        <label>
                                          CVC<span>*</span>
                                        </label>
                                        <input
                                          defaultValue=""
                                          className="form-control"
                                          type="number"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <p>
                                By clicking pay now you agree with the{" "}
                                <a href="">terms and conditions</a> and{" "}
                                <a href="">privacy policies</a> of JetLife
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card p-0">
                              <div className="card-header hdr-card d-flex justify-content-between align-items-center">
                                <div className="">
                                  <h6>Baggage</h6>
                                  <p>
                                    Total number of bags included for all
                                    travelers
                                  </p>
                                </div>
                                <div className="">
                                  <a href="">View baggage per traveler</a>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>1 personal item</p>
                                      <p className="included">Included</p>
                                      <p>Fits under the seat in front of you</p>
                                    </div>
                                  </div>
                                </div>
                                <hr className="bag-hr" />
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>1 carry-on bag</p>
                                      <p className="included">Included</p>
                                      <p>23 x 40 x 55 cm · 7 kg</p>
                                    </div>
                                  </div>
                                </div>
                                <hr className="bag-hr" />
                                <div className="baggage">
                                  <div className="item">
                                    <span className="icon">
                                      <i className="fi fi-sr-person-luggage"></i>
                                    </span>
                                    <div className="">
                                      <p>2 checked bags</p>
                                      <p className="included">Included</p>
                                      <p>23 kg each</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-3">
                              <p>
                                For more detailed baggage info and options,
                                check airline baggage policies:{" "}
                                <a href="">Air India</a>
                              </p>
                            </div>
                            <div className="my-3">
                              <div className="card p-0">
                                <div className="card-header hdr-card">
                                  <h6>Price details</h6>
                                </div>
                                <div className="card-body">
                                  <h6 className="tra-name">Flight</h6>
                                  <table className="w-100">
                                    <tbody>
                                      <tr>
                                        <td>Adult (1)</td>
                                        <td>INR5,483.19</td>
                                      </tr>
                                      <tr>
                                        <td>Flight fare</td>
                                        <td>INR4,604.19</td>
                                      </tr>
                                      <tr>
                                        <td>Airline taxes and fees</td>
                                        <td>INR879.00</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <hr />
                                  <h6 className="tra-name">Extras</h6>
                                  <table className="w-100">
                                    <tbody>
                                      <tr>
                                        <td>Flexible ticket</td>
                                        <td>INR985.49</td>
                                      </tr>
                                      <tr>
                                        <td>Base price</td>
                                        <td>INR985.49</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <hr />
                                  <table className="w-100">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <strong>Total</strong>
                                          <p>Includes taxes and fees</p>
                                        </td>
                                        <td>INR6,468.68</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
              {/* <div className="step-controls">
                <button
                  id="backBtn"
                  className="btn btn_theme btn_md"
                  onClick={prevStep}
                  style={{
                    display: currentStep === 0 ? "none" : "inline-block",
                  }}
                >
                  Back
                </button>
                <button
                  id="nextBtn"
                  className="btn btn_theme btn_md"
                  onClick={nextStep}
                >
                  {currentStep === totalSteps - 1 ? "Submit" : "Next"}
                </button>
              </div> */}
              <div className="card">
                <div className="card-body">
                  <form id="contact_form_content" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="card-header mb-4">
                        Contact Information
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Email</label>
                          <input
                            type="email"
                            value={formData.contact.email}
                            onChange={(e) =>
                              handleChange("contact.email", e.target.value)
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Country Code</label>
                          <input
                            value={formData.contact.phone.country_code}
                            onChange={(e) =>
                              handleChange(
                                "contact.phone.country_code",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Area Code</label>
                          <input
                            value={formData.contact.phone.area_code}
                            onChange={(e) =>
                              handleChange(
                                "contact.phone.area_code",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Phone Number</label>
                          <input
                            value={formData.contact.phone.phone_number}
                            onChange={(e) =>
                              handleChange(
                                "contact.phone.phone_number",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="card-header mb-4">
                        Passenger Information
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>First Name</label>
                          <input
                            value={formData.pax_list[0].name}
                            onChange={(e) =>
                              handleChange("pax_list.0.name", e.target.value)
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Last Name</label>
                          <input
                            value={formData.pax_list[0].lastname}
                            onChange={(e) =>
                              handleChange(
                                "pax_list.0.lastname",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Birthdate</label>
                          <input
                            type="date"
                            value={formData.pax_list[0].birthdate}
                            onChange={(e) =>
                              handleChange(
                                "pax_list.0.birthdate",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Type</label>
                          <select
                            value={formData.pax_list[0].type}
                            onChange={(e) =>
                              handleChange("pax_list.0.type", e.target.value)
                            }
                            className="form-control bg_input"
                          >
                            <option value="ADULT">Adult</option>
                            <option value="CHILDREN">Children</option>
                            <option value="INFANT">Infant</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="field-set">
                          <label>Gender</label>
                          <select
                            value={formData.pax_list[0].gender}
                            onChange={(e) =>
                              handleChange("pax_list.0.gender", e.target.value)
                            }
                            className="form-control bg_input"
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="card-header mb-4">
                        Passport Information
                      </div>
                      <div className="col-lg-4">
                        <div className="field-set">
                          <label>Passport No</label>
                          <input
                            value={
                              formData.pax_list[0].identity_info.passport.no
                            }
                            onChange={(e) =>
                              handleChange(
                                "pax_list.0.identity_info.passport.no",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="field-set">
                          <label>Expiry Date</label>
                          <input
                            type="date"
                            value={
                              formData.pax_list[0].identity_info.passport
                                .end_date || ""
                            }
                            onChange={(e) => {
                              const rawDate = e.target.value; // "2025-09-08"
                              handleChange(
                                "pax_list.0.identity_info.passport.end_date",
                                rawDate
                              );
                            }}
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="field-set">
                          <label>Citizenship Country</label>
                          <input
                            value={
                              formData.pax_list[0].identity_info.passport
                                .citizenship_country
                            }
                            onChange={(e) =>
                              handleChange(
                                "pax_list.0.identity_info.passport.citizenship_country",
                                e.target.value
                              )
                            }
                            className="form-control bg_input"
                          />
                        </div>
                      </div>
                      <div className="card-header mb-4">Notes</div>
                      <div className="col-lg-12">
                        <div className="field-set">
                          <label>Note</label>
                          <textarea
                            value={formData.notes}
                            onChange={(e) =>
                              handleChange("notes", e.target.value)
                            }
                            className="form-control bg_input"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn_theme btn_md"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FlightBookingDetails;
