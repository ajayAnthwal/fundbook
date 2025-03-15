"use client";
import { createAdditionalDocumentRequest, saveDocumentComment } from "@/api/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const AskAdditionalDocumentModal = ({ applicationId, show, onClose, refreshDocuments }) => {
  const [documentType, setDocumentType] = useState("");
  const [documentDetails, setDocumentDetails] = useState("");
  const [loading, setLoading] = useState(false);

  // This function fires an API call when the comment is submitted.
  const handleSubmitDocument = async () => {
    setLoading(true);
    try {
      // update comment in document
      await createAdditionalDocumentRequest(applicationId, documentDetails, documentType);

      console.log('saved additional document');

      await refreshDocuments();
      
      // Optionally clear the inputs
      setDocumentType("");
      setDocumentDetails("");
      // Close the modal upon success
      onClose();
    } catch (error) {
      console.error("Error submitting comment:", error);
      // You could add user notification for errors here.
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="documentType">
          <Form.Label>Document Type</Form.Label>
          <Form.Control
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            placeholder="Enter document type"
          />
        </Form.Group>
        <Form.Group controlId="documentDetails" className="mt-3">
          <Form.Label>Document Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={documentDetails}
            onChange={(e) => setDocumentDetails(e.target.value)}
            placeholder="Enter document details..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitDocument} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AskAdditionalDocumentModal;
