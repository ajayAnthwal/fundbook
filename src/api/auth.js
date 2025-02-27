import axios from "axios";

const BASE_URL = "http://194.195.112.4:3070";

export const authAPI = {
  login: async (credentials) => {
    try {
      const loginData = {
        email: credentials.email,
        password: credentials.password,
      };

      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/email/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const registerData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/email/register`,
        registerData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/forgot-password`,
        { email }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
