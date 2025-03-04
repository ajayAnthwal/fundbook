"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Function to close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/auth"; 
  };

  return (
    <header
      id="header"
      className="navbar navbar-expand-lg navbar-end navbar-absolute-top navbar-light navbar-show-hide"
    >
      <div className="container">
        <nav className="js-mega-menu navbar-nav-wrap">
          {/* Default Logo */}
          <Link className="navbar-brand" href="/" aria-label="Front" onClick={closeMenu}>
            <Image className="navbar-brand-logo" src="/fundbook.png" alt="Logo" width={200} height={80} />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
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
          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNavDropdown">
            <ul id="navbarNavDropdownNav" className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-black" href="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" href="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" href="#" onClick={closeMenu}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" href="/contact" onClick={closeMenu}>
                  Contacts
                </Link>
              </li>

              {/* Enquire Button */}
              <li className="nav-item">
                <Link className="btn btn-primary btn-transition" href="#" target="_blank" onClick={closeMenu}>
                  Enquire Now
                </Link>
              </li>

              {/* Login/Logout Button */}
              <li className="nav-item">
                {isAuthenticated ? (
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link className="btn btn-success ms-2" href="/auth">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
