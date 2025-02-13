import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const loanAPI = {
  // Stage 1: Submit loan basic details
  submitLoanDetails: async (loanData) => {
    try {
      const response = await axios.post(`${BASE_URL}/loan/details`, loanData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Stage 2: Submit business details
  submitBusinessDetails: async (businessData) => {
    try {
      const response = await axios.post(`${BASE_URL}/loan/business-details`, businessData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Stage 3: Submit KYC details
  submitKYC: async (kycData) => {
    try {
      const response = await axios.post(`${BASE_URL}/loan/kyc`, kycData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Stage 4: Submit documents
  submitDocuments: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/loan/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get required documents list
  getRequiredDocuments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/loan/required-documents`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get loan applications list
  getLoanApplications: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/loan/applications`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single loan application details
  getLoanApplication: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/loan/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 