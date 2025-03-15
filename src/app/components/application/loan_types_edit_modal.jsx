"use client";
import { createLoanTypes, updateLoanTypes } from "@/api/client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const LoanTypesEditModal = ({ show, onClose, loanType }) => {
  console.log('loantype modal: ', loanType ? loanType.name : 'undefined');
  const [loanTypeName, setLoanTypeName] = useState(loanType ? loanType.name : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loanType) {
      setLoanTypeName(loanType.name);
    }
  }, [loanType]);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('updating for loan type', loanType.id);
      await updateLoanTypes(loanType.id, { name: loanTypeName });

      console.log('updated loan type');

      onClose();
    } catch (error) {
      console.error("Error updating loantype:", error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Loan Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={loanTypeName}
            onChange={(e) => setLoanTypeName(e.target.value)}
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

export default LoanTypesEditModal;
