"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://194.195.112.4:3070/api/v1/document-types";

const ManageDocuments = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [showModal, setShowModal] = useState(false);
  const [newDocType, setNewDocType] = useState({ type: "", name: "" });

  useEffect(() => {
    fetchDocumentTypes();
  }, [page]);

  const fetchDocumentTypes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found! Please login first.");
        return;
      }

      const res = await axios.get(API_URL, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
      });

      console.log("API Response:", res.data);
      if (res.data?.data) {
        setDocumentTypes(res.data.data);
      } else {
        setDocumentTypes([]);
      }
    } catch (error) {
      console.error("Error fetching document types:", error.response);
      setDocumentTypes([]);
    }
  };

  const addDocumentType = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found! Please login first.");
        return;
      }

      const res = await axios.post(
        API_URL,
        { type: newDocType.type, name: newDocType.name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("POST API Response:", res.data);
      fetchDocumentTypes();
      setShowModal(false);
      setNewDocType({ type: "", name: "" });
    } catch (error) {
      console.error("Error adding document type:", error.response);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">📄 Manage Document Types</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Document Type
      </button>
      <ul className="list-group">
        {documentTypes.length > 0 ? (
          documentTypes.map((doc, index) => (
            <li key={index} className="list-group-item">
              {doc?.name} <span className="text-muted">({doc?.type})</span>
            </li>
          ))
        ) : (
          <li className="list-group-item">No Document Types Found</li>
        )}
      </ul>
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
      {showModal && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Document Type</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Type (e.g., file, pdf, image)"
                  value={newDocType.type}
                  onChange={(e) =>
                    setNewDocType({ ...newDocType, type: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={newDocType.name}
                  onChange={(e) =>
                    setNewDocType({ ...newDocType, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={addDocumentType}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDocuments;
