"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

const ApplicationsPage = () => {
  const API_URL = "http://194.195.112.4:3070/api/v1/applications";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
          limit: 10,
        },
      });

      setApplications(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Applications List</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Application ID</th>
              <th>Name</th>
              <th>User</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app.id || index}>
                  <td>{index + 1}</td>
                  <td>{app.id || "N/A"}</td>
                  <td>{app.name || "N/A"}</td>
                  <td>{`${app.user?.firstName || "N/A"} ${
                    app.user?.lastName || ""
                  }`}</td>
                  <td>{app.user?.email || "N/A"}</td>
                  <td>{app.user?.mobile || "N/A"}</td>
                  <td>{app.loanType?.name || "N/A"}</td>
                  <td>₹{app.amount || 0}</td>
                  <td>{app.status || "Pending"}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ApplicationsPage;
