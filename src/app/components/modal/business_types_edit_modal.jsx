"use client";
import { createLoanTypes, updateBusinessTypes, updateLoanTypes } from "@/api/client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const BusinessTypesEditModal = ({ show, onClose, businessType }) => {
  const [businessTypeName, setBusinessTypeName] = useState(businessType ? businessType.name : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (businessType) {
      setBusinessTypeName(businessType.name);
    }
  }, [businessType]);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('updating for business type', businessType.id);
      await updateBusinessTypes(businessType.id, { name: businessTypeName });

      console.log('updated businessType');

      onClose();
    } catch (error) {
      console.error("Error updating businessType:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Business Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={businessTypeName}
            onChange={(e) => setBusinessTypeName(e.target.value)}
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

export default BusinessTypesEditModal;
