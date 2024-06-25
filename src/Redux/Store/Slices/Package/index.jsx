import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packages: [],
  purchasedPackages: [],
  loading: false,
  error: null
};

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPackages(state, action) {
      state.packages = action.payload?.data;
    },
    addPurchasedPackage(state, action) {
      state.purchasedPackages.push(action.payload);
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setPackages, addPurchasedPackage, setError } = packageSlice.actions;

export default packageSlice.reducer;
