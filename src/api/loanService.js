import toast from "react-hot-toast";
import { axiosClientWithHeaders } from "./config";

export const getLoanTypes = async () => {
  try {
    const res = await axiosClientWithHeaders.get("/loan-types");
    return res.data;
  } catch (error) {
    toast.error("Unable to get Loan types.");
    new Error("unable to get loan types");
    return null;
  }
};

export const createApplication = async (data) => {
  try {
    const res = await axiosClientWithHeaders.post("/applications", data);
    return res.data;
  } catch (error) {
    toast.error("Failed to submit application");
    // toast.error(error.response.data.message)
    new Error(error.response.data.message);
    return null;
  }
};

export const updateApplication = async (data, id) => {
  try {
    const res = await axiosClientWithHeaders.patch(`/applications/${id}`, data);
    return res.data;
  } catch (error) {
    toast.error("Failed to Update application");
    new Error(error.response.data.message);
    return null;
  }
};

export const getBusinessDetails = async (applicationId) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Auth token is missing.");
      return null;
    }
    const filters = {
      application: { id: applicationId },
    };
    const encodedFilters = encodeURIComponent(JSON.stringify(filters));

    const response = await fetch(
      `http://194.195.112.4:3070/api/v1/business-details?page=1&filters=${encodedFilters}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Token को manually pass करें
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching business details:", error);
    return null;
  }
};



export const getKycDetails = async (applicationId) => { 
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Auth token is missing.");
      return null;
    }

    // Filters object for API request
    const filters = {
      application: { id: applicationId },
    };
    const encodedFilters = encodeURIComponent(JSON.stringify(filters));

    // API URL with filters
    const apiUrl = `${BASE_URL}/api/v1/application-kycs?filters=${encodedFilters}`;
    console.log("Fetching KYC details from:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched KYC Details:", data);
    return data;
  } catch (error) {
    console.error("Error fetching KYC details:", error);
    return null;
  }
};



export const handleUpdateBusiness = async (businessData, businessId) => {
  try {
    const res = await axiosClientWithHeaders.patch(
      `/business-details/${businessId}`,
      businessData
    );
    return res.data;
  } catch (error) {
    toast.error("Failed to update business details");
  }
};

export const getBusinessTypes = async () => {
  try {
    const res = await axiosClientWithHeaders.get("/business-types");
    console.log("rrrrr", res);

    return res.data;
  } catch (error) {
    // toast.error("Unable to get BusinessTypes")
    console.log("error", error);

    toast.error(error.response.data.message);
    new Error(error.response.data.message);
    return null;
  }
};

export const getMyApplication = async (id) => {
  try {
    const res = await axiosClientWithHeaders.get(`/api/v1/applications/${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Unable to fetch application");
    new Error(error.response?.data?.message);
    return null;
  }
};
