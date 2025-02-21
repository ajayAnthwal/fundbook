import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="container content-space-t-2 content-space-t-lg-3 content-space-b-lg-2">
        {/* Heading */}
        <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
          <h2>How It Works</h2>
          <p>Loan in 4 easy steps:</p>
        </div>
        {/* End Heading */}

        {/* Step */}
        <ul className="step step-md step-centered">
          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">1</span>
              <div className="step-content">
                <h3>MSME Registration & Data Collection</h3>
                <p>MSMEs sign up & provide basic details. Relevant data is auto-fetched.</p>
              </div>
            </div>
          </li>

          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">2</span>
              <div className="step-content">
                <h3>CA Support & Smart Analysis</h3>
                <p>CAs assist in loan application, and AI-driven data extraction & analysis.</p>
              </div>
            </div>
          </li>

          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">3</span>
              <div className="step-content">
                <h3>Smart Loan Matching</h3>
                <p>MSMEs are matched with lenders, and applications are submitted smoothly.</p>
              </div>
            </div>
          </li>

          <li className="step-item">
            <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">4</span>
              <div className="step-content">
                <h3>Lender Review & Loan Disbursement</h3>
                <p>Lenders assess loan applications, and funds are disbursed.</p>
              </div>
            </div>
          </li>
        </ul>
        {/* End Step */}
      </div>
    </div>
  );
};

export default Banner;