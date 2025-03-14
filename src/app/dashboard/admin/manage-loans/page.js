"use client";
import React, { useEffect, useState } from "react";
import { createLoanTypes, getLoanTypes } from "@/api/client";

const ManageLoanTypes = () => {
  const [loanTypes, setLoanType] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await getLoanTypes();
      if (data) {
        setLoanType(data.data);
      }
    })();
  }, []);

  const handleAddBusiness = async () => {
    const name = prompt("Enter new Loan Type:");
    if (!name) return;

    try {
      const res = await createLoanTypes({ name });
      if (res) {
        toast.success("Loan type added successfully!");
        setLoanType([...loanTypes, res]);
      }
    } catch (err) {
      console.error("Application Submit Error:", err);
      toast.error(err.message || "Failed to submit Loan type!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Loan Types</h1>

      <button onClick={handleAddBusiness} className="btn btn-success mb-3">
        ➕ Add Loan Type
      </button>

      <ul className="list-group">
        {loanTypes.length > 0 ? (
          loanTypes.map((b, index) => (
            <li key={index} className="list-group-item">
              {b.name}
            </li>
          ))
        ) : (
          <li className="list-group-item">No Loan Types Found</li>
        )}
      </ul>
    </div>
  );
};

export default ManageLoanTypes;
