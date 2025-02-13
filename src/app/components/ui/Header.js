"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close mobile menu
  const closeMenu = () => {
    const navbarCollapse = document.getElementById("navbarNavDropdown");
    if (navbarCollapse) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        hide: true
      });
      bsCollapse.hide();
      setIsMenuOpen(false);
    }
  };

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Initialize Bootstrap collapse
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/js/dist/collapse');
    }
  }, []);

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
          <Link className="navbar-brand" href="/" aria-label="Front" onClick={closeMenu}>
            <Image
              className="navbar-brand-logo"
              src="/fundbook.png"
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
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className={isMenuOpen ? "d-none" : "navbar-toggler-default"}>
              <i className="bi-list"></i>
            </span>
            <span className={isMenuOpen ? "navbar-toggler-toggled" : "d-none"}>
              <i className="bi-x" onClick={closeMenu}></i>
            </span>
          </button>

          {/* Collapse */}
          <div 
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
            id="navbarNavDropdown"
          >
            <ul id="navbarNavDropdownNav" className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" href="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href="#" onClick={closeMenu}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href="/contact" onClick={closeMenu}>
                  Contacts
                </Link>
              </li>

              {/* Button */}
              <li className="nav-item">
                <Link
                  className="btn btn-primary btn-transition"
                  href="#"
                  target="_blank"
                  onClick={closeMenu}
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
