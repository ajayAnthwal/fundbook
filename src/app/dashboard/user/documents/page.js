"use client";
import { useEffect, useState } from "react";
import { getApplicationDocuments } from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "next/navigation";

const Documents = () => {
  const { id: applicationId } = useParams(); // URL se application ID fetch kar raha hai
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getApplicationDocuments(applicationId);
        setDocuments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) fetchDocuments();
  }, [applicationId]);

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">📜 My Documents</h2>

      {loading && <p>Loading documents...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && documents.length === 0 && <p>No documents found.</p>}

      {!loading && documents.length > 0 && (
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
      )}
    </div>
  );
};

export default Documents;
