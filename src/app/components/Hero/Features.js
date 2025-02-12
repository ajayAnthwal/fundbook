import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <>
      {/* Features */}
      <div className="container py-5">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            Wow your audience from the first second
          </h2>
          <p className="text-muted">
            The powerful and flexible theme for all kinds of businesses
          </p>
        </div>

        {/* Features List */}
        <div className="d-flex justify-content-center gap-4 mb-5">
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            Responsive
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            5-star support
          </div>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-check2 text-primary me-2"></i>
            Constant updates
          </div>
        </div>

        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <Image
              className="img-fluid rounded-3"
              src="/assets/img/1618x1010/img6.jpg"
              alt="Browser Preview"
              width={1618}
              height={1010}
            />
          </div>

          <div className="col-lg-5">
            <h2 className="fw-bold mb-4">
              Collaborative tools to design user experience
            </h2>
            <p className="text-muted mb-4">
              We help businesses bring ideas to life in the digital world, by
              designing and implementing the technology tools that they need to win.
            </p>

            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check2 text-primary me-2"></i>
                <span>Less routine – more creativity</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check2 text-primary me-2"></i>
                <span>Hundreds of thousands saved</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check2 text-primary me-2"></i>
                <span>Scale budgets efficiently</span>
              </div>
            </div>

            <Link href="#" className="btn btn-primary px-4 py-2">
              Get started
            </Link>

            <hr className="my-5" />

            <p className="text-muted mb-4">Trusted by leading companies</p>
            <div className="row g-4 align-items-center">
              {['fitbit', 'forbes', 'mailchimp', 'layar'].map((brand) => (
                <div key={brand} className="col-3">
                  <Image
                    src={`/assets/svg/brands/${brand}-dark.svg`}
                    alt={`${brand} logo`}
                    width={80}
                    height={40}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-5">
            <Image
              className="img-fluid rounded-3"
              src="/assets/img/400x500/img31.jpg"
              alt="Testimonial"
              width={400}
              height={500}
            />
          </div>

          <div className="col-md-7">
            <Image
              src="/assets/svg/brands/mailchimp-primary.svg"
              alt="Mailchimp"
              width={120}
              height={60}
              className="mb-4"
            />

            <blockquote className="fs-4 fw-light mb-4">
              "I'm absolutely floored by the level of care and attention to detail
              the team at Htmlstream have put into this theme and for one can
              guarantee that I will be a return customer."
            </blockquote>

            <div className="d-flex align-items-center">
              <div className="d-md-none">
                <Image
                  className="rounded-circle"
                  src="/assets/img/160x160/img4.jpg"
                  alt="Author"
                  width={48}
                  height={48}
                />
              </div>
              <div className="ms-3">
                <h5 className="mb-1">Lewis</h5>
                <p className="text-muted small mb-0">
                  Senior Director of Operations at Mailchimp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 mx-auto">
      <div className="row justify-content-center g-4">
        {/* Responsive */}
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <span className="svg-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 21C6 21.6 6.4 22 7 22H17C17.6 22 18 21.6 18 21V20H6V21Z" fill="#035A4B"/>
                  <path opacity="0.3" d="M17 2H7C6.4 2 6 2.4 6 3V20H18V3C18 2.4 17.6 2 17 2Z" fill="#035A4B"/>
                  <path d="M12 4C11.4 4 11 3.6 11 3V2H13V3C13 3.6 12.6 4 12 4Z" fill="#035A4B"/>
                </svg>
              </span>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Responsive</h4>
              <p className="text-muted">
                Front is an incredibly beautiful, fully responsive, and mobile-first projects on the web.
              </p>
            </div>
          </div>
        </div>

        {/* Customizable */}
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <span className="svg-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="#035A4B"/>
                  <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="#035A4B"/>
                </svg>
              </span>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Customizable</h4>
              <p className="text-muted">
                Front template can be easily customized with its cutting-edge components and features.
              </p>
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <span className="svg-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4 4L11.6314 2.56911C11.875 2.52343 12.125 2.52343 12.3686 2.56911L20 4V11.9033C20 15.696 18.0462 19.2211 14.83 21.2313L12.53 22.6687C12.2057 22.8714 11.7943 22.8714 11.47 22.6687L9.17001 21.2313C5.95382 19.2211 4 15.696 4 11.9033L4 4Z" fill="#035A4B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.175 14.75C10.9354 14.75 10.6958 14.6542 10.5042 14.4625L8.58749 12.5458C8.20415 12.1625 8.20415 11.5875 8.58749 11.2042C8.97082 10.8208 9.59374 10.8208 9.92915 11.2042L11.175 12.45L14.3375 9.2875C14.7208 8.90417 15.2958 8.90417 15.6792 9.2875C16.0625 9.67083 16.0625 10.2458 15.6792 10.6292L11.8458 14.4625C11.6542 14.6542 11.4146 14.75 11.175 14.75Z" fill="#035A4B"/>
                </svg>
              </span>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Premium</h4>
              <p className="text-muted">
                Front is not only for developers but also for designers, and includes a Sketch file.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <div className="flex-shrink-0">
              <span className="svg-icon text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35474L17.4687 5.38394C17.8057 5.66895 18 6.08788 18 6.5292V19.0833C18 20.8739 17.9796 21 16.1429 21H4.85714C3.02045 21 3 20.8739 3 19.0833V2.91667C3 1.12612 3.02045 1 4.85714 1ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#035A4B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.85714 3H14.7364C15.0911 3 15.4343 3.12568 15.7051 3.35474L20.4687 7.38394C20.8057 7.66895 21 8.08788 21 8.5292V21.0833C21 22.8739 20.9796 23 19.1429 23H6.85714C5.02045 23 5 22.8739 5 21.0833V4.91667C5 3.12612 5.02045 3 6.85714 3ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#035A4B"/>
                </svg>
              </span>
            </div>
            <div className="flex-grow-1 ms-3">
              <h4>Documentation</h4>
              <p className="text-muted">
                Every component and plugin is well documented with live examples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>        
      
    </>
  );
}