import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Url/BaseUrl";
import Skeleton from "../Skeleton";

const Imagination = () => {
  const [data, setData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/home/pages1`)
      .then((response) => {
        setData(response.data.data);
        setImagePath(response.data.image_path);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section id="go_beyond_area" className="section_padding_top">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              <div className="section_heading_center">
                {loading ? (
                  <>
                    <Skeleton width="60%" height="30px" />
                    <Skeleton width="80%" height="18px" />
                  </>
                ) : (
                  <>
                    <h2>{data.heading}</h2>
                    <p>{data.content}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="imagination_boxed">
                {loading ? (
                  <>
                    <Skeleton width="100%" height="50vh" />
                    <Skeleton width="80%" height="25%" />
                  </>
                ) : (
                  <>
                     <a href="#!">
                      <img
                        src={`${imagePath}/${data?.[`image${num}`]}`}
                        alt={`img${num}`}
                      />
                    </a>
                    <h3>
                      <a href="#!">{data?.[`image${num}_heading`]}</a>
                    </h3>
                  </>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Imagination;
