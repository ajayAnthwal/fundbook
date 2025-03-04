"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Modal, Pagination } from "react-bootstrap";

const ApplicationsPage = () => {
  const API_URL = "http://194.195.112.4:3070/api/v1/applications";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Per page limit

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

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
          page: currentPage,
          limit: pageSize,
        },
      });

      setApplications(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationDetails = async (id) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSelectedApplication(response.data);
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch application details");
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
        <>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <tr key={app.id || index}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{app.id || "N/A"}</td>
                    <td>{app.name || "N/A"}</td>
                    <td>{`${app.user?.firstName || "N/A"} ${app.user?.lastName || ""}`}</td>
                    <td>{app.user?.email || "N/A"}</td>
                    <td>{app.user?.mobile || "N/A"}</td>
                    <td>{app.loanType?.name || "N/A"}</td>
                    <td>₹{app.amount || 0}</td>
                    <td>{app.status || "Pending"}</td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button variant="info" onClick={() => fetchApplicationDetails(app.id)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}

      {/* Modal for Application Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication ? (
            <div>
              <p><strong>ID:</strong> {selectedApplication.id}</p>
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              <p><strong>Initiated By:</strong> {selectedApplication.initiatedBy}</p>
              <h5>User Details:</h5>
              <p><strong>Name:</strong> {selectedApplication.user?.firstName} {selectedApplication.user?.lastName}</p>
              <p><strong>Email:</strong> {selectedApplication.user?.email}</p>
              <p><strong>Mobile:</strong> {selectedApplication.user?.mobile}</p>
              <h5>Loan Details:</h5>
              <p><strong>Type:</strong> {selectedApplication.loanType?.name}</p>
              <p><strong>Amount:</strong> ₹{selectedApplication.amount}</p>
              <p><strong>Created At:</strong> {new Date(selectedApplication.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p>Loading details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApplicationsPage;
