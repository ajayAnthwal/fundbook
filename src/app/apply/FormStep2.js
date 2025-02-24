"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import

export default function FormStep2({ formData, setFormData, nextStep, prevStep }) {
  return (
    <div>
      <h3 className="text-primary text-center mb-3">Step 2: Business Details</h3>

      {/* Business Name */}
      <div className="mb-3">
        <label className="form-label fw-bold">Business Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          required
        />
      </div>

      {/* Business Registration No. */}
      <div className="mb-4">
        <label className="form-label fw-bold">Business Registration No.</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter registration number"
          value={formData.businessRegNo}
          onChange={(e) =>
            setFormData({ ...formData, businessRegNo: e.target.value })
          }
          required
        />
      </div>
    </div>
  );
}
