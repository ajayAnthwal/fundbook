"use client";
import { useEffect, useState } from "react";

const ManageBusiness = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  const fetchBusinessTypes = async () => {
    try {
      const response = await fetch("/api/v1/business-details?page=1&limit=10");
      const data = await response.json();

      if (data?.data) {
        const extractedTypes = data.data.map((item) => item.businessType.name);
        setBusinessTypes(extractedTypes);
      }
    } catch (error) {
      console.error("Error fetching business types:", error);
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <p>Loading business types...</p>
      ) : (
        <ul className="list-group">
          {businessTypes.length > 0 ? (
            businessTypes.map((b, index) => (
              <li key={index} className="list-group-item">
                {b}
              </li>
            ))
          ) : (
            <li className="list-group-item">No Business Types Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ManageBusiness;
