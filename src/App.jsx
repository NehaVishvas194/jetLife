import "./App.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import ContactUs from "./components/contactus/ContactUs";
import FlightSearch from "./components/FlightSearch";
import Login from "./components/Login";
import DemoPayment from "./components/Payment";
import SuccessPayment from "./components/SuccessPayment";
import CancelPayment from "./components/CancelPayment";
import HotelPayment from "./components/HotelPayment";

// 🔹 Lazy-loaded components
// const Home = lazy(() => import("./components/home/Home"));
// const About = lazy(() => import("./components/about/About"));
// const ContactUs = lazy(() => import("./components/contactus/ContactUs"));
// const FlightSearch = lazy(() => import("./components/FlightSearch"));
// const Login = lazy(() => import("./components/Login"));
const ForgetPassword = lazy(() => import("./components/ForgetPassword"));
const Register = lazy(() => import("./components/Register"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const ReviewBooking = lazy(() => import("./components/ReviewBooking"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const Help = lazy(() => import("./components/Help"));
const Faq = lazy(() => import("./components/Faq"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const AccountPage = lazy(() => import("./components/AccountPage"));
const HotelSearch = lazy(() => import("./components/HotelSearch"));
const TermCondition = lazy(() => import("./components/TermCondition"));
const MyBooking = lazy(() => import("./components/MyBooking"));
const Notification = lazy(() => import("./components/Notification"));
const FlightBookingDetails = lazy(() =>
  import("./components/FlightBookingDetails")
);
const Blog = lazy(() => import("./components/Blog"));
const News = lazy(() => import("./components/News"));
const TravelDetails = lazy(() => import("./components/TravelDetails"));
const Events = lazy(() => import("./components/Events"));
const DestinationDetails = lazy(() =>
  import("./components/home/DestinationDetails")
);
const HotelBookingDetails = lazy(() =>
  import("./components/HotelBookingDetails")
);
const BlogDetails = lazy(() => import("./components/BlogDetails"));
const EventDetails = lazy(() => import("./components/EventDetails"));
const NewsDetails = lazy(() => import("./components/NewsDetails"));
const OfferDetails = lazy(() => import("./components/home/OfferDetails"));
const OfferPackages = lazy(() => import("./components/OfferPackages"));
const Loader = lazy(() => import("./components/Loader"));

console.log("date:-17-10-2025", "time:-18:22");

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter basename="/jettravel">
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
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
          <Route path="/hotel_payment" element={<HotelPayment />} />
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
          <Route
            path="/destination_details/:id"
            element={<DestinationDetails />}
          />
          <Route
            path="/hotel_booking_details"
            element={<HotelBookingDetails />}
          />
          <Route path="/offer_packages" element={<OfferPackages />} />
          <Route path="/payment" element={<DemoPayment />} />
          <Route path="/success_page" element={<SuccessPayment />} />
          <Route path="/cancel_payment" element={<CancelPayment />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
