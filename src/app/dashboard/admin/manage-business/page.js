"use client";
import React, { useEffect, useState } from "react";
import { getBusinessTypes } from "@/api/loanService";
import { ManageBusinessTypes } from "@/api/admin/api";

const ManageBusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await getBusinessTypes();
        setBusinessTypes(res?.data || []);
      } catch (error) {
        console.error("Error fetching business types:", error);
        setBusinessTypes([]);
      }
    })();
  }, []);

  const handleAddBusiness = async () => {
    const name = prompt("Enter new Business Type:");
    if (!name) return;

    try {
      const res = await ManageBusinessTypes({ name });
      if (res) {
        toast.success("Business type added successfully!");
        setBusinessTypes([...businessTypes, res]);
      }
    } catch (err) {
      console.error("Application Submit Error:", err);
      toast.error(err.message || "Failed to submit business type!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Business Types</h1>

      <button onClick={handleAddBusiness} className="btn btn-success mb-3">
        ➕ Add Business Type
      </button>

      <ul className="list-group">
        {businessTypes.length > 0 ? (
          businessTypes.map((b, index) => (
            <li key={index} className="list-group-item">
              {b?.name}
            </li>
          ))
        ) : (
          <li className="list-group-item">No Business Types Found</li>
        )}
      </ul>
    </div>
  );
};

export default ManageBusinessType;
