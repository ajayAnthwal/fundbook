"use client";
import { useState } from "react";

const ManageLoans = () => {
  const [loanTypes, setLoanTypes] = useState(["Home Loan", "Business Loan"]);

  const addLoan = () => {
    const name = prompt("Enter new Loan Type:");
    if (name) setLoanTypes([...loanTypes, name]);
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏦 Manage Loan Types</h1>

      <button onClick={addLoan} className="btn btn-success mb-3">
        ➕ Add Loan Type
      </button>

      <ul className="list-group">
        {loanTypes.map((l, index) => (
          <li key={index} className="list-group-item">{l}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLoans;