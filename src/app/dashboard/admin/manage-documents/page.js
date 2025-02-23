import { useState } from "react";

const ManageDocuments = () => {
  const [documents, setDocuments] = useState(["Aadhar Card", "PAN Card"]);

  const addDocument = () => {
    const name = prompt("Enter new Document Type:");
    if (name) setDocuments([...documents, name]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Documents</h1>
      <button onClick={addDocument} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Document Type
      </button>
      <ul className="mt-4">
        {documents.map((d, index) => (
          <li key={index} className="p-2 border">{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDocuments;
