"use client";
import LoanForm from "@/app/dashboard/user/apply/LoanForm";
// import LoanForm from "@/app/components/Dashboard/LoanForm";
import { useRouter } from "next/navigation";
import { Suspense } from "react";


const ApplyLoan = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Loan Application Submitted!");
    router.push("/dashboard/user/applications");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
        {/* <h1 className="text-center mb-4">Apply for a Loan</h1> */}
        <Suspense fallback={<div>Loading...</div>}>
        <LoanForm onSubmit={handleSubmit} />
        </Suspense>
      </div>
    </div>
  );
};

export default ApplyLoan;
