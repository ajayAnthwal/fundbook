"use client";
import { useState } from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import { submitLoanApplication } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const handleSubmit = () => {
    alert("Loan Application Submitted!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-12">
          <div className="card shadow-lg p-4">
            <h2 className="text-center text-primary mb-4">Loan Application</h2>
            <div className="progress mb-4">
              <div
                className="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: `${(step / 4) * 100}%` }}
              >
                Step {step} of 4
              </div>
            </div>

            {/* Form Steps */}
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

            {/* <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 4 ? (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
