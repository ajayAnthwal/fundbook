import axios from 'axios';
import Cookies from 'js-cookie';

// Replace these with your actual API details
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(credentials) {
  try {
    console.log('Logging in...', `${API_BASE_URL}/api/v1/auth/email/login`);
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/email/login`, {
        email: credentials.email,
        password: credentials.password,
    });
    console.log('Login success', response.data.user);

    Cookies.set('accessToken', response.data.token, { expires: response.data.tokenExpires });
    Cookies.set('refreshToken', response.data.refreshToken, { expires: response.data.tokenExpires });
    Cookies.set('userData', JSON.stringify(response.data.user), { expires: response.data.tokenExpires });

    return response;
  } catch (error) {
      console.error('Failed to refresh token:', error.message);
      throw error; // Propagate the error
  }
}

export async function refreshAccessToken() {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('refreshToken')}`,
        },
      }
    );

    console.log('after refresh, response', response.data);
    // Update the access token
    Cookies.set('accessToken', response.data.token, { expires: response.data.tokenExpires });
    Cookies.set('refreshToken', response.data.refreshToken, { expires: response.data.tokenExpires });
    // Cookies.set('userData', JSON.stringify(response.data.user), { expires: response.data.tokenExpires });
    console.log('Token refreshed successfully:');
  } catch (error) {
      console.error('Failed to refresh token:', error.message);
      throw error; // Propagate the error if refresh fails
  }
}

export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('userData');

  // Optionally, redirect to the login page or home page after logout
  // For example, using Next.js router:
  // router.push('/login');
};

export function isLoggedin() {
  return !!Cookies.get('accessToken');
}

export function getUserDetail() {
  if (Cookies.get('userData')) {
    return JSON.parse(Cookies.get('userData'));
  }
  console.log('no user details found');
  return null;
}

export function getRole() {
  if (Cookies.get('userData')) {
    return JSON.parse(Cookies.get('userData')).role.name;
  }
  return null;
}
export function isAdmin() {
  if (Cookies.get('userData')) {
    return JSON.parse(Cookies.get('userData')).role.id === 1;
  }
  return null;
}
export function isMSME() {
  if (Cookies.get('userData')) {
    return JSON.parse(Cookies.get('userData')).role.id === 2;
  }
  return null;
}
export function isCA() {
  if (Cookies.get('userData')) {
    return JSON.parse(Cookies.get('userData')).role.id === 3;
  }
  return null;
}

// Wrapper function to handle API requests with token refresh
async function makeRequest(config) {
  const accessToken = Cookies.get('accessToken');
    try {
        // Add the access token to the request headers
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        // Make the request
        const response = await axios(config);
        return response.data;
    } catch (error) {
        // Check if the error is due to an expired token (401 Unauthorized)
        if (error.response && error.response.status === 401) {
            console.log('Token expired. Refreshing token...');

            // Refresh the token
            await refreshAccessToken();

            // Retry the request with the new token
            config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
            const retryResponse = await axios(config);
            return retryResponse.data;
        }

        // If the error is not a 401, throw it
        throw error;
    }
}

///////////////// api calls ////////////////

// get all application data in one function
export async function getWholeApplication(id) {
  const [
    application,
    kycDetails,
    businessDetails,
    documents,
    additionalDocuments,
  ] = await Promise.all([
    getApplication(id),
    getKycDetails(id),
    getBusinessDetails(id),
    getApplicationDocuments(id),
    getApplicationAdditionalDocuments(id),
  ]);

  return {
    application,
    kycDetails,
    businessDetails,
    documents,
    additionalDocuments,
  };
}

export async function getApplication(id) {
  const data = await makeRequest({
      method: 'get',
      url: `${API_BASE_URL}/api/v1/applications/${id}`,
  });
  return data;
}

export async function registerUser(userData) {
  const res = await makeRequest({
      method: 'post',
      url: `${API_BASE_URL}/api/v1/auth/email/register`,
      data: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
  });
  return res;
}

export const getLoanTypes = async () => {
  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/loan-types`,
  });
};
export const getDocumentTypes = async () => {
  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/document-types`,
  });
};

export const createApplication = async (data) => {
  return await makeRequest({
    method: 'post',
    url: `${API_BASE_URL}/api/v1/applications`,
    data,
  });
};

export const updateApplication = async (data, id) => {
  return await makeRequest({
    method: 'patch',
    url: `${API_BASE_URL}/api/v1/applications/${id}`,
    data,
  });
};

export const getBusinessDetails = async (applicationId) => {
  const filters = {
    application: { id: applicationId },
  };
  const encodedFilters = encodeURIComponent(JSON.stringify(filters));

  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/business-details?page=1&filters=${encodedFilters}`,
  });
};

export const getKycDetails = async (applicationId) => { 
  const filters = {
    application: { id: applicationId },
  };
  const encodedFilters = encodeURIComponent(JSON.stringify(filters));

  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/application-kycs?filters=${encodedFilters}`,
  });
};

export const getApplicationDocuments = async (applicationId) => { 
  const filters = {
    application: { id: applicationId },
  };
  const encodedFilters = encodeURIComponent(JSON.stringify(filters));

  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/application-documents?filters=${encodedFilters}`,
  });
};
export const saveDocumentComment = async (documentId, comment, isAdditionalDoc=false) => {
  let url = `${API_BASE_URL}/api/v1/application-documents/${documentId}`;
  if (isAdditionalDoc) {
    url = `${API_BASE_URL}/api/v1/application-additional-documents/${documentId}`;
  }
  return await makeRequest({
    method: 'patch',
    url: url,
    data: {
      reviewComments: comment
    }
  });
};

export const createAdditionalDocumentRequest = async (applicationId, comment, documentType) => {
  return await makeRequest({
    method: 'post',
    url: `${API_BASE_URL}/api/v1/application-additional-documents`,
    data: {
      status: "pending",
      type: documentType,
      name: documentType,
      application: {
        id: applicationId
      },
      reviewComments: comment
    }
  });
};

export const getApplicationAdditionalDocuments = async (applicationId) => { 
  const filters = {
    application: { id: applicationId },
  };
  const encodedFilters = encodeURIComponent(JSON.stringify(filters));

  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/application-additional-documents?filters=${encodedFilters}`,
  });
};

export const handleUpdateBusiness = async (businessData, businessId) => {
  return await makeRequest({
    method: 'patch',
    url: `${API_BASE_URL}/api/v1/business-details/${businessId}`,
    data: businessData,
  });
};

export const getBusinessTypes = async () => {
  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/business-types`,
  });
};

export const getMyApplication = async (id) => {
  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/applications/${id}`,
  });
};

export const getApplications = async (page = 1) => {
  return await makeRequest({
    method: 'get',
    url: `${API_BASE_URL}/api/v1/applications?page=${page}`,
  });
};

export const saveBusinessType = async (data) => {
  return await makeRequest({
    method: 'post',
    url: `${API_BASE_URL}/api/v1/business-types`,
    data,
  });
};

export const createLoanTypes = async (data) => {
  return await makeRequest({
    method: 'post',
    url: `${API_BASE_URL}/api/v1/loan-types`,
    data,
  });
};
export const createDocumentTypes = async (data) => {
  return await makeRequest({
    method: 'post',
    url: `${API_BASE_URL}/api/v1/document-types`,
    data,
  });
};
export const updateLoanTypes = async (id, data) => {
  return await makeRequest({
    method: 'patch',
    url: `${API_BASE_URL}/api/v1/loan-types/${id}`,
    data,
  });
};
export const updateDocumentTypes = async (id, data) => {
  return await makeRequest({
    method: 'patch',
    url: `${API_BASE_URL}/api/v1/document-types/${id}`,
    data,
  });
};
export const updateBusinessTypes = async (id, data) => {
  return await makeRequest({
    method: 'patch',
    url: `${API_BASE_URL}/api/v1/business-types/${id}`,
    data,
  });
};
