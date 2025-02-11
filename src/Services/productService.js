import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";
import { setProducts, setProductDetails, setSearchResults, setFeaturedProducts, setLoading } from '../Redux/Store/Slices/Product/index';
import { Alert } from 'react-native';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }
});

// Ensuring the authorization token is attached to each request
apiClient.interceptors.request.use(config => {
    const { auth } = store.getState();
    config.headers['Authorization'] = `Bearer ${auth.token}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export const productService = {
    getSizes: async () => {
        try {
            const response = await apiClient.get('/product/sizes');
            return response.data;
        } catch (error) {
            console.log('Failed to fetch product sizes:', error);
            throw error;
        }
    },

    getProducts: async (data = {}) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.get('/product', { params: data });
            store.dispatch(setProducts(response.data.data));
            // return response.data.data.data;
        } catch (error) {
            console.log('Failed to fetch products:', error);
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    productStatus: async (id) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.get(`/product/status/${id}`);
            return ;
            // return response.data.data.data;
        } catch (error) {
            console.log('Failed to update status:', error);
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    getProductDetail: async (productId) => {
        try {
            const response = await apiClient.get(`/product/detail/${productId}`);
            store.dispatch(setProductDetails(response.data));
            return response.data;
        } catch (error) {
            console.log('Failed to fetch product details:', error);
            throw error;
        }
    },

    searchProduct: async (searchQuery) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.post('/product/search', { keyword: searchQuery });
            store.dispatch(setSearchResults(response.data));
            store.dispatch(setLoading(false));
            return response.data;
        } catch (error) {
            console.log('Failed to search products:', error);
            store.dispatch(setLoading(false));
            throw error;
        }
    },

    getFeaturedProducts: async () => {
        try {
            const response = await apiClient.get('/product/featured');
            store.dispatch(setFeaturedProducts(response.data));
            return response.data;
        } catch (error) {
            console.log('Failed to fetch featured products:', error);
            throw error;
        }
    },

    createProduct: async (data) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.post('/product', data);

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

            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    updateProduct: async (id, data) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.post('/product/' + id, data);

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

            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    removeProduct: async (id) => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.delete('/product/' + id);

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

            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },
        removeGalleryImages: async (productId, imageId) => {
            console.log('productId, imageId', productId, imageId);

            
            store.dispatch(setLoading(true));
            try {
                const response = await apiClient.delete(`/product/gallery-image/${productId}/${imageId}`);
                return response.data.message;
            } catch (error) {
                console.error('Error removing gallery image:', error);
                throw error;
            } finally {
                store.dispatch(setLoading(false));
            }
        }
};
