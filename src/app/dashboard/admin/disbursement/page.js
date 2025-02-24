  "use client";
import { useState } from "react";

const Disbursement = () => {
  const [form, setForm] = useState({ loanId: "", amount: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Disbursement for Loan ${form.loanId} saved successfully!`);
  };

  return (
    <div className="container mt-5" style={{ marginTop: "200px !important" }}>
      <h1 className="fs-4 fw-bold mb-4">🏦 Loan Disbursement</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Loan ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Loan ID"
            onChange={(e) => setForm({ ...form, loanId: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount Disbursed</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Amount"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Disbursement Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Disbursement;