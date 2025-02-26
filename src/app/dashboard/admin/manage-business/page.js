"use client";
import { useState } from "react";

const ManageBusiness = () => {
  const [businessTypes, setBusinessTypes] = useState(["Retail", "Manufacturing"]);

  const addBusiness = () => {
    const name = prompt("Enter new Business Type:");
    if (name) setBusinessTypes([...businessTypes, name]);
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Business Types</h1>

      <button onClick={addBusiness} className="btn btn-success mb-3">
        ➕ Add Business Type
      </button>

      <ul className="list-group">
        {businessTypes.map((b, index) => (
          <li key={index} className="list-group-item">{b}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBusiness;