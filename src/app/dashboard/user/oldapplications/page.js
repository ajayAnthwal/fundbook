"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OldApplications = () => {
  const [applications, setApplications] = useState([
    { id: "A001", date: "2024-02-01", status: "Approved", amount: "₹5,00,000" },
    { id: "A002", date: "2024-01-15", status: "Rejected", amount: "₹3,00,000" },
    { id: "A003", date: "2023-12-10", status: "Under Review", amount: "₹7,50,000" },
  ]);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">📂 Old Applications</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Application #</th>
            <th>Date Started</th>
            <th>Status</th>
            <th>Loan Amount</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                <a href={`/dashboard/user/application/${app.id}`} className="text-primary">
                  {app.id}
                </a>
              </td>
              <td>{app.date}</td>
              <td>{app.status}</td>
              <td>{app.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OldApplications;
