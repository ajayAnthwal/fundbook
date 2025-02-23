import axios from "axios";

const BASE_URL = "https://your-api-url.com"; // 🔹 सही API URL डालें

// 📌 1. Get User Applications List
export const getUserApplications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// 📌 2. Get Single Application Details
export const getApplicationById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/application/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching application details:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getCAApplications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ca/applications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Fetch a single application details
export const getApplicationDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/ca/application/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

// Update application details
export const updateApplication = async (id, applicationData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/ca/application/${id}`,
      applicationData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
};
