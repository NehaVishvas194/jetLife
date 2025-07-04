import React, { useState } from "react";
import image1 from "../../assets/img/destination/destination-small1.png";
import image2 from "../../assets/img/destination/destination-small2.png";
import image3 from "../../assets/img/destination/destination-small3.png";
import image4 from "../../assets/img/destination/destination-small4.png";
import image5 from "../../assets/img/destination/destination-small5.png";
import image6 from "../../assets/img/destination/destination-small6.png";

// Helper component for a single destination item
const DestinationItem = ({ image, alt, title, price }) => (
  <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
    <div className="card desti-card">
      <div className="card-body">
        <a className="tab_destinations_boxed">
          <div className="tab_destinations_img">
            <img src={image} alt={alt} />
          </div>
          <div className="tab_destinations_conntent">
            <h6>{title}</h6>
            <p>Price starts at <span>${price.toFixed(2)}</span></p>
          </div>
        </a>
      </div>
    </div>

  </div>
);

const Destination = () => {
  const [activeTab, setActiveTab] = useState("nepal");

  const destinationsData = {
    nepal: [
      {
        image: image1,
        alt: "img1",
        title: "Everest trek to Base Camp",
        price: 105.00,
      },
      { image: image2, alt: "img2", title: "Kathmundu tour", price: 85.00 },
      { image: image3, alt: "img3", title: "Beautiful pokhara", price: 100.00 },
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
      {
        image: image5,
        alt: "img5",
        title: "Chitwan national park",
        price: 105.00,
      },
      { image: image6, alt: "img6", title: "Langtang region", price: 105.00 },
    ],
    malaysia: [
      { image: image2, alt: "img7", title: "Kathmundu tour", price: 85.00 },
      { image: image2, alt: "img9", title: "Beautiful pokhara", price: 100.00 },
      { image: image4, alt: "img10", title: "Annapurna region", price: 75.00 },
      { image: image6, alt: "img6", title: "Langtang region", price: 105.00 },
    ],
    indonesia: [
      { image: image3, alt: "img3", title: "Beautiful pokhara", price: 100.00 },
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
      { image: image6, alt: "img", title: "Langtang region", price: 105.00 },
    ],
    turkey: [
      { image: image2, alt: "img2", title: "Kathmundu tour", price: 85.00 },
      { image: image3, alt: "img3", title: "Beautiful pokhara", price: 100.00 },
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
    ],
    china: [
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
      { image: image6, alt: "img6", title: "Langtang region", price: 105.00 },
    ],
    darjeeling: [
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
    ],
    italy: [
      { image: image4, alt: "img4", title: "Annapurna region", price: 75.00 },
      { image: image6, alt: "img6", title: "Langtang region", price: 105.00 },
    ],
  };

  return (
    <div>
      <section id="destinations_area" className="section_padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Destinations for you</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="our-service-tab">
                <ul class="nav nav-pills mb-3 justify-content-center"
                  id="pills-tab"
                  role="tablist"
                >
                  {Object.keys(destinationsData).map((tabKey) => (
                    <li class="nav-item" role="presentation">
                      <button
                        key={tabKey}
                        className={`nav-link ${activeTab === tabKey ? "active" : ""
                          }`}
                        id={`pills-${tabKey}-tab`}
                        onClick={() => setActiveTab(tabKey)}
                        type="button"
                        role="tab"
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-${tabKey}`}
                        aria-controls={`pills-${tabKey}`}
                        aria-selected={activeTab === tabKey ? "true" : "false"}
                      >
                        {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                {Object.keys(destinationsData).map((tabKey) => (
                  <div
                    key={tabKey}
                    className={`tab-pane fade ${activeTab === tabKey ? "show active" : ""
                      }`}
                    id={`pills-${tabKey}`}
                    role="tabpanel"
                    aria-labelledby={`pills-${tabKey}-tab`}
                  >
                    <div className="row">
                      {destinationsData[tabKey].map((destination, index) => (
                        <DestinationItem
                          key={index} // Consider a more stable key if possible (e.g., a unique ID from data)
                          image={destination.image}
                          alt={destination.alt}
                          title={destination.title}
                          price={destination.price}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      </section >
    </div >
  );
};

export default Destination;