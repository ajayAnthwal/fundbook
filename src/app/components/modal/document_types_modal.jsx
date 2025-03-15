"use client";
import { createDocumentTypes } from "@/api/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const DocumentTypesModal = ({ show, onClose }) => {
  const [documentType, setDocumentType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createDocumentTypes({ name: documentType, type: documentType });

      console.log('saved document type');

      setDocumentType("");
      onClose();
    } catch (error) {
      console.error("Error submitting document ype:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Document Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentTypesModal;
