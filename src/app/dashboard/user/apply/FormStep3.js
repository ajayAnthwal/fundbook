"use client";
import { useState, useEffect } from "react";

const BASE_URL = "http://194.195.112.4:3070";

const FormStep3 = ({ formData, updateFormData, prevStep, nextStep }) => {
  const [localFormData, setLocalFormData] = useState({
    pan: "",
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formStyles = {
    container: {
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "1rem",
    },
    card: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "2rem",
    },
    title: {
      textAlign: "center",
      marginBottom: "2rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      height: "50px",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      height: "50px",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      height: "50px",
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#842029",
      padding: "1rem",
      borderRadius: "4px",
      marginBottom: "1rem",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      margin: "0 -0.5rem",
    },
    col: {
      flex: "1 1 300px",
      padding: "0 0.5rem",
    },
  };

  
  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Please login to submit KYC details");
      }

      const applicationData = localStorage.getItem("applicationData");
      if (!applicationData) {
        throw new Error(
          "Application data not found. Please complete previous steps first."
        );
      }

      let applicationId;
      try {
        const parsedData = JSON.parse(applicationData);
        console.log("Parsed application data:", parsedData);

        if (parsedData.id) {
          applicationId = parsedData.id;
        } else if (parsedData.application && parsedData.application.id) {
          applicationId = parsedData.application.id;
        } else {
          throw new Error("Invalid application data structure");
        }
      } catch (e) {
        console.error("Failed to parse application data:", e);
        throw new Error("Invalid application data format");
      }

      if (!localFormData.pan || !localFormData.name) {
        throw new Error("Please fill all required fields");
      }

      const kycData = {
        pan: localFormData.pan.toUpperCase(),
        name: localFormData.name,
        application: {
          id: applicationId,
        },
      };

      console.log("Submitting KYC details:", kycData);
      console.log("API URL:", `${BASE_URL}/api/v1/application-kycs`);

      const response = await fetch(`${BASE_URL}/api/v1/application-kycs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kycData),
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed API Response:", responseData);
      } catch (e) {
        console.error("Failed to parse response:", e);
        throw new Error("Invalid response from server");
      }
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit KYC details");
      }
      console.log("KYC details submitted successfully:", responseData);
      localStorage.setItem("kycData", JSON.stringify(responseData));
      if (nextStep) {
        nextStep();
      }
    } catch (err) {
      console.error("KYC Submit Error:", err);
      setError(err.message || "Failed to submit KYC details");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">KYC Details</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            PAN Number
            <input
              type="text"
              value={localFormData.pan}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, pan: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter PAN Number"
              maxLength="10"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Full Name (as per PAN)
            <input
              type="text"
              value={localFormData.name}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter Full Name"
            />
          </label>
        </div>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          {prevStep && (
            <button
              type="button"
              onClick={prevStep}
              style={{
                ...formStyles.button,
                backgroundColor: "#6c757d",
              }}
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            style={{
              ...formStyles.button,
              ...(submitting ? formStyles.buttonDisabled : {}),
            }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep3;
