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
  const [kycDetails, setKycDetails] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [applicationDocuments, setApplicationDocuments] = useState([]);
  const [additionalDocuments, setAdditionalDocuments] = useState([]);

  useEffect(() => {
    if (id) {
      fetchDocumentDetails();
    }
  }, [id]);

  useEffect(() => {
    if (document?.application?.id) {
      fetchAllDetails();
    }
  }, [document]);

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
      console.log("Document details fetched:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !document?.application?.id) return;

    try {
      const applicationId = document.application.id;
      console.log("Fetching details with application ID:", applicationId);

      const filterObj = {
        application: {
          id: applicationId,
        },
      };

      const baseURL = "http://194.195.112.4:3070/api/v1";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      };

      // Create properly encoded filter parameter
      const filtersStr = JSON.stringify(filterObj);
      const filtersParam = `filters=${encodeURIComponent(filtersStr)}`;

      // KYC Details
      const kycUrl = `${baseURL}/application-kycs?page=1&${filtersParam}`;
      console.log("KYC URL being called:", kycUrl);
      const kycResponse = await axios.get(kycUrl, { headers });
      console.log("KYC Response Data:", kycResponse.data.data[0]);

      // Set KYC details directly from the response data array
      if (kycResponse.data?.data?.length > 0) {
        const kycData = kycResponse.data.data[0];
        console.log("Setting KYC data:", kycData);
        setKycDetails(kycData);
      } else {
        console.log("No KYC data found in response");
        setKycDetails(null);
      }

      // Business Details
      const businessUrl = `${baseURL}/business-details?page=1&${filtersParam}`;
      console.log("Business URL being called:", businessUrl);
      const businessRes = await axios.get(businessUrl, { headers });
      console.log("Business Response Data:", businessRes.data.data[0]);
      console.log(
        "Business Response Data email:",
        businessRes.data.data[0].email
      );

      // Application Documents
      const docsUrl = `${baseURL}/application-documents?page=1&${filtersParam}`;
      console.log("Documents URL being called:", docsUrl);
      const docsRes = await axios.get(docsUrl, { headers });
      console.log("Documents Response Data:", docsRes.data);

      // Additional Documents
      const additionalDocsUrl = `${baseURL}/additional-documents?page=1&${filtersParam}`;
      console.log("Additional Documents URL being called:", additionalDocsUrl);
      const additionalDocsRes = await axios.get(additionalDocsUrl, { headers });
      console.log(
        "Additional Documents Response Data:",
        additionalDocsRes.data
      );

      // Set Business details
      if (businessRes.data?.data?.[0]) {
        const businessData = businessRes.data.data[0];
        console.log("Setting Business data:", businessData);
        setBusinessDetails(businessData);
      }

      // Set Application Documents
      const appDocs = docsRes.data?.data || [];
      console.log("Setting Application Documents:", appDocs);
      setApplicationDocuments(appDocs);

      // Set Additional Documents
      const addDocs = additionalDocsRes.data?.data || [];
      console.log("Setting Additional Documents:", addDocs);
      setAdditionalDocuments(addDocs);
    } catch (err) {
      console.error("Error in fetchAllDetails:", err);
      if (err.response) {
        console.error("Error Response Data:", err.response.data);
        console.error("Error Response Status:", err.response.status);
      }
      toast.error("Failed to fetch some application details");
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || !document?.id) {
      toast.error("Comment cannot be empty");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.patch(
        `http://194.195.112.4:3070/api/v1/application-documents/${document.id}`,
        {
          reviewComments: comment.trim(),
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
      toast.success("Comment updated successfully!");
      setComment("");
      fetchAllDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
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

      setNewDoc({ name: "", type: "", comments: "" });
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
      <h2 className="mb-4 text-primary">Application Details</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && document && (
        <>
          {/* Application Details */}
          <Card className="p-4 shadow-lg border-0 rounded mb-4">
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
            </Card.Body>
          </Card>

          {/* KYC Details */}
          <Card className="p-4 shadow-lg border-0 rounded mb-4">
            <Card.Body>
              <h4 className="text-primary mb-4">🔒 KYC Details</h4>
              {console.log("Current KYC Details State:", kycDetails)}
              {kycDetails ? (
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Name:</strong> {kycDetails?.name}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>PAN:</strong> {kycDetails?.pan}
                    </p>
                  </Col>
                </Row>
              ) : (
                <Alert variant="info">
                  {loading
                    ? "Loading KYC details..."
                    : "KYC details not available"}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Business Details */}
          <Card className="p-4 shadow-lg border-0 rounded mb-4">
            <Card.Body>
              <h4 className="text-primary mb-4">💼 Business Details</h4>
              {console.log("Current Business Details State:", businessDetails)}
              {businessDetails ? (
                <Row>
                  <Col md={6}>
                    {/* <p>
                      <strong>Business Type:</strong>{" "}
                      {businessDetails?.businessType?.name || "N/A"}
                    </p> */}
                    <p>
                      <strong>Email:</strong> {businessDetails?.email}
                    </p>
                    <p>
                      <strong>GST Number:</strong> {businessDetails?.gst}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {businessDetails?.mobile}
                    </p>
                    <p>
                      <strong>Udyam Number:</strong> {businessDetails?.udyam}
                    </p>
                  </Col>
                  {/* <Col md={6}>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {businessDetails?.createdAt
                        ? new Date(businessDetails.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {businessDetails?.updatedAt
                        ? new Date(businessDetails.updatedAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Business ID:</strong>{" "}
                      {businessDetails?.id || "N/A"}
                    </p>
                    <p>
                      <strong>Application Status:</strong>{" "}
                      <Badge
                        bg={
                          businessDetails?.application?.status === "pending"
                            ? "warning"
                            : "success"
                        }
                      >
                        {businessDetails?.application?.status || "pending"}
                      </Badge>
                    </p>
                    <p>
                      <strong>Application Amount:</strong>{" "}
                      <Badge bg="success">
                        ₹{businessDetails?.application?.amount || "N/A"}
                      </Badge>
                    </p>
                  </Col> */}
                </Row>
              ) : (
                <Alert variant="info">
                  {loading
                    ? "Loading business details..."
                    : "Business details not available"}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Documents Section */}
          <Card className="p-4 shadow-lg border-0 rounded mb-4">
            <Card.Body>
              <h4 className="text-primary mb-4">📑 Documents</h4>
              {console.log(
                "Current Application Documents:",
                applicationDocuments
              )}
              {console.log(
                "Current Additional Documents:",
                additionalDocuments
              )}

              {/* Required Documents */}
              <div className="mb-4">
                <h5 className="text-center bg-info text-dark p-2 rounded">
                  Required Documents
                </h5>
                <Table bordered hover className="mt-3">
                  <thead className="bg-info text-dark">
                    <tr>
                      <th className="p-3">Document Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Created At</th>
                      <th className="p-3">View</th>
                      <th className="p-3">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td className="p-3">
                          <strong>{doc.type}</strong>
                        </td>
                        <td className="p-3">
                          <Badge
                            bg={doc.status === "Active" ? "success" : "warning"}
                          >
                            {doc.status || "Pending"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          {doc.createdAt
                            ? new Date(doc.createdAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="p-3">
                          {doc.file?.path ? (
                            <a
                              href={doc.file.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Document
                            </a>
                          ) : (
                            <Badge bg="warning">Not Uploaded</Badge>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <span
                              className={
                                doc.status === "Active"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {doc.reviewComments || "No comments"}
                            </span>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                setDocument(doc);
                                setComment(doc.reviewComments || "");
                                setShowCommentModal(true);
                              }}
                            >
                              Add Comment
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Additional Documents */}
              {additionalDocuments.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-center bg-info text-dark p-2 rounded">
                    Additional Documents
                  </h5>
                  <Table bordered hover className="mt-3">
                    <thead className="bg-info text-dark">
                      <tr>
                        <th className="p-3">Document</th>
                        <th className="p-3">View</th>
                        <th className="p-3">Comments from Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {additionalDocuments.map((doc) => (
                        <tr key={doc.id}>
                          <td className="p-3">
                            <strong>{doc.type}</strong>
                          </td>
                          <td className="p-3">
                            {doc.file?.path ? (
                              <a
                                href={doc.file.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Document
                              </a>
                            ) : (
                              <Badge bg="warning">Not Uploaded</Badge>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <span
                                className={
                                  doc.status === "Active"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {doc.reviewComments || "No comments"}
                              </span>
                              <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => {
                                  setDocument(doc);
                                  setComment(doc.reviewComments || "");
                                  setShowCommentModal(true);
                                }}
                              >
                                Add Comment
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* User and CA Details */}
          <Card className="p-4 shadow-lg border-0 rounded mb-4">
            <Card.Body>
              <h4 className="text-primary mb-4">👥 User & CA Details</h4>
              <Table bordered hover className="mt-3">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Field</th>
                    <th>User</th>
                    <th>Chartered Accountant (CA)</th>
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
                      <strong>Status</strong>
                    </td>
                    <td>
                      <Badge
                        bg={
                          document.application?.user?.status?.name === "active"
                            ? "success"
                            : "warning"
                        }
                      >
                        {document.application?.user?.status?.name || "N/A"}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        bg={
                          document.application?.ca?.status?.name === "active"
                            ? "success"
                            : "warning"
                        }
                      >
                        {document.application?.ca?.status?.name || "N/A"}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Comment Modal */}
          <Modal
            show={showCommentModal}
            onHide={() => setShowCommentModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Comment for {document?.type}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment here..."
                />
              </Form.Group>
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

          {/* Back Button */}
          <div className="mt-4">
            <Link href="/dashboard/admin/applications">
              <Button variant="secondary">Back to Applications</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetailsPage;
