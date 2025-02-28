"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { businessdetails } from "./api";

export default function FormStep2({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setUserId(userData.id);
    const savedApplicationId = localStorage.getItem("applicationId");
    if (savedApplicationId) {
      setFormData((prev) => ({ ...prev, applicationId: savedApplicationId }));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const businessData = {
        email: formData.email || "",
        mobile: formData.mobileNo || "",
        businessType: { id: formData.businessType || "" },
        gst: formData.gstNo || "",
        udyam: formData.udyamNo || "",
        application: { id: formData.applicationId || "" }, // Application ID भेजें
      };

      const response = await businessdetails(businessData);
      console.log("Business Details Submitted:", response);

      // ✅ Response से Application ID Save करें
      if (response && response.application && response.application.id) {
        localStorage.setItem("applicationId", response.application.id);
        setFormData((prev) => ({
          ...prev,
          applicationId: response.application.id,
        }));
      }

      nextStep();
    } catch (error) {
      console.error("Error submitting business details:", error);
    }
  };

  return (
    <div>
      <h3 className="text-primary text-center mb-3">
        Step 2: Business Details
      </h3>
      <div className="mb-3">
        <label className="form-label fw-bold">Udyam Registration No.</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Udyam No."
          value={formData.udyamNo}
          onChange={(e) =>
            setFormData({ ...formData, udyamNo: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">GST No.</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter GST No."
          value={formData.gstNo}
          onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Mobile No.</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter Mobile No."
          value={formData.mobileNo}
          onChange={(e) =>
            setFormData({ ...formData, mobileNo: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <p className="text-danger small">
        * At least one of Udyam No., GST No., Mobile No., or Email is required.
      </p>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
