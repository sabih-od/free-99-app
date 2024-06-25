import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the wishlist
const initialState = {
    items: [],
    loading: false,
    error: null
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setWishlistItems: (state, action) => {
            state.items = action.payload;
        },
        addItemToWishlist: (state, action) => {
            state.items.push(action.payload); // Consider using normalization if needed
        },
        removeItemFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

// Export the action creators and reducer
export const {
    setLoading,
    setWishlistItems,
    addItemToWishlist,
    removeItemFromWishlist,
    setError
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
