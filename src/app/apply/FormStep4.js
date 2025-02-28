"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { uploadDocument, saveDocument } from "./api";

export default function FormStep4({ formData, setFormData, prevStep, submitForm }) {
  const [category, setCategory] = useState("Business Docs");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      console.log("Uploading file:", file.name);

      const uploadResponse = await uploadDocument(file);
      console.log("Upload Response:", uploadResponse);

      if (!uploadResponse?.file?.id || !uploadResponse?.file?.path) {
        throw new Error("Invalid upload response format");
      }

      const fileId = uploadResponse.file.id;
      const fileUrl = uploadResponse.file.path;

      console.log("Application ID:", formData.applicationId);
      console.log("File ID:", fileId, "File URL:", fileUrl);

      const documentData = {
        applicationId: formData.applicationId,
        fileId,
        category,
      };

      console.log("Saving document with data:", documentData);
      const saveResponse = await saveDocument(documentData);
      console.log("Document saved successfully:", saveResponse);

      const newDocument = {
        name: file.name,
        url: fileUrl,
        category,
        fileId,
      };

      setFormData({
        ...formData,
        documents: [...formData.documents, newDocument],
      });

      alert("Document Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload document.");
    }
    setUploading(false);
  };

  const handleSubmitForm = async () => {
    try {
      console.log("Submitting Loan Application with Data:", formData);

      const response = await fetch("/api/loan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message || "Unknown error"}`);
      }

      const result = await response.json();
      console.log("Loan Application Submitted Successfully:", result);
      alert("Loan Application Submitted!");
    } catch (error) {
      console.error("Submit Form Error:", error);
      alert("Failed to submit loan application.");
    }
  };

  const handleDelete = (index) => {
    const updatedDocs = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: updatedDocs });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary text-center mb-3">Step 4: Document Upload</h3>
      <div className="mb-3">
        <label className="form-label fw-bold">Select Document Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Business Docs</option>
          <option>Financial Docs</option>
          <option>Additional Docs</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Select & Upload Document</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      <h5 className="text-primary mt-4">Uploaded Documents</h5>
      <ul className="list-group">
        {formData.documents.map((doc, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {doc.name}{" "}
            <span className="badge bg-secondary">{doc.category}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Submit Button */}
      <button className="btn btn-primary mt-4" onClick={handleSubmitForm}>
        Submit Loan Application
      </button>
    </div>
  );
}
