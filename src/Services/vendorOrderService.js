import { BASE_URL } from '../Constants';
import { store } from '../Redux/Store';
import { setLoading } from '../Redux/Store/Slices/Auth';
import axios from 'axios';
import { setData, setNewOrder } from '../Redux/Store/Slices/VendorOrder';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Vendor Order Services
export const vendorOrderService = {
  getVendorOrders: async () => {
    store.dispatch(setLoading(true));
    
    try {
      const { token } = store.getState().auth;

      const response = await apiClient.get('/vendor/order', {headers: { 'Authorization': `Bearer ${token}` }});
      
      store.dispatch(setData(response?.data?.data?.orders?.data));
      store.dispatch(setNewOrder((response?.data?.data?.orders?.data?.slice(0, 3))));
      store.dispatch(setLoading(false));

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getInvoice: async () => {
    store.dispatch(setLoading(true));
    
    try {
      const { token } = store.getState().auth;

      const response = await apiClient.get('/vendor/invoice', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      
      store.dispatch(setLoading(false));

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  updateOrderStatus: async (statusData) => {
    store.dispatch(setLoading(true));
    
    try {
      const { token } = store.getState().auth;

      const response = await apiClient.get('/vendor/order/status', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      
      store.dispatch(setLoading(false));

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getWeeklySaleOrder: async () => {
    store.dispatch(setLoading(true));
    
    try {
      const { token } = store.getState().auth;

      const response = await apiClient.get('/vendor/order/weekly/sale', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      
      store.dispatch(setLoading(false));

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }
};