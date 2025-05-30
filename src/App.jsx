import "./App.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/about/About";
import ContactUs from "./components/contactus/ContactUs";
import FlightSearch from "./components/FlightSearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/searchFlight" element={<FlightSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
