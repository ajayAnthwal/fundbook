"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Spinner, Alert, Button } from "react-bootstrap";
import Link from "next/link";

const ApplicationDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const API_URL = `http://194.195.112.4:3070/api/v1/applications/${id}`;

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplication(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch application details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Application Details</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {application && (
        <div>
          <p><strong>ID:</strong> {application.id}</p>
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Initiated By:</strong> {application.initiatedBy}</p>

          <h5>User Details:</h5>
          <p><strong>Name:</strong> {application.user?.firstName} {application.user?.lastName}</p>
          <p><strong>Email:</strong> {application.user?.email}</p>
          <p><strong>Mobile:</strong> {application.user?.mobile}</p>

          <h5>Loan Details:</h5>
          <p><strong>Type:</strong> {application.loanType?.name}</p>
          <p><strong>Amount:</strong> ₹{application.amount}</p>
          <p><strong>Created At:</strong> {new Date(application.createdAt).toLocaleString()}</p>

          {/* Back Button */}
          <div className="mt-3">
            <Link href="/dashboard/admin/applications" passHref>
              <Button variant="secondary">← Back to Applications</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
