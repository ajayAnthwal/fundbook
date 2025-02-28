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
    const response = await axios.post(`${BASE_URL}/api/v1/applications`, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting loan:", error);
    throw error;
  }
};

// 📌 3. Upload Document
export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append("document", file);

    const response = await axios.post(`${BASE_URL}/upload-document`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
