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

console.log("date:-17-06-2025", "time:-6:28");

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // 2s
      once: true, // only animate once
    });
  }, []);
  
  return (
    <>
      <BrowserRouter basename="jettravel">
      <ScrollToTop/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/searchFlight" element={<FlightSearch />} />
          <Route path="/searchHotel" element={<HotelSearch />} />
          <Route path="/review_booking" element={<ReviewBooking />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/term_condition" element={<TermCondition />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
