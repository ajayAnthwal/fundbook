import axios from "axios";

const BASE_URL = "http://172.105.61.88:3070";

export const authAPI = {
  login: async (credentials) => {
    try {
      // Ensure we're sending exactly what the API expects
      const loginData = {
        email: credentials.email,
        password: credentials.password
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
      // Ensure we're sending exactly what the API expects
      const registerData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
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
