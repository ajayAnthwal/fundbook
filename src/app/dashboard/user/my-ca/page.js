"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MyCA = () => {
  const [ca, setCA] = useState({
    name: "Rahul Sharma",
    email: "rahul.ca@example.com",
    phone: "+91 98765 43210",
  });

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">👨‍💼 My CA</h2>
      {ca ? (
        <div className="card p-3 shadow-sm">
          <h5>{ca.name}</h5>
          <p>Email: {ca.email}</p>
          <p>Phone: {ca.phone}</p>
          <button className="btn btn-danger">❌ Remove CA</button>
        </div>
      ) : (
        <div>
          <p>No CA assigned.</p>
          <button className="btn btn-primary">➕ Assign CA</button>
        </div>
      )}
    </div>
  );
};

export default MyCA;
