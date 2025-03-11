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
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [userApplicationData, setUserApplicationData] = useState(false);

  useEffect(() => {
    console.log("Fetching API...");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token missing.");

        const storedData = localStorage.getItem("applicationData");
        let applicationId = "";
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            applicationId = parsedData?.id || parsedData?.application?.id || "";
            console.log("Extracted Application ID:", applicationId);
          } catch (e) {
            console.error("Error parsing application data:", e);
          }
        }
        if (!applicationId) throw new Error("Application ID not found.");

        const filters = encodeURIComponent(
          JSON.stringify({ application: { id: applicationId } })
        );
        console.log("Filters:", filters);
        const response = await fetch(
          `http://194.195.112.4:3070/api/v1/application-documents?page=1&filters=${filters}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response);
        if (!response.ok) throw new Error("Failed to fetch documents");

        const data = await response.json();
        console.log("API Data:", data);

        if (data?.data?.length) {
          setUserApplicationData(true);
          setExistingDocuments(data.data);

          // Pre-populate uploadedDocuments state
          const existingUploads = {};
          data.data.forEach((doc) => {
            existingUploads[doc.type] = doc.name;
          });
          setUploadedDocuments(existingUploads);
        } else {
          setUserApplicationData(false);
        }

        // Fetch document mappings (required for both new and edit)
        const loanTypeId = localStorage.getItem("selectedLoanTypeId");
        const businessTypeId = localStorage.getItem("selectedBusinessTypeId");

        if (!loanTypeId || !businessTypeId) {
          throw new Error("Loan Type ID or Business Type ID missing");
        }

        const mappingFilters = encodeURIComponent(
          JSON.stringify({
            businessType: { id: businessTypeId },
            loanType: { id: loanTypeId },
          })
        );

        const mappingResponse = await fetch(
          `http://194.195.112.4:3070/api/v1/document-mappings?page=1&filters=${mappingFilters}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!mappingResponse.ok)
          throw new Error("Failed to fetch document mappings");

        const mappingData = await mappingResponse.json();
        console.log("Document Mappings Data:", mappingData);
        setDocumentMappings(mappingData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error(err.message || "Failed to load data");
      }
    };

    fetchData();
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

      const applicationData = localStorage.getItem("applicationData");
      const applicationId = applicationData
        ? JSON.parse(applicationData)?.id
        : null;
      if (!applicationId) throw new Error("Application ID not found");

      const documentData = {
        status:
          JSON.parse(localStorage.getItem("user"))?.status?.name || "Pending",
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
      <h3 className="text-primary text-center mb-3">
        {userApplicationData ? "Edit Documents" : "Step 4: Document Upload"}
      </h3>
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
                <div className="ms-2">
                  <span className="text-success">
                    Uploaded: {uploadedDocuments[doc.documentType.name]}
                  </span>
                  {userApplicationData && (
                    <span className="ms-2 text-muted">
                      (Previously uploaded)
                    </span>
                  )}
                </div>
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
          {userApplicationData ? "Update Application" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
