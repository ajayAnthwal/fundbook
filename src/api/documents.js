import axios from "axios";

// 📌 1. Get User Applications List
export const getUserApplications = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(
      "http://194.195.112.4:3070/api/v1/applications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch applications");
    }

    return await response.json(); 
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const getApplicationDocuments = async (applicationId) => {
  try {
    const token = localStorage.getItem("authToken"); // Token check karein
    if (!token) throw new Error("No token found!");

    const response = await fetch(
      `http://194.195.112.4:3070/api/v1/application-documents/${applicationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch documents");
    }

    return await response.json(); // JSON data return karein
  } catch (error) {
    console.error("API Error:", error);
    return [];
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
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(`http://194.195.112.4:3070/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
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
