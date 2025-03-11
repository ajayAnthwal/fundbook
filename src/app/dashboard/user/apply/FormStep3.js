"use client";
import { useState, useEffect } from "react";

const BASE_URL = "http://194.195.112.4:3070";

const FormStep3 = ({ formData, updateFormData, prevStep, nextStep }) => {
  const [localFormData, setLocalFormData] = useState({ pan: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userApplicationData, setUserApplicationData] = useState(false);
  const [kycId, setKycId] = useState(""); // ID for PATCH API

  useEffect(() => {
    console.log("Fetching API...");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token missing.");

        const storedData = localStorage.getItem("applicationData");
        let applicationId = "";
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            applicationId = parsedData?.id || parsedData?.application?.id || "";
            console.log("Extracted Application ID:", applicationId);
          } catch (e) {
            console.error("Error parsing application data:", e);
          }
        }
        if (!applicationId) throw new Error("Application ID not found.");

        const filters = encodeURIComponent(
          JSON.stringify({ application: { id: applicationId } })
        );
        console.log("Filters:", filters);
        const response = await fetch(
          `${BASE_URL}/api/v1/application-kycs?page=1&filters=${filters}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response);
        if (!response.ok) throw new Error("Failed to fetch business details");

        const data = await response.json();
        console.log("API Data:", data);

        if (data?.data?.length) {
          setUserApplicationData(true); // ✅ Existing data found
          setKycId(data.data[0].id); // ✅ Store KYC ID for PATCH
          setLocalFormData({
            pan: data.data[0].pan || "",
            name: data.data[0].name || "",
          });
        } else {
          setUserApplicationData(false); // ✅ No existing data
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      console.log("Submitting Form Data:", localFormData);

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Please login to submit KYC details.");

      const storedData = localStorage.getItem("applicationData");
      let applicationId = "";
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          applicationId = parsedData?.id || parsedData?.application?.id || "";
          console.log("Application ID for submission:", applicationId);
        } catch (e) {
          throw new Error("Invalid application data format.");
        }
      }
      if (!applicationId) throw new Error("Application ID missing.");

      if (!localFormData.pan || !localFormData.name) {
        throw new Error("All fields are required.");
      }

      let response;
      if (userApplicationData) {
        // ✅ PATCH request if data exists
        console.log("Updating KYC via PATCH...");
        response = await fetch(`${BASE_URL}/api/v1/application-kycs/${kycId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pan: localFormData.pan.toUpperCase(),
            name: localFormData.name,
            application: { id: applicationId },
          }),
        });
      } else {
        // ✅ POST request if no data exists
        console.log("Creating KYC via POST...");
        response = await fetch(`${BASE_URL}/api/v1/application-kycs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pan: localFormData.pan.toUpperCase(),
            name: localFormData.name,
            application: { id: applicationId },
          }),
        });
      }

      console.log("Form Submission Response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit KYC.");
      }

      console.log(
        userApplicationData
          ? "KYC Updated Successfully!"
          : "KYC Submitted Successfully!"
      );
      if (nextStep) nextStep();
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">KYC Details</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">PAN Number</label>
          <input
            type="text"
            value={localFormData.pan}
            onChange={(e) =>
              setLocalFormData({ ...localFormData, pan: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Enter PAN Number"
            maxLength="10"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Full Name (as per PAN)
          </label>
          <input
            type="text"
            value={localFormData.name}
            onChange={(e) =>
              setLocalFormData({ ...localFormData, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className="d-flex gap-6 mt-4">
          {prevStep && (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-secondary px-4 py-2"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className={`btn btn-primary px-4 py-2 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep3;
