import { useState } from "react";

const ManageBusiness = () => {
  const [businessTypes, setBusinessTypes] = useState(["Retail", "Manufacturing"]);

  const addBusiness = () => {
    const name = prompt("Enter new Business Type:");
    if (name) setBusinessTypes([...businessTypes, name]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Business Types</h1>
      <button onClick={addBusiness} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Business Type
      </button>
      <ul className="mt-4">
        {businessTypes.map((b, index) => (
          <li key={index} className="p-2 border">{b}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBusiness;
