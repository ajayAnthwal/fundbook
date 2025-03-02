"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://194.195.112.4:3070/api/v1/document-types";

const ManageDocuments = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // You can change the limit if needed

  useEffect(() => {
    fetchDocumentTypes();
  }, [page]);

  const fetchDocumentTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      setDocumentTypes(res.data || []);
    } catch (error) {
      console.error("Error fetching document types:", error);
      setDocumentTypes([]);
    }
  };

  const handleAddDocumentType = async () => {
    const name = prompt("Enter new Document Type:");
    if (!name) return;

    try {
      const res = await axios.post(API_URL, { type: "document", name });
      if (res.data) {
        // toast.success("Document type added successfully!");
        fetchDocumentTypes(); // Refresh list after adding
      }
    } catch (err) {
      console.error("Error adding document type:", err);
      // toast.error(err.response?.data?.message || "Failed to add document type!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">📄 Manage Document Types</h1>

      <button onClick={handleAddDocumentType} className="btn btn-success mb-3">
        ➕ Add Document Type
      </button>

      <ul className="list-group">
        {documentTypes.length > 0 ? (
          documentTypes.map((doc, index) => (
            <li key={index} className="list-group-item">
              {doc?.name}
            </li>
          ))
        ) : (
          <li className="list-group-item">No Document Types Found</li>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="mt-3">
        <button
          className="btn btn-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅️ Previous
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ManageDocuments;
