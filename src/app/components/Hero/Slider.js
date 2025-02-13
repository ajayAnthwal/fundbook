"use client"; // Next.js ke liye required

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Thumbs } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";

const Slider = () => {
  return (
    <div className="border-bottom">
      {/* Main Slider */}
      <div className="swiper-container vh-md-80 h-[90vh]">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="js-swiper-main"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="swiper-slide gradient-y-overlay-sm-gray-900 bg-img-start"
              style={{
                backgroundImage: `url(/assets/img/1920x800/img2.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <div className="container d-md-flex align-items-md-center vh-md-70 content-space-t-4 content-space-b-3 content-space-md-0">
                <div className="w-75 w-lg-50">
                  <h3 className="text-white">Front is a</h3>
                  <h1 className="display-4 text-white mb-0">
                    Self-mastering template
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="swiper-slide gradient-y-overlay-sm-gray-900 bg-img-start"
              style={{
                backgroundImage: `url(/assets/img/1920x800/img3.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <div className="container d-md-flex align-items-md-center vh-md-70 content-space-t-4 content-space-b-3 content-space-md-0">
                <div className="w-75 w-lg-50">
                  <h3 className="text-white">It is an</h3>
                  <h2 className="display-4 text-white mb-0">
                    Easy business with Front template
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Navigation Arrows */}
          <div className="d-none d-md-inline-block">
            <div className="swiper-button-next swiper-button-next-soft-white"></div>
            <div className="swiper-button-prev swiper-button-prev-soft-white"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
