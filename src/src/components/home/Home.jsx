import React from "react";
import Header from "../Header";
import Banner from "../Banner";
import FormArea from "../FormArea";
import Imagination from "../home/Imagination";
import Footer from "../Footer";
import Newsletter from "../home/Newsletter";
import Partners from "../home/Partners";
import HomeNews from "../home/HomeNews";
import Destination from "../home/Destination";
import SpecialOffer from "./SpecialOffer";
import TopDestinationPhoto from "../home/TopDestinationPhoto";
import Deals from "../home/Deals";
import BackToTop from "../BackToTop";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <FormArea />
      <Imagination />
      <Partners />
      <TopDestinationPhoto />
      <SpecialOffer/>
      <Deals />
      {/* <Destination /> */}
      <HomeNews />
      <Newsletter />
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Home;