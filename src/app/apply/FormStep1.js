"use client";
import { useEffect, useState } from "react";
import { getLoanTypes } from "./api";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import

export default function FormStep1({ formData, setFormData, nextStep }) {
  const [loanTypes, setLoanTypes] = useState([]);

  useEffect(() => {
    async function fetchLoanTypes() {
      try {
        const data = await getLoanTypes();
        setLoanTypes(data);
      } catch (error) {
        console.error("Error fetching loan types:", error);
      }
    }
    fetchLoanTypes();
  }, []);

  return (
    <div>
      <h3 className="text-primary text-center mb-3">Step 1: Loan Details</h3>

      {/* Loan Amount */}
      <div className="mb-3">
        <label className="form-label fw-bold">Loan Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter loan amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
      </div>

      {/* Loan Type */}
      <div className="mb-4">
        <label className="form-label fw-bold">Select Loan Type</label>
        <select
          className="form-select"
          value={formData.loanType}
          onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
          required
        >
          <option value="">Choose loan type</option>
          {loanTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
}