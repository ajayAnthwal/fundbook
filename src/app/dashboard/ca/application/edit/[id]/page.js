"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getApplicationDetails, updateApplication } from "@/api/documents";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";

const EditApplication = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({ applicantName: "", details: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchApplication = async () => {
      try {
        const data = await getApplicationDetails(id);
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateApplication(id, formData);
      alert("Application updated successfully!");
      router.push("/dashboard/ca");
    } catch (error) {
      console.error("Failed to update application:", error);
      alert("Error updating application.");
    }
  };

  return (
    <Container style={{ margin: "300px auto" }}>
      <h2 className="text-center mb-4">Edit Application</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Card className="shadow p-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Applicant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="details"
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EditApplication;
