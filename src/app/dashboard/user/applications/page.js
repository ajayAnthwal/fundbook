"use client";
import { useEffect, useState } from "react";
import { getUserApplications, getApplicationById } from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getUserApplications();
      if (data) {
        setApplications(data);
        setError("");
      }
    } catch (err) {
      console.error("Applications Error:", err);
      if (err.message === "No token found!") {
        setError("Please login to view your applications");
      } else if (err.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(err.message || "Failed to load applications");
      }
    } finally {
      setLoading(false);
    }
  };

  const viewApplicationDetails = async (id) => {
    try {
      setLoading(true);
      const data = await getApplicationById(id);
      if (data) {
        setSelectedApp(data);
        setError("");
      }
    } catch (err) {
      console.error("Application Details Error:", err);
      setError(err.message || "Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          {error}
          {(error.includes("Please login") || error.includes("Session expired")) && (
            <div className="mt-3">
              <a href="/auth" className="btn btn-primary">Go to Login</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Applications</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="list-group">
            {applications.length > 0 ? (
              applications.map((app) => (
                <button
                  key={app.id}
                  className={`list-group-item list-group-item-action ${selectedApp?.id === app.id ? 'active' : ''}`}
                  onClick={() => viewApplicationDetails(app.id)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{app.user?.firstName} {app.user?.lastName}</h5>
                    <small>{formatDate(app.createdAt)}</small>
                  </div>
                  <p className="mb-1">Status: <span className="badge bg-info">{app.status?.name || 'Processing'}</span></p>
                  <small>Application ID: {app.id}</small>
                </button>
              ))
            ) : (
              <div className="alert alert-info">No applications found</div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          {selectedApp ? (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Application Details</h5>
              </div>
              <div className="card-body">
                <h6>Applicant Information</h6>
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {selectedApp.user?.firstName} {selectedApp.user?.lastName}</li>
                  <li><strong>Email:</strong> {selectedApp.user?.email}</li>
                  <li><strong>Phone:</strong> {selectedApp.user?.phone || 'N/A'}</li>
                </ul>

                <h6 className="mt-4">Application Status</h6>
                <ul className="list-unstyled">
                  <li><strong>Status:</strong> {selectedApp.status?.name || 'Processing'}</li>
                  <li><strong>Created:</strong> {formatDate(selectedApp.createdAt)}</li>
                  <li><strong>Last Updated:</strong> {formatDate(selectedApp.updatedAt)}</li>
                </ul>

                {selectedApp.role && (
                  <>
                    <h6 className="mt-4">Role Information</h6>
                    <ul className="list-unstyled">
                      <li><strong>Role:</strong> {selectedApp.role.name}</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="alert alert-info">Select an application to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
