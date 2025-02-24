const LoanForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white shadow-lg rounded border">
      <h2 className="fs-4 fw-bold mb-3">📄 Apply for Loan</h2>

      <div className="mb-3">
        <label className="form-label">Loan Amount:</label>
        <input type="number" className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Loan Type:</label>
        <select className="form-select" required>
          <option value="">Select</option>
          <option value="personal">Personal Loan</option>
          <option value="business">Business Loan</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Apply Now
      </button>
    </form>
  );
};

export default LoanForm;