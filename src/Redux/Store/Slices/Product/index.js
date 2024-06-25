import { createSlice } from '@reduxjs/toolkit';

// Initial state setup for product slice
const initialState = {
    products: [],
    productDetails: {},
    searchResults: [],
    featuredProducts: [],
    loading: false
};

// Creating product slice using createSlice
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Action to set products list
        setProducts: (state, action) => {
            state.products = action?.payload?.data;
        },
        // Action to set details of a specific product
        setProductDetails: (state, action) => {
            state.productDetails = action?.payload?.data;
        },
        // Action to set search results
        setSearchResults: (state, action) => {
            state.searchResults = action?.payload?.data;
        },
        // Action to set featured products
        setFeaturedProducts: (state, action) => {
            state.featuredProducts = action?.payload?.data;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

// Export the action creators and the reducer
export const { setProducts, setProductDetails, setSearchResults, setFeaturedProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
