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
          <Route path="/review_booking" element={<ReviewBooking/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;