"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fileUploadService,
  saveApplicationDocumentService,
} from "@/api/fileService";
import toast from "react-hot-toast";
import axios from "axios"; // Axios import kiya hai jo use ho raha hai

export default function FormStep4({
  formData,
  setFormData,
  prevStep,
  submitForm,
}) {
  const [uploading, setUploading] = useState(false);
  const [documentMappings, setDocumentMappings] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchDocumentMappings = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await axios.get(
          "http://194.195.112.4:3070/api/v1/document-mappings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { filters: category },
          }
        );
        setDocumentMappings(response.data.data);
      } catch (error) {
        console.error("Error fetching document mappings:", error);
      }
    };

    fetchDocumentMappings();
  }, []);

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

      // const uploadResponse = await uploadDocument(file);
      const uploadResponse = await fileUploadService(file);
      console.log("Upload Response:", uploadResponse);

      if (!uploadResponse?.file?.id || !uploadResponse?.file?.path) {
        throw new Error("Invalid upload response format");
      }

      const fileId = uploadResponse.file.id;
      const fileUrl = uploadResponse.file.path;

      console.log("Application ID:", formData);
      console.log("File ID:", fileId, "File URL:", fileUrl);

      const documentData = {
        status: JSON.parse(localStorage.getItem("user"))?.status?.name,
        reviewComments: "comment",
        file: {
          id: fileId,
        },
        type: category,
        name: file?.name,
        application: {
          id: JSON.parse(localStorage.getItem("applicationData"))?.id,
        },
      };

      console.log("Saving document with data:", documentData);
      const saveResponse = await saveApplicationDocumentService(documentData);
      // const saveResponse = await saveDocument(documentData);
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

      toast.success("Document Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload document.");
    }
    setUploading(false);
  };

  const handleSubmitForm = async () => {
    try {
      console.log("Submitting Loan Application with Data:", formData);

      const token = localStorage.getItem("authToken");

      const response = await fetch(
        "http://194.195.112.4:3070/api/v1/application-documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: formData.status,
            reviewComments: formData.reviewComments,  
            file: { id: formData.fileId },
            type: formData.type,
            name: formData.name,
            application: { id: formData.applicationId },
          }),
        }
      );

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
          {documentMappings.length > 0 ? (
            documentMappings.map((doc, index) => (
              <option key={index} value={doc.documentType.name}>
                {doc.documentType.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
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
      <button className="btn btn-primary mt-4" onClick={handleSubmitForm}>
        Submit Loan Application
      </button>
    </div>
  );
}
