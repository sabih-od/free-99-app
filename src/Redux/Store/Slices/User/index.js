import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the user slice
const initialState = {
    profile: null,
    payments: null,
    transactions: null,
    stripeConnection: null,
    passwordUpdateStatus: null,
    logoutStatus: null,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        setUserWallet: (state, action) => {
            state.payments = action.payload?.payments;
            state.transactions = action.payload?.transactions;
        },
        setUserStripeConnection: (state, action) => {
            state.stripeConnection = action.payload;
        },
        updateUserPasswordStatus: (state, action) => {
            state.passwordUpdateStatus = action.payload;
        },
        setLogoutStatus: (state, action) => {
            state.logoutStatus = action.payload;
        }
    }
});

// Export the generated action creators and reducer
export const {
    setLoading,
    setUserProfile,
    setUserWallet,
    setUserStripeConnection,
    updateUserPasswordStatus,
    setLogoutStatus
} = userSlice.actions;

export default userSlice.reducer;
