import image1 from "../../assets/img/email.png";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const handleEmailSubmit = () => {
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email!");
      return;
    }
  };

  return (
    <div>
      <section id="cta_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="cta_left">
                <div className="cta_icon">
                  <img src={image1} alt="icon" />
                </div>
                <div className="cta_content">
                  <h4>Get the latest news and offers</h4>
                  <h2>Subscribe to our newsletter</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cat_form">
                <form id="cta_form_wrappper" onSubmit={handleEmailSubmit}>
                  <div className="input-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter your mail address"
                    />
                    <button className="btn btn_theme btn_md" type="button">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Newsletter;
