"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [userType, setUserType] = useState(""); // MSME or CA
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    businessName: "",
    businessType: "",
    gstNumber: "",
    caNumber: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userType, ...formData }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center fw-bold mb-3">User Registration</h2>

        {/* User Type Selection */}
        <select
          className="form-select mb-3"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="msme">MSME</option>
          <option value="ca">Chartered Accountant (CA)</option>
        </select>

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="mb-3">
            <input type="text" name="fullName" className="form-control" placeholder="Full Name" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="text" name="mobile" className="form-control" placeholder="Mobile Number" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" required onChange={handleChange} />
          </div>

          {/* MSME Fields */}
          {userType === "msme" && (
            <>
              <div className="mb-3">
                <input type="text" name="businessName" className="form-control" placeholder="Business Name" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <select name="businessType" className="form-select" required onChange={handleChange}>
                  <option value="">Select Business Type</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div className="mb-3">
                <input type="text" name="gstNumber" className="form-control" placeholder="GST Number (Optional)" onChange={handleChange} />
              </div>
            </>
          )}

          {/* CA Fields */}
          {userType === "ca" && (
            <>
              <div className="mb-3">
                <input type="text" name="caNumber" className="form-control" placeholder="CA Registration Number" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="number" name="experience" className="form-control" placeholder="Years of Experience" required onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;