import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";

const bannerApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Ensuring the authorization token is attached to each request
bannerApiClient.interceptors.request.use(config => {
  const { auth } = store.getState();
  config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export const bannerService = {
  getBanners: async () => {
    try {
      const response = await bannerApiClient.get('/banner');
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      throw error;
    }
  }
};
