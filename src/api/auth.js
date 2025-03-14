import axios from "axios";
import { axiosClient } from "./config";

const BASE_URL = "http://194.195.112.4:3070";

export const authAPI = {
  forgotPassword: async (email) => {
    try {
      const response = await axiosClient.post(
        `/auth/forgot-password`,
        { email }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
