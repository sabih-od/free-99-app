import axios from 'axios';
import { BASE_URL } from '../Constants';
import { store } from './../Redux/Store';
import { setNotifications, setLoading } from '../Redux/Store/Slices/Notifications';
import { successToast } from '../Utils/toast';
import { Alert } from 'react-native';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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

export const notificationService = {
    getNotifications: async () => {
        store.dispatch(setLoading(true))
        try {
            const response = await apiClient.get('/notifications');
            store.dispatch(setNotifications(response.data?.data?.data));
            store.dispatch(setLoading(false))
            return response?.data?.data;
        } catch (error) {
            console.log('Failed to fetch notifications:', error);
            store.dispatch(setError(error.toString()));
            store.dispatch(setLoading(false))
            throw error;
        } finally {
        }
    },

    delete: async (id) => {
        store.dispatch(setLoading(true))
        try {
            const response = await apiClient.get(`/notifications/${id}`);
            successToast(response.data.message);
            Alert.alert("Notification Deleted")
            store.dispatch(setLoading(false))

            return response?.data;
        } catch (error) {
            console.log('Failed to delete:', error);
            store.dispatch(setError(error.toString()));
            store.dispatch(setLoading(false))
            throw error;
        } finally {
        }
    },
};
