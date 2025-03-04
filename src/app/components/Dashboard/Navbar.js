"use client";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div
      className="navbar-dark bg-dark"
      style={{
        backgroundImage: "url(/assets/svg/components/wave-pattern-light.svg)",
      }}
    >
      <div className="container content-space-1 content-space-b-lg-3">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h1 className="h2 text-white">Personal info</h1>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light mb-0">
                <li className="breadcrumb-item">Account</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Personal Info
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-auto">
            <div className="d-none d-lg-block">
              <button
                onClick={handleLogout}
                className="btn btn-soft-light btn-sm"
              >
                Log out
              </button>
            </div>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarNav"
              aria-controls="sidebarNav"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
