"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Get active path
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Sidebar = ({ role }) => {
  const pathname = usePathname(); // Get current URL path

  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h2 className="fs-4 fw-bold mb-4 text-center">📊 Dashboard</h2>
      <ul className="nav flex-column">
        {role === "user" && (
          <>
            <li className="nav-item mb-2">
              <Link className={`nav-link ${pathname === "/dashboard/user/applications" ? "active bg-primary" : "text-white"}`} href="/dashboard/user/applications">
                📄 My Applications
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className={`nav-link ${pathname === "/dashboard/user/apply-loan" ? "active bg-primary" : "text-white"}`} href="/dashboard/user/apply-loan">
                💰 Apply Loan
              </Link>
            </li>
          </>
        )}

        {role === "ca" && (
          <li className="nav-item mb-2">
            <Link className={`nav-link ${pathname === "/dashboard/ca/applications" ? "active bg-primary" : "text-white"}`} href="/dashboard/ca/applications">
              📑 Assigned Applications
            </Link>
          </li>
        )}

        {role === "admin" && (
          <>
            <li className="nav-item mb-2">
              <Link className={`nav-link ${pathname === "/dashboard/admin/applications" ? "active bg-primary" : "text-white"}`} href="/dashboard/admin/applications">
                📋 Loan Applications
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className={`nav-link ${pathname === "/dashboard/admin/manage-documents" ? "active bg-primary" : "text-white"}`} href="/dashboard/admin/manage-documents">
                📂 Manage Documents
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className={`nav-link ${pathname === "/dashboard/admin/manage-loans" ? "active bg-primary" : "text-white"}`} href="/dashboard/admin/manage-loans">
                🏦 Manage Loans
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
