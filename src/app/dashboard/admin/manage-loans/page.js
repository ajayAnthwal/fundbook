import { useState } from "react";

const ManageLoans = () => {
  const [loanTypes, setLoanTypes] = useState(["Home Loan", "Business Loan"]);

  const addLoan = () => {
    const name = prompt("Enter new Loan Type:");
    if (name) setLoanTypes([...loanTypes, name]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Loan Types</h1>
      <button onClick={addLoan} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Loan Type
      </button>
      <ul className="mt-4">
        {loanTypes.map((l, index) => (
          <li key={index} className="p-2 border">{l}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLoans;
