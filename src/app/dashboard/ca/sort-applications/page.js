"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SortApplications = () => {
  const [sortBy, setSortBy] = useState("status");

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">🔍 Sort Applications</h2>
      <label className="form-label fw-bold">Sort by:</label>
      <select className="form-select mb-3" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="status">Status</option>
        <option value="date">Date Started</option>
        <option value="business">Business Name</option>
      </select>
      <p>📌 Feature: Ye filter **future API integration ke liye ready hai**.</p>
    </div>
  );
};

export default SortApplications;
