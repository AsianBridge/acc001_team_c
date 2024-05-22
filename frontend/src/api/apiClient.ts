import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  },
);

export const googleMapsApiClient = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

googleMapsApiClient.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params["key"] = googleMapsApiKey;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
