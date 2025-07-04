import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
const Imagination = () => {
  const [data, setData] = useState("");
  const [imagePath, setImagePath] = useState("");

  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/home/pages1`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <section id="go_beyond_area" className="section_padding_top">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>{data.heading}</h2>
                <p>{data.content}</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={`${imagePath}/${data?.image1}`} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    {data.image1_heading}
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={`${imagePath}/${data?.image2}`} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    {data.image2_heading}
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={`${imagePath}/${data?.image3}`} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    {data.image3_heading}
                  </a>
                </h3>
              </div>
            </div>
             <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="#!">
                  <img src={`${imagePath}/${data?.image4}`} alt="img" />
                </a>
                <h3>
                  <a href="#!">
                    {data.image4_heading}
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
