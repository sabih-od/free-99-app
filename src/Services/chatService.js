import axios from 'axios';
import {BASE_URL} from '../Constants';
import {store} from './../Redux/Store';
import {
  setCategory,
  setCategoryProduct,
  setAllCategoryProucts,
  setLoading,
} from '../Redux/Store/Slices/Chat';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const chatService = {

};