import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    paginateData: {},
    vendorParticipants: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages:  (state, action) => {
            state.messages = action.payload;
        },
        setPaginateData: (state, action) => {
            state.paginateData = action.payload;
        },
        resetChatMessages: (state, action) => {
            state.messages = initialState.messages;
            state.paginateData = initialState.paginateData;
        },
        setVendorParticipants: (state, action) => {
            state.vendorParticipants = action.payload;
        },
        resetVendorParticipants: (state, action) => {
            state.vendorParticipants = []
        }
    }
});

export const { setMessages, setPaginateData, resetChatMessages, setVendorParticipants, resetVendorParticipants } = chatSlice.actions;

export default chatSlice.reducer;