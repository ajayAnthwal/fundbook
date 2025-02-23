"use client";
import { useState } from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import { submitLoanApplication } from "./api";

export default function LoanForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: "",
    loanType: "",
    businessName: "",
    businessRegNo: "",
    kycDetails: "",
    documents: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await submitLoanApplication(formData);
      alert("Loan Application Submitted!");
      console.log(response);
    } catch (error) {
      alert("Error submitting form.");
    }
  };

  return (
    <div>
      {step === 1 && (
        <FormStep1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <FormStep2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <FormStep3
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <FormStep4
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          submitForm={handleSubmit}
        />
      )}
    </div>
  );
}
