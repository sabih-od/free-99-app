import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";
import { errorToast, successToast } from '../Utils/toast';

const reviewApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Ensuring the authorization token is attached to each request
reviewApiClient.interceptors.request.use(config => {
  const { auth } = store.getState();
  config.headers['Authorization'] = `Bearer ${auth.token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export const productReviewService = {
  getProductReviews: async (productId) => {
    store.dispatch(setLoading(true));
    try {
      const response = await reviewApiClient.get(`/product/review/${productId}`);
      store.dispatch(setProductReviews(response.data));
      return response.data;
    } catch (error) {
      console.log('Failed to fetch product reviews:', error);
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  postProductReview: async (reviewData) => {
    try {
      const response = await reviewApiClient.post('/product/review', reviewData);
      successToast("Review Added")
      return response.data;
    } catch (error) {
      console.log('Failed to post product review:', error);
      errorToast(error.response.data.message)
      throw error;
    } finally {
    }
  }
};
