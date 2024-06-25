import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    notifications: [],
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
    }
});

export const {
    setLoading,
    setError,
    setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
