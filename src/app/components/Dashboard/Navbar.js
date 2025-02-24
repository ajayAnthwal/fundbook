"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Navbar = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fs-4 fw-bold">📊 Dashboard</span>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;