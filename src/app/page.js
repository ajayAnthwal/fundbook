import Image from "next/image";
import Banner from "./components/Hero/Banner";
import Card from "./components/Hero/Card";
import Features from "./components/Hero/Features";
import LatestNews from "./components/Hero/LatestNews";
import Slider from "./components/Hero/Slider";
import SuccessStories from "./components/Hero/SuccessStories";
import AdvancedAnalytics from "./components/Hero/AdvancedAnalytics";
import Logos from "./components/Hero/Logos";
import WhatWeOffer from "./components/Hero/what_we_offer";
import HomePageBlogs from "./components/cards/home_page_blogs";

export default async function Home() {

  return (
    <>
      <Slider />
      <WhatWeOffer />
      {/* <Card /> */}
      <Banner />
      <AdvancedAnalytics />
      <HomePageBlogs />
      <SuccessStories />
      <Logos />
      <Features />
      {/* <LatestNews /> */}
    </>
  );
}
