"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

const ApplicationDocumentsPage = () => {
  const API_URL = "http://194.195.112.4:3070/api/v1/application-documents";
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Per page limit

  useEffect(() => {
    fetchDocuments();
  }, [currentPage]);

  const fetchDocuments = async () => {
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
        params: { page: currentPage, limit: pageSize, filters: "" },
      });

      setDocuments(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Application Documents</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th className="text-white text-center">#</th>
                <th className="text-white text-center">Document ID</th>
                <th className="text-white text-center">Name</th>
                <th className="text-white text-center">Status</th>
                <th className="text-white text-center">Created At</th>
                <th className="text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={doc.id || index}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{doc.id || "N/A"}</td>
                    <td>{doc.application?.name || "N/A"}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          doc.status === "Active" ? "success" : "warning"
                        }`}
                      >
                        {doc.status || "Pending"}
                      </span>
                    </td>
                    
                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/dashboard/admin/applications/${doc.id}`}>
                        <Button variant="info" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No documents found.
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default ApplicationDocumentsPage;
