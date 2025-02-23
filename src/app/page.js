import Image from "next/image";
import Banner from "./components/Hero/Banner";
import Card from "./components/Hero/Card";
import Features from "./components/Hero/Features";
import LatestNews from "./components/Hero/LatestNews";
import Slider from "./components/Hero/Slider";
import SuccessStories from "./components/Hero/SuccessStories";
import AdvancedAnalytics from "./components/Hero/AdvancedAnalytics";
import Logos from "./components/Hero/Logos";
export default function Home() {
  return (
    <>
      <Slider />
      <Card />
      <Banner />
      <AdvancedAnalytics />
      <SuccessStories />
      <Logos />
      <Features />
      {/* <LatestNews /> */}
    </>
  );
}
