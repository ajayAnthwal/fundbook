import { Badge, Button, Table } from "react-bootstrap";

function ApplicationAdditionalDocuments({ documents }) {
  console.log('additional documents', documents);
  return (
    <div className="mb-4">
      <h3 className="text-center bg-info text-dark p-2 rounded">
        Additional Documents
      </h3>
      <Table bordered hover className="mt-3">
        <thead className="bg-info text-dark">
          <tr>
            <th className="p-3">Document Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created At</th>
            <th className="p-3">View</th>
            <th className="p-3">Comments</th>
          </tr>
        </thead>
        <tbody>
          {documents.data.map((doc) => (
            <tr key={doc.id}>
              <td className="p-3">
                <strong>{doc.type}</strong>
              </td>
              <td className="p-3">
                <Badge
                  bg={doc.status === "Active" ? "success" : "warning"}
                >
                  {doc.status || "Pending"}
                </Badge>
              </td>
              <td className="p-3">
                {doc.createdAt
                  ? new Date(doc.createdAt).toLocaleString()
                  : "N/A"}
              </td>
              <td className="p-3">
                {doc.file?.path ? (
                  <a
                    href={doc.file.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Document
                  </a>
                ) : (
                  <Badge bg="warning">Not Uploaded</Badge>
                )}
              </td>
              <td className="p-3">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    className={
                      doc.status === "Active"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {doc.reviewComments || "No comments"}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => {
                      setDocument(doc);
                      setComment(doc.reviewComments || "");
                      setShowCommentModal(true);
                    }}
                  >
                    Add Comment
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ApplicationAdditionalDocuments;