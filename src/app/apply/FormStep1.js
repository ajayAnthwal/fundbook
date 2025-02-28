"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

export default function FormStep1({ formData, setFormData, nextStep }) {
  const [loanTypes, setLoanTypes] = useState([
    { id: 1, name: "Personal Loan" },
    { id: 2, name: "Business Loan" },
    { id: 3, name: "Home Loan" },
  ]); 

  return (
    <div>
      <h3 className="text-primary text-center mb-3">Step 1: Loan Details</h3>
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
      <div className="mb-4">
        <label className="form-label fw-bold">Select Loan Type</label>
        <select
          className="form-select"
          value={formData.loanType}
          onChange={(e) =>
            setFormData({ ...formData, loanType: e.target.value })
          }
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
