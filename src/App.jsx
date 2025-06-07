import "./App.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reset_password" element={<ResetPassword/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/searchFlight" element={<FlightSearch />} />
          <Route path="/searchHotel" element={<HotelSearch/>}/>
          <Route path="/review_booking" element={<ReviewBooking/>}/>
          <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;