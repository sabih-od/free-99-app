import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";
import { setLoading, setUserProfile, setUserWallet, setUserStripeConnection, updateUserPasswordStatus, setLogoutStatus } from '../Redux/Store/Slices/User';
import { updateUserProfile } from '../Redux/Store/Slices/Auth';
import { errorToast, successToast } from '../Utils/toast';

const userApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Ensuring the authorization token is attached to each request
userApiClient.interceptors.request.use(config => {
  const { auth } = store.getState();
  config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export const userService = {
  getProfile: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.get('/user');
      store.dispatch(setUserProfile(response.data));
      store.dispatch(updateUserProfile({ data: { user: response?.data?.data?.detail } }));

      return response.data;
    } catch (error) {
      console.log('Failed to fetch user profile:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  updateProfile: async (userData) => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.put('/user', userData);
      store.dispatch(setUserProfile(response.data));  // Assuming the response contains the updated profile
      return response.data;
    } catch (error) {
      console.log('Failed to update user profile:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getWallet: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.get('/user/wallet');
      store.dispatch(setUserWallet(response?.data?.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch wallet:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  connectStripe: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.post('/user/wallet/stripe-connect');
      store.dispatch(setUserStripeConnection(response?.data?.data));  // Assuming the response contains the stripe connection status
      return response?.data?.data;
    } catch (error) {
      console.log('Failed to connect to Stripe:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  updatePassword: async (passwordData) => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.put('/user/update-password', passwordData);
      store.dispatch(updateUserPasswordStatus(response.data));  // Assuming the response includes success status
      successToast("Password updated Successfully")
      return response.data;
    } catch (error) {
      console.log('Failed to update password:', error);
      errorToast(error?.response?.data?.message)
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  logout: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await userApiClient.post('/user/logout');
      store.dispatch(setLogoutStatus(response.data));  // Assuming the response includes logout success status
      return response.data;
    } catch (error) {
      console.log('Failed to logout:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }
};
