import toast from "react-hot-toast";
import { axiosClientWithHeaders } from "./config";

export const getLoanTypes = async () => {
  try {
    const res = await axiosClientWithHeaders.get("/loan-types");
    return res.data;
  } catch (error) {
    toast.error("Unable to get Loan types.");
    return new Error("unable to get loan types");
  }
};

export const createApplication = async (data) => {
  try {
    const res = await axiosClientWithHeaders.post("/applications", data);
    return res.data;
  } catch (error) {
    toast.error("Failed to submit application");
    // toast.error(error.response.data.message)
    return new Error(error.response.data.message);
  }
};

export const updateApplication = async (data, id) => {
  try {
    const res = await axiosClientWithHeaders.patch(`/applications/${id}`, data);
    return res.data;
  } catch (error) {
    toast.error("Failed to submit application");
    // toast.error(error.response.data.message)
    return new Error(error.response.data.message);
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
    return new Error(error.response.data.message);
  }
};

export const getMyApplication = async (id) => {
  try {
    const res = await axiosClientWithHeaders.get(`/api/v1/applications/${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Unable to fetch application");
    return new Error(error.response?.data?.message);
  }
};
