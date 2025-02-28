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
  const [category, setCategory] = useState("Business Docs"); 

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
      const newDocument = { name: selectedFile.name, url: response.fileUrl, category };
      setFormData({
        ...formData,
        documents: [...formData.documents, newDocument],
      });
      setSelectedFile(null);
      alert("Document Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
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
        <label className="form-label fw-bold">Upload Document</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>
      <button className="btn btn-success mb-3 w-100" onClick={handleUpload}>
        Upload Document
      </button>
      <h5 className="text-primary mt-4">Uploaded Documents</h5>
      <ul className="list-group">
        {formData.documents.map((doc, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {doc.name} <span className="badge bg-secondary">{doc.category}</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
