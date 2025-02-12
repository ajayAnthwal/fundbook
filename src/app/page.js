import Image from "next/image";
import Banner from "./components/Hero/Banner";
import Card from "./components/Hero/Card";
import Features from "./components/Hero/Features";
import LatestNews from "./components/Hero/LatestNews";
export default function Home() {
  return (
    <>
     <Banner />
     <Card />
     <Features />
     <LatestNews />
    </>
  );
}
