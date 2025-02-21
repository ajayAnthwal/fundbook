"use client";
import * as React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Logos = () => {
  const logos = [
    ["amazon-dark.svg", "kaplan-dark.svg", "google-dark.svg"],
    ["airbnb-dark.svg", "shopify-dark.svg", "vidados-dark.svg"],
    ["capsule-dark.svg", "forbes-dark.svg", "business-insider-dark.svg"],
    // ["hubspot-dark.svg",
    // "layar-dark.svg"],
  ];

  return (
    <div className="container content-space-2 content-space-b-lg-3">
      <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-6">
        <h2>Trusted by Open Source, enterprise, and more than 33,000 of you</h2>
      </div>

      <Carousel autoPlay infiniteLoop showThumbs={true} showIndicators={true} showStatus={false} interval={3000} className="">
        {logos.map((logoList, index) =>
          logoList.map((logo) => (
            <Image
              // className="avatar avatar-lg avatar-4x3 avatar-centered"
              src={`/assets/svg/brands/${logo}`}
              alt="Logo"
              width={200}
              height={100}
            />
          ))
          // <div key={index} className="py-3 ">
          //   <div>
          //     <Image
          //       // className="avatar avatar-lg avatar-4x3 avatar-centered"
          //       src={`/assets/svg/brands/${logoList[0]}`}
          //       alt="Logo"
          //       width={100}
          //       height={90}
          //     />
          //   </div>
          //   <div>
          //     <Image
          //       // className="avatar avatar-lg avatar-4x3 avatar-centered"
          //       src={`/assets/svg/brands/${logoList[1]}`}
          //       alt="Logo"
          //       width={100}
          //       height={90}
          //     />
          //   </div>
          //   <div>
          //     <Image
          //       // className="avatar avatar-lg avatar-4x3 avatar-centered"
          //       src={`/assets/svg/brands/${logoList[2]}`}
          //       alt="Logo"
          //       width={100}
          //       height={90}
          //     />
          //   </div>
          // </div>
        )}
      </Carousel>
    </div>
  );
};

export default Logos;
