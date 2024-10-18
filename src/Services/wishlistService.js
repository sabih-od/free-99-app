import axios from 'axios';
import {BASE_URL} from '../Constants';
import {store} from './../Redux/Store';
import {
  setLoading,
  setWishlistItems,
  addItemToWishlist,
  removeItemFromWishlist,
  setError,
} from '../Redux/Store/Slices/Wishlist';

const wishlistApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Ensuring the authorization token is attached to each request
wishlistApiClient.interceptors.request.use(
  config => {
    const {auth} = store.getState();
    config.headers['Authorization'] = `Bearer ${auth.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const wishlistService = {
  getWishlist: async () => {
    store.dispatch(setLoading(true));
    try {
      const response = await wishlistApiClient.get('/wishlist');
      store.dispatch(setWishlistItems(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch wishlist:', error);
      store.dispatch(setError(error.toString()));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  isWishlisted: async id => {
    store.dispatch(setLoading(true));
    try {
      const response = await wishlistApiClient.get(`/wishlist/${id}`);
      return response.message;
    } catch (error) {
      console.log('Failed to fetch:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  addToWishlist: async id => {
    store.dispatch(setLoading(true));
    try {
      const response = await wishlistApiClient.post('/wishlist/store', {
        product_id: id,
      });
      store.dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      console.log('Failed to add to wishlist:', error);
      store.dispatch(setError(error.toString()));
      store.dispatch(setLoading(false));
      console.log('add wishlist response=> ', response);
      throw error;
    }
  },
};
