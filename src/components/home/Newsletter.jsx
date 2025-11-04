import image1 from "../../assets/img/email.png";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email!");
      return;
    }
    axios
      .post(`${API_BASE_URL}/subscriber`, {
        email: email,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          toast.success(response.data.message);
          setEmail("");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong!", {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  return (
    <>
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
                <form
                  id="cta_form_wrappper"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEmailSubmit();
                  }}
                >
                  <div className="input-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter your mail address"
                    />
                    <button className="btn btn_theme btn_md" type="submit">
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
    </>
  );
}

export default Newsletter;