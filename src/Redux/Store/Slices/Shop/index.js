import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  category: [],
  categoryProduct: [],
  pagination: {},
  allProducts: [],
  loading: false, // Add this to ensure loading state is handled
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload?.data || [];
    },
    setCategoryProduct: (state, action) => {
      state.categoryProduct = action.payload?.data?.products?.data || [];
      state.pagination = {
        first_page_url: action.payload?.data?.products?.first_page_url || null,
        prev_page_url: action.payload?.data?.products?.prev_page_url || null,
        next_page_url: action.payload?.data?.products?.next_page_url || null,
      };
    },
    setMoreCategoryProducts: (state, action) => {
      state.categoryProduct = [
        ...state.categoryProduct,
        ...(action.payload?.data?.products?.data || []),
      ];
      state.pagination = {
        first_page_url: action.payload?.data?.products?.first_page_url || null,
        prev_page_url: action.payload?.data?.products?.prev_page_url || null,
        next_page_url: action.payload?.data?.products?.next_page_url || null,
      };
    },
    setAllCategoryProucts: (state, action) => {
      state.allProducts = action.payload?.data?.products?.data || [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export the generated action creators and reducer
export const {
  setCategory,
  setCategoryProduct,
  setMoreCategoryProducts,
  setAllCategoryProucts,
  setLoading,
} = shopSlice.actions;
export default shopSlice.reducer;
