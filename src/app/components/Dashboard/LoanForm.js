const LoanForm = ({ onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="p-4 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold">Apply for Loan</h2>
  
        <label className="block">Loan Amount:</label>
        <input type="number" className="border p-2 w-full mb-2" required />
  
        <label className="block">Loan Type:</label>
        <select className="border p-2 w-full mb-2" required>
          <option value="">Select</option>
          <option value="personal">Personal Loan</option>
          <option value="business">Business Loan</option>
        </select>
  
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    );
  };
  export default LoanForm;
  