"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fileUploadService,
  saveApplicationDocumentService,
} from "@/api/fileService";
import toast from "react-hot-toast";

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

        // First, try to fetch existing application documents
        try {
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
            // We have existing documents - we're in edit mode
            setUserApplicationData(true);
            setExistingDocuments(data.data);

            // Pre-populate uploadedDocuments state
            const existingUploads = {};
            data.data.forEach((doc) => {
              existingUploads[doc.type] = doc.name;
            });
            setUploadedDocuments(existingUploads);

            // In edit mode, we don't need to fetch document mappings
            return;
          }
        } catch (err) {
          console.error("Error fetching application documents:", err);
          // Don't show error toast here, as we'll try document mappings next
        }

        // If we reach here, we're in new document mode
        setUserApplicationData(false);

        // Only fetch document mappings for new cases
        try {
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
          console.error("Error fetching document mappings:", err);
          toast.error(err.message || "Failed to load document mappings");
        }
      } catch (err) {
        console.error("Error in main fetch flow:", err);
        toast.error(err.message || "Failed to load data");
      }
    };

    fetchData();
  }, []);

  const handleFileChange = async (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true);
        console.log("Uploading file for document type:", docType);

        // First upload the file
        const uploadResponse = await fileUploadService(file);
        console.log("File upload response:", uploadResponse);

        if (!uploadResponse?.file?.id) {
          throw new Error("Invalid upload response");
        }

        // Get application ID
        const applicationData = localStorage.getItem("applicationData");
        const parsedData = JSON.parse(applicationData);
        const applicationId = parsedData?.id || parsedData?.application?.id;

        if (!applicationId) {
          throw new Error("Application ID not found");
        }

        // Prepare document data
        const documentData = {
          status:
            JSON.parse(localStorage.getItem("user"))?.status?.name || "Pending",
          reviewComments: "Uploaded Successfully",
          file: { id: uploadResponse.file.id },
          type: docType,
          name: file.name,
          application: { id: applicationId },
        };

        // Save document to application
        const saveResponse = await saveApplicationDocumentService(documentData);
        console.log("Document save response:", saveResponse);

        // Update UI state
        setUploadedDocuments((prev) => ({
          ...prev,
          [docType]: file.name,
        }));

        // If in edit mode, update existing documents
        if (userApplicationData) {
          setExistingDocuments((prev) => [
            ...prev,
            { ...documentData, id: saveResponse.id },
          ]);
        }

        toast.success(`${docType} uploaded successfully!`);
    } catch (error) {
        console.error("Upload Error:", error);
        toast.error(`Failed to upload ${docType}: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary text-center mb-3">
        {userApplicationData ? "Edit Documents" : "Step 4: Document Upload"}
      </h3>
      <div className="mb-3">
        {userApplicationData ? (
          // Show existing documents with upload option
          existingDocuments.map((doc, index) => (
            <div key={index} className="row align-items-center mb-3">
              <div className="col-md-3">
                <span className="fw-bold">{doc.type}</span>
              </div>
              <div className="col-md-9">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-success">Current: {doc.name}</span>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, doc.type)}
                    disabled={uploading}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
        </div>
      </div>
          ))
        ) : documentMappings.length > 0 ? (
          // For new uploads, show document mappings
        documentMappings.map((doc, index) => (
            <div key={index} className="row align-items-center mb-3">
              <div className="col-md-3">
                <span className="fw-bold">{doc.documentType.name}</span>
              </div>
              <div className="col-md-9">
                <div className="d-flex align-items-center gap-2">
              <input
                type="file"
                className="form-control"
                    onChange={(e) => handleFileChange(e, doc.documentType.name)}
                    disabled={uploading}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  {uploadedDocuments[doc.documentType.name] && (
                    <span className="text-success">
                      Uploaded: {uploadedDocuments[doc.documentType.name]}
                    </span>
                  )}
                  {uploading && (
                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
          </div>
        ))
      ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading documents...</span>
            </div>
            <p className="mt-2">Loading documents...</p>
          </div>
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
