import LoanForm from "./LoanForm";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "../dashboard/layout";

export default function ApplyLoanPage() {
  return (
    <>
      <DashboardLayout>
        <div className="d-flex align-items-center justify-content-center bg-light">
          <div
            className="card shadow-lg p-4"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <LoanForm />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
