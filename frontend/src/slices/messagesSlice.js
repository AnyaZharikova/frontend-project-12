/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statement */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
