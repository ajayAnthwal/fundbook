import { useState } from "react";

const Disbursement = () => {
  const [form, setForm] = useState({ loanId: "", amount: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Disbursement for Loan ${form.loanId} saved successfully!`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Loan Disbursement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Loan ID" 
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, loanId: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Amount Disbursed" 
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input 
          type="date" 
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Disbursement;
