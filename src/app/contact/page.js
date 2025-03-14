import React from "react";

const Page = () => {
  return (
    <main id="content" role="main">
      {/* Contact Form */}
      <div className="container content-space-t-3 content-space-t-lg-5 content-space-b-2">
        <div className="row">
          <div className="col-lg-6 mb-9 mb-lg-0">
            {/* Heading */}
            <div className="mb-5">
              <h1>Get in touch</h1>
              <p>We'd love to talk about how we can help you.</p>
            </div>
            {/* End Heading */}

            {/* Leaflet */}
            <div className="overflow-hidden">
              <div id="map" className="leaflet mb-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773064.05684503!2d61.04182762828652!3d19.69228278198373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1739335236274!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            {/* End Leaflet */}

            <div className="row">
              <div className="col-sm-6">
                <h5 className="mb-1">Call us:</h5>
                <p>+1 (062) 109-9222</p>
              </div>

              <div className="col-sm-6">
                <h5 className="mb-1">Email us:</h5>
                <p>hello@example.com</p>
              </div>

              <div className="col-sm-6">
                <h5 className="mb-1">Address:</h5>
                <p>153 Williamson Plaza, Maggieberg</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ps-lg-5">
              {/* Card */}
              <div className="card">
                <div className="card-header border-bottom text-center">
                  <h3 className="card-header-title">General inquiries</h3>
                </div>

                <div className="card-body">
                  {/* Form */}
                  <form>
                    <div className="row gx-3">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="hireUsFormFirstName"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="hireUsFormNameFirstName"
                            id="hireUsFormFirstName"
                            placeholder="First name"
                            aria-label="First name"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="hireUsFormLasttName"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="hireUsFormNameLastName"
                            id="hireUsFormLasttName"
                            placeholder="Last name"
                            aria-label="Last name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row gx-3">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="hireUsFormWorkEmail"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="hireUsFormNameWorkEmail"
                            id="hireUsFormWorkEmail"
                            placeholder="email@site.com"
                            aria-label="email@site.com"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="hireUsFormPhone"
                          >
                            Phone{" "}
                            <span className="form-label-secondary">
                              (Optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="hireUsFormNamePhone"
                            id="hireUsFormPhone"
                            placeholder="+x(xxx)xxx-xx-xx"
                            aria-label="+x(xxx)xxx-xx-xx"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="hireUsFormDetails">
                        Details
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        name="hireUsFormNameDetails"
                        id="hireUsFormDetails"
                        placeholder="Tell us about your ..."
                        aria-label="Tell us about your ..."
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Send inquiry
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="form-text">
                        We'll get back to you in 1-2 business days.
                      </p>
                    </div>
                  </form>
                  {/* End Form */}
                </div>
              </div>
              {/* End Card */}
            </div>
          </div>
        </div>
    </div>
      {/* End Contact Form */}
    </main>
  );
};

export default Page;
