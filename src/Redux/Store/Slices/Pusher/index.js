import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the user slice
const initialState = {
    pusher: null,
    event: null
};

export const pusherSlice = createSlice({
    name: 'pusher',
    initialState,
    reducers: {
        setPusher: (state, action) => void(state.pusher = action?.payload),
        resetPusher: (state) => void(state.pusher = null),

        setEvent: (state, action) => void(state.event = action?.payload),
        resetEvent: (state) => void(state.event = null),
    }
});

// Export the generated action creators and reducer
export const {
    setPusher,
    resetPusher,

    setEvent,
    resetEvent
} = pusherSlice.actions;

export default pusherSlice.reducer;