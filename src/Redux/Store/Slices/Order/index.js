// src/Redux/Store/Slices/Order/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pendingOrders: [],
    completedOrders: [],
    recentOrders: [],
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setPendingOrders(state, action) {
            state.pendingOrders = action.payload;
        },
        setCompletedOrders(state, action) {
            state.completedOrders = action.payload;
        },
        setRecentOrders(state, action) {
            state.recentOrders = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setPendingOrders, setCompletedOrders, setRecentOrders, setLoading, setError } = orderSlice.actions;

export default orderSlice.reducer;
