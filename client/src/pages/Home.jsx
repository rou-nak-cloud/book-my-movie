import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSelection from "../components/FeaturedSelection";
import TrailerSection from "../components/TrailerSection";
import Carousel from "../components/Carousel";
import StreamBanner from "../components/StreamBanner";

const home = () => {
  return (
    <>
      <Carousel />
      <HeroSection />
      <FeaturedSelection />
      <StreamBanner />
      <TrailerSection />
    </>
  );
};

export default home;
