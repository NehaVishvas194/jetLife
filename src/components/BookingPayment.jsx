import React from "react";

const BookingPayment = () => {
  return (
    <div>
      <div className="col-md-6">
        <div className="card p-0">
          <div className="card-header hdr-card d-flex justify-content-between align-items-center">
            <h6>Flight Details</h6>
            <a href="">View Details</a>
          </div>
          <div className="card-body">
            <div className="d-flex gap-3">
              <div className="flight_logo">
                <img src="/assets/img/common/filght.svg" alt="img" />
                <p>Air India</p>
              </div>
              <div className="fli-del">
                <h6>New Delhi (DEL) to Mumbai (BOM)</h6>
                <p>Sat, Jul 26 · 11:40 AM - Sat, Jul 26 · 1:55 PM</p>
                <p>Direct · 2h 15m · Economy</p>
                <p>Flight · AI2945</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          <p>
            You selected the Eco Value fare for all flights in this trip.{" "}
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
                Flexible ticket Change your time or date up to 24 hours before
                departure and only pay the difference, if any{" "}
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
              <h6 className="tra-name">How do you want to pay?</h6>
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
    </div>
  );
};

export default BookingPayment;
