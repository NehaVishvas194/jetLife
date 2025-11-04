import React from "react";
import axios from "axios";
import { HOTEL_API } from "../Url/BaseUrl";

const HotelPayment = () => {
  const handlePayment = async () => {
    try {
      const payload = {
        API3G: {
          Request: "createToken",
          Transaction: {
            PaymentAmount: 1,
            PaymentCurrency: "USD",
            CompanyRef: "ORDER-12345-20251024-1901",
            RedirectURL:
              "https://itdevelopmentservices.com/jettravel/success_page",
            BackURL:
              "https://itdevelopmentservices.com/jettravel/cancel_payment",
            CompanyRefUnique: "1",
            PTL: "5",
            customerName: name,
            customerEmail: email,
            customerCity: "Dubai",
            customerCountry: country,
            customerPhone: phone,
          },
          Services: {
            Service: {
              ServiceType: "54841",
              ServiceDescription: "Flight from Nairobi to Diani",
              ServiceDate: "2025/10/25 14:00",
            },
          },
        },
      };
      const res = await axios.post(
        `${HOTEL_API}/create-dpo-transaction`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", res.data);

      // ✅ Check if API returned success
      if (res.data?.status && res.data?.paymentUrl) {
        localStorage.setItem("dpo_token", res.data.token);
        localStorage.setItem("dpo_companyRef", res.data.companyRef);
        window.location.href = res.data.paymentUrl;
      } else {
        alert("Payment token creation failed. Please try again.");
      }
    } catch (err) {
      console.error("Error creating token:", err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div>
      <div className="payment-container">
        {/* LEFT SECTION */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="summary">
                    <h2>Booking Summary</h2>
                    <div className="section">
                      <h3>{BookingType} Details</h3>
                      <p>
                        {fromCity} → {toCity}
                      </p>
                      <p>Arrival Time: {arrivalTime}</p>
                      <p>Departure Time: {departureTime}</p>
                    </div>
                    <div className="total">
                      <span>Total Amount:</span>
                      <strong>$1</strong>
                    </div>
                    <div className="col-lg-12 text-center mt-4">
                      <div className="form-group">
                        <button
                          type="submit"
                          onClick={handlePayment}
                          className="btn btn_theme btn_md"
                        >
                          Pay Amount
                        </button>
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
  );
};

export default HotelPayment;
