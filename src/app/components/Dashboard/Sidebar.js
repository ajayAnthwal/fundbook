"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ role = "ca" }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <>
      {!isOpen && (
        <button
          className="btn btn-dark position-fixed top-2 start-2 m-3"
          onClick={() => setIsOpen(true)}
          style={{ zIndex: 1050 }}
        >
          <FaBars size={20} />
        </button>
      )}

      <motion.div
        initial={{ x: "0%" }} 
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="col-lg-3 position-fixed top-0 start-0 vh-100 bg-white shadow-lg"
        style={{ zIndex: 1040 }}
      >
        <div className="d-flex justify-content-end p-2">
          <button className="btn btn-light" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="navbar-expand-lg navbar-light">
          <div
            id="sidebarNav"
            className="collapse navbar-collapse navbar-vertical"
          >
            <div className="card flex-grow-1 mb-5">
              <div className="card-body">
                <div className="d-none d-lg-block text-center mb-5">
                  <div className="avatar avatar-xxl avatar-circle mb-3">
                    <img
                      className="avatar-img"
                      src="/assets/img/160x160/img9.jpg"
                      alt="User Avatar"
                    />
                    <img
                      className="avatar-status avatar-lg-status"
                      src="/assets/svg/illustrations/top-vendor.svg"
                      alt="Verified user"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      aria-label="Verified user"
                      data-bs-original-title="Verified user"
                    />
                  </div>
                  <h4 className="card-title mb-0">User Name</h4>
                  <p className="card-text small">user@example.com</p>
                </div>

                <span className="text-cap">Account</span>
                <ul className="nav nav-sm nav-tabs nav-vertical mb-4">
                  {role === "user" && (
                    <>
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
                            pathname.startsWith("/dashboard/user/apply-loan")
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/user/apply-loan"
                        >
                          💰 Apply Loan
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname.startsWith("/dashboard/user/profile")
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/user/profile"
                        >
                          👤 My Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname.startsWith("/dashboard/user/edit-profile")
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/user/edit-profile"
                        >
                          ✏️ Edit Profile
                        </Link>
                      </li>
                    </>
                  )}

                  {role === "ca" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname.startsWith("/dashboard/ca/application")
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/ca/application"
                        >
                          📑 Assigned Applications
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname.startsWith(
                              "/dashboard/ca/application/[id]"
                            )
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/ca/application/123"
                        >
                          📝 View Application
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname.startsWith(
                              "/dashboard/ca/application/edit/[id]"
                            )
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/ca/application/edit/123"
                        >
                          ✏️ Edit Application
                        </Link>
                      </li>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname === "/dashboard/admin/applications"
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
                            pathname === "/dashboard/admin/disbursement"
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/admin/disbursement"
                        >
                          💳 Disbursement
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname === "/dashboard/admin/manage-business"
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
                            pathname === "/dashboard/admin/manage-documents"
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/admin/manage-documents"
                        >
                          📂 Manage Documents
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            pathname === "/dashboard/admin/manage-loans"
                              ? "active"
                              : ""
                          }`}
                          href="/dashboard/admin/manage-loans"
                        >
                          🏦 Manage Loans
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
