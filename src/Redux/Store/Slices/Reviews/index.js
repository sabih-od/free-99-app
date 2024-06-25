import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  reviews: [],
};

const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProductReviews: (state, action) => {
      state.reviews = action.payload;
    },
    addProductReview: (state, action) => {
      state.reviews.push(action.payload);
    }
  }
});

export const { setLoading, setProductReviews, addProductReview } = productReviewSlice.actions;
export default productReviewSlice.reducer;
