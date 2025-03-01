"use client";
import { useState, useEffect } from "react";

const BASE_URL = "http://194.195.112.4:3070";

// Hardcoded loan types
const LOAN_TYPES = [
  { id: "PERSONAL", name: "Personal Loan" },
  { id: "BUSINESS", name: "Business Loan" },
  { id: "HOME", name: "Home Loan" },
  { id: "EDUCATION", name: "Education Loan" },
  { id: "VEHICLE", name: "Vehicle Loan" },
];

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
  textarea: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "100px",
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

export default function FormStep1({ formData, updateFormData, nextStep }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    name: "",
    loanType: "",
    amount: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      console.log("Auth Token:", token ? "Present" : "Missing");

      if (!token) {
        throw new Error("Please login to submit application");
      }

      // Log headers for debugging
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log("Request Headers:", headers);
      const applicationData = {
        amount: Number(localFormData.amount),
        loanType: {
          id: localFormData.loanType,
        },
        name: localFormData.name,
      };

      console.log("Submitting application:", applicationData);
      console.log("API URL:", `${BASE_URL}/api/v1/applications`);

      const response = await fetch(`${BASE_URL}/api/v1/applications`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(applicationData),
      });

      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit application");
      }

      localStorage.setItem("applicationData", JSON.stringify(responseData));
      if (nextStep) {
        nextStep();
      }
    } catch (err) {
      console.error("Application Submit Error:", err);
      setError(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.card}>
        <h3 style={formStyles.title}>Loan Application - Step 1</h3>

        {error && (
          <div style={formStyles.error}>
            {error}
            {(error.includes("Please login") ||
              error.includes("Session expired") ||
              error.includes("No token found") ||
              error.includes("User data not found")) && (
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="/auth"
                  style={{
                    ...formStyles.button,
                    display: "inline-block",
                    width: "auto",
                    padding: "0.5rem 1rem",
                  }}
                >
                  Go to Login
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={formStyles.row}>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  style={formStyles.input}
                  id="name"
                  name="name"
                  value={localFormData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="loanType">
                  Loan Type
                </label>
                <select
                  style={formStyles.select}
                  id="loanType"
                  name="loanType"
                  value={localFormData.loanType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Loan Type</option>
                  {LOAN_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={formStyles.row}>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="amount">
                  Loan Amount
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1rem",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    style={{ ...formStyles.input, paddingLeft: "30px" }}
                    id="amount"
                    name="amount"
                    value={localFormData.amount}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Enter loan amount"
                  />
                </div>
              </div>
            </div>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  style={formStyles.input}
                  id="phone"
                  name="phone"
                  value={localFormData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>
            </div>
          </div>

          <div style={formStyles.formGroup}>
            <label style={formStyles.label} htmlFor="address">
              Address
            </label>
            <textarea
              style={formStyles.textarea}
              id="address"
              name="address"
              value={localFormData.address}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Enter your address"
            ></textarea>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              style={{
                ...formStyles.button,
                ...(submitting ? formStyles.buttonDisabled : {}),
              }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
