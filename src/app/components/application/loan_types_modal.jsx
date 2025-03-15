"use client";
import { createLoanTypes } from "@/api/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const LoanTypesModal = ({ show, onClose }) => {
  const [loanType, setLoanType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createLoanTypes({ name: loanType });

      console.log('saved loan type');

      setLoanType("");
      onClose();
    } catch (error) {
      console.error("Error submitting loantype:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Loan Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
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

export default LoanTypesModal;
