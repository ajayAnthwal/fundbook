"use client";
import { updateDocumentTypes } from "@/api/client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const DocumentTypesEditModal = ({ show, onClose, documentType }) => {
  const [documentTypeName, setDocumentTypeName] = useState(documentType ? documentType.name : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentType) {
      setDocumentTypeName(documentType.name);
    }
  }, [documentType]);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('updating for document type', documentType.id);
      await updateDocumentTypes(documentType.id, { name: documentTypeName });

      console.log('updated document type');

      onClose();
    } catch (error) {
      console.error("Error updating documenttype:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Document Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={documentTypeName}
            onChange={(e) => setDocumentTypeName(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentTypesEditModal;
