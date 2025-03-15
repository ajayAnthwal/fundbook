"use client";
import { saveBusinessType } from "@/api/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const BusinessTypesModal = ({ show, onClose }) => {
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveBusinessType({ name: businessType });

      console.log('saved business type');

      setBusinessType("");
      onClose();
    } catch (error) {
      console.error("Error submitting BusinessType:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Business Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
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

export default BusinessTypesModal;
