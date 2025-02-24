import LoanForm from "./LoanForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS Import

export default function ApplyLoanPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">Apply for a Loan</h2>
        <LoanForm />
      </div>
    </div>
  );
}
