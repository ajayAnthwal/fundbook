"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApplicationDetails } from "@/api/documents";
import { Container, Card, Button, Spinner } from "react-bootstrap";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchApplication = async () => {
      try {
        const data = await getApplicationDetails(id);
        setApplication(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  return (
    <Container>
      <h2 className="text-center mb-4">Application Details</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : application ? (
        <Card className="shadow p-4">
          <Card.Body>
            <h4 className="mb-3">{application.applicantName}</h4>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge bg-${
                  application.status === "Pending" ? "warning" : "success"
                }`}
              >
                {application.status}
              </span>
            </p>
            <p>
              <strong>Details:</strong> {application.details}
            </p>
            {application.status === "Pending" && (
              <Button
                href={`/dashboard/ca/application/edit/${id}`}
                variant="success"
              >
                Edit Application
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center text-danger">Application not found.</p>
      )}
    </Container>
  );
};

export default ApplicationDetails;
