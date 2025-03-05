"use client";
import { useEffect, useState } from "react";
import {
  getUserApplications,
  getApplicationById,
  updateApplication,
} from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
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

  const openEditModal = (app) => {
    setEditApp({
      id: app.id,
      amount: app.amount,
      loanType: app.loanType?.name || "",
      name: app.name,
      status: app.status?.name || "",
    });
    new bootstrap.Modal(document.getElementById("editModal")).show();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedData = {
        amount: editApp.amount,
        loanType: { id: editApp.loanType },
        name: editApp.name,
        status: editApp.status,
      };

      await updateApplication(editApp.id, updatedData);
      fetchApplications();
      setEditApp(null);
      new bootstrap.Modal(document.getElementById("editModal")).hide();
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.message || "Failed to update application");
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Applications</h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading applications...</p>
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-white">#</th>
              <th className="text-white">Applicant Name</th>
              {/* <th className="text-white">Email</th> */}
              <th className="text-white">Loan Amount</th>
              <th className="text-white">Loan Type</th>
              <th className="text-white">Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>
                    {app.user?.firstName} {app.user?.lastName}
                  </td>
                  {/* <td>{app.user?.email}</td> */}
                  <td>₹{app.amount || "N/A"}</td>
                  <td>{app.loanType?.name || "N/A"}</td>
                  <td>
                    <span className="badge bg-info text-white">
                      {app.status?.name || "Processing"}
                    </span>
                  </td>
                  <td>{formatDate(app.createdAt)}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => viewApplicationDetails(app.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => openEditModal(app)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Application</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {editApp && (
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label>Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editApp.amount}
                      onChange={(e) =>
                        setEditApp({ ...editApp, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Loan Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editApp.loanType}
                      onChange={(e) =>
                        setEditApp({ ...editApp, loanType: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editApp.status}
                      onChange={(e) =>
                        setEditApp({ ...editApp, status: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
