"use client";
import { saveDocumentComment } from "@/api/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// CommentModal component
const CommentModal = ({ show, onClose, document, refreshDocuments }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // This function fires an API call when the comment is submitted.
  const handleSubmitComment = async () => {
    setLoading(true);
    try {
      // update comment in document
      await saveDocumentComment(document.id, comment);

      console.log('saved comment');

      await refreshDocuments();
      
      // Optionally clear the comment after a successful submission
      setComment("");
      // Close the modal
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
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="commentTextArea">
          <Form.Label>Comment for {document?.type}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitComment} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
