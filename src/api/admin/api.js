import { axiosClientWithHeaders } from "../config";

export const ManageBusinessTypes = async (data) => {
  try {
    const res = await axiosClientWithHeaders.post("/business-types", data);
    return res.data;
  } catch (error) {
    toast.error("Failed to submit application");
    return new Error(error.response.data.message);
  }
};


export const createLoanTypes = async (data) => {
  try {
    const res = await axiosClientWithHeaders.post("/loan-types", data);
    return res.data;
  } catch (error) {
    toast.error("Failed to submit application");
    return new Error(error.response.data.message);
  }
};


