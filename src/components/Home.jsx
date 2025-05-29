import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import FormArea from "./FormArea";
import Imagination from "./Imagination";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import Partners from "./Partners";
import HomeNews from "./HomeNews";
import Destination from "./Destination";
import TravelService from "./TravelService";
import TopDestinationPhoto from "./TopDestinationPhoto";
import Deals from "./Deals";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <FormArea />
      <Imagination />
      <TravelService />
      <TopDestinationPhoto />
      <Deals />
      <Destination />
      <HomeNews />
      <Partners />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
