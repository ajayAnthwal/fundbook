"use client";
import { uploadDocument } from "./api";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

export default function FormStep4({
  formData,
  setFormData,
  prevStep,
  submitForm,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await uploadDocument(selectedFile);
      setFormData({
        ...formData,
        documents: [...formData.documents, response.fileUrl],
      });
      alert("Document Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary text-center mb-3">Step 4: Document Upload</h3>
      <div className="mb-3">
        <label className="form-label fw-bold">Upload Document</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <button className="btn btn-success mb-3 w-100" onClick={handleUpload}>
        Upload Document
      </button>
    </div>
  );
}
