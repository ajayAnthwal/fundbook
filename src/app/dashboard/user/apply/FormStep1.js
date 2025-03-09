"use client";
import { updateApplication } from "@/api/loanService";
import { createApplication, getLoanTypes } from "@/api/loanService";
import { useState, useEffect } from "react";

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

export default function FormStep1({ formData, updateFormData, nextStep }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loanTypes, setLoanType] = useState([]);

  const [localFormData, setLocalFormData] = useState({
    name: "",
    loanType: "",
    amount: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  useEffect(() => {
    const userapplicationdata = JSON.parse(localStorage.getItem("userData"));
    if (userapplicationdata) {
      setLocalFormData({
        name: userapplicationdata?.name,
        loanType: userapplicationdata?.loanType?.name,
        amount: userapplicationdata?.amount,
      });
    }
    console.log("abccc", userapplicationdata);
    console.log("formdata", localFormData);
  }, []);

  useEffect(() => {
    (async function () {
      const data = await getLoanTypes();
      console.log("🚀 Loan Types Fetched:", data?.data);
      if (data?.data?.length) {
        setLoanType(data?.data);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Loan Type select होते ही localStorage में save करें
    if (name === "loanType") {
      localStorage.setItem("selectedLoanTypeId", value);
      console.log("💾 Selected Loan Type ID saved:", value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const applicationData = {
        amount: Number(localFormData.amount),
        loanType: {
          id: localFormData.loanType,
        },
        name: localFormData.name,
      };

      let res;

      if (localStorage.getItem("userData")) {
        res = await updateApplication(applicationData, 4545454);
      } else {
        res = await createApplication(applicationData);
      }

      if (res) {
        localStorage.setItem("applicationData", JSON.stringify(res));
        if (nextStep) {
          nextStep();
        }
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

        {error && <div style={formStyles.error}>{error}</div>}

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
                  {loanTypes &&
                    loanTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div style={formStyles.formGroup}>
            <label style={formStyles.label} htmlFor="amount">
              Loan Amount
            </label>
            <input
              type="number"
              style={formStyles.input}
              id="amount"
              name="amount"
              value={localFormData.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter loan amount"
            />
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
              {submitting ? "Submitting..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
