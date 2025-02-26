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
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fs-4 fw-bold invisible ">📊 Dashboard</span>

        <div className="d-flex align-items-center">
          {user && <span className="text-white me-3 fw-semibold">👤 {user.name}</span>}
          <button 
            onClick={handleLogout} 
            className="btn btn-danger"
            style={{ transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
