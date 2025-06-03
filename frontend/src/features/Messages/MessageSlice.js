// features/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages, sendMessage } from './MessageService';

// Async thunk to fetch messages between two users
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ sender_id, receiver_id }) => {
    const messages = await getMessages(sender_id, receiver_id);
    return messages;
  }
);

// Async thunk to send a new message
export const sendNewMessage = createAsyncThunk(
  'chat/sendNewMessage',
  async (data) => {
    const newMessage = await sendMessage(data);
    return newMessage;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedUser: null,  // currently selected chat user
    messages: [],        // chat messages array
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = []; // reset messages when switching users (optional)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  }
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
