import React from "react";

const Banner = () => {
  return (
    <div>
      (
      <div className="container content-space-t-2 content-space-t-lg-3 content-space-b-lg-2">
        {/* Heading */}
        <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
          <span className="text-cap">Always improving</span>
          <h2>Solutions rooted in code and design</h2>
        </div>
        {/* End Heading */}

        {/* Step */}
        <ul className="step step-md step-centered">
          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">1</span>
              <div className="step-content">
                <h3>Industry-leading designs</h3>
                <p>
                  Achieve virtually any design and layout from within the one
                  template.
                </p>
              </div>
            </div>
          </li>

          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">2</span>
              <div className="step-content">
                <h3>Learn from the docs</h3>
                <p>
                  Whether you're a startup or a global enterprise, learn how to
                  integrate with Front.
                </p>
              </div>
            </div>
          </li>

          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">3</span>
              <div className="step-content">
                <h3>Accelerate your business</h3>
                <p>
                  We help power millions of businesses to built and run
                  smoothly.
                </p>
              </div>
            </div>
          </li>
        </ul>
        {/* End Step */}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            {/* Card */}
            <a
              className="card card-transition align-items-end flex-wrap flex-row bg-img-start h-100"
              href="#"
              style={{
                backgroundImage: "url('/assets/svg/components/card-4.svg')",
                minHeight: "25rem",
              }}
              data-aos="fade-up"
            >
              <div className="card-body">
                <h2 className="card-title text-white">
                  Revolutionizing the way start-ups win new customers
                </h2>
                <p className="card-text text-white">
                  Automate best strategies and focus more on generating hq
                  creatives.
                </p>
                <span className="card-link link-light">
                  Learn more <i className="bi-chevron-right small ms-1"></i>
                </span>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-sm-6 col-lg-3 mb-4 mb-sm-0">
            {/* Card */}
            <a
              className="card card-transition align-items-end flex-wrap flex-row bg-img-start h-100"
              href="#"
              style={{
                backgroundImage: "url('/assets/svg/components/card-5.svg')",
                minHeight: "25rem",
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card-body">
                <h3 className="card-title text-white">
                  How we helped building the industry of the future
                </h3>
                <span className="card-link link-light">
                  Learn more <i className="bi-chevron-right small ms-1"></i>
                </span>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-sm-6 col-lg-3">
            {/* Card */}
            <a
              className="card card-transition align-items-end flex-wrap flex-row bg-img-start h-100"
              href="#"
              style={{
                backgroundImage: "url('/assets/svg/components/card-6.svg')",
                minHeight: "25rem",
              }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="card-body">
                <h3 className="card-title text-white">
                  How to save hundreds of thousands
                </h3>
                <span className="card-link link-light">
                  Learn more <i className="bi-chevron-right small ms-1"></i>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
