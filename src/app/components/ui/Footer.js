import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-light">
      <div className="container pb-1 pb-lg-7">
        <div className="row content-space-t-2">
          {/* Logo and Contact */}
          <div className="col-lg-3 mb-7 mb-lg-0">
            <div className="mb-5">
              <Link className="navbar-brand" href="/">
                <Image
                  className="navbar-brand-logo"
                  src="/logo.png"
                  alt="Logo"
                  width={200}
                  height={80}
                />
              </Link>
            </div>

            <ul className="list-unstyled list-py-1">
              <li>
                <Link className="link-sm link-secondary" href="#">
                  <i className="bi-geo-alt-fill me-1"></i> 153 Williamson Plaza, Maggieberg
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="tel:1-062-109-9222">
                  <i className="bi-telephone-inbound-fill me-1"></i> +1 (062) 109-9222
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-sm mb-7 mb-sm-0">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled list-py-1 mb-0">
              <li>
                <Link className="link-sm link-secondary" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Careers <span className="badge bg-warning text-dark rounded-pill ms-1">We're hiring</span>
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Customers <i className="bi-box-arrow-up-right small ms-1"></i>
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Hire us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Links */}
          <div className="col-sm mb-7 mb-sm-0">
            <h5 className="mb-3">Features</h5>
            <ul className="list-unstyled list-py-1 mb-0">
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Press <i className="bi-box-arrow-up-right small ms-1"></i>
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Release Notes
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Integrations
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation Links */}
          <div className="col-sm mb-7 mb-sm-0">
            <h5 className="mb-3">Documentation</h5>
            <ul className="list-unstyled list-py-1 mb-0">
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Support
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Status
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  API Reference
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  Tech Requirements
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-sm">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled list-py-1 mb-5">
              <li>
                <Link className="link-sm link-secondary" href="#">
                  <i className="bi-question-circle-fill me-1"></i> Help
                </Link>
              </li>
              <li>
                <Link className="link-sm link-secondary" href="#">
                  <i className="bi-person-circle me-1"></i> Your Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top my-7"></div>

        {/* Bottom Section */}
        <div className="row mb-7">
          {/* Policy Links */}
          <div className="col-sm mb-3 mb-sm-0">
            <ul className="list-inline list-separator mb-0">
              <li className="list-inline-item">
                <Link className="text-body" href="#">
                  Privacy & Policy
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-body" href="#">
                  Terms
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-body" href="#">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links and Language Selector */}
          <div className="col-sm-auto">
            <ul className="list-inline mb-0">
              {/* Social Media Icons */}
              {['facebook', 'google', 'twitter', 'github'].map((social) => (
                <li key={social} className="list-inline-item">
                  <Link className="btn btn-soft-secondary btn-xs btn-icon" href="#">
                    <i className={`bi-${social}`}></i>
                  </Link>
                </li>
              ))}

              {/* Language Dropdown */}
              <li className="list-inline-item">
                <div className="dropdown">
                  <button 
                    className="btn btn-soft-secondary btn-xs dropdown-toggle"
                    type="button"
                    id="footerSelectLanguage"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <Image
                        className="avatar avatar-xss avatar-circle me-2"
                        src="/assets/vendor/flag-icon-css/flags/1x1/us.svg"
                        alt="US flag"
                        width={16}
                        height={16}
                      />
                      <span>English (US)</span>
                    </span>
                  </button>

                  <div className="dropdown-menu" aria-labelledby="footerSelectLanguage">
                    {/* Language Options */}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-md-85 text-lg-center mx-lg-auto">
          <p className="text-muted small">&copy; Front. 2021 Htmlstream. All rights reserved.</p>
          <p className="text-muted small">
            When you visit or interact with our sites, services or tools, we or our authorised service providers may use cookies for storing information to help provide you with a better, faster and safer experience and for marketing purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}