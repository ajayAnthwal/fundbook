import LoanForm from "@/app/components/Dashboard/LoanForm";
import { useRouter } from "next/router";

const ApplyLoan = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Loan Application Submitted!");
    router.push("/dashboard/user/applications");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apply for a Loan</h1>
      <LoanForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ApplyLoan;
