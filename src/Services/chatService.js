import axios from 'axios';
import {BASE_URL} from '../Constants';
import {store} from './../Redux/Store';
import {setMessages, setVendorParticipants} from '../Redux/Store/Slices/Chat';
import {successToast} from '../Utils/toast';
import {Routes} from '../Constants/Routes';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const {auth} = store.getState();
    config.headers['Authorization'] = `Bearer ${auth.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const chatService = {
  sendMessages: async (receiverId, payload) => {
    try {
      const response = await apiClient.post(
        Routes.chatMessages(receiverId),
        payload,
      );

      successToast(response.data.message);

      return response.data;
    } catch (error) {
      console.error('sendMessages error', error.response.message);

      throw error;
    }
  },

  fetchMessages: async (userId, params = null) => {
    try {
      const response = await apiClient.get(Routes.chatMessages(userId, params));
      store.dispatch(setMessages(response.data?.data));

      return response.data;
    } catch (error) {
      console.log('fetchMessages error', error);
      throw error;
    }
  },

  vendorParticipants: async params => {
    try {
      const response = await apiClient.get(
        Routes.vendorParticipants((params = null)),
      );
      store.dispatch(setVendorParticipants(response.data?.data));

      return response.data;
    } catch (error) {
      console.log('vendorParticipants error', error);
      throw error;
    }
  },
};
