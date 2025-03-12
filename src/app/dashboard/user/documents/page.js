"use client";
import { Suspense, useEffect, useState } from "react";
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

  useEffect(() => {
    if (documentId) {
      fetchDocuments();
    }
  }, [documentId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await getDocumentsById(documentId);
      setDocuments(Array.isArray(data) ? data : [data]);
      setError("");
    } catch (err) {
      console.error("Documents Error:", err);
      setError(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Documents</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading documents...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : documents.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {documents.map((doc) => (
            <div key={doc.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{doc.name || "Untitled Document"}</h5>
                  <button onClick={() => window.open(doc.file?.path, "_blank")} className="btn btn-primary btn-sm">
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

// ✅ Wrap in Suspense
const DocumentsPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading Documents...</div>}>
      <DocumentsPage />
    </Suspense>
  );
};

export default DocumentsPageWrapper;
