"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="border-bottom">
      {/* Main Slider */}
      <div className="swiper-container vh-md-80 h-[90vh]">
        <Swiper
          modules={[Navigation, Pagination, EffectFade, Autoplay]} // Add Autoplay to modules
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 5000, // 5 seconds
            disableOnInteraction: false, // Keeps autoplay running even after user interacts
          }}
          className="js-swiper-main"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="swiper-slide gradient-y-overlay-sm-gray-900 bg-img-start"
              style={{
                backgroundImage: `url(/slider_1.webp)`,
                backgroundSize: "cover",
              }}
            >
              <div className="container d-md-flex align-items-md-center vh-md-70 content-space-t-4 content-space-b-3 content-space-md-0">
                <div className="w-75 w-lg-50">
                  
                  <h1 className="display-4 text-white mb-0">
                   MSME Loans, Simplified with AI & CA Experts!
                  </h1>
                  <div className="button-container d-flex gap-3">
                    <a className="btn btn-primary px-4 py-2" href="#">
                      Apply Loan
                    </a>
                    <a className="btn btn-secondary px-4 py-2" href="#">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="swiper-slide gradient-y-overlay-sm-gray-900 bg-img-start"
              style={{
                backgroundImage: `url(/slider_2.webp)`,
                backgroundSize: "cover",
              }}
            >
              <div className="container d-md-flex align-items-md-center vh-md-70 content-space-t-4 content-space-b-3 content-space-md-0">
                <div className="w-75 w-lg-50">
                  
                  <h2 className="display-4 text-white mb-0">
                  Your Trusted Partner for MSME Loans
                  </h2>
                  <div className="button-container d-flex gap-3">
                    <a className="btn btn-primary px-4 py-2" href="#">
                      Apply Loan
                    </a>
                    <a className="btn btn-secondary px-4 py-2" href="#">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="swiper-slide gradient-y-overlay-sm-gray-900 bg-img-start"
              style={{
                backgroundImage: `url(/slider_3.webp)`,
                backgroundSize: "cover",
              }}
            >
              <div className="container d-md-flex align-items-md-center vh-md-70 content-space-t-4 content-space-b-3 content-space-md-0">
                <div className="w-75 w-lg-50">
                  <h2 className="display-4 text-white mb-0">
                  MSME Financing—From Application to Approval!
                  </h2>
                  <div className="button-container d-flex gap-3">
                    <a className="btn btn-primary px-4 py-2" href="#">
                      Apply Loan
                    </a>
                    <a className="btn btn-secondary px-4 py-2" href="#">
                      Register
                    </a>
                  </div>
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
