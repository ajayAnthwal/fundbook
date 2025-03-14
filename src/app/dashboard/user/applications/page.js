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

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [reviewComments, setReviewComments] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then(() => console.log("Bootstrap Loaded"))
        .catch((err) => console.error("Bootstrap Import Error:", err));
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplicationDocuments = async (applicationId) => {
    try {
      let authToken = "";
      if (typeof window !== "undefined") {
        authToken = localStorage.getItem("authToken");
      }

      if (!authToken) {
        return;
      }

      const filters = encodeURIComponent(
        JSON.stringify({ application: { id: applicationId } })
      );

      const response = await axios.get(
        `http://194.195.112.4:3070/api/v1/application-documents?filters=${filters}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Documents API response:", response.data);
      if (response.data?.data) {
        const latestComments = response.data.data.reduce((acc, doc) => {
          const existingDoc = acc[doc.type];
          if (
            !existingDoc ||
            new Date(doc.createdAt) > new Date(existingDoc.createdAt)
          ) {
            acc[doc.type] = {
              type: doc.type,
              comment: doc.reviewComments,
              status: doc.status,
              createdAt: doc.createdAt,
            };
          }
          return acc;
        }, {});

        const documentComments = Object.values(latestComments).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setReviewComments((prevComments) => ({
          ...prevComments,
          [applicationId]: documentComments,
        }));
      }
    } catch (err) {
      console.error("Error fetching documents for ID", applicationId, ":", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      applications.forEach((app) => {
        fetchApplicationDocuments(app.id);
      });
    }, 500);

    return () => clearTimeout(timeout);
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
    router.push(`/dashboard/user/apply?isApplicationEdit=true`);
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
              <th className="text-white">Application</th>
              <th className="text-white">Date started</th>
              {/* <th className="text-white">Loan Type</th> */}
              <th className="text-white">Status</th>
              <th className="text-white">Shared with CA</th>
              {/* <th className="text-white">Review Comments</th> */}
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    {app.user?.firstName} {app.user?.lastName}
                  </td>
                  <td>{formatDate(app.createdAt)}</td>

                  <td>
                    <span className="badge bg-info text-white">
                      {app.status || "Processing"}
                    </span>
                  </td>

                  <td className="text-center">Share</td>
                  {/* <td className="d-flex align-items-center justify-content-center">
                    {reviewComments[app.id]?.length > 0 ? (
                      reviewComments[app.id].map((doc, i) => (
                        <div key={i} className="mb-2 text-center">
                          <span className="badge bg-secondary">{doc.type}</span>
                          <span className={`badge ${doc.status === "Active" ? "bg-success" : "bg-danger"}`}>
                            {doc.comment}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="badge bg-secondary">No comments</span>
                    )}
                  </td> */}
                  <td className="d-flex gap-2">
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
    </div>
  );
};

export default ApplicationsPage;
