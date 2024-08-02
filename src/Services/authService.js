import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from './../Redux/Store';
import { login as loginAction, logout as logoutAction, updateUserProfile, setLoading, guest as guestAction, guest } from '../Redux/Store/Slices/Auth';

import { errorToast, successToast } from '../Utils/toast';
import { Alert } from 'react-native';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const authService = {
  register: async (userData) => {
    store.dispatch(setLoading(true))
    try {
      const response = await apiClient.post('/auth/register', userData);

      successToast(response.data.message);
      store.dispatch(loginAction(response.data));

      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      console.log('Error making request:', error.response.data.errors.email[0]);
      errorToast(error?.response?.data?.errors?.email[0])
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  login: async (credentials) => {
    store.dispatch(setLoading(true))
    try {
      const response = await apiClient.post('/auth/login', credentials);

      successToast(response.data.message);
      store.dispatch(loginAction(response.data));

      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      console.log('Error making request:', error.response.data.message);
      errorToast(error.response.data.message)
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  updateProfile: async (userData) => {
    store.dispatch(setLoading(true))
    try {
      const { token } = store.getState().auth;
      const response = await apiClient.post('/user', userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      successToast(response.data.message);
      store.dispatch(updateUserProfile(response.data)); // Assuming the response contains the updated profile

      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message;
      const errors = error.response.data.errors;

      console.warn(errorMessage)

      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          console.log(key, errors[key][0])
        }
      }



      if (error.response && error.response.data && error.response.data.message) {
        console.log('Validation errors:', error.response.data.message);
        errorToast('Validation errors: ' + JSON.stringify(error.response.data.message));
        store.dispatch(setLoading(false))
      } else {
        errorToast('Something went wrong');
        store.dispatch(setLoading(false))
      }
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  logout: async () => {
    try {
      const { token } = store.getState().auth;
      const response = await apiClient.post('/user/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      successToast(response.data.message);
      store.dispatch(logoutAction());
      // handleLogout()
      // store.dispatch()

      return response.data;
    } catch (error) {
      console.log('Error making request:', error);
      errorToast('Something Went Wrong')
      throw error;
    }
  },

  forgetPassword: async (data) => {
    store.dispatch(setLoading(true))
    try {
      const { token } = store.getState().auth;
      const response = await apiClient.post('/auth/forget/password', data);

      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      console.log('Error making request:', error.response.data.message);
      errorToast(error.response.data.message)
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  updatePassword: async (passwordData) => {
    store.dispatch(setLoading(true))
    try {
      const { token } = store.getState().auth;
      const response = await apiClient.post('/auth/update/password', passwordData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      successToast("Password Updated Successfully")
      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      console.log('Error making request:', error);
      errorToast('Something Went Wrong')
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  deleteAccount: async (userId) => {
    store.dispatch(setLoading(true))
    try {
      const { token } = store.getState().auth;
      const response = await apiClient.delete('user/destroy-self', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      successToast(response.data.message);
      Alert.alert("Account Deleted", "Your account has succesfully deleted")
      store.dispatch(logoutAction());

      store.dispatch(setLoading(false))
      return response.data;
    } catch (error) {
      console.log('Error making request:', error);
      errorToast('Something Went Wrong');
      store.dispatch(setLoading(false))
      throw error;
    }
  },

  guest: async () => {
    store.dispatch(setLoading(true))
    try {
      successToast("Welcome, Guest User");
      store.dispatch(guestAction(true));

      store.dispatch(setLoading(false))
      return;
    } catch (error) {
      console.log('Error making request:', error);
      errorToast('Something Went Wrong')
      store.dispatch(setLoading(false))
      throw error;
    }
  },

};
