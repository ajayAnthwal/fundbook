"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ role = "admin" }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          className="btn btn-dark position-fixed top-2 start-2 m-3 z-index-1000"
          onClick={() => setIsOpen(true)}
          style={{ zIndex: 1050 }}
        >
          <FaBars size={20} />
        </button>
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="bg-dark text-white vh-100 position-fixed top-0 start-0"
        style={{ width: "250px", minWidth: "250px", zIndex: 1040 }}
      >
        <button
          className="btn btn-light position-absolute top-0 end-0 m-2"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={20} />
        </button>

        <h2
          className="fs-4 fw-bold mb-4 text-left text-white mt-4 "
          style={{ paddingLeft: "35px" }}
        >
          📊 Dashboard
        </h2>

        <ul className="nav flex-column px-3">
          {role === "user" && (
            <>
              <li className="nav-item mb-2">
                <Link
                  className={`nav-link sidebar-link text-white ${
                    pathname === "/dashboard/user/applications" ? "active" : ""
                  }`}
                  href="/dashboard/user/applications"
                >
                  📄 My Applications
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  className={`nav-link sidebar-link text-white ${
                    pathname === "/dashboard/user/apply-loan" ? "active" : ""
                  }`}
                  href="/dashboard/user/apply-loan"
                >
                  💰 Apply Loan
                </Link>
              </li>
            </>
          )}

          {role === "ca" && (
            <li className="nav-item mb-2">
              <Link
                className={`nav-link sidebar-link text-white ${
                  pathname === "/dashboard/ca/application/123" ? "active" : ""
                }`}
                href="/dashboard/ca/application/123"
              >
                📑 Assigned Applications
              </Link>
            </li>
          )}

          {role === "admin" && (
            <>
              <li className="nav-item mb-2">
                <Link
                  className={`nav-link sidebar-link text-white ${
                    pathname === "/dashboard/admin/applications" ? "active" : ""
                  }`}
                  href="/dashboard/admin/applications"
                >
                  📋 Loan Applications
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  className={`nav-link sidebar-link text-white ${
                    pathname === "/dashboard/admin/manage-documents"
                      ? "active"
                      : ""
                  }`}
                  href="/dashboard/admin/manage-documents"
                >
                  📂 Manage Documents
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  className={`nav-link sidebar-link text-white ${
                    pathname === "/dashboard/admin/manage-loans" ? "active" : ""
                  }`}
                  href="/dashboard/admin/manage-loans"
                >
                  🏦 Manage Loans
                </Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
