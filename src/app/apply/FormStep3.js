"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormStep3({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  const [kycList, setKycList] = useState(formData.kycList || []);

  useEffect(() => {
    if (!formData.applicationId) {
      const savedApplicationId = localStorage.getItem("applicationId");
      if (savedApplicationId) {
        setFormData((prev) => ({ ...prev, applicationId: savedApplicationId }));
      }
    }
  }, []);

  const addKycEntry = () => {
    setKycList([...kycList, { name: "", pan: "" }]);
  };

  const updateKycEntry = (index, field, value) => {
    const updatedKycList = [...kycList];
    updatedKycList[index][field] = value;
    setKycList(updatedKycList);
    setFormData({ ...formData, kycList: updatedKycList });
  };

  const removeKycEntry = (index) => {
    const updatedKycList = kycList.filter((_, i) => i !== index);
    setKycList(updatedKycList);
    setFormData({ ...formData, kycList: updatedKycList });
  };

  const handleSubmit = async () => {
    if (!formData.applicationId) {
      console.error("Application ID is missing!");
      return;
    }

    try {
      const kycData = {
        application: { id: formData.applicationId },
        kycList: kycList,
      };

      console.log("Submitting KYC Data:", kycData);
      nextStep();
    } catch (error) {
      console.error("Error submitting KYC details:", error);
    }
  };

  return (
    <div>
      <h3 className="text-primary text-center mb-3">
        Step 3: Director/Proprietor/Partner KYC
      </h3>

      {kycList.map((kyc, index) => (
        <div key={index} className="mb-3 p-3 border rounded bg-light">
          <h6 className="fw-bold">Person {index + 1}</h6>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={kyc.name}
              onChange={(e) => updateKycEntry(index, "name", e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">PAN</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter PAN"
              value={kyc.pan}
              onChange={(e) => updateKycEntry(index, "pan", e.target.value)}
            />
          </div>
          {index > 0 && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeKycEntry(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button className="btn btn-success btn-sm mb-3" onClick={addKycEntry}>
        + Add Person
      </button>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit KYC
        </button>
      </div>
    </div>
  );
}
