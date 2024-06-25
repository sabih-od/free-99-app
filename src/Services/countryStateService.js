import { BASE_URL } from '../Constants';
import { store } from './../Redux/Store';
import {
  setLoading,
  setError,
  setCountries,
  setStates
} from '../Redux/Store/Slices/CountryState/index';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const { auth } = store.getState();
  config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export const countryStateService = {
  getCountries: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.get('/countries');
      store.dispatch(setCountries(response.data?.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch countries:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getStates: async (countryId = null) => {
    store.dispatch(setLoading(true));
    try {
      const url = countryId ? `/states/${countryId}` : '/states';
      const response = await apiClient.get(url);
      store.dispatch(setStates(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch states:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }
};
