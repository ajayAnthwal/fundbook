import LoanForm from "./LoanForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
export default function ApplyLoanPage() {
  console.log();
  
  return (
    <>
      <div className="d-flex align-items-center justify-content-center bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
            <Suspense fallback={<div>Loading Documents...</div>}>
          <LoanForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
