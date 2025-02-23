"use client";
import { useState } from "react";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      <select
        name="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select User Type</option>
        <option value="msme">MSME</option>
        <option value="ca">Chartered Accountant (CA)</option>
      </select>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full border p-2 rounded"/>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full border p-2 rounded"/>

        {/* MSME Fields */}
        {userType === "msme" && (
          <>
            <input type="text" name="businessName" placeholder="Business Name" required onChange={handleChange} className="w-full border p-2 rounded"/>
            <select name="businessType" required onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">Select Business Type</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Service">Service</option>
            </select>
            <input type="text" name="gstNumber" placeholder="GST Number (Optional)" onChange={handleChange} className="w-full border p-2 rounded"/>
          </>
        )}

        {/* CA Fields */}
        {userType === "ca" && (
          <>
            <input type="text" name="caNumber" placeholder="CA Registration Number" required onChange={handleChange} className="w-full border p-2 rounded"/>
            <input type="number" name="experience" placeholder="Years of Experience" required onChange={handleChange} className="w-full border p-2 rounded"/>
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
