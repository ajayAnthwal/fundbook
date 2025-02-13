"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    img: "/assets/img/480x320/img7.jpg",
    logo: "/assets/svg/brands/airbnb-dark.svg",
    text: "Front Projects has proved to be the most efficient cloud-based project tracking and bug tracking tool.",
  },
  {
    img: "/assets/img/480x320/img6.jpg",
    logo: "/assets/svg/brands/shopify-dark.svg",
    text: "Front Projects has proved to be the most efficient cloud-based project tracking and bug tracking tool.",
  },
  {
    img: "/assets/img/480x320/img14.jpg",
    logo: "/assets/svg/brands/forbes-dark.svg",
    text: "Front Projects has proved to be the most efficient cloud-based project tracking and bug tracking tool.",
  },
  {
    img: "/assets/img/480x320/img12.jpg",
    logo: "/assets/svg/brands/capsule-dark.svg",
    text: "Google is an innovator in public safety technology. First-to-market with TASER conducted energy weapons (CEWs).",
  },
  {
    img: "/assets/img/480x320/img27.jpg",
    logo: "/assets/svg/brands/fitbit-dark.svg",
    text: "Visitors can build a form or survey before signing up, but in order to save and share it.",
  },
];

export default function SuccessStories() {
  return (
    <div
      className="bg-dark rounded-2  xl:mx-10 relative"
      style={{
        backgroundImage: "url('/assets/svg/components/wave-pattern-light.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container xl:max-w-screen-xl px-4 md:px-8 lg:px-10 py-20">
        <div className="text-center max-w-lg mx-auto py-10">
          <span className="text-white/70 uppercase tracking-wide">Success stories</span>
          <h2 className="text-white text-3xl font-semibold">
            See how Front is helping teams get organized and work smarter
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card h-100 bg-white shadow-lg overflow-hidden rounded-lg">
                <Image
                  src={item.img}
                  width={480}
                  height={320}
                  alt="Image Description"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="mb-3">
                    <Image
                      src={item.logo}
                      width={100}
                      height={40}
                      alt="Logo"
                      className="w-24"
                    />
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
                <div className="p-5 pt-0">
                  <Link href="/page-customer-story.html" className="text-blue-600 hover:underline">
                    Read story <i className="bi-chevron-right small ms-1"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}
