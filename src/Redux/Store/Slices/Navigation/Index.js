// src/Redux/NavigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [] // Array to store the visited route history
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        addRouteToHistory: (state, action) => {
            if (typeof action.payload === 'string' && action.payload.length > 0) {
                // Add the new route to the history
                state.history = [...state.history, action.payload];
            } else {
                console.error('Invalid route name payload:', action.payload);
            }
        },
        goBackInHistory: (state) => {
            // Ensure there are at least two routes before popping
            if (state.history.length > 1) {
                state.history.pop(); // Remove only the last route (current)
            } else {
                console.warn('No more routes to go back in history.');
            }
        }
    }
});

export const { addRouteToHistory, goBackInHistory } = navigationSlice.actions;
export default navigationSlice.reducer;
