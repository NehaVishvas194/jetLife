import { Link } from "react-router-dom";

const CancelPayment = () => {
  return (
    <>
      <div className="payment-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="cancel-box">
                    <h2>❌</h2>
                    <h2>Payment Cancelled</h2>
                    <p>Your payment was not completed. Please try again.</p>
                    {/* <div className="buttons">
                      <Link to="/" className="home">
                        Go Back Home
                      </Link>
                    </div> */}
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

export default CancelPayment;
