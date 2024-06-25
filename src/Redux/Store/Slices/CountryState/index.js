import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    countries: [],
    states: []
};

const countryStateSlice = createSlice({
    name: 'countryState',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        setStates: (state, action) => {
            state.states = action.payload;
        },
    }
});

export const {
    setLoading,
    setError,
    setCountries,
    setStates
} = countryStateSlice.actions;

export default countryStateSlice.reducer;
