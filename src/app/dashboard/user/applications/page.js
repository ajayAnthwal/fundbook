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
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const viewApplicationDetails = async (id) => {
    try {
      setLoading(true);
      const data = await getApplicationById(id);
      setSelectedApp(data);
    } catch (err) {
      console.error("Application Details Error:", err);
      setError(err.message || "Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Applications</h2>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.user?.firstName} {app.user?.lastName}</td>
                  <td>{app.user?.email}</td>
                  <td><span className="badge bg-info">{app.status?.name || 'Processing'}</span></td>
                  <td>{formatDate(app.createdAt)}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => viewApplicationDetails(app.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="card mt-4">
          <div className="card-header">Application Details</div>
          <div className="card-body">
            <h6>Applicant Information</h6>
            <p><strong>Name:</strong> {selectedApp.user?.firstName} {selectedApp.user?.lastName}</p>
            <p><strong>Email:</strong> {selectedApp.user?.email}</p>
            <p><strong>Phone:</strong> {selectedApp.user?.phone || 'N/A'}</p>
            <h6>Status</h6>
            <p><strong>Status:</strong> {selectedApp.status?.name || 'Processing'}</p>
            <p><strong>Created:</strong> {formatDate(selectedApp.createdAt)}</p>
            <p><strong>Last Updated:</strong> {formatDate(selectedApp.updatedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
