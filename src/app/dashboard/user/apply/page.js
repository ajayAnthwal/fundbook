import LoanForm from "./LoanForm";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplyLoanPage() {
  console.log();
  
  return (
    <>
      <div className="d-flex align-items-center justify-content-center bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <LoanForm />
        </div>
      </div>
    </>
  );
}
