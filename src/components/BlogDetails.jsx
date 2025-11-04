import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTop";
import { Link, useParams } from "react-router-dom";
// import profile from "../assets/img/news/author-1.png";
// import profile1 from "../assets/img/blog/blog-04.jpg";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../Url/BaseUrl";

const BlogDetails = () => {
  const { id } = useParams();
  console.log("Blog ID from URL:", id);
  const [bannerdata, setBannerData] = useState([]);
  const [bannerImage, setBannerImage] = useState("");
  const [blogData, setBlogData] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [blogListImage, setBlogListImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [commentData, setCommentData] = useState([]);
  // const [blog, setBlog] = useState(null);

  const fetchBanner = () => {
    axios
      .get(`${API_BASE_URL}/blog/banner`)
      .then((response) => {
        // console.log(response.data.data);
        setBannerData(response.data.data);
        setBannerImage(response.data.image_path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBlogDetails = async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/blogs/detail`,
        { blog_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.data) {
        // console.log(response.data.data);
        setBlogData(response.data.data);
        setBlogImage(response.data.image_path);
      }
    } catch (error) {
      console.error("Error fetching Blog Data:", error);
    }
  };

  const fetchBlogList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      if (response.data.data) {
        // console.log(response.data.data);
        setBlogList(response.data.data);
        setBlogListImage(response.data.image_path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBlogComment = async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comment/list`,
        { blog_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        console.log(response.data.data);
        setCommentData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Blog Data:", error);
    }
  };

  const handleSubmit = (id, e) => {
    e.preventDefault();

    if (!name) return toast.error("Please enter your name!");
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) return toast.error("Please enter a valid email!");
    if (!message) return toast.error("Please enter your message!");

    axios
      .post(`${API_BASE_URL}/blog/comments`, {
        blog_id: id,
        name,
        email,
        message,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setMessage("");
        fetchBlogComment(id);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error posting comment");
      });
  };

  const sortedBlogList = [...blogList].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    fetchBanner();
    fetchBlogList();
    if (id) {
      fetchBlogDetails(id);
      fetchBlogComment(id);
    }
  }, [id]);

  return (
    <div>
      <Header />
      {/* <!-- Common Banner Area --> */}
      <section
        id="common_banner_img"
        style={{
          backgroundImage: `url(${bannerImage}/${bannerdata?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text2">
                <div>
                  <h2>Blog Details</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <span>
                        <FaAngleDoubleRight />
                      </span>{" "}
                      Blog Details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-blog --> */}
      <section className="section_padding" id="common_author_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="card blog-details detail-card">
                <div className="card-body">
                  <div className="blog-content">
                    <div className="blog-image mb-3">
                      <img
                        src={`${blogImage}/${blogData?.image}`}
                        alt="image"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="date-range">
                        <span className="d-flex align-items-center">
                          <MdDateRange /> {blogData.date}
                        </span>
                      </div>
                      <div className="date-range pe-0">
                        <span className="d-flex align-items-center">
                          <FaClock /> {blogData.time}
                        </span>
                      </div>
                      {/* <div>
                        <span className="travel-badge">Travels</span>
                      </div> */}
                    </div>
                    <div className="blog-det-txt mb-3">
                      <h2>{blogData.title}</h2>
                    </div>
                    <div className="mb-3">
                      {blogData ? (
                        <p
                          className="text-gray-6"
                          dangerouslySetInnerHTML={{
                            __html: blogData.content
                              .replace(/\r\n/g, "<br/>")
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                      ) : (
                        <p>Loading Api Data...</p>
                      )}
                    </div>
                    <div className="mt-3 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between"></div>
                    <div className="my-3"></div>
                    <h6>Comments</h6>
                    {commentData.map((comment) => (
                      <div className="card p-0 my-3" key={comment.id}>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  backgroundColor: "#007bff",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {(comment.name && comment.name.charAt(0)) ||
                                  "U"}
                              </div>
                              <div className="tips-para">
                                <h6>{comment.name}</h6>
                                <p>{comment.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="tips-para">
                            <p>{comment.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <h6 className="mb-3">Write A Comment</h6>
                    <div>
                      <form onSubmit={(e) => handleSubmit(blogData.id, e)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Message</label>
                              <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="form-control"
                                rows="4"
                              ></textarea>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn_theme btn_md">
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card detail-card">
                <div className="card-body">
                  <div className="filter-hd mb-0">
                    <h6>Related Posts</h6>
                  </div>
                  {sortedBlogList.slice(0, 4).map((list) => (
                    <div className="tour-list-card" key={list.id}>
                      <ul className="tour-listing">
                        <li className="list">
                          <div className="package-img imgEffect4">
                            <a href="#">
                              <img
                                src={`${blogListImage}/${list?.image}`}
                                alt="travello"
                              />
                            </a>
                          </div>
                          <div className="package-content">
                            <h4 className="area-name">
                              <a href="#">{list.title}</a>
                            </h4>
                            <p
                              className="area-name"
                              dangerouslySetInnerHTML={{
                                __html: list.content
                                  ?.slice(0, 50)
                                  .replace(/\r\n/g, "<br/>")
                                  .replace(/\n/g, "<br/>"),
                              }}
                            />
                            <div className="blog-user">
                              <div className="d-flex gap-2 align-items-center">
                                <BsCalendar2DateFill className="user" />
                                <p className="pera">{list.created_at}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
};
export default BlogDetails;
