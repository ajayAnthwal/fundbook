import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-4">Value Proposition</h2>
      </div>

      {/* Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h4 className="mb-3">MSMEs</h4>
              <p className="text-muted mb-4">Easy MSME loan application with CA support & AI credit improvement.</p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Secured & Unsecured loans.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Multiple lenders.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Higher approvals.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Less paperwork.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h4 className="mb-3">For CAs/Accountants</h4>
              <p className="text-muted mb-4">Grow Your Business with Smart Loan Assistance!</p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Higher earnings.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  More Clients.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Less effort.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Smart Insights.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h4 className="mb-3">For Lenders</h4>
              <p className="text-muted mb-4">Improve lending efficiency and loan quality with reduced workload!</p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Higher Conversions.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Lower costs.
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Less Manual work.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check2 text-primary me-2"></i>
                  Reduced NPAs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}