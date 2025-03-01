"use client";
import { useEffect, useState } from "react";
import { getApplicationDocuments, viewDocument } from "@/api/documents";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await getApplicationDocuments(page, limit);
      if (data && data.data) {
        if (page === 1) {
          setDocuments(data.data);
        } else {
          setDocuments(prev => [...prev, ...data.data]);
        }
        setHasMore(data.data.length === limit);
        setError("");
      }
    } catch (err) {
      console.error("Documents Error:", err);
      if (err.message === "No token found!") {
        setError("Please login to view your documents");
      } else if (err.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(err.message || "Failed to load documents");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = async (doc) => {
    try {
      setViewLoading(true);
      setSelectedDoc(doc);
      const data = await viewDocument(doc.id);
      if (data && data.viewUrl) {
        window.open(data.viewUrl, '_blank');
      }
    } catch (err) {
      console.error("View Document Error:", err);
      setError(err.message || "Failed to view document");
    } finally {
      setViewLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const getFileIcon = (path) => {
    const ext = path.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📎';
    }
  };

  if (loading && page === 1) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          {error}
          {(error.includes("Please login") || error.includes("Session expired")) && (
            <div className="mt-3">
              <a href="/auth" className="btn btn-primary">Go to Login</a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Documents</h2>

      {documents.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {documents.map((doc) => (
              <div key={doc.id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className="fs-3 me-2">{getFileIcon(doc.path)}</span>
                      <h5 className="card-title mb-0 text-truncate">
                        {doc.name || doc.path.split('/').pop()}
                      </h5>
                    </div>
                    {doc.type && (
                      <p className="card-text">
                        <small className="text-muted">Type: {doc.type}</small>
                      </p>
                    )}
                    <p className="card-text">
                      <small className="text-muted">Status: {doc.status || 'Active'}</small>
                    </p>
                    <button 
                      onClick={() => handleViewDocument(doc)}
                      className="btn btn-primary btn-sm"
                      disabled={viewLoading && selectedDoc?.id === doc.id}
                    >
                      {viewLoading && selectedDoc?.id === doc.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </>
                      ) : (
                        'View Document'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-4">
              <button 
                className="btn btn-outline-primary" 
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-info">No documents found</div>
      )}
    </div>
  );
};

export default DocumentsPage;
