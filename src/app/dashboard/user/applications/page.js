"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getUserApplications,
  getApplicationById,
  updateApplication,
} from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import * as bootstrap from "bootstrap";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [reviewComments, setReviewComments] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplicationDocuments = async (applicationId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("Fetching documents for application:", applicationId);

      const response = await axios.get(
        `http://194.195.112.4:3070/api/v1/application-documents?applicationId=${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Raw API response:", response.data);

      // Check if documents contain applicationId
      const documents = response.data.data || [];
      console.log("Filtered Documents for App ID:", applicationId, documents);

      // सही applicationId के documents store करो
      setReviewComments((prevComments) => ({
        ...prevComments,
        [applicationId]: documents, // ✅ Fix: सभी documents पहले भी include करो और फिर filter करो
      }));
    } catch (err) {
      console.error(
        "Application Documents Error for ID",
        applicationId,
        ":",
        err
      );
    }
  };

  // useEffect में call करो
  useEffect(() => {
    applications.forEach((app) => {
      fetchApplicationDocuments(app.id);
    });
  }, [applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getUserApplications();
      console.log("Fetched applications:", data);
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
    localStorage.setItem("userApplicationData", JSON.stringify(app));
    router.push(`/dashboard/user/apply?isApplicationEdit=true`, app);
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
              <th className="text-white">Loan Amount</th>
              <th className="text-white">Loan Type</th>
              <th className="text-white">Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Review Comments</th>
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => {
                console.log(
                  "Rendering application:",
                  app.id,
                  "Comments:",
                  reviewComments[app.id]
                );
                return (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>
                      {app.user?.firstName} {app.user?.lastName}
                    </td>
                    <td>₹{app.amount || "N/A"}</td>
                    <td>{app.loanType?.name || "N/A"}</td>
                    <td>
                      <span className="badge bg-info text-white">
                        {app.status?.name || "Processing"}
                      </span>
                    </td>
                    <td>{formatDate(app.createdAt)}</td>
                    <td>
                      {console.log(
                        "App ID:",
                        app.id,
                        "Comments:",
                        reviewComments[app.id]
                      )}
                      {reviewComments[app.id]?.length > 0 ? (
                        reviewComments[app.id].map((doc, i) => (
                          <p key={i} className="mb-1">
                            {doc.reviewComments}
                            <br />
                            <small className="text-muted">
                              {doc.type} - {formatDate(doc.createdAt)}
                            </small>
                          </p>
                        ))
                      ) : (
                        <span>No comments</span>
                      )}
                    </td>

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
                );
              })
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
    </div>
  );
};

export default ApplicationsPage;
