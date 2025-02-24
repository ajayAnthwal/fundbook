"use client";
import { useState } from "react";

const ManageDocuments = () => {
  const [documents, setDocuments] = useState(["Aadhar Card", "PAN Card"]);

  const addDocument = () => {
    const name = prompt("Enter new Document Type:");
    if (name) setDocuments([...documents, name]);
  };

  return (
    <div className="container mt-5" style={{ marginTop: "200px !important" }}>
      <h1 className="fs-4 fw-bold mb-4">📄 Manage Documents</h1>

      <button onClick={addDocument} className="btn btn-success mb-3">
        ➕ Add Document Type
      </button>

      <ul className="list-group">
        {documents.map((d, index) => (
          <li key={index} className="list-group-item">{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDocuments;