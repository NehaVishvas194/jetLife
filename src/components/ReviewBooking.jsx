import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./home/Newsletter";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import image1 from "../assets/img/favicon.png";

const ReviewBooking = () => {
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
                  <h2>Air India</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <GoDotFill />
                    </span>{" "}
                    Review your trip
                  </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main section code */}
      <section className="sectionFlightdetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="aboveflightdetail borderedColor mb-4">
                <h3 className="allsameheading">Delhi to New York</h3>
                <label className="fontsamll">
                  7:35pm - 7:55am (21h 50m, 1 stop)
                </label>
                <div className="airInaDate fontsamll">
                  <span>
                    <img className="contryImg" src={image1} alt="imgIND" />
                  </span>{" "}
                  Air India • Tue, Jun 24
                </div>
                <p className="aboveAverage fontsamll">Above average CO₂</p>
                <div className="changeflightdetails">
                  <button
                    type="button"
                    className="btn flightBtn btn_md"
                    data-bs-toggle="modal"
                    data-bs-target="#flightdetailsModal"
                  >
                    Flight details
                  </button>
                  <button type="button" className="btn flightBtn btn_md">
                    Change flight
                  </button>
                </div>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="flightdetailsModal"
                  tabindex="-1"
                  aria-labelledby="flightdetailsModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header modalHeader">
                        <h1
                          className="modal-title fs-5"
                          id="explorepackagesLabel"
                        >
                          Flight details
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="flightlist">
                          <div className="flightFirst">
                            <label className="fontsamll">Flight 1 of 2</label>
                            <div className="fltdetails">
                              <div className="fontsamll mb-4">
                                <span>
                                  <img
                                    className="contryImg"
                                    src={image1}
                                    alt="imgIND"
                                  />
                                </span>{" "}
                                <strong>Air India</strong> AI2985
                              </div>
                              <div className="order-track">
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-dot"></span>
                                    <span className="order-track-status-line"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="reachStopStart">
                                      <h3 className="allsameheading">Delhi</h3>
                                      <div className="fontsamll">
                                        Indira Gandhi Intl. (DEL)
                                      </div>
                                      <div className="fontsamll">
                                        Terminal 1
                                      </div>
                                    </div>
                                    <div className="rechTimeDate">
                                      <h3 className="allsameheading">7:35pm</h3>
                                      <div className="fontsamll">IST</div>
                                      <div className="fontsamll">
                                        <strong>Tue, Jun 24</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-line timeLine"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="travelTime">
                                      Travel time: 2h 25m
                                    </div>
                                  </div>
                                </div>
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-dot"></span>
                                    <span className="order-track-status-line"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="reachStopStart">
                                      <h3 className="allsameheading">Mumbai</h3>
                                      <div className="fontsamll">
                                        Chhatrapati Shivaji Intl. (BOM)
                                      </div>
                                      <div className="fontsamll">
                                        Terminal 2
                                      </div>
                                    </div>
                                    <div className="rechTimeDate">
                                      <h3 className="allsameheading">
                                        10:00pm
                                      </h3>
                                      <div className="fontsamll">IST</div>
                                      <div className="fontsamll">
                                        <strong>Tue, Jun 24</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="secMoreDetails row">
                              <div className="col-md-6 airmore aircraftAirbus">
                                <table className="table table-borderless">
                                  <body className="fontsamll">
                                    <tr>
                                      <td>Aircraft</td>
                                      <td className="textRight">
                                        <strong>Airbus A320-200neo</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Cabin</td>
                                      <td className="textRight">
                                        <strong>Economy</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Distance</td>
                                      <td className="textRight">
                                        <strong>708 mi</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="emissions">
                                          Emissions{" "}
                                          <span className=" amenitiesic0n material-icons">
                                            {" "}
                                            info
                                          </span>
                                        </div>{" "}
                                      </td>
                                      <td className="textRight">
                                        <p className="aboveAverage fontsamll mt-0">
                                          Above average CO₂
                                        </p>{" "}
                                      </td>
                                    </tr>
                                  </body>
                                </table>
                              </div>
                              <div className="col-md-6 airmore amenities">
                                <h6>Amenities</h6>
                                <div className="fontsamll">
                                  {" "}
                                  <span className="amenitiesic0n material-icons">
                                    {" "}
                                    power
                                  </span>
                                  In-seat power outlet
                                </div>
                                <div className="fontsamll">
                                  <span className="amenitiesic0n material-icons">
                                    live_tv{" "}
                                  </span>
                                  In-flight entertainment
                                </div>
                              </div>

                              <div className="updateTime">
                                <div className="fontsamll upadetText">
                                  <span className="amenitiesic0n material-icons">
                                    update{" "}
                                  </span>{" "}
                                  <strong> 3h 40m layover in Mumbai</strong>
                                </div>
                                <div className="fontsamll">
                                  {" "}
                                  Change planes in Chhatrapati Shivaji Intl.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flightFirst mt-4">
                            <label className="fontsamll">Flight 2 of 2</label>
                            <div className="fltdetails">
                              <div className="fontsamll mb-4">
                                <span>
                                  <img
                                    className="contryImg"
                                    src={image1}
                                    alt="imgIND"
                                  />
                                </span>{" "}
                                <strong>Air India</strong> AI2985
                              </div>
                              <div className="order-track">
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-dot"></span>
                                    <span className="order-track-status-line"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="reachStopStart">
                                      <h3 className="allsameheading">Delhi</h3>
                                      <div className="fontsamll">
                                        Indira Gandhi Intl. (DEL)
                                      </div>
                                      <div className="fontsamll">
                                        Terminal 1
                                      </div>
                                    </div>
                                    <div className="rechTimeDate">
                                      <h3 className="allsameheading">7:35pm</h3>
                                      <div className="fontsamll">IST</div>
                                      <div className="fontsamll">
                                        <strong>Tue, Jun 24</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-line timeLine"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="travelTime">
                                      Travel time: 2h 25m
                                    </div>
                                  </div>
                                </div>
                                <div className="order-track-step">
                                  <div className="order-track-status">
                                    <span className="order-track-status-dot"></span>
                                    <span className="order-track-status-line"></span>
                                  </div>
                                  <div className="order-track-text">
                                    <div className="reachStopStart">
                                      <h3 className="allsameheading">Mumbai</h3>
                                      <div className="fontsamll">
                                        Chhatrapati Shivaji Intl. (BOM)
                                      </div>
                                      <div className="fontsamll">
                                        Terminal 2
                                      </div>
                                    </div>
                                    <div className="rechTimeDate">
                                      <h3 className="allsameheading">
                                        10:00pm
                                      </h3>
                                      <div className="fontsamll">IST</div>
                                      <div className="fontsamll">
                                        <strong>Tue, Jun 24</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="secMoreDetails row">
                              <div className="col-md-6 airmore aircraftAirbus">
                                <table className="table table-borderless">
                                  <body className="fontsamll">
                                    <tr>
                                      <td>Aircraft</td>
                                      <td className="textRight">
                                        <strong>Airbus A320-200neo</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Cabin</td>
                                      <td className="textRight">
                                        <strong>Economy</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Distance</td>
                                      <td className="textRight">
                                        <strong>708 mi</strong>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="emissions">
                                          Emissions{" "}
                                          <span className=" amenitiesic0n material-icons">
                                            {" "}
                                            info
                                          </span>
                                        </div>{" "}
                                      </td>
                                      <td className="textRight">
                                        <p className="aboveAverage fontsamll mt-0">
                                          Above average CO₂
                                        </p>{" "}
                                      </td>
                                    </tr>
                                  </body>
                                </table>
                              </div>
                              <div className="col-md-6 airmore amenities">
                                <h6>Amenities</h6>
                                <div className="fontsamll">
                                  {" "}
                                  <span className="amenitiesic0n material-icons">
                                    {" "}
                                    power
                                  </span>
                                  In-seat power outlet
                                </div>
                                <div className="fontsamll">
                                  <span className="amenitiesic0n material-icons">
                                    live_tv{" "}
                                  </span>
                                  In-flight entertainment
                                </div>
                              </div>

                              <div className="updateTime">
                                <div className="fontsamll upadetText">
                                  <span className="amenitiesic0n material-icons">
                                    update{" "}
                                  </span>{" "}
                                  <strong> 3h 40m layover in Mumbai</strong>
                                </div>
                                <div className="fontsamll">
                                  {" "}
                                  Change planes in Chhatrapati Shivaji Intl.
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

              <div className="aboveflightdetail borderedColor mb-4">
                <h3 className="allsameheading">Your fare: Eco Value</h3>
                <ul className="comntitle mt-3">
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>
                    Seat choice included
                  </li>
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>{" "}
                    Carry-on bag included (15 lbs)
                  </li>
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>{" "}
                    2 checked bags included (50 lbs each)
                  </li>
                  <li>
                    <span className="material-icons"> paid </span> Cancellation
                    fee applies
                  </li>
                  <li>
                    <span className="material-icons"> paid </span> Change fee:
                    $293
                  </li>
                </ul>
              </div>

              <div className="aboveflightdetail borderedColor mb-4">
                <h3 className="allsameheading">Seats</h3>

                <ul className="comntitle mt-3">
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>
                    Seat choice included
                  </li>
                </ul>
                <label className="fontsamll">
                  Purchase seats for this flight through Air India after
                  booking.
                </label>
              </div>
              <div className="aboveflightdetail borderedColor mb-4">
                <h3 className="allsameheading">Bags</h3>

                <ul className="comntitle mt-3">
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>
                    Carry-on bag included (15 lbs)
                  </li>
                  <li>
                    <span className="greenicon material-icons">
                      {" "}
                      check_circle{" "}
                    </span>
                    2 checked bags included (50 lbs each)
                  </li>
                </ul>
                <label className="fontsamll">
                  Purchase additional bags for this flight through Air India
                  after booking.
                </label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="borderedColor">
                <h3 className="allsameheading">Price summary</h3>
                <table className="table table-borderless summaryTable mt-4">
                  <thead>
                    <tr>
                      <th>Traveler 1: Adult</th>
                      <th>$406.25</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flight</td>
                      <td>$169.00</td>
                    </tr>
                    <tr>
                      <td>Taxes, fees, and charges</td>
                      <td>$237.25</td>
                    </tr>
                    <tr>
                      <th>Traveler 2: Child</th>
                      <th>$362.15</th>
                    </tr>
                    <tr>
                      <td>Flight</td>
                      <td>$169.00</td>
                    </tr>
                    <tr>
                      <td>Taxes, fees, and charges</td>
                      <td>$237.25</td>
                    </tr>
                    <tr className="tableborder">
                      <td>
                        <span className="padtp"> Subtotal </span>
                      </td>
                      <td>
                        <span className="padtp">$768.40</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="padbtm">Discount</span>
                      </td>
                      <td>
                        <span className="padbtm">-$23.05</span>
                      </td>
                    </tr>
                    <tr className="tableborder">
                      <td>
                        <h4 className="padtp">Trip total</h4>
                      </td>
                      <td>
                        <h4 className="padtp">$745.35</h4>
                      </td>
                    </tr>
                    <tr colspan="2">
                      <td>Rates are quoted in US dollars</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button className="sidebaarSelectBtn btn btn_theme btn_md">
                          Select
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ReviewBooking;
