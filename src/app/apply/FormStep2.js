"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormStep2({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
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
    </div>
  );
}
