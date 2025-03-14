"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import { getApplications } from "@/api/client";

const ApplicationDocumentsPage = () => {
  const API_URL = "http://194.195.112.4:3070/api/v1/application-documents";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Per page limit

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const applications = await getApplications(currentPage);
      console.log(applications.data);
      setApplications(applications.data);
      // setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th className="text-white text-center">Application</th>
                <th className="text-white text-center">Started At</th>
                <th className="text-white text-center">Amount</th>
                <th className="text-white text-center">Status</th>
                <th className="text-white text-center">CA</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={index}>
                    <td>
                      <Link href={`/dashboard/admin/applications/${application.id}`}>
                        {application.name}
                      </Link>
                    </td>
                    <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                    <td>{application.amount}</td>
                    <td>{application.status}</td>
                    <td>{application.ca ? application.ca.firstName : 'n/a'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No Applications found.
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
