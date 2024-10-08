import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from './../Redux/Store';
import {
  setPendingOrders,
  setCompletedOrders,
  setRecentOrders,
  setLoading,
  setError
} from '../Redux/Store/Slices/Order/index';

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

export const orderService = {
  getPendingOrders: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.get('/order/pending');
      store.dispatch(setPendingOrders(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch pending orders:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getCompletedOrders: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.get('/order/completed');
      store.dispatch(setCompletedOrders(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch completed orders:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  getRecentOrders: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.get('/order/recent');
      store.dispatch(setRecentOrders(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch recent orders:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  checkoutOrder: async (orderData) => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.post('/order/checkout', orderData);
      return response.data;
    } catch (error) {
      console.log('Failed to checkout order:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  processStripeToken: async (stripeToken) => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.post('/order/stripe/token', { stripeToken });
      return response.data;
    } catch (error) {
      console.log('Failed to process Stripe token:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  returnOrder: async (returnData) => {
    store.dispatch(setLoading(true));
    try {
      const response = await apiClient.post('/order/return', returnData);
      return response.data;
    } catch (error) {
      console.log('Failed to return order:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  orderNow: async (data) => {
    store.dispatch(setLoading(true));
    const { cart, auth } = store.getState();

    let total_price = cart?.totalPrice;
    let total_amount_after_discount = 0;
    let discounted_amount = 0;

    if(cart?.discount && cart?.discount > 0) {
      // remove the discount amount and come to the actual amount
      total_price = (await store.getState().cart).actualPrice;
      
      // total amount is an actually discounted
      total_amount_after_discount = cart?.totalPrice;

      // discounted amount
      discounted_amount = total_price - total_amount_after_discount;
    }

    try {
      const payload = {
        stripe_token: data?.paymentIntentId,
        name: cart?.info?.name ?? auth?.data?.name,
        email: cart?.info?.email ?? auth?.data?.email,
        phone: cart?.info?.phone ?? auth?.data?.phone,
        country: cart?.info?.country ?? auth?.data?.country,
        city: cart?.info?.city ?? auth?.data?.city,
        zip: cart?.info?.zip ?? auth?.data?.zip,
        state: cart?.info?.state ?? auth?.data?.state_id,
        address: cart?.info?.address ?? auth?.data?.address,
        shippingAddress: `${auth?.data?.address}, ${auth?.data?.city}, ${auth?.data?.state?.name}, ${auth?.data?.country?.name}, ${auth?.data?.zip}`,
        total_qty: cart?.totalQuantity,

        total_price: total_price,
        total_amount_after_discount: total_amount_after_discount,
        discounted_amount: discounted_amount,

        cartItems: cart?.data.map(item => {
          return {
            id: item?.id,
            name: item?.name,
            price: item?.price,
            qty: item?.quantity,
            shipping_price: Number(item?.shippingPrice) || 0,
            options: {
              product: {
                id: item?.id
              }
            }
          };
        })
      };

      console.log(payload, 'payload')

      const response = await apiClient.post('/order/now', payload);
      store.dispatch(setLoading(true));

      return response.data;
    } catch (error) {
      const errorMessage = error;
      const errors = error.response.data.errors;

      console.log(error.response.data, 'qwerty')

      console.warn('errorMessage', errorMessage)
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          console.log('error', key, errors[key][0])
        }
      }

      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },
};