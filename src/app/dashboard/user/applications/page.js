"use client";
import { useEffect, useState } from "react";
import { getUserApplications } from "@/api/documents";
import { Table, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getUserApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Your Loan Applications</h2>
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
    </Container>
  );
};

export default ApplicationsPage;
