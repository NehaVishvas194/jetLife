import image1 from "../assets/img/imagination1.png";
import image2 from "../assets/img/imagination2.png";
import image3 from "../assets/img/imagination3.png";

const Imagination = () => {
  return (
    <div>
      <section id="go_beyond_area" className="section_padding_top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="heading_left_area">
                <h2>
                  Go beyond your <span>imagination</span>
                </h2>
                <h5>Discover your ideal experience with us</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={image1} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    7% Discount for all <span>Airlines</span>
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={image2} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    Travel around<span>the world</span>
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={image3} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    Luxury resorts<span>top deals</span>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Imagination;
