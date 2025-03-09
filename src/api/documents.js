import axios from "axios";

const BASE_URL = "http://194.195.112.4:3070";

// 📌 1. Get User Applications List (Using Axios)
export const getUserApplications = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    let url = `${BASE_URL}/api/v1/applications`;
    if (id) url += `/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Applications data:", response.data);
    return response.data.data; // Ensure we return the correct data
  } catch (error) {
    console.error("Applications Error:", error);
    throw error.response?.data || error.message || "Something went wrong!";
  }
};

export const getApplicationDocuments = async (
  id = null,
  page = 1,
  limit = 10
) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    let url = `${BASE_URL}/api/v1/application-documents`;
    if (id) url += `/${id}`;

    const response = await axios.get(url, {
      params: id ? {} : { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Documents data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Documents Error:", error);
    throw error.response?.data || error.message || "Something went wrong!";
  }
};



export const getDocumentsById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(`${BASE_URL}/api/v1/application-documents/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};



// 📌 2. Get Single Application Details
export const getApplicationById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(`${BASE_URL}/api/v1/applications/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    console.log("Application details:", data);
    return data;
  } catch (error) {
    console.error("Application details Error:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    console.log("Profile data:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Profile Error:", error);
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
// export const updateApplication = async (id, applicationData) => {
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/ca/application/${id}`,
//       applicationData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating application:", error);
//     throw error;
//   }
// };





// View document in modal
export const viewDocument = async (documentId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found!");

    const response = await fetch(
      `${BASE_URL}/api/v1/application-documents/${documentId}/view`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    console.log("Document view data:", data);
    return data;
  } catch (error) {
    console.error("Document view Error:", error);
    throw error;
  }
};
