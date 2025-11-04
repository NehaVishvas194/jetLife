import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";

const OfferDetails = () => {
  const { id } = useParams();
  console.log("News ID from URL:", id);
  const [details, setDetails] = useState([]);
  const [detailsImage, setDetailsImage] = useState("");

  const fetchOfferDetails = async (id) => {
    try {
      const formData = new FormData();
      formData.append("offer_id", id);

      const response = await axios.post(
        `${API_BASE_URL}/offer/detail`,
        formData
      );

      if (response.data.data) {
        setDetails(response.data.data[0]);
        setDetailsImage(response.data.image_path);
      }
    } catch (error) {
      console.error("Error fetching Offer Data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOfferDetails(id);
    }
  }, [id]);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${detailsImage}/${details?.image})`,
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
                  <h2>Offer Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>
                      Offer
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
              <div className="card detail-card">
                <div className="card-body">
                  <div className="flat-dis">
                    <div class="card banner-card">
                      <div class="card-body">
                        <div class="text-cont">
                          <h3 className="text-white">
                            {/* <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 1024 1024"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                              <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                            </svg>{" "} */}
                            {details.offer_title}
                          </h3>
                          <button type="button" class="btn btn_theme btn_md">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="offer-main">
                    {/* <h5>Offer Details:</h5> */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Coupon Code</th>
                          <th>Category</th>
                          <th>Offer</th>
                          <th>Valid Upto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="active">{details.coupan}</td>
                          <td>{details.category_name}</td>
                          <td>{details.offers}</td>
                          <td>{details.to_date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="offer-main">
                    {details ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: details.content,
                          // .replace(/\r\n/g, "<br/>")
                          // .replace(/\n/g, "<br/>"),
                        }}
                      />
                    ) : (
                      <></>
                    )}
                    {/* <h5>What do you get?</h5> */}
                    {/* <ul>
                      <li>
                        On the application of the dealcode WELCOMEMMT, discount
                        will automatically deducted from booking amount.
                      </li>
                      <li>
                        The customer will get the above amount as instant
                        discount on his/her domestic flight booking made on
                        MakeMyTrip Mobile App (Android or iOS) or website.
                      </li>
                    </ul> */}
                  </div>
                  {/* <div className="offer-main">
                    <h5>How do you get it?</h5>
                    <ul>
                      <li>
                        To avail the offer customer must enter the deal code
                        WELCOMEMMT in the Deal Code field.
                      </li>
                      <li>
                        Offer valid for ONE domestic flight booking per user
                      </li>
                      <li>
                        The offer is valid for bookings made on MakeMyTrip
                        Mobile App (Android or iOS).
                      </li>
                      <li>This offer is valid only once per device.</li>
                    </ul>
                  </div>
                  <div className="offer-main">
                    <h5>What else do you need to know?</h5>
                    <p>Flights</p>
                    <ul>
                      <li>
                        For flights, discount will be calculated on the booking
                        amount (excluding convenience fee and any ancillaries
                        purchased e.g.: meals, insurance).
                      </li>
                      <li>
                        Offer is not applicable on payments made through My
                        Wallet (MakeMyTrip Wallet - bonus amount), 3rd party
                        wallets, Gift card and net banking payments.
                      </li>
                      <li>
                        Offer is not applicable on payments made through AU
                        NetBanking or App.
                      </li>
                    </ul>
                    <p>Hotels</p>
                    <ul>
                      <li>The offer is valid on select properties.</li>
                      <li>
                        For Hotels, Villas and Apartments, the discount is to be
                        calculated on hotel base price (pre-tax price).
                      </li>
                      <li>
                        The offer is not valid on pay at hotel or
                        Book/Reserve-Now-Pay-later bookings.
                      </li>
                      <li>
                        The offer is not applicable on payments made through My
                        Wallet (MakeMyTrip Wallet - bonus amount), 3rd party
                        wallets, COD, Pay Pal, Gift card and net banking
                        payments.
                      </li>
                      <li>
                        The offer is not applicable on payments made through AU
                        Bank NetBanking or App.
                      </li>
                    </ul>
                  </div>
                  <div className="offer-main">
                    <h5>Conditions in case of cancellation:</h5>
                    <ul>
                      <li>
                        In case of full cancellation the offer stands void and
                        customer will not be eligible for discount.
                      </li>
                      <li>
                        If the Customer cancels the travel service purchase
                        after the discount is credited, MakeMyTrip will deduct
                        the discount amount from the refund and cancellation
                        charges shall apply.
                      </li>
                      <li>
                        In case of partial cancellation, offer stands void if
                        the revised booking amount is not eligible for discount.
                        If the revised booking amount is still eligible for
                        cashback, then it will be appropriately reduced basis
                        booking amount.
                      </li>
                    </ul>
                  </div>
                  <div className="offer-main">
                    <h5>Terms & Conditions:</h5>
                    <ul>
                      <li>
                        Customer needs to enter the appropriate Deal Code
                        (WELCOMEMMT) at the time of payment to be eligible for
                        the cashback offer. In case the customer enters the
                        incorrect deal code or forgets to mention the code,
                        he/she will not be eligible for the cashback.
                      </li>
                      <li>Offer is not valid for Gift Cards, My Wallet</li>
                      <li>
                        User agreement and privacy policy of MakeMyTrip shall
                        apply.
                      </li>
                      <li>
                        In the event of any misuse or abuse of the offer by the
                        customer of travel agent, MakeMyTrip reserve the rights
                        to deny the offer or cancel the booking. MakeMyTrip
                        shall not refund the booking amount in such cases.
                      </li>
                      <li>
                        Customers, who are travel agents by occupation are
                        barred from making bookings for their customers and
                        MakeMyTrip reserve the rights to deny the offer or
                        cancel the booking. MakeMyTrip shall not refund the
                        booking amount in such cases.
                      </li>
                      <li>
                        This offer cannot be clubbed with any other offer of
                        MakeMyTrip.
                      </li>
                      <li>
                        Citibank Accelerated Reward points will be calculated on
                        the amount arrived at after deduction of the cashback
                        amount from the booking amount. For e.g., if the
                        customer makes a booking of INR 5000 and is eligible for
                        a cashback of INR 1200, then the Citibank Accelerated
                        Reward points will be calculated on INR 31200 only. This
                        shall be applicable when the cashback is credited in
                        customer’s Citibank card account and not MakeMyTrip
                        Mywallet.
                      </li>
                      <li>
                        MakeMyTrip reserves the right, at any time, without
                        prior notice and liability and without assigning any
                        reason whatsoever, to add/alter/modify/change or vary
                        all of these terms and conditions or to replace, wholly
                        or in part, this offer by another offer, whether similar
                        to this Offer or not, or to extend or withdraw it
                        altogether.
                      </li>
                      <li>
                        For any card related claims, the customer shall approach
                        the Bank and MakeMyTrip shall not entertain any such
                        claims.
                      </li>
                      <li>
                        MakeMyTrip is the sole authority for interpretation of
                        these terms.
                      </li>
                      <li>
                        MakeMyTrip shall not be liable for any loss or damage
                        arising due to force majeure event.
                      </li>
                      <li>
                        In the event of any misuse or abuse of the offer by the
                        customer or travel agent, MakeMyTrip reserves the right
                        to deny the offer or cancel the booking.
                      </li>
                      <li>
                        In no event the entire liability of MakeMyTrip under
                        this offer shall exceed the amount of promotional
                        discount under this offer.
                      </li>
                      <li>
                        MakeMyTrip shall not be liable to for any indirect,
                        punitive, special, incidental or consequential damages
                        arising out of or in connection with the offer.
                      </li>
                      <li>
                        Disputes, if any, arising out of or in connection with
                        this offer shall be subject to the exclusive
                        jurisdiction of the competent courts in Delhi.
                      </li>
                      <li>
                        User Agreement and Privacy Policy at MakeMyTrip website
                        shall apply.
                      </li>
                      <li>
                        Customers, who are Travel Agents by occupation, are
                        barred from making bookings for their customers and
                        MakeMyTrip reserves the right to deny the offer against
                        such bookings or to cancel such bookings. For such
                        cases, MakeMyTrip shall not refund the booking amount.
                      </li>
                    </ul>
                  </div> */}
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

export default OfferDetails;
