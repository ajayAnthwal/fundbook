"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role?.name || "User");
    }

    const checkToken = () => {
      if (!localStorage.getItem("token")) {
        router.push("/auth");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark shadow-sm p-3">
      <div className="container d-flex align-items-center">
        <a
          className="navbar-brand text-white d-flex align-items-center"
          href="#"
        >
          <Image
            src="/fundbook.png"
            alt="Fundbook Logo"
            width={80}
            height={80}
            className="me-2 img-fluid"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {user && (
            <div className="d-flex align-items-center text-white me-3">
              <FaUserCircle size={30} className="me-2 text-light" />
              <div>
                <span className="fw-bold text-white">
                  {user.firstName} {user.lastName}{" "}
                  <span
                    className={role === "Admin" ? "text-warning" : "text-info"}
                  >
                    ({role})
                  </span>
                </span>
                <br />
                <span className="text-secondary small">{user.email}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-outline-light rounded-pill px-4 fw-semibold shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
