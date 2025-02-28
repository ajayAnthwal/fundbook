"use client";
import { useEffect, useState } from "react";
import { getUserApplications } from "@/api/documents";
import { Table, Button, Container, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getUserApplications();
        setApplications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Your Loan Applications</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && applications.length === 0 && (
        <Alert variant="info">No applications found.</Alert>
      )}

      {!loading && applications.length > 0 && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th className="text-white">Application ID</th>
              <th className="text-white">Status</th>
              <th className="text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "bg-success"
                        : app.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`/user/applications/${app.id}`}
                    className="me-2"
                  >
                    View
                  </Button>
                  {["pending", "under_review"].includes(app.status) && (
                    <Button
                      variant="warning"
                      size="sm"
                      href={`/user/applications/edit/${app.id}`}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ApplicationsPage;
