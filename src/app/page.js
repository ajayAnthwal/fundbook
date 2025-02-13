import Image from "next/image";
import Banner from "./components/Hero/Banner";
import Card from "./components/Hero/Card";
import Features from "./components/Hero/Features";
import LatestNews from "./components/Hero/LatestNews";
import Slider from "./components/Hero/slider";
import SuccessStories from "./components/Hero/SuccessStories";
export default function Home() {
  return (
    <>
     <Slider />
     <Banner />
     <SuccessStories />
     <Card />
     <Features />
     <LatestNews />
    </>
  );
}
