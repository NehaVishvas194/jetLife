import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";

const HotelBookingDetails = () => {
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
                  <h2>Hotel Booking</h2>
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
            <div className="col-md-12 mb-5">
              <div className="section_heading_center">
                <h2>Review your Booking</h2>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="mb-2">
                    <h5>Kantua hotel, Thailand</h5>
                  </div>
                  <div className="rating-high">
                    <div className="d-flex align-items-center">
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <IoStar className="star" />
                      <span>4.8 (24 Review)</span>
                    </div>
                  </div>
                  <div className="">
                    <p>
                      A 250 KH No - 423, Gali No 6, Mahipalpur Extension Delhi,
                      110037, Delhi, India
                    </p>
                  </div>
                  <div class="check-box">
                    <div class="check-section">
                      <h6>Check-in:</h6>
                      <p>Tue, 22 Jul, 14:00 - 02:00</p>
                    </div>
                    <div class="divider"></div>
                    <div class="check-section">
                      <h6>Check-out:</h6>
                      <p>Wed, 23 Jul, until 12:00</p>
                    </div>
                    <div class="divider"></div>
                    <div className="">
                      <h6>1 Night | 2 Adults | Hotel</h6>
                    </div>
                  </div>
                  <div className="delux-room detail-dscrp">
                    <h5>Deluxe Room with Work Desk</h5>
                    <p>2 Adults</p>
                    <ul>
                      <li>Breakfast included</li>
                      <li>
                        Free Cancellation till check-in{" "}
                        <a
                          href=""
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                        >
                          Cancellation policy details
                        </a>
                      </li>
                    </ul>
                    {/* cancel-policy-modal */}
                    <div
                      class="modal fade"
                      id="exampleModal1"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel1"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                          <div class="modal-header hrd-modal">
                            <h1 class="modal-title" id="exampleModalLabel1">
                              Cancellations Policy
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div className="mb-3">
                              <h5>
                                Free Cancellation(100% refund) if you cancel
                                this booking before 06 Jul, 11:59
                              </h5>
                            </div>
                            <div className="mb-3">
                              <h5>
                                Cancellations post that will be subject to a fee
                                as follows
                              </h5>
                            </div>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Fee</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Before 06 Jul, 11:59 AM</td>
                                  <td>0.0% of booking amount</td>
                                </tr>
                                <tr>
                                  <td>After 06 Jul, 12:00 PM</td>
                                  <td>100.0% of booking amount</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="mb-3">
                              <h5>
                                Cancellations are only allowed before the
                                Check-In Time. All time mentioned above is in
                                Destination Time.
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="detail-dscrp">
                    <h5>Upgrade Your Stay</h5>
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Add Breakfast for ₹ 1053 for all guests
                      </label>
                    </div>
                  </div>
                  <div className="detail-dscrp delux-room">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Important information</h5>
                      <a
                        href=""
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        View More
                      </a>
                    </div>
                    <ul className="mt-2">
                      <li>Primary Guest should be atleast 18 years of age.</li>
                      <li>
                        Passport, Aadhar, Driving License and Govt. ID are
                        accepted as ID proof(s)
                      </li>
                      <li>Pets are not allowed</li>
                      <li>Outside food is not allowed</li>
                    </ul>
                    {/* view-more-modal */}
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                          <div class="modal-header hrd-modal">
                            <h1 class="modal-title" id="exampleModalLabel">
                              All Hotel Rules
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div className="mb-2">
                              <h5>Check In/out</h5>
                              <p>
                                Hotel Check-in Time is 12 PM, Check-out Time is
                                11 AM.
                              </p>
                            </div>
                            <div className="mb-2">
                              <h5>Must read</h5>
                              <ul>
                                <li>
                                  Primary Guest should be atleast 18 years of
                                  age.
                                </li>
                                <li>
                                  Passport, Aadhar, Driving License and Govt. ID
                                  are accepted as ID proof(s)
                                </li>
                                <li>Pets are not allowed</li>
                                <li>Outside food is not allowed</li>
                              </ul>
                            </div>
                            <div className="mb-2">
                              <h5>Cancellation Policy</h5>
                              <p>
                                Cancellation and prepayment policies vary
                                according to room type. Please check the Fare
                                policy associatedr room.
                              </p>
                            </div>
                            <div className="mb-2">
                              <h5>Property Policy</h5>
                              <ul>
                                <li>
                                  According to government regulations, a valid
                                  Photo ID has to be carried by every person
                                  above the age of 18 staying at The Vegas By De
                                  Pavilion. The identification proofs accepted
                                  are Drivers License, Voters Card, Passport,
                                  Ration Card. Without valid ID the guest will
                                  not be allowed to check in.
                                </li>
                                <li>
                                  The primary guest checking in to the hotel
                                  must be at least 18 years of age.
                                </li>
                                <li>
                                  Early check-in or late check-out is subject to
                                  availability and may be chargeable by The
                                  Vegas By De Pavilion. The standard check-in
                                  time is 12 PM and the standard check-out time
                                  is 11 AM.{" "}
                                </li>
                                <li>
                                  After booking you will be sent an email
                                  confirmation with hotel phone number. You can
                                  contact the hotel directly for early check-in
                                  or late check-out.
                                </li>
                                <li>
                                  The room tariff includes all taxes. The amount
                                  paid for the room does not include charges for
                                  optional services and facilities (such as room
                                  service, mini bar, snacks or telephone calls).
                                  These will be charged at the time of check-out
                                  from the Hotel.
                                </li>
                                <li>
                                  MakeMyTrip will not be responsible for any
                                  check-in denied by the Hotel due to the
                                  aforesaid reason.
                                </li>
                                <li>
                                  The Vegas By De Pavilion reserves the right of
                                  admission. Accommodation can be denied to
                                  guests posing as a 'couple' if suitable proof
                                  of identification is not presented at
                                  check-in.MakeMyTrip will not be responsible
                                  for any check-in denied by the Hotel due to
                                  the aforesaid reason.
                                </li>
                                <li>
                                  The Vegas By De Pavilion reserves the right of
                                  admission for local residents. Accommodation
                                  can be denied to guests residing in the same
                                  city. MakeMyTrip will not be responsible for
                                  any check-in denied by the Hotel due to the
                                  aforesaid reason.
                                </li>
                              </ul>
                            </div>
                            <div className="mb-2">
                              <h5>Payment Mode</h5>
                              <p>
                                You can pay now or you can pay at the hotel if
                                your selected room type has this option.
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
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card detail-card">
                    <div className="card-body">
                      <div className="filter-hd mb-0">
                        <h6>Price Details</h6>
                      </div>
                      <table className="table price-table">
                        <tbody>
                          <tr>
                            <td>Hotel x 1 Night</td>
                            <td>INR5,483.19</td>
                          </tr>
                          <tr>
                            <td>Total Discount</td>
                            <td>INR4,604.19</td>
                          </tr>
                          <tr>
                            <td>Price after Discount</td>
                            <td>INR879.00</td>
                          </tr>
                          <tr>
                            <td>Taxes & Service Fees</td>
                            <td>INR879.00</td>
                          </tr>
                          <tr>
                            <td>Total Amount to be paid</td>
                            <td>INR879.00</td>
                          </tr>
                        </tbody>
                      </table>
                      <div classname="">
                        <button className="btn btn_theme btn_md w-100" type="button">
                      Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card detail-card">
                    <div className="card-body">
                      <div className="filter-hd">
                        <h6>Coupon Codes</h6>
                      </div>
                      <div className="code-coupon">
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            <div className="d-flex justify-content-between">
                              <h6>MMTDEAL</h6>
                              <h6>₹ 717</h6>
                            </div>
                            <p> Great Discounts for You. Get INR717 Off</p>
                          </label>
                        </div>
                      </div>
                      <div className="code-coupon">
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            <div className="d-flex justify-content-between">
                              <h6>MMTDEAL</h6>
                              <h6>₹ 717</h6>
                            </div>
                            <p> Great Discounts for You. Get INR717 Off</p>
                          </label>
                        </div>
                      </div>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Coupon Code"
                        />
                        <button className="btn btn_theme btn_md" type="button">
                          <FaArrowRightLong />
                        </button>
                      </div>
                    </div>
                  </div>
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
export default HotelBookingDetails;
