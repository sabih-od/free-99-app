// src/Redux/Store/Slices/Order/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    newOrder: []
};

const vendorOrderSlice = createSlice({
    name: 'vendorOrder',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setNewOrder(state, action) {
            state.newOrder = action.payload;
        },
    }
});

export const { setData, setNewOrder } = vendorOrderSlice.actions;

export default vendorOrderSlice.reducer;
