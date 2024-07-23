import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from "./../Redux/Store";
import { setCategory, setCategoryProduct, setAllCategoryProucts, setLoading } from '../Redux/Store/Slices/Shop';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const shopService = {
    getCategories: async () => {
        store.dispatch(setLoading(true));
        try {
            const response = await apiClient.get('/product/categories');

            store.dispatch(setCategory(response.data));
            store.dispatch(setLoading(false));

            return response.data;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },
    getCategoryProducts: async (slug) => {
        store.dispatch(setLoading(true));
        console.log("Slug", slug)
        try {
            const { token } = store.getState().auth;

            const response = await apiClient.get(`/shop/category/${slug}`);

            store.dispatch(setCategoryProduct(response.data));
            store.dispatch(setLoading(false));

            return response.data;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    },
    getAllCategoriesProducts: async (url = '/shop/category') => {
    try {
        const { token } = store.getState().auth;

        const response = await apiClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        store.dispatch(setAllCategoryProucts(response.data.data.products));

        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}
};
