import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";

const SuccessPayment = () => {
  const [status, setStatus] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const token = localStorage.getItem("dpo_token");
      if (!token) {
        setStatus("No transaction token found!");
        return;
      }

      try {
        const payload = {
          API3G: {
            Request: "verifyToken",
            TransactionToken: token,
          },
        };
        const res = await axios.post(
          `${API_BASE_URL}/verify/token`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Verify Response:", res.data);
        if (res.data?.API3G?.Result === "000") {
          setStatus("✅ Payment successful!");
          // Optionally: clear token from localStorage
          localStorage.removeItem("dpo_token");
        } else {
          setStatus("❌ Payment failed or not verified.");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setStatus("Error verifying transaction.");
      }
    };
    verifyPayment();
  }, []);

  return (
    <>
      <div className="payment-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="success-box">
                    <h2>✅</h2>
                    <h2>Payment Successful!</h2>
                    <p>Your flight booking has been confirmed.</p>
                    <div className="mt-2">
                      <button
                        type="submit"
                        className="btn btn_theme btn_md"
                        onClick="/"
                      >
                        Go to Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
