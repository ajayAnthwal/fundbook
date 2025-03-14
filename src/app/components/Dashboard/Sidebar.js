"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRole } from "@/api/client";

const Sidebar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getRole());
    console.log('role', getRole());
  }, []);

  return (
    <div
      className="bg-white shadow-lg p-3"
      style={{ width: "250px", borderRadius: "15px" }}
    >
      {/* {user && (
        <div className="text-center mb-4">
          <h4 className="mb-0">
            {user.firstName} {user.lastName}
          </h4>
          <p className="small">{user.email}</p>
        </div>
      )} */}

      <ul className="nav flex-column">
        {/* USER (MSME) ROLE */}
        {role === "User" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/home") ? "active" : ""
                }`}
                href="/dashboard/user/home"
              >
                🏠 Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/profile") ? "active" : ""
                }`}
                href="/dashboard/user/profile"
              >
                👤 Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/documents")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/user/documents"
              >
                📜 Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/my-ca") ? "active" : ""
                }`}
                href="/dashboard/user/my-ca"
              >
                👨‍💼 My CA
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/applications")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/user/applications"
              >
                📄 My Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/apply") ? "active" : ""
                }`}
                href="/dashboard/user/apply"
              >
                💰 Apply Loan
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/old-applications")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/user/oldapplications"
              >
                📂 Old Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/user/notification")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/user/notification"
              >
                📂 Notification
              </Link>
            </li>
          </>
        )}

        {/* CA ROLE */}
        {role === "CA" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/home") ? "active" : ""
                }`}
                href="/dashboard/ca/home"
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/profile") ? "active" : ""
                }`}
                href="/dashboard/ca/profile"
              >
                👤 Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/my-msme") ? "active" : ""
                }`}
                href="/dashboard/ca/my-msme"
              >
                🏢 My MSME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/application")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/ca/application/123"
              >
                📑 Assigned Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/application/edit")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/ca/application/edit/123"
              >
                ✏️ Edit Application
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/ca/sort-applications")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/ca/sort-applications"
              >
                🔄 Sort Applications
              </Link>
            </li>
          </>
        )}

        {/* ADMIN ROLE */}
        {role === "Admin" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/home") ? "active" : ""
                }`}
                href="/dashboard/admin/home"
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/manage-loans")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/manage-loans"
              >
                📋 Manage loanTypes
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/applications")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/applications"
              >
                📋 Loan Applications
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/manage-users")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/manage-users"
              >
                👥 Manage Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/manage-documents")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/manage-documents"
              >
                👥 Manage Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/manage-business")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/manage-business"
              >
                🏢 Manage Business
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/filter-applications")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/filter-applications"
              >
                🔍 Filter Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/download-pdf")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/download-pdf"
              >
                📥 Download as PDF
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith("/dashboard/admin/final-decision")
                    ? "active"
                    : ""
                }`}
                href="/dashboard/admin/final-decision"
              >
                ✅ Final Decision
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
