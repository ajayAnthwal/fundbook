import axios from "axios";
import { axiosClient } from "./config";

const BASE_URL = "http://194.195.112.4:3070";

export const authAPI = {
  login: async (credentials) => {
    try {
      const res = await axiosClient.post('/auth/email/login', credentials);
      
      if (!res.data.token) {
        // const error = await response.json();
        throw error;
      }

      const data = res.data;
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const registerData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        // TODO: mobile is required so add
      };

      const response = await axiosClient.post(
        `/auth/email/register`,
        registerData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

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
