"use client";
import { useEffect, useState } from "react";
import { getLoanTypes } from "./api";

export default function FormStep1({ formData, setFormData, nextStep }) {
  const [loanTypes, setLoanTypes] = useState([]);

  useEffect(() => {
    async function fetchLoanTypes() {
      try {
        const data = await getLoanTypes();
        setLoanTypes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchLoanTypes();
  }, []);

  return (
    <div>
      <h3>Step 1: Loan Amount & Type</h3>
      <input
        type="number"
        placeholder="Loan Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <select
        value={formData.loanType}
        onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
      >
        {loanTypes.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
