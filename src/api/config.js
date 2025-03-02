export const BASE_URL = 'http://194.195.112.4:3070/api/v1';


import axios from "axios";
// import Cookie from "js-cookie";
// import { store } from "../../redux/store";


export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosClientWithHeaders = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor
axiosClientWithHeaders.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    // const accessToken = state?.auth?.user?.token;
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      if (config?.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);