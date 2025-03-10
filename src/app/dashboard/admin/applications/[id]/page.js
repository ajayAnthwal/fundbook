"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Alert,
  Card,
  Button,
  Table,
  Image,
  Modal,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaRupeeSign,
  FaCalendarAlt,
  FaUser,
  FaClipboardCheck,
  FaCommentDots,
} from "react-icons/fa";

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const API_URL = `http://194.195.112.4:3070/api/v1/application-documents/${id}`;

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: "", type: "", comments: "" });

  useEffect(() => {
    if (id) fetchDocumentDetails();
  }, [id]);

  const fetchDocumentDetails = async () => {
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
      });

      setDocument(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    console.log("fa", document.name);

    try {
      const response = await axios.post(
        `http://194.195.112.4:3070/api/v1/application-documents`,
        {
          status: document?.status || "pending",
          reviewComments: comment.trim(),
          file: {
            id: document?.file?.id || "",
          },
          type: document?.type || "",
          name: document?.name || "",
          application: {
            id: document?.application?.id || "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDocument(response.data);
      setShowCommentModal(false);
      toast.success("Comment submitted successfully!");
      setComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit comment");
      console.error("API Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const newDocument = async () => {
    if (!newDoc.comments.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://194.195.112.4:3070/api/v1/application-additional-documents`,
        {
          status: document?.status || "pending",
          reviewComments: newDoc.comments,
          file: {
            id: document?.file?.id || "",
          },
          type: newDoc.type || "",
          name: newDoc.name || "",
          application: {
            id: document?.application?.id || "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewDoc({ name: "", type: "", comments: "" }); // Reset the form after submission
      setShowNewDocModal(false);
      toast.success("Document submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit document");
      console.error("API Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Application Document Details</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && document && (
        <>
          <div>
            <div>
              <Card className="p-4 shadow-lg  border-0 rounded">
                <Card.Body>
                  <h4 className="text-primary mb-4">
                    📄 Loan & Application Details
                  </h4>

                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>
                          <FaClipboardCheck /> Application Name:
                        </strong>{" "}
                        {document.application?.name || "N/A"}
                      </p>
                      <p>
                        <strong>💳 Loan Type:</strong>{" "}
                        {document.application?.loanType?.name || "N/A"}
                      </p>
                      <p>
                        <strong>
                          <FaRupeeSign /> Amount:
                        </strong>
                        <Badge bg="success" className="ms-2">
                          ₹{document.application?.amount || "N/A"}
                        </Badge>
                      </p>
                    </Col>

                    <Col md={6}>
                      <p>
                        <strong>
                          <FaUser /> Initiated By:
                        </strong>{" "}
                        {document.application?.initiatedBy || "N/A"}
                      </p>
                      <p>
                        <strong>📌 Application Status:</strong>
                        <Badge
                          bg={
                            document.application?.status === "pending"
                              ? "warning"
                              : document.application?.status === "approved"
                              ? "success"
                              : "danger"
                          }
                          className="ms-2"
                        >
                          {document.application?.status || "N/A"}
                        </Badge>
                      </p>
                    </Col>
                  </Row>

                  <hr />

                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>
                          <FaCalendarAlt /> Created At:
                        </strong>
                        {document.application?.createdAt
                          ? new Date(
                              document.application.createdAt
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </Col>

                    <Col md={6}>
                      <p>
                        <strong>
                          <FaCalendarAlt /> Updated At:
                        </strong>
                        {document.application?.updatedAt
                          ? new Date(
                              document.application.updatedAt
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </Col>
                  </Row>

                  {/* Review Comments Section */}
                  <div className="mt-4">
                    <h5 className="text-secondary">
                      <FaCommentDots /> Review Comments
                    </h5>
                    <Alert
                      variant="light"
                      className="border border-secondary p-3"
                    >
                      {document?.reviewComments || "No comments available"}
                    </Alert>
                  </div>
                </Card.Body>
              </Card>

              {document?.file?.path && (
                <table
                  className="table table-bordered text-center"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr
                      style={{ backgroundColor: "#a0f0e0", fontWeight: "bold" }}
                    >
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Documents
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Action
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{ name: "Adhaar Document" }].map((doc, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #ccc" }}
                      >
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          <strong>{doc.name}</strong>
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          <a
                            href={document.file.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                            style={{
                              textDecoration: "none",
                              fontWeight: "500",
                            }}
                          >
                            Click to View
                          </a>
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          <span
                            className="text-danger"
                            style={{ cursor: "pointer", fontWeight: "500" }}
                            onClick={() => setShowCommentModal(true)}
                          >
                            Document not looking good?
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <Card className="p-3 shadow-sm mt-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5 className="m-0">Need a New Document?</h5>
              <Button
                variant="primary"
                onClick={() => setShowNewDocModal(true)}
              >
                Request New Document
              </Button>
            </Card.Body>
          </Card>

          <Table bordered hover className="shadow-sm text-center">
            <thead className="table-dark">
              <tr>
                <th className="text-white">Field</th>
                <th className="text-white">User</th>
                <th className="text-white">Chartered Accountant (CA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Name</strong>
                </td>
                <td>
                  {document.application?.user?.firstName || "N/A"}{" "}
                  {document.application?.user?.lastName || ""}
                </td>
                <td>
                  {document.application?.ca?.firstName || "N/A"}{" "}
                  {document.application?.ca?.lastName || ""}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email</strong>
                </td>
                <td>{document.application?.user?.email || "N/A"}</td>
                <td>{document.application?.ca?.email || "N/A"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Mobile</strong>
                </td>
                <td>{document.application?.user?.mobile || "N/A"}</td>
                <td>{document.application?.ca?.mobile || "N/A"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Role</strong>
                </td>
                <td>
                  {document.application?.user?.firstName || "N/A"}{" "}
                  {document.application?.user?.lastName || ""}
                </td>
                <td>
                  {document.application?.ca?.firstName || "N/A"}{" "}
                  {document.application?.ca?.lastName || ""}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>{document.application?.user?.status?.name || "N/A"}</td>
                <td>{document.application?.ca?.status?.name || "N/A"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Photo</strong>
                </td>
                <td>
                  {document.application?.user?.photo?.path ? (
                    <Image
                      src={document.application.user.photo.path}
                      rounded
                      width={50}
                      height={50}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {document.application?.ca?.photo?.path ? (
                    <Image
                      src={document.application.ca.photo.path}
                      rounded
                      width={50}
                      height={50}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>

          <Modal
            show={showCommentModal}
            onHide={() => setShowCommentModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowCommentModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitComment}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showNewDocModal}
            onHide={() => setShowNewDocModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Request New Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Document Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newDoc.name}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Document Type</Form.Label>
                <Form.Control
                  type="text"
                  value={newDoc.type}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, type: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newDoc.comments}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, comments: e.target.value })
                  }
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowNewDocModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={newDocument}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="mt-4">
            <Link href="/dashboard/admin/applications">
              <Button variant="secondary" className="me-2">
                Back to List
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetailsPage;
