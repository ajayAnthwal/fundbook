"use client";
import { uploadDocument } from "./api";
import { useState } from "react";

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
    <div>
      <h3>Step 4: Document Upload</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}
