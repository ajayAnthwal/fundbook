"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Banner() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Typed = require("typed.js");
      new Typed(".js-typedjs", {
        strings: ["startup.", "future.", "success."],
        typeSpeed: 90,
        loop: true,
        backSpeed: 30,
        backDelay: 2500,
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="row align-items-center min-vh-100">
        {/* Left Content */}
        <div className="col-lg-6">
          <h1 className="display-3 fw-bold mb-4">
            Turn your ideas
            <br />
            into a{" "}
            <span className="text-primary">
              <span className="js-typedjs"></span>
            </span>
          </h1>
          <p className="lead text-secondary mb-5">
            Front's feature-rich designed demo pages help you create the best
            possible product.
          </p>
          <div className="d-flex gap-3">
            <Link
              href="/get-started"
              className="btn btn-primary px-4 py-2 rounded-pill"
            >
              Get started
            </Link>
            <Link
              href="/learn-more"
              className="btn btn-link text-primary text-decoration-none"
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-lg-6">
          <div 
            style={{
              position: 'relative',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              overflow: 'hidden'
            }}
          >
            <Image
              src="/assets/img/750x750/img2.jpg"
              alt="Startup Team Working"
              fill
              style={{
                objectFit: 'cover'
              }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}