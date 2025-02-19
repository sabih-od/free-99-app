import axios from 'axios';
import {Routes} from '../Routes';
import { store } from '../../Store/store';
import Toast from 'react-native-toast-message'
import { showSuccess, showError} from '../../Helpers/Utils';

const API = axios.create({baseURL: Routes.baseUrl});

API.interceptors.request.use(config => {
  const {
    auth: {tokenId},
  } = store.getState();
  config.headers['Authorization'] = `Bearer ${tokenId}`;
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
});

// Add a response interceptor
API.interceptors.response.use(
    (response) => {
        const toast = response.config.toast;
        let message = response?.data?.message;

        if(response.config.message) message = response.config.message;

        if(toast) showSuccess(message)

        return response;
    },
    (error) => {
        const errResponse = error.response;
          
        if (errResponse) {
            let object = {};

            if(errResponse?.data) object = errResponse.data;
            if(errResponse?.data?.data) object = errResponse.data?.data;
            
            if(typeof object === 'object' && object !== null && object?.length > 0) {
                for (const key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        const errors = object[key];
                        if (typeof errors === 'object' && errors !== null) {
                            for (const e in errors) {
                                if (Object.prototype.hasOwnProperty.call(errors, e)) {
                                    const err = errors[e];
                                    showError(err);
                                }
                            }
                        } else {
                            showError(element);
                        }
                    }
                }
            }
            
            else if (errResponse?.data?.message) showError(errResponse?.data?.message);
            else showError(errResponse.message);

            console.error('errResponse?.data', errResponse?.data);
            console.error('errResponse?.data?.data', errResponse?.data?.data);
            console.error('errResponse?.data?.message', errResponse?.data?.message);
            console.error('errResponse.message', errResponse.message);
        }

        return Promise.reject(error);
    }
);

export default API;