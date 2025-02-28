"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Documents = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Business License.pdf", type: "Business Docs" },
    { id: 2, name: "Bank Statement.pdf", type: "Financial Docs" },
    { id: 3, name: "Additional Proof.pdf", type: "Additional Docs" },
  ]);

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">📜 My Documents</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>
                  🗑 Delete
                </button>
                <button className="btn btn-sm btn-success ms-2">⬇ Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
