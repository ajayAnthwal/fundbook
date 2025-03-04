"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fileUploadService,
  saveApplicationDocumentService,
} from "@/api/fileService";
import toast from "react-hot-toast";
import axios from "axios";

export default function FormStep4({
  formData,
  setFormData,
  prevStep,
  submitForm,
}) {
  const [uploading, setUploading] = useState(false);
  const [documentMappings, setDocumentMappings] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  useEffect(() => {
    const fetchDocumentMappings = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found");

        const response = await axios.get(
          "http://194.195.112.4:3070/api/v1/document-mappings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocumentMappings(response.data.data);
      } catch (error) {
        console.error("Error fetching document mappings:", error);
      }
    };

    fetchDocumentMappings();
  }, []);

  const handleFileChange = async (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      await handleUpload(file, docType);
    }
  };

  const handleUpload = async (file, docType) => {
    setUploading(true);
    try {
      const uploadResponse = await fileUploadService(file);
      if (!uploadResponse?.file?.id) throw new Error("Invalid upload response");

      const applicationId = JSON.parse(localStorage.getItem("applicationData"))?.id;
      if (!applicationId) throw new Error("Application ID not found");

      const documentData = {
        status: JSON.parse(localStorage.getItem("user"))?.status?.name || "Pending",
        reviewComments: "Uploaded Successfully",
        file: { id: uploadResponse.file.id },
        type: docType,
        name: file.name,
        application: { id: applicationId },
      };

      await saveApplicationDocumentService(documentData);
      setUploadedDocuments((prev) => ({
        ...prev,
        [docType]: file.name,
      }));
      toast.success("Document Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Failed to upload document.");
    }
    setUploading(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary text-center mb-3">Step 4: Document Upload</h3>
      <div className="mb-3">
        {documentMappings.length > 0 ? (
          documentMappings.map((doc, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <span className="fw-bold me-3">{doc.documentType.name}</span>
              <input
                type="file"
                className="form-control me-2"
                onChange={(e) => handleFileChange(e, doc.documentType.name)}
                disabled={uploading || uploadedDocuments[doc.documentType.name]}
              />
              {uploadedDocuments[doc.documentType.name] && (
                <span className="text-success ms-2">Uploaded: {uploadedDocuments[doc.documentType.name]}</span>
              )}
            </div>
          ))
        ) : (
          <p>Loading documents...</p>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-secondary px-4 py-2" onClick={prevStep}>
          Previous
        </button>
        <button className="btn btn-primary px-4 py-2" onClick={submitForm}>
          Submit Loan Application
        </button>
      </div>
    </div>
  );
}