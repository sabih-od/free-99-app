import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";
import { setLoading, setPackages, addPurchasedPackage } from '../Redux/Store/Slices/Package';

// Create a new Axios instance for package service
const packageApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Ensuring the authorization token is attached to each request
packageApiClient.interceptors.request.use(config => {
  const { auth } = store.getState();
  config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export const packageService = {
  getPackages: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await packageApiClient.get('/packages');
      store.dispatch(setPackages(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch packages:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  purchasePackage: async (subscription) => {
    store.dispatch(setLoading(true));
    try {
      const response = await packageApiClient.post(`/packages/purchase/${subscription}`);
      store.dispatch(addPurchasedPackage(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to purchase package:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }
};
