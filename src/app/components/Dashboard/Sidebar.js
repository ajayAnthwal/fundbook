"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <div
      className="bg-white shadow-lg p-3"
      style={{ width: "250px", borderRadius: "15px" }}
    >
      {user && (
        <div className="text-center mb-4">
          <h4 className="mb-0">{user.firstName} {user.lastName}</h4>
          <p className="small">{user.email}</p>
        </div>
      )}

      <ul className="nav flex-column">
        {/* USER ROLE */}
        {user?.role?.name === "User" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/applications") ? "active" : ""
                }`}
                href="/dashboard/user/applications"
              >
                📄 My Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/apply-loan") ? "active" : ""
                }`}
                href="/dashboard/user/apply-loan"
              >
                💰 Apply Loan
              </Link>
            </li>
          </>
        )}

        {/* CA ROLE */}
        {user?.role?.name === "CA" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/application") ? "active" : ""
                }`}
                href="/dashboard/ca/application"
              >
                📑 Assigned Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/application/[id]") ? "active" : ""
                }`}
                href="/dashboard/ca/application/123"
              >
                📝 View Application
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/application/edit/[id]") ? "active" : ""
                }`}
                href="/dashboard/ca/application/edit/123"
              >
                ✏️ Edit Application
              </Link>
            </li>
          </>
        )}

        {/* ADMIN ROLE */}
        {user?.role?.name === "Admin" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/dashboard/admin/applications" ? "active" : ""
                }`}
                href="/dashboard/admin/applications"
              >
                📋 Loan Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/dashboard/admin/manage-business" ? "active" : ""
                }`}
                href="/dashboard/admin/manage-business"
              >
                🏢 Manage Business
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
