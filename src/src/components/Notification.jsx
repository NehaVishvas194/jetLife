import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import BackToTopButton from "./BackToTop";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../Url/BaseUrl";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Notification = () => {
  const [noty, setNoty] = useState([]);

  const AllNotification = async () => {
    try {
      const token = localStorage.getItem("Token");
      const id = localStorage.getItem("Id");

      const response = await axios.post(`${API_BASE_URL}/notifications`, {
        token: token,
        user_id: id,
      });

      console.log("My Notification Data:-", response.data.notification);
      setNoty(response.data.notification || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All notifications will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("Token");
          const id = localStorage.getItem("Id");

          const response = await axios.delete(
            `${API_BASE_URL}/notifications/delete-all`,
            {
              token,
              user_id: id,
            }
          );
          console.log("Delete Response:", response.data);
          // Clear state after successful delete
          setNoty([]);
          Swal.fire(
            "Deleted!",
            "All notifications have been deleted.",
            "success"
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete notifications.", "error");
        }
      }
    });
  };

  const handleDelete = (Id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "All notifications will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("Token");
          const id = localStorage.getItem("Id");
          const response = await axios.post(
            `${API_BASE_URL}/notification/delete`, {
            token,
            user_id: id,
            id: Id
          }
          );
          console.log("Delete Particular Response:-", response.data);
          // get notification after delete
          AllNotification();
          Swal.fire(
            "Deleted!",
            "Selected Notification is deleted.",
            "success"
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete notifications.", "error");
        }
      }
    })
  }
  useEffect(() => {
    AllNotification();
  }, []);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Notification</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      Notification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-booking --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col-md-6 px-3">
              <h4>All Notification List</h4>
            </div>
            <div className="col-md-6 text-end">
              <button
                type="button"
                className="btn btn_theme btn_md"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
          <div className="row">
            {noty.map((notify) => (
              <div className="col-md-12 mb-4" key={notify.id}>
                <div className="card booking-card position-relative">
                  <div className="card-body p-0">
                    <div className="notifi-content">
                      <div className="main-noti-cont">
                        <span>{notify.user_booking_status}</span>
                        <h6>{notify.title}</h6>
                        <p>{notify.message}</p>
                      </div>
                      <div className="date-time-noti">
                        <FiClock />
                        <span>
                          {new Date(notify.created_at).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="cross-noti">
                      <span onClick={() => handleDelete(notify.id)}><i class="fa-solid fa-trash-can"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Notification;