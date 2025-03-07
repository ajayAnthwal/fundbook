import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserDashboard() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body text-center p-4">
              <h2 className="mb-3 text-black fw-bold">
                👤 User Dashboard
              </h2>
              <p className="text-muted fs-5">
                Welcome to your personalized dashboard. Here you can manage your loan applications, check notifications, and update your profile.
              </p>
              <button className="btn btn-success px-4 py-2 rounded-pill shadow-sm">
                View My Applications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
