import "./App.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/home/Home";
import About from "./components/about/About";
import ContactUs from "./components/contactus/ContactUs";
import FlightSearch from "./components/FlightSearch";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ReviewBooking from "./components/ReviewBooking";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Help from "./components/Help";
import Faq from "./components/Faq";
import ProfilePage from "./components/ProfilePage";
import AccountPage from "./components/AccountPage";
import HotelSearch from "./components/HotelSearch";
import TermCondition from "./components/TermCondition";
import ScrollToTop from "./components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import MyBooking from "./components/MyBooking";
import Notification from "./components/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlightBookingDetails from "./components/FlightBookingDetails";
import Blog from "./components/Blog";
import News from "./components/News";
import TravelDetails from "./components/TravelDetails";
import Events from "./components/Events";
import DestinationDetails from "./components/home/DestinationDetails";
import HotelBookingDetails from "./components/HotelBookingDetails";
import BlogDetails from "./components/BlogDetails";
import EventDetails from "./components/EventDetails";
import NewsDetails from "./components/NewsDetails";
import OfferDetails from "./components/home/OfferDetails";

console.log("date:-02-08-2025", "time:-12:15");

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <>
      <BrowserRouter basename="jettravel">
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/searchFlight" element={<FlightSearch />} />
          <Route path="/booking_details" element={<FlightBookingDetails />} />
          <Route path="/searchHotel" element={<HotelSearch />} />
          <Route path="/review_booking" element={<ReviewBooking />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/term_condition" element={<TermCondition />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog_details/:id" element={<BlogDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news_details/:id" element={<NewsDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my_booking" element={<MyBooking />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/travel_details" element={<TravelDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event_details/:id" element={<EventDetails />} />
          <Route path="/offer_details/:id" element={<OfferDetails />} />
          <Route path="/destination_details/:id" element={<DestinationDetails />} />
          <Route
            path="/hotel_booking_details"
            element={<HotelBookingDetails />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
