// components/Header.jsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      id="header"
      className="navbar navbar-expand-lg navbar-end navbar-absolute-top navbar-light navbar-show-hide"
      data-hs-header-options={{
        fixMoment: 1000,
        fixEffect: "slide",
      }}
    >
      <div className="container">
        <nav className="js-mega-menu navbar-nav-wrap">
          {/* Default Logo */}
          <Link className="navbar-brand" href="/" aria-label="Front">
            <Image
              className="navbar-brand-logo"
              src="/logo.png"
              alt="Logo"
              width={200}
              height={80}
            />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-default">
              <i className="bi-list"></i>
            </span>
            <span className="navbar-toggler-toggled">
              <i className="bi-x"></i>
            </span>
          </button>

          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul id="navbarNavDropdownNav" className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contacts
                </Link>
              </li>

              {/* Button */}
              <li className="nav-item">
                <Link
                  className="btn btn-primary btn-transition"
                  href="#"
                  target="_blank"
                >
                  Enquire Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
