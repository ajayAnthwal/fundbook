"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import

export default function FormStep3({ formData, setFormData, nextStep, prevStep }) {
  return (
    <div>
      <h3 className="text-primary text-center mb-3">Step 3: KYC Verification</h3>

      {/* KYC Details */}
      <div className="mb-4">
        <label className="form-label fw-bold">KYC Details</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your KYC details"
          value={formData.kycDetails}
          onChange={(e) =>
            setFormData({ ...formData, kycDetails: e.target.value })
          }
          required
        />
      </div>
    </div>
  );
}
