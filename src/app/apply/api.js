import axios from "axios";

const BASE_URL = "http://194.195.112.4:3070";

// 📌 1. GET Loan Types
export const getLoanTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/loan-types`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan types:", error);
    throw error;
  }
};

// 📌 2. Submit Loan Application
export const submitLoanApplication = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/applications`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting loan:", error);
    throw error;
  }
};

// 📌 3. Businessdetails
export const businessdetails = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, user not authenticated!");
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/business-details`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting business details:", error);
    throw error;
  }
};

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/api/v1/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return await response.json();
}

export async function saveDocument(documentData) {
  const response = await fetch(`${BASE_URL}/api/v1/application-documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    throw new Error("Saving document failed");
  }

  return await response.json();
}
