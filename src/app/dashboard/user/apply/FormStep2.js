"use client";
import { getBusinessTypes } from "@/api/loanService";
import { useState, useEffect } from "react";
import { handleUpdateBusiness } from "@/api/loanService";
import { useSearchParams } from "next/navigation";
const BASE_URL = "http://194.195.112.4:3070";


const formStyles = {
  container: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "1rem",
  },
  card: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "50px",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "50px",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    height: "50px",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#842029",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 -0.5rem",
  },
  col: {
    flex: "1 1 300px",
    padding: "0 0.5rem",
  },
};

export default function FormStep2({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [localFormData, setLocalFormData] = useState({
    email: "",
    mobile: "",
    businessType: "",
    gst: "",
    udyam: "",
    applicationId: "",
  });
  const [applicationId, setApplicationId] = useState("");

  const searchParams = useSearchParams();
  const isApplicationEdit = searchParams.get("isApplicationEdit");

  console.log(localStorage.getItem("authToken"), "token");

  // fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Auth token is missing.");
          return;
        }
        let currentApplicationId = "";
        const prevFormData = localStorage.getItem("applicationData");
        if (prevFormData) {
          try {
            const parsedData = JSON.parse(prevFormData);
            if (parsedData.id) {
              currentApplicationId = parsedData.id;
            } else if (parsedData.application && parsedData.application.id) {
              currentApplicationId = parsedData.application.id;
            }
          } catch (e) {
            console.error("Failed to parse application data:", e);
          }
        }

        setApplicationId(
          currentApplicationId || "108f3a04-34f0-4377-9bf1-539ae66e1784"
        );

        // Create the filter object with the application ID
        const filters = {
          application: {
            id: currentApplicationId || "108f3a04-34f0-4377-9bf1-539ae66e1784",
          },
        };

        // Encode the filters object for the URL
        const encodedFilters = encodeURIComponent(JSON.stringify(filters));

        // Make the API call with the filters and token
        const response = await fetch(
          `http://194.195.112.4:3070/api/v1/business-details?page=1&filters=${encodedFilters}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ Token added here
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const businessDetails = data.data || data.results || data; // Adjust based on your API response structure

        console.log("Fetched Business Details:", businessDetails);

        if (businessDetails && businessDetails.length > 0) {
          setBusinessId(businessDetails[0].id);
          setBusinessData(businessDetails[0]);

          if (isApplicationEdit) {
            setLocalFormData({
              email: businessDetails[0].email || "",
              mobile: businessDetails[0].mobile || "",
              businessType: businessDetails[0].businessType?.id || "",
              gst: businessDetails[0].gst || "",
              udyam: businessDetails[0].udyam || "",
              applicationId:
                businessDetails[0].application?.id ||
                currentApplicationId ||
                "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchData();
  }, [isApplicationEdit]);

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
    const prevFormData = localStorage.getItem("applicationData");
    if (prevFormData) {
      try {
        const parsedData = JSON.parse(prevFormData);
        if (parsedData.id) {
          setLocalFormData((prev) => ({
            ...prev,
            applicationId: parsedData.id,
          }));
        } else if (parsedData.application && parsedData.application.id) {
          setLocalFormData((prev) => ({
            ...prev,
            applicationId: parsedData.application.id,
          }));
        }
      } catch (e) {
        console.error("Failed to parse previous form data:", e);
      }
    }
  }, [formData]);


  
  useEffect(() => {
    (async () => {
      const res = await getBusinessTypes();
      if (res?.data?.length) {
        setBusinessTypes(res?.data);
        const businessTypeIds = res.data.map((type) => type.id);
        localStorage.setItem(
          "businessTypeIds",
          JSON.stringify(businessTypeIds)
        );
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "businessType") {
      localStorage.setItem("selectedBusinessTypeId", value);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Please login to submit business details");
      }
      
      const applicationData = localStorage.getItem("applicationData");
      if (!applicationData) {
        throw new Error("Application data not found. Please complete step 1 first.");
      }
  
      let applicationId;
      try {
        const parsedData = JSON.parse(applicationData);
        applicationId = parsedData?.id || parsedData?.application?.id;
        if (!applicationId) throw new Error("Invalid application data structure");
      } catch (e) {
        throw new Error("Invalid application data format");
      }
  
      if (!localFormData.email || !localFormData.mobile || !localFormData.businessType) {
        throw new Error("Please fill all required fields");
      }
  
      const businessData = {
        email: localFormData.email,
        mobile: String(localFormData.mobile),
        businessType: { id: localFormData.businessType },
        application: { id: applicationId },
      };
  
      if (localFormData.gst) businessData.gst = localFormData.gst;
      if (localFormData.udyam) businessData.udyam = localFormData.udyam;
  
      let response, responseData;
      if (isApplicationEdit && businessId) {
        responseData = await handleUpdateBusiness(businessData, businessId);
        console.log("res", responseData);
      } else {
        if (typeof BASE_URL === "undefined") {
          throw new Error("BASE_URL is not defined");
        }
        
        response = await fetch(`${BASE_URL}/api/v1/business-details`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit business details");
        }
        
        responseData = await response.json();
      }
  
      localStorage.setItem("businessData", JSON.stringify(responseData));
  
      if (nextStep) {
        nextStep();
      }
    } catch (err) {
      console.error("Business Details Submit Error:", err);
      setError(err.message || "Failed to submit business details");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div style={formStyles.container}>
      <div style={formStyles.card}>
        <h3 style={formStyles.title}>Business Details - Step 2</h3>

        {error && (
          <div style={formStyles.error}>
            {error}
            {(error.includes("Please login") ||
              error.includes("Session expired")) && (
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="/auth"
                  style={{
                    ...formStyles.button,
                    display: "inline-block",
                    width: "auto",
                    padding: "0.5rem 1rem",
                  }}
                >
                  Go to Login
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={formStyles.row}>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="email">
                  Business Email
                </label>
                <input
                  type="email"
                  style={formStyles.input}
                  id="email"
                  name="email"
                  value={localFormData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter business email"
                />
              </div>
            </div>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="mobile">
                  Business Contact Number
                </label>
                <input
                  type="tel"
                  style={formStyles.input}
                  id="mobile"
                  name="mobile"
                  value={localFormData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Enter business contact number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>
            </div>
          </div>

          <div style={formStyles.row}>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="businessType">
                  Business Type
                </label>
                <select
                  style={formStyles.select}
                  id="businessType"
                  name="businessType"
                  value={localFormData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business Type</option>
                  {businessTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={formStyles.col}>
              <div style={formStyles.formGroup}>
                <label style={formStyles.label} htmlFor="gst">
                  GST Number
                </label>
                <input
                  type="text"
                  style={formStyles.input}
                  id="gst"
                  name="gst"
                  value={localFormData.gst}
                  onChange={handleChange}
                  required
                  placeholder="Enter GST number"
                />
              </div>
            </div>
          </div>

          <div style={formStyles.formGroup}>
            <label style={formStyles.label} htmlFor="udyam">
              Udyam Registration Number
            </label>
            <input
              type="text"
              style={formStyles.input}
              id="udyam"
              name="udyam"
              value={localFormData.udyam}
              onChange={handleChange}
              required
              placeholder="Enter Udyam registration number"
            />
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            {prevStep && (
              <button
                type="button"
                onClick={prevStep}
                style={{
                  ...formStyles.button,
                  backgroundColor: "#6c757d",
                }}
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              style={{
                ...formStyles.button,
                ...(submitting ? formStyles.buttonDisabled : {}),
              }}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : isApplicationEdit
                ? "Update"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
