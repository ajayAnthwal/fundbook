"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDocumentsById } from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentsPage = () => {
  const [documentId, setDocumentId] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setDocumentId(searchParams.get("id"));
  }, [searchParams]);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (documentId) {
      fetchDocuments();
    }
  }, [documentId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await getDocumentsById(documentId);
      if (data) {
        setDocuments(Array.isArray(data) ? data : [data]); 
        setError("");
      }
    } catch (err) {
      console.error("Documents Error:", err);
      setError(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (doc) => {
    if (doc.file && doc.file.path) {
      window.open(doc.file.path, "_blank");
    } else {
      alert("Document URL not available");
    }
  };

  const getFileIcon = (path) => {
    const ext = path.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📎";
    }
  };

  if (loading && page === 1) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Documents</h2>

      {documents.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {documents.map((doc) => (
            <div key={doc.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-3 me-2">
                      {getFileIcon(doc.file?.path || "")}
                    </span>
                    <h5 className="card-title mb-0 text-truncate">
                      {doc.name || doc.file?.path?.split("/").pop()}
                    </h5>
                  </div>
                  {doc.type && (
                    <p className="card-text">
                      <small className="text-muted">Type: {doc.type}</small>
                    </p>
                  )}
                  <p className="card-text">
                    <small className="text-muted">
                      Status: {doc.status || "Active"}
                    </small>
                  </p>
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="btn btn-primary btn-sm"
                  >
                    View Document
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No documents found</div>
      )}
    </div>
  );
};

export default DocumentsPage;
